System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, PieceType, CFG, EQUIP, PIECE_BASE, STAR_MUL, BattleUnit, BattleSim, _crd;

  function _reportPossibleCrUseOfBoardPiece(extras) {
    _reporterNs.report("BoardPiece", "../data/GameTypes", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEquipType(extras) {
    _reporterNs.report("EquipType", "../data/GameTypes", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPieceType(extras) {
    _reporterNs.report("PieceType", "../data/GameTypes", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCFG(extras) {
    _reporterNs.report("CFG", "../data/GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEQUIP(extras) {
    _reporterNs.report("EQUIP", "../data/GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPIECE_BASE(extras) {
    _reporterNs.report("PIECE_BASE", "../data/GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSTAR_MUL(extras) {
    _reporterNs.report("STAR_MUL", "../data/GameConfig", _context.meta, extras);
  }

  _export({
    BattleUnit: void 0,
    BattleSim: void 0
  });

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      PieceType = _unresolved_2.PieceType;
    }, function (_unresolved_3) {
      CFG = _unresolved_3.CFG;
      EQUIP = _unresolved_3.EQUIP;
      PIECE_BASE = _unresolved_3.PIECE_BASE;
      STAR_MUL = _unresolved_3.STAR_MUL;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "5d599JgKS5BgZEi+VCQeHot", "Battle", undefined);

      /**
       * 战斗模拟：纯数据、可被 update(dt) 驱动实时演出，也可 fastForward() 瞬间结算。
       * 坐标系：x∈[0,4] 列，y∈[0,7] 行；side0=我方（下半 4~7 行），side1=敌方（镜像到上半 0~3 行）。
       */
      _export("BattleUnit", BattleUnit = class BattleUnit {
        constructor(src, side, col, row) {
          this.side = 0;
          this.type = (_crd && PieceType === void 0 ? (_reportPossibleCrUseOfPieceType({
            error: Error()
          }), PieceType) : PieceType).A;
          this.star = 1;
          this.name = '';
          this.x = 0;
          this.y = 0;
          this.maxHp = 1;
          this.hp = 1;
          this.atk = 1;
          this.def = 0;
          this.move = 1;
          this.interval = 1;
          this.range = 1;
          this.alive = true;
          this.cd = 0;
          // 攻击冷却
          this.mana = 0;
          // 蓝量：攻击/受击回复，满值释放技能
          this.maxMana = (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).MANA_MAX;
          // 技能增益（限时）
          this.tSkill = 0;
          this.mAtk = 1;
          this.mDef = 1;
          this.mSpd = 1;
          this.mAS = 1;
          this.double = false;
          // 装备特效相关计时
          this.forbidT = 0;
          this.forbidApplyCd = 0;
          // 被禁攻 / 施加禁攻的冷却
          this.ignoreT = 0;
          this.ignoreCd = 0;
          // 无视伤害 / 触发冷却
          this.slowT = 0;
          this.asDebuffT = 0;
          this.atkDebuffT = 0;
          // 统计
          this.dmg = 0;
          this.taken = 0;
          this.heal = 0;
          this.effects = [];
          this.equips = [];
          var base = (_crd && PIECE_BASE === void 0 ? (_reportPossibleCrUseOfPIECE_BASE({
            error: Error()
          }), PIECE_BASE) : PIECE_BASE)[src.type];
          var mul = (_crd && STAR_MUL === void 0 ? (_reportPossibleCrUseOfSTAR_MUL({
            error: Error()
          }), STAR_MUL) : STAR_MUL)[src.star - 1];
          this.side = side;
          this.type = src.type;
          this.star = src.star;
          this.name = base.name + (src.star > 1 ? src.star + "\u661F" : '');
          this.x = col;
          this.y = row;
          var hp = base.hp * mul,
              atk = base.atk * mul,
              def = base.def * mul;
          var move = base.move,
              asBonus = 0;
          this.equips = src.equips.slice();

          for (var e of src.equips) {
            var eb = (_crd && EQUIP === void 0 ? (_reportPossibleCrUseOfEQUIP({
              error: Error()
            }), EQUIP) : EQUIP)[e];
            hp += eb.hp;
            def += eb.def;
            move += eb.move;
            asBonus += eb.as;
            if (eb.effect) this.effects.push(eb.effect);
          }

          if (this.effects.indexOf('hpBoost') >= 0) hp *= 1.3; // 巨人之心（M）：血量额外+30%

          this.maxHp = Math.round(hp);
          this.hp = this.maxHp;
          this.atk = Math.round(atk);
          this.def = Math.round(def);
          this.move = move;
          this.interval = base.interval / (1 + asBonus);
          this.range = base.range + (this.effects.indexOf('rangePlus') >= 0 ? 1 : 0); // 暴风双刃（K）：攻距+1
        }

        get effInterval() {
          var it = this.interval / this.mAS;
          if (this.asDebuffT > 0) it /= 0.8; // 寒铁战刃：攻速-20%

          return it;
        }

        get effAtk() {
          var a = this.atk * this.mAtk;
          if (this.atkDebuffT > 0) a *= 0.85; // 虚弱重铠：攻击-15%

          return a;
        }

        get effDef() {
          return this.def * this.mDef;
        }

        get effMove() {
          var m = this.move * this.mSpd;
          if (this.slowT > 0) m *= 0.7; // 霜冻/泥泞：移速-30%

          return m;
        }

      });
      /** 战斗演出事件：由 BoardView 消费 */


      _export("BattleSim", BattleSim = class BattleSim {
        constructor(ally, enemy) {
          var _this = this;

          this.units = [];
          this.time = 0;
          this.finished = false;

          /** 0=我方胜 1=敌方胜 -1=平局 */
          this.winner = null;
          this.events = [];

          for (var p of ally) this.units.push(new BattleUnit(p, 0, p.col, p.row));

          for (var _p of enemy) this.units.push(new BattleUnit(_p, 1, _p.col, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).ROWS - 1 - _p.row)); // 敌方镜像到上半区
          // 疾风迅雷（N）：开局随机一个敌方远程棋子 2 秒无法攻击


          var _loop = function _loop(u) {
            if (u.effects.indexOf('silenceRanged') < 0) return 1; // continue

            var ranged = _this.units.filter(e => e.side !== u.side && e.range > 1 && e.alive);

            if (ranged.length > 0) ranged[Math.floor(Math.random() * ranged.length)].forbidT = 2;
          };

          for (var u of this.units) {
            if (_loop(u)) continue;
          }
        }

        get speedFactor() {
          return this.time >= (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).SPEEDUP_AT ? (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).SPEEDUP_FACTOR : 1;
        }

        aliveCount(side) {
          var n = 0;

          for (var u of this.units) if (u.side === side && u.alive) n++;

          return n;
        }

        hpSum(side) {
          var s = 0;

          for (var u of this.units) if (u.side === side && u.alive) s += u.hp;

          return s;
        }

        update(dt) {
          if (this.finished) return;
          var sdt = dt * this.speedFactor; // 40 秒后战斗加速

          this.time += sdt;

          for (var u of this.units) this.tickUnit(u, sdt);

          this.checkEnd();
        }

        fastForward() {
          var i = 0;

          while (!this.finished && i++ < 4000) this.update(0.05);
        }

        stats() {
          return this.units.map(u => ({
            side: u.side,
            name: u.name,
            star: u.star,
            dmg: u.dmg,
            taken: u.taken,
            heal: u.heal
          }));
        }

        push(ev) {
          if (this.events.length < 300) this.events.push(ev);
        }

        cheb(a, b) {
          return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
        }

        tickUnit(u, dt) {
          if (!u.alive) return;
          u.cd -= dt;
          u.tSkill -= dt;
          u.forbidT -= dt;
          u.forbidApplyCd -= dt;
          u.ignoreT -= dt;
          u.ignoreCd -= dt;
          u.slowT -= dt;
          u.asDebuffT -= dt;
          u.atkDebuffT -= dt; // 技能到期还原

          if (u.tSkill <= 0 && (u.mAtk !== 1 || u.mDef !== 1 || u.mSpd !== 1 || u.mAS !== 1 || u.double)) {
            u.mAtk = 1;
            u.mDef = 1;
            u.mSpd = 1;
            u.mAS = 1;
            u.double = false;
          }

          var foes = [];

          for (var e of this.units) if (e.alive && e.side !== u.side) foes.push(e);

          if (foes.length === 0) return; // 移动目标：最近的敌人

          var nearest = null;
          var nd = Infinity;

          for (var f of foes) {
            var d = this.cheb(u, f);

            if (d < nd) {
              nd = d;
              nearest = f;
            }
          }

          var inRange = foes.filter(f => this.cheb(u, f) <= u.range);

          if (inRange.length === 0) {
            // 不在射程内：向最近敌人移动
            if (nearest) {
              var dx = nearest.x - u.x,
                  dy = nearest.y - u.y;
              var len = Math.sqrt(dx * dx + dy * dy);

              if (len > 1e-4) {
                var step = Math.min(u.effMove * dt, len);
                u.x += dx / len * step;
                u.y += dy / len * step;
              }

              u.x = Math.max(0, Math.min((_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
                error: Error()
              }), CFG) : CFG).COLS - 1, u.x));
              u.y = Math.max(0, Math.min((_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
                error: Error()
              }), CFG) : CFG).ROWS - 1, u.y));
            }

            return;
          }

          if (u.cd > 0 || u.forbidT > 0) return; // 攻击目标优先级：射程最大 → 距离最近 → 血量最低

          inRange.sort((a, b) => b.range - a.range || this.cheb(u, a) - this.cheb(u, b) || a.hp - b.hp);
          u.cd = u.effInterval;
          this.attack(u, inRange[0], true); // 射手技能：同时攻击第 2 个目标

          if (u.double && inRange.length > 1) this.attack(u, inRange[1], false);
        }

        attack(u, t, countForSkill) {
          this.push({
            type: 'attack',
            u,
            t
          });

          if (countForSkill) {
            u.mana = Math.min(u.maxMana, u.mana + (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).MANA_ATK);
            this.tryCast(u);
          }

          if (!t.alive) return; // 命中触发的装备特效

          for (var ef of u.effects) {
            if (ef === 'slowMove') t.slowT = 2;else if (ef === 'reduceAS') t.asDebuffT = 2;else if (ef === 'reduceAtk') t.atkDebuffT = 2;else if (ef === 'forbidAtk' && u.forbidApplyCd <= 0) {
              t.forbidT = 3;
              u.forbidApplyCd = 8;
            }
          } // 不朽壁垒：受击触发 3 秒无视伤害


          if (t.effects.indexOf('ignoreDmg') >= 0 && t.ignoreCd <= 0) {
            t.ignoreT = 3;
            t.ignoreCd = 8;
          }

          if (t.ignoreT > 0) return; // 无敌期间不掉血

          var dmg = Math.max(1, Math.round(u.effAtk - t.effDef));
          t.hp -= dmg;
          u.dmg += dmg;
          t.taken += dmg;
          this.push({
            type: 'hurt',
            u: t,
            t: u,
            val: dmg
          }); // 荆棘重甲（L）：反伤 20%

          if (t.effects.indexOf('reflect') >= 0) {
            var r = Math.max(1, Math.round(dmg * 0.2));
            u.hp -= r;
            u.taken += r;
            t.dmg += r;
            this.push({
              type: 'hurt',
              u,
              t,
              val: r
            });

            if (u.hp <= 0) {
              u.hp = 0;
              u.alive = false;
            }
          }

          if (t.hp <= 0) {
            t.hp = 0;
            t.alive = false;
          } else {
            t.mana = Math.min(t.maxMana, t.mana + (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).MANA_HIT);
            this.tryCast(t);
          }
        }

        tryCast(u) {
          if (!u.alive || u.mana < u.maxMana) return;
          u.mana = 0;
          this.push({
            type: 'skill',
            u
          });

          if (u.type === (_crd && PieceType === void 0 ? (_reportPossibleCrUseOfPieceType({
            error: Error()
          }), PieceType) : PieceType).A) {
            // 坦克
            u.mDef = 1.5;
            u.tSkill = 8;
          } else if (u.type === (_crd && PieceType === void 0 ? (_reportPossibleCrUseOfPieceType({
            error: Error()
          }), PieceType) : PieceType).B) {
            // 刺客
            u.mAtk = 1.8;
            u.mSpd = 1.5;
            u.tSkill = 2;
          } else if (u.type === (_crd && PieceType === void 0 ? (_reportPossibleCrUseOfPieceType({
            error: Error()
          }), PieceType) : PieceType).C) {
            // 射手
            u.mAS = 2;
            u.double = true;
            u.tSkill = 2;
          } else if (u.type === (_crd && PieceType === void 0 ? (_reportPossibleCrUseOfPieceType({
            error: Error()
          }), PieceType) : PieceType).D) {
            // 治疗师
            for (var a of this.units) {
              if (!a.alive || a.side !== u.side) continue;
              var h = Math.round((a.maxHp - a.hp) * 0.1);

              if (h > 0) {
                a.hp = Math.min(a.maxHp, a.hp + h);
                u.heal += h;
                this.push({
                  type: 'heal',
                  u: a,
                  val: h
                });
              }
            }
          }
        }

        checkEnd() {
          var a = this.aliveCount(0),
              b = this.aliveCount(1);

          if (a === 0 && b === 0) {
            this.finish(-1);
            return;
          }

          if (b === 0) {
            this.finish(0);
            return;
          }

          if (a === 0) {
            this.finish(1);
            return;
          }

          if (this.time >= (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).BATTLE_TIME) {
            var ha = this.hpSum(0),
                hb = this.hpSum(1);
            this.finish(ha === hb ? -1 : ha > hb ? 0 : 1);
          }
        }

        finish(w) {
          this.finished = true;
          this.winner = w;
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=46232f90d2d45e035756e8da67815bcb0cce1ede.js.map