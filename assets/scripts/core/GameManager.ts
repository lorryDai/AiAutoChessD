import { _decorator, Component, EventTarget } from 'cc';
import { BoardPiece, Card, CardKind, EquipType, Phase, cardSellValue, pieceSellValue } from '../data/GameTypes';
import { CFG, combineResult } from '../data/GameConfig';
import { PlayerState } from './Models';
import { BattleSim, BattleStatLine } from './Battle';
import { botPrep, cloneBoard, pairPlayers, Pairing, rollShop, tryMerge } from './Systems';

const { ccclass } = _decorator;

export interface BattleResult {
  won: boolean | null;   // true 胜 / false 负 / null 平局
  stats: BattleStatLine[];
  oppName: string;
  mirror: boolean;
  round: number;
}

export interface CombineAsk {
  kind: 'hand' | 'equip';
  uid1: number;          // 被拖动的装备卡
  uid2: number;          // hand: 目标装备卡；equip: 目标棋子 uid
  withEquip?: EquipType; // equip 时棋子身上被合成的装备
  result: EquipType;
}

/** 游戏总控：阶段流转、经济、商店、上阵、装备合成、配对与结算 */
@ccclass('GameManager')
export class GameManager extends Component {
  static inst: GameManager = null!;

  events = new EventTarget();
  players: PlayerState[] = [];
  phase: Phase = Phase.Home;
  round = 0;
  timer = 0;
  simOnly = false;          // true=模拟战斗模式：单回合、准备无倒计时、手动开战

  sim: BattleSim | null = null;
  pairings: Pairing[] = [];
  playerResult: BattleResult | null = null;

  private _oppIdx = -1;
  private _oppMirror = false;

  onLoad() { GameManager.inst = this; }

  get me(): PlayerState { return this.players[0]; }
  get opp(): PlayerState | null { return this._oppIdx >= 0 ? this.players[this._oppIdx] : null; }
  get aliveBots(): number { return this.players.filter(p => p.alive && p.isBot).length; }

  newMatch(count = 8): void {
    this.players = [];
    for (let i = 0; i < count; i++) {
      const p = new PlayerState();
      p.name = i === 0 ? '你' : CFG.BOT_NAMES[i - 1];
      p.isBot = i !== 0;
      p.hp = CFG.START_HP;
      this.players.push(p);
    }
    this.round = 0;
  }

  // ---------------- 阶段流转 ----------------

  beginPrep(): void {
    this.round++;
    this.phase = Phase.Prep;
    this.timer = this.simOnly ? 0 : CFG.PREP_TIME;
    this.sim = null;
    this.playerResult = null;
    for (const p of this.players) {
      if (!p.alive) continue;
      p.gold += CFG.ROUND_GOLD;
      p.shop = rollShop();   // 每回合自动免费刷新一次
    }
    for (const p of this.players) if (p.alive && p.isBot) botPrep(p);
    this.events.emit('refresh');
    this.events.emit('phase');
  }

  beginBattle(): void {
    this.phase = Phase.Battle;
    this.pairings = pairPlayers(this.players);

    const mine = this.pairings.find(pr => pr.a === 0 || pr.b === 0) || null;
    this._oppIdx = mine ? (mine.a === 0 ? mine.b : mine.a) : -1;
    this._oppMirror = mine ? mine.mirror : false;

    // 机器人之间的对局：瞬间结算
    for (const pr of this.pairings) {
      if (mine && pr.a === mine.a && pr.b === mine.b) continue;
      const sim = new BattleSim(cloneBoard(this.players[pr.a].board), cloneBoard(this.players[pr.b].board));
      sim.fastForward();
      this.applyResult(pr.a, pr.b, sim.winner, pr.mirror);
    }

    // 玩家场次：实时演出
    const oppState = this.opp;
    this.sim = new BattleSim(cloneBoard(this.me.board), cloneBoard(oppState ? oppState.board : []));
    this.events.emit('battle-start');
    this.events.emit('refresh');
  }

  update(dt: number): void {
    if (this.phase === Phase.Prep) {
      if (!this.simOnly) {
        this.timer -= dt;
        if (this.timer <= 0) { this.timer = 0; this.beginBattle(); }
      }
    } else if (this.phase === Phase.Battle && this.sim) {
      this.sim.update(dt);
      if (this.sim.finished) this.settleBattle();
    }
  }

  /** 模拟模式下玩家手动点击"开始战斗" */
  startManualBattle(): string | null {
    if (!this.simOnly || this.phase !== Phase.Prep) return null;
    this.beginBattle();
    return null;
  }

  private settleBattle(): void {
    const w = this.sim!.winner;
    const oppState = this.opp;
    this.playerResult = {
      won: w === -1 ? null : w === 0,
      stats: this.sim!.stats(),
      oppName: (oppState ? oppState.name : '未知') + (this._oppMirror ? '(镜像)' : ''),
      mirror: this._oppMirror,
      round: this.round,
    };
    this.applyResult(0, this._oppIdx, w, this._oppMirror);

    for (const p of this.players) if (p.alive && p.hp <= 0) { p.hp = 0; p.alive = false; }

    this.phase = Phase.Settle;
    this.events.emit('battle-end');
    this.events.emit('refresh');
    this.events.emit('result');
  }

  /** 结算扣血：败方扣血，平局双方扣；镜像对手不受结果影响 */
  private applyResult(a: number, b: number, winner: -1 | 0 | 1, mirror: boolean): void {
    const dmgN = this.round <= CFG.EARLY_ROUNDS ? CFG.DMG_EARLY : CFG.DMG_LATE;
    const A = this.players[a], B = this.players[b];
    if (mirror) {
      if (winner === -1 || winner === 1) A.hp -= dmgN;
      return;
    }
    if (winner === -1) { A.hp -= dmgN; B.hp -= dmgN; }
    else if (winner === 0) { B.hp -= dmgN; }
    else { A.hp -= dmgN; }
  }

  /** 玩家看完战斗结算弹窗后调用：进入下一回合或终局 */
  confirmResult(): void {
    if (this.simOnly) {
      this.phase = Phase.GameOver;
      const won = this.playerResult?.won;
      if (won === true) this.events.emit('victory');
      else this.events.emit('eliminated');   // false=null(平局) 都按负展示
      return;
    }
    if (!this.me.alive) {
      this.phase = Phase.GameOver;
      this.events.emit('eliminated');   // 先弹淘汰界面，确认后由 UI 打开终局
      return;
    }
    if (this.aliveBots === 0) {
      this.phase = Phase.GameOver;
      this.events.emit('victory');
      return;
    }
    this.beginPrep();
  }

  /** 终局排名：存活优先，再按血量、战力 */
  standings(): PlayerState[] {
    return this.players.slice().sort((a, b) =>
      ((b.alive ? 1 : 0) - (a.alive ? 1 : 0)) || (b.hp - a.hp) || (b.power - a.power));
  }

  // ---------------- 商店 ----------------

  buyShopCard(uid: number): string | null {
    if (this.phase !== Phase.Prep) return '只有准备阶段可以购买';
    const me = this.me;
    const idx = me.shop.findIndex(c => c.uid === uid);
    if (idx < 0) return '商品不存在';
    if (me.gold < CFG.CARD_COST) return '金币不足';
    if (me.hand.length >= CFG.MAX_HAND) return '手牌已满，无法购买';
    me.gold -= CFG.CARD_COST;
    me.hand.push(me.shop.splice(idx, 1)[0]);
    tryMerge(me);
    this.events.emit('refresh');
    return null;
  }

  refreshShop(): string | null {
    if (this.phase !== Phase.Prep) return '只有准备阶段可以刷新';
    const me = this.me;
    if (me.gold < CFG.REFRESH_COST) return '金币不足';
    me.gold -= CFG.REFRESH_COST;
    me.shop = rollShop();
    this.events.emit('refresh');
    return null;
  }

  // ---------------- 手牌 / 棋盘操作 ----------------

  useGoldCard(uid: number): void {
    const me = this.me;
    const idx = me.hand.findIndex(c => c.uid === uid && c.kind === CardKind.Gold);
    if (idx < 0) return;
    me.hand.splice(idx, 1);
    me.gold += 1;
    this.events.emit('refresh');
  }

  /** 棋子卡上阵到手牌区以外的己方半场格子 */
  placeCard(uid: number, col: number, row: number): string | null {
    if (this.phase !== Phase.Prep) return '战斗阶段不能操作棋子';
    const me = this.me;
    if (row < CFG.OWN_ROW_MIN || row >= CFG.ROWS || col < 0 || col >= CFG.COLS) return '只能放在己方半场';
    if (!me.cellFree(col, row)) return '该格子已有棋子';
    if (me.fieldCount >= CFG.MAX_FIELD) return `场上最多 ${CFG.MAX_FIELD} 个棋子`;
    const idx = me.hand.findIndex(c => c.uid === uid && c.kind === CardKind.Piece);
    if (idx < 0) return '请拖动手牌中的棋子卡';
    me.board.push(BoardPiece.fromCard(me.hand.splice(idx, 1)[0], col, row));
    this.events.emit('refresh');
    return null;
  }

  moveBoardPiece(uid: number, col: number, row: number): string | null {
    if (this.phase !== Phase.Prep) return '战斗阶段不能操作棋子';
    const me = this.me;
    if (row < CFG.OWN_ROW_MIN || row >= CFG.ROWS || col < 0 || col >= CFG.COLS) return '只能放在己方半场';
    if (!me.cellFree(col, row)) return '该格子已有棋子';
    const p = me.board.find(b => b.uid === uid);
    if (!p) return '棋子不存在';
    p.col = col; p.row = row;
    this.events.emit('refresh');
    return null;
  }

  /** 棋子下场回到手牌 */
  returnToHand(uid: number): string | null {
    if (this.phase !== Phase.Prep) return '战斗阶段不能操作棋子';
    const me = this.me;
    const idx = me.board.findIndex(b => b.uid === uid);
    if (idx < 0) return '棋子不存在';
    if (me.hand.length >= CFG.MAX_HAND) return '手牌已满';
    const p = me.board.splice(idx, 1)[0];
    const c = Card.piece(p.type, p.star);
    me.hand.push(c);
    // 装备随棋子一起回到手牌
    for (const e of p.equips) {
      if (me.hand.length < CFG.MAX_HAND) me.hand.push(Card.equip(e));
    }
    this.events.emit('refresh');
    return null;
  }

  // ---------------- 出售 ----------------

  sellHandCard(uid: number): string | null {
    if (this.phase !== Phase.Prep) return '战斗阶段不能出售';
    const me = this.me;
    const idx = me.hand.findIndex(c => c.uid === uid);
    if (idx < 0) return '卡牌不存在';
    const card = me.hand[idx];
    if (card.kind === CardKind.Gold) return '金币卡请直接使用';
    me.gold += cardSellValue(card);
    me.hand.splice(idx, 1);
    this.events.emit('refresh');
    return null;
  }

  /** 出售棋子：装备退回手牌（手牌满则丢弃） */
  sellBoardPiece(uid: number): string | null {
    if (this.phase !== Phase.Prep) return '战斗阶段不能出售';
    const me = this.me;
    const idx = me.board.findIndex(b => b.uid === uid);
    if (idx < 0) return '棋子不存在';
    const p = me.board.splice(idx, 1)[0];
    me.gold += pieceSellValue(p);
    for (const e of p.equips) {
      if (me.hand.length < CFG.MAX_HAND) me.hand.push(Card.equip(e));
    }
    this.events.emit('refresh');
    return null;
  }

  // ---------------- 装备与合成 ----------------

  /** 把装备卡穿到棋子身上；若可与身上已有基础装备合成，则返回合成请求 */
  tryEquipCard(cardUid: number, pieceUid: number): { combine?: CombineAsk; error?: string } {
    if (this.phase !== Phase.Prep) return { error: '战斗阶段不能给棋子装备（可合成手牌装备）' };
    const me = this.me;
    const ci = me.hand.findIndex(c => c.uid === cardUid);
    if (ci < 0) return { error: '卡牌不存在' };
    const card = me.hand[ci];
    if (card.kind !== CardKind.Equip) return { error: '不是装备卡' };
    const piece = me.board.find(b => b.uid === pieceUid);
    if (!piece) return { error: '棋子不存在' };
    if (piece.equips.length >= 3) return { error: '该棋子装备槽已满（3个）' };
    if (card.equip <= EquipType.D) {
      for (const e of piece.equips) {
        const r = combineResult(card.equip, e);
        if (r !== null) {
          return { combine: { kind: 'equip', uid1: cardUid, uid2: pieceUid, withEquip: e, result: r } };
        }
      }
    }
    piece.equips.push(card.equip);
    me.hand.splice(ci, 1);
    this.events.emit('refresh');
    return {};
  }

  confirmEquipCombine(ask: CombineAsk): void {
    const me = this.me;
    const ci = me.hand.findIndex(c => c.uid === ask.uid1);
    const piece = me.board.find(b => b.uid === ask.uid2);
    if (ci < 0 || !piece) return;
    const ei = piece.equips.indexOf(ask.withEquip!);
    if (ei < 0) return;
    piece.equips.splice(ei, 1);
    piece.equips.push(ask.result);
    me.hand.splice(ci, 1);
    this.events.emit('refresh');
  }

  /** 手牌内两件基础装备叠放合成（战斗阶段也可用） */
  tryCombineHand(uid1: number, uid2: number): { combine?: CombineAsk; error?: string } {
    const me = this.me;
    const c1 = me.hand.find(c => c.uid === uid1);
    const c2 = me.hand.find(c => c.uid === uid2);
    if (!c1 || !c2 || c1 === c2) return { error: '卡牌不存在' };
    if (c1.kind !== CardKind.Equip || c2.kind !== CardKind.Equip) return { error: '只能合成装备卡' };
    const r = combineResult(c1.equip, c2.equip);
    if (r === null) return { error: '这两件装备无法合成（合成装备不可二次合成）' };
    return { combine: { kind: 'hand', uid1, uid2, result: r } };
  }

  confirmCombineHand(ask: CombineAsk): void {
    const me = this.me;
    const i1 = me.hand.findIndex(c => c.uid === ask.uid1);
    const i2 = me.hand.findIndex(c => c.uid === ask.uid2);
    if (i1 < 0 || i2 < 0) return;
    me.hand.splice(Math.max(i1, i2), 1);
    me.hand.splice(Math.min(i1, i2), 1);
    me.hand.push(Card.equip(ask.result));
    this.events.emit('refresh');
  }
}
