import { Color, Label, Node, UITransform, Vec3 } from 'cc';
import { GameManager } from '../core/GameManager';
import { Card, CardKind, Phase } from '../data/GameTypes';
import { CFG } from '../data/GameConfig';
import { PlayerState } from '../core/Models';
import { makeCardNode, makeLabel, makeNode, makeRect, onTap, setPos } from './UIFactory';

/** 顶部信息栏：回合 / 阶段 / 倒计时 / 金币 / HP / 对手信息 */
export class HUDView {
  root!: Node;
  private lbRound!: Label; private lbPhase!: Label; private lbTimer!: Label;
  private lbGold!: Label; private lbHp!: Label; private lbOpp!: Label;

  build(parent: Node): void {
    this.root = makeNode('HUD', parent);
    setPos(this.root, 0, 600);
    makeRect('bg', this.root, 720, 70, new Color(30, 32, 40, 255), 0);

    this.lbRound = makeLabel(this.root, '', 22, Color.WHITE, 'round'); setPos(this.lbRound.node, -300, 0);
    this.lbPhase = makeLabel(this.root, '', 22, new Color(255, 220, 120, 255), 'phase'); setPos(this.lbPhase.node, -160, 0);
    this.lbTimer = makeLabel(this.root, '', 26, new Color(120, 220, 255, 255), 'timer'); setPos(this.lbTimer.node, -20, 0);
    this.lbGold = makeLabel(this.root, '', 22, new Color(255, 215, 0, 255), 'gold'); setPos(this.lbGold.node, 140, 0);
    this.lbHp = makeLabel(this.root, '', 22, new Color(255, 120, 120, 255), 'hp'); setPos(this.lbHp.node, 300, 0);

    this.lbOpp = makeLabel(parent, '', 18, new Color(255, 170, 170, 255), 'opp');
    setPos(this.lbOpp.node, 0, 552);
  }

  update(gm: GameManager): void {
    this.lbRound.string = gm.simOnly ? '模拟战斗' : `回合 ${gm.round}`;
    this.lbPhase.string = gm.phase === Phase.Prep ? '准备阶段' : gm.phase === Phase.Battle ? '战斗阶段' : '';
    if (gm.phase === Phase.Prep) {
      if (gm.simOnly) {
        this.lbTimer.string = '准备就绪 · 点击开战';
        this.lbTimer.color = new Color(255, 180, 120, 255);
      } else {
        this.lbTimer.string = `${Math.ceil(gm.timer)}s`;
        this.lbTimer.color = new Color(120, 220, 255, 255);
      }
    } else if (gm.phase === Phase.Battle && gm.sim) {
      const t = Math.floor(gm.sim.time);
      this.lbTimer.string = gm.sim.time >= CFG.SPEEDUP_AT ? `${t}s 加速中` : `${t}s`;
      this.lbTimer.color = new Color(120, 220, 255, 255);
    } else {
      this.lbTimer.string = '';
    }
    this.lbGold.string = `金币 ${gm.me.gold}`;
    this.lbHp.string = `HP ${gm.me.hp}`;
    this.lbOpp.string = (gm.phase === Phase.Battle || gm.phase === Phase.Settle) && gm.opp
      ? `对手：${gm.opp.name}  HP ${gm.opp.hp}` : '';
  }
}

/** 右侧玩家列表：8 人血量一览 */
export class PlayersListView {
  root!: Node;
  private rows: { bg: Node; lb: Label; idx: number }[] = [];

  build(parent: Node): void {
    this.root = makeNode('PlayersList', parent);
    setPos(this.root, 292, 480);
    const title = makeLabel(this.root, '玩家', 16, new Color(180, 180, 180, 255));
    setPos(title.node, 0, 18);
    for (let i = 0; i < 8; i++) {
      const row = makeNode(`row${i}`, this.root);
      setPos(row, 0, -14 - i * 34);
      const bg = makeRect('bg', row, 130, 30, new Color(36, 38, 48, 255), 4);
      const lb = makeLabel(row, '', 15, Color.WHITE, 'lb');
      this.rows.push({ bg, lb, idx: i });
    }
  }

  render(gm: GameManager): void {
    for (let i = 0; i < this.rows.length; i++) {
      const p: PlayerState | undefined = gm.players[i];
      const r = this.rows[i];
      if (!p) { r.lb.string = ''; continue; }
      r.lb.string = p.alive ? `${p.name} HP${p.hp}` : `${p.name} 淘汰`;
      r.lb.color = p.alive ? (p.isBot ? Color.WHITE : new Color(120, 220, 255, 255)) : new Color(120, 120, 120, 255);
    }
  }
}

/** 备战席（手牌）：10 格，棋子卡/装备卡/金币卡共用 */
export class HandView {
  root!: Node;
  cardRoot!: Node;
  attachDrag: ((node: Node, payload: { type: string; uid: number }) => void) | null = null;

  static SLOT_W = 64;

  build(parent: Node): void {
    this.root = makeNode('Hand', parent);
    setPos(this.root, 0, -262);
    this.root.getComponent(UITransform)!.setContentSize(668, 100);   // 供“棋子拖回手牌区”命中判定
    makeRect('bg', this.root, 668, 100, new Color(28, 30, 38, 255), 8);
    for (let i = 0; i < CFG.MAX_HAND; i++) {
      const slot = makeRect(`slot${i}`, this.root, 60, 84, new Color(45, 48, 60, 255), 6);
      setPos(slot, (i - (CFG.MAX_HAND - 1) / 2) * HandView.SLOT_W, 0);
    }
    this.cardRoot = makeNode('cards', this.root);
  }

  render(cards: Card[]): void {
    this.cardRoot.removeAllChildren();
    for (let i = 0; i < cards.length; i++) {
      const c = cards[i];
      const n = makeCardNode(this.cardRoot,
        c.kind === CardKind.Piece ? 'piece' : c.kind === CardKind.Equip ? 'equip' : 'gold',
        { piece: c.piece, star: c.star, equip: c.equip, w: 58, h: 80 });
      setPos(n, (i - (CFG.MAX_HAND - 1) / 2) * HandView.SLOT_W, 0);
      if (this.attachDrag) this.attachDrag(n, { type: 'hand', uid: c.uid });
    }
  }

  /** UI 坐标命中的手牌（用于装备卡叠放合成） */
  cardAtWorld(cards: Card[], wx: number, wy: number): Card | null {
    const v = new Vec3();
    const nodes = this.cardRoot.children;
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].getWorldPosition(v);
      if (Math.abs(wx - v.x) < 30 && Math.abs(wy - v.y) < 42) return cards[i] || null;
    }
    return null;
  }
}

/** 商店：上排 5 件装备，下排 5 个棋子，点选购买 */
export class ShopView {
  root!: Node;
  private equipRow!: Node;
  private pieceRow!: Node;
  private battleMask!: Node;
  onBuy: ((uid: number) => void) | null = null;
  onRefresh: (() => void) | null = null;

  build(parent: Node): void {
    this.root = makeNode('Shop', parent);
    setPos(this.root, 0, -442);
    makeRect('bg', this.root, 470, 260, new Color(28, 30, 38, 255), 8);

    const title = makeLabel(this.root, '商店（全部 1 金币）', 16, new Color(200, 200, 200, 255));
    setPos(title.node, -130, 108);

    const btn = makeRect('refresh', this.root, 120, 40, new Color(70, 110, 200, 255), 6);
    setPos(btn, 150, 108);
    const bl = makeLabel(btn, '刷新 -1金', 17);
    setPos(bl.node, 0, 0);
    onTap(btn, this, () => { if (this.onRefresh) this.onRefresh(); });

    const eqTag = makeLabel(this.root, '装备', 14, new Color(200, 160, 120, 255));
    setPos(eqTag.node, -200, 48);
    const pcTag = makeLabel(this.root, '棋子', 14, new Color(160, 200, 255, 255));
    setPos(pcTag.node, -200, -62);

    this.equipRow = makeNode('equips', this.root); setPos(this.equipRow, 10, 40);
    this.pieceRow = makeNode('pieces', this.root); setPos(this.pieceRow, 10, -70);

    // 战斗阶段遮罩（仅提示，购买操作由 GameManager 拦截）
    this.battleMask = makeRect('mask', this.root, 470, 260, new Color(0, 0, 0, 180), 8);
    const ml = makeLabel(this.battleMask, '战斗中（手牌装备可拖放合成）', 20);
    setPos(ml.node, 0, 0);
    this.battleMask.active = false;
  }

  render(shop: Card[], phase: Phase): void {
    this.battleMask.active = phase !== Phase.Prep;
    this.equipRow.removeAllChildren();
    this.pieceRow.removeAllChildren();
    let ei = 0, pi = 0;
    for (const c of shop) {
      if (c.kind === CardKind.Equip) {
        const n = makeCardNode(this.equipRow, 'equip', { equip: c.equip, w: 76, h: 92 });
        setPos(n, (ei - 2) * 86, 0);
        onTap(n, this, () => { if (this.onBuy) this.onBuy(c.uid); });
        ei++;
      } else if (c.kind === CardKind.Piece) {
        const n = makeCardNode(this.pieceRow, 'piece', { piece: c.piece, star: c.star, w: 76, h: 92 });
        setPos(n, (pi - 2) * 86, 0);
        onTap(n, this, () => { if (this.onBuy) this.onBuy(c.uid); });
        pi++;
      }
    }
  }
}
