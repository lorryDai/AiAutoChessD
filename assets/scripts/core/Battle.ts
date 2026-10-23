import { BoardPiece, EquipType, PieceType } from '../data/GameTypes';
import { CFG, EQUIP, PIECE_BASE, STAR_MUL } from '../data/GameConfig';

/**
 * 战斗模拟：纯数据、可被 update(dt) 驱动实时演出，也可 fastForward() 瞬间结算。
 * 坐标系：x∈[0,4] 列，y∈[0,7] 行；side0=我方（下半 4~7 行），side1=敌方（镜像到上半 0~3 行）。
 */
export class BattleUnit {
  side = 0;
  type = PieceType.A;
  star = 1;
  name = '';
  x = 0; y = 0;

  maxHp = 1; hp = 1;
  atk = 1; def = 0; move = 1; interval = 1; range = 1;

  alive = true;
  cd = 0;            // 攻击冷却
  mana = 0;          // 蓝量：攻击/受击回复，满值释放技能
  maxMana = CFG.MANA_MAX;

  // 技能增益（限时）
  tSkill = 0; mAtk = 1; mDef = 1; mSpd = 1; mAS = 1; double = false;

  // 装备特效相关计时
  forbidT = 0; forbidApplyCd = 0;   // 被禁攻 / 施加禁攻的冷却
  ignoreT = 0; ignoreCd = 0;        // 无视伤害 / 触发冷却
  slowT = 0; asDebuffT = 0; atkDebuffT = 0;

  // 统计
  dmg = 0; taken = 0; heal = 0;

  effects: string[] = [];
  equips: EquipType[] = [];

  constructor(src: BoardPiece, side: number, col: number, row: number) {
    const base = PIECE_BASE[src.type];
    const mul = STAR_MUL[src.star - 1];
    this.side = side; this.type = src.type; this.star = src.star;
    this.name = base.name + (src.star > 1 ? `${src.star}星` : '');
    this.x = col; this.y = row;

    let hp = base.hp * mul, atk = base.atk * mul, def = base.def * mul;
    let move = base.move, asBonus = 0;
    this.equips = src.equips.slice();
    for (const e of src.equips) {
      const eb = EQUIP[e];
      hp += eb.hp; def += eb.def; move += eb.move; asBonus += eb.as;
      if (eb.effect) this.effects.push(eb.effect);
    }
    if (this.effects.indexOf('hpBoost') >= 0) hp *= 1.3;   // 巨人之心（M）：血量额外+30%
    this.maxHp = Math.round(hp); this.hp = this.maxHp;
    this.atk = Math.round(atk); this.def = Math.round(def);
    this.move = move;
    this.interval = base.interval / (1 + asBonus);
    this.range = base.range + (this.effects.indexOf('rangePlus') >= 0 ? 1 : 0);  // 暴风双刃（K）：攻距+1
  }

  get effInterval(): number {
    let it = this.interval / this.mAS;
    if (this.asDebuffT > 0) it /= 0.8;   // 寒铁战刃：攻速-20%
    return it;
  }
  get effAtk(): number {
    let a = this.atk * this.mAtk;
    if (this.atkDebuffT > 0) a *= 0.85;  // 虚弱重铠：攻击-15%
    return a;
  }
  get effDef(): number { return this.def * this.mDef; }
  get effMove(): number {
    let m = this.move * this.mSpd;
    if (this.slowT > 0) m *= 0.7;        // 霜冻/泥泞：移速-30%
    return m;
  }
}

export interface BattleStatLine {
  side: number; name: string; star: number;
  dmg: number; taken: number; heal: number;
}

/** 战斗演出事件：由 BoardView 消费 */
export interface BattleEvent {
  type: 'attack' | 'hurt' | 'heal' | 'skill';
  u: BattleUnit;
  t?: BattleUnit;
  val?: number;
}

export class BattleSim {
  units: BattleUnit[] = [];
  time = 0;
  finished = false;
  /** 0=我方胜 1=敌方胜 -1=平局 */
  winner: -1 | 0 | 1 | null = null;
  events: BattleEvent[] = [];

  constructor(ally: BoardPiece[], enemy: BoardPiece[]) {
    for (const p of ally) this.units.push(new BattleUnit(p, 0, p.col, p.row));
    for (const p of enemy) this.units.push(new BattleUnit(p, 1, p.col, CFG.ROWS - 1 - p.row)); // 敌方镜像到上半区
    // 疾风迅雷（N）：开局随机一个敌方远程棋子 2 秒无法攻击
    for (const u of this.units) {
      if (u.effects.indexOf('silenceRanged') < 0) continue;
      const ranged = this.units.filter(e => e.side !== u.side && e.range > 1 && e.alive);
      if (ranged.length > 0) ranged[Math.floor(Math.random() * ranged.length)].forbidT = 2;
    }
  }

  get speedFactor(): number {
    return this.time >= CFG.SPEEDUP_AT ? CFG.SPEEDUP_FACTOR : 1;
  }

  aliveCount(side: number): number {
    let n = 0;
    for (const u of this.units) if (u.side === side && u.alive) n++;
    return n;
  }

  hpSum(side: number): number {
    let s = 0;
    for (const u of this.units) if (u.side === side && u.alive) s += u.hp;
    return s;
  }

  update(dt: number): void {
    if (this.finished) return;
    const sdt = dt * this.speedFactor;   // 40 秒后战斗加速
    this.time += sdt;
    for (const u of this.units) this.tickUnit(u, sdt);
    this.checkEnd();
  }

  fastForward(): void {
    let i = 0;
    while (!this.finished && i++ < 4000) this.update(0.05);
  }

  stats(): BattleStatLine[] {
    return this.units.map(u => ({ side: u.side, name: u.name, star: u.star, dmg: u.dmg, taken: u.taken, heal: u.heal }));
  }

  private push(ev: BattleEvent): void {
    if (this.events.length < 300) this.events.push(ev);
  }

  private cheb(a: BattleUnit, b: BattleUnit): number {
    return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
  }

  private tickUnit(u: BattleUnit, dt: number): void {
    if (!u.alive) return;
    u.cd -= dt; u.tSkill -= dt;
    u.forbidT -= dt; u.forbidApplyCd -= dt;
    u.ignoreT -= dt; u.ignoreCd -= dt;
    u.slowT -= dt; u.asDebuffT -= dt; u.atkDebuffT -= dt;

    // 技能到期还原
    if (u.tSkill <= 0 && (u.mAtk !== 1 || u.mDef !== 1 || u.mSpd !== 1 || u.mAS !== 1 || u.double)) {
      u.mAtk = 1; u.mDef = 1; u.mSpd = 1; u.mAS = 1; u.double = false;
    }

    const foes: BattleUnit[] = [];
    for (const e of this.units) if (e.alive && e.side !== u.side) foes.push(e);
    if (foes.length === 0) return;

    // 移动目标：最近的敌人
    let nearest: BattleUnit | null = null; let nd = Infinity;
    for (const f of foes) {
      const d = this.cheb(u, f);
      if (d < nd) { nd = d; nearest = f; }
    }

    const inRange = foes.filter(f => this.cheb(u, f) <= u.range);

    if (inRange.length === 0) {
      // 不在射程内：向最近敌人移动
      if (nearest) {
        const dx = nearest.x - u.x, dy = nearest.y - u.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        if (len > 1e-4) {
          const step = Math.min(u.effMove * dt, len);
          u.x += dx / len * step; u.y += dy / len * step;
        }
        u.x = Math.max(0, Math.min(CFG.COLS - 1, u.x));
        u.y = Math.max(0, Math.min(CFG.ROWS - 1, u.y));
      }
      return;
    }

    if (u.cd > 0 || u.forbidT > 0) return;

    // 攻击目标优先级：射程最大 → 距离最近 → 血量最低
    inRange.sort((a, b) => (b.range - a.range) || (this.cheb(u, a) - this.cheb(u, b)) || (a.hp - b.hp));
    u.cd = u.effInterval;
    this.attack(u, inRange[0], true);
    // 射手技能：同时攻击第 2 个目标
    if (u.double && inRange.length > 1) this.attack(u, inRange[1], false);
  }

  private attack(u: BattleUnit, t: BattleUnit, countForSkill: boolean): void {
    this.push({ type: 'attack', u, t });
    if (countForSkill) {
      u.mana = Math.min(u.maxMana, u.mana + CFG.MANA_ATK);
      this.tryCast(u);
    }
    if (!t.alive) return;

    // 命中触发的装备特效
    for (const ef of u.effects) {
      if (ef === 'slowMove') t.slowT = 2;
      else if (ef === 'reduceAS') t.asDebuffT = 2;
      else if (ef === 'reduceAtk') t.atkDebuffT = 2;
      else if (ef === 'forbidAtk' && u.forbidApplyCd <= 0) { t.forbidT = 3; u.forbidApplyCd = 8; }
    }

    // 不朽壁垒：受击触发 3 秒无视伤害
    if (t.effects.indexOf('ignoreDmg') >= 0 && t.ignoreCd <= 0) { t.ignoreT = 3; t.ignoreCd = 8; }
    if (t.ignoreT > 0) return;   // 无敌期间不掉血

    const dmg = Math.max(1, Math.round(u.effAtk - t.effDef));
    t.hp -= dmg; u.dmg += dmg; t.taken += dmg;
    this.push({ type: 'hurt', u: t, t: u, val: dmg });
    // 荆棘重甲（L）：反伤 20%
    if (t.effects.indexOf('reflect') >= 0) {
      const r = Math.max(1, Math.round(dmg * 0.2));
      u.hp -= r; u.taken += r; t.dmg += r;
      this.push({ type: 'hurt', u, t, val: r });
      if (u.hp <= 0) { u.hp = 0; u.alive = false; }
    }
    if (t.hp <= 0) {
      t.hp = 0; t.alive = false;
    } else {
      t.mana = Math.min(t.maxMana, t.mana + CFG.MANA_HIT);
      this.tryCast(t);
    }
  }

  private tryCast(u: BattleUnit): void {
    if (!u.alive || u.mana < u.maxMana) return;
    u.mana = 0;
    this.push({ type: 'skill', u });
    if (u.type === PieceType.A) {           // 坦克
      u.mDef = 1.5; u.tSkill = 8;
    } else if (u.type === PieceType.B) {    // 刺客
      u.mAtk = 1.8; u.mSpd = 1.5; u.tSkill = 2;
    } else if (u.type === PieceType.C) {    // 射手
      u.mAS = 2; u.double = true; u.tSkill = 2;
    } else if (u.type === PieceType.D) {    // 治疗师
      for (const a of this.units) {
        if (!a.alive || a.side !== u.side) continue;
        const h = Math.round((a.maxHp - a.hp) * 0.1);
        if (h > 0) {
          a.hp = Math.min(a.maxHp, a.hp + h);
          u.heal += h;
          this.push({ type: 'heal', u: a, val: h });
        }
      }
    }
  }

  private checkEnd(): void {
    const a = this.aliveCount(0), b = this.aliveCount(1);
    if (a === 0 && b === 0) { this.finish(-1); return; }
    if (b === 0) { this.finish(0); return; }
    if (a === 0) { this.finish(1); return; }
    if (this.time >= CFG.BATTLE_TIME) {
      const ha = this.hpSum(0), hb = this.hpSum(1);
      this.finish(ha === hb ? -1 : (ha > hb ? 0 : 1));
    }
  }

  private finish(w: -1 | 0 | 1): void {
    this.finished = true;
    this.winner = w;
  }
}
