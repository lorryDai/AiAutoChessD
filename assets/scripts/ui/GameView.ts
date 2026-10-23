import { _decorator, Color, Component, EventTouch, Label, Node, UITransform, Vec2, Vec3 } from 'cc';
import { BattleResult, CombineAsk, GameManager } from '../core/GameManager';
import { CardKind, Phase } from '../data/GameTypes';
import { EQUIP, PIECE_BASE } from '../data/GameConfig';
import { BoardView } from './BoardView';
import { Dialogs } from './Dialogs';
import { HandView, HUDView, PlayersListView, ShopView } from './PanelViews';
import { makeCardNode, makeLabel, makeNode, makePieceNode, makeRect, setPos } from './UIFactory';
import { GameBoot } from './GameBoot';

const { ccclass } = _decorator;

interface DragPayload { type: 'hand' | 'board'; uid: number; }

/** 游戏主界面：装配各子视图，处理手牌/棋子的拖拽交互 */
@ccclass('GameView')
export class GameView extends Component {
  gm: GameManager = null!;
  board: BoardView = null!;
  private hud = new HUDView();
  private plist = new PlayersListView();
  private hand = new HandView();
  private shop = new ShopView();
  private dialogs = new Dialogs();
  private sellZone: Node = null!;
  private hint: Node = null!;
  private toastNode: Node = null!;
  private toastLabel: Label = null!;
  private toastTimer = 0;
  private manualStartBtn: Node | null = null;

  private drag: { payload: DragPayload; sx: number; sy: number; moved: boolean; ghost: Node | null } | null = null;

  init(gm: GameManager): void {
    this.gm = gm;

    const boardNode = makeNode('Board', this.node);
    setPos(boardNode, 0, 150);
    this.board = boardNode.addComponent(BoardView);
    this.board.build();
    this.board.attachDrag = (n, p) => this.attachDrag(n, p as DragPayload);

    this.hud.build(this.node);
    this.plist.build(this.node);

    this.hand.build(this.node);
    this.hand.attachDrag = (n, p) => this.attachDrag(n, p as DragPayload);

    this.shop.build(this.node);
    this.shop.onBuy = uid => this.toastErr(gm.buyShopCard(uid));
    this.shop.onRefresh = () => this.toastErr(gm.refreshShop());

    // 出售区
    this.sellZone = makeRect('sell', this.node, 170, 56, new Color(120, 50, 50, 255), 8);
    setPos(this.sellZone, 230, -605);
    const sl = makeLabel(this.sellZone, '拖到此处出售', 18);
    setPos(sl.node, 0, 0);
    this.hint = makeNode('hint', this.node);
    setPos(this.hint, -130, -605);
    const hl = makeLabel(this.hint, '拖卡牌上阵/装备；拖棋子回手牌区下场', 14, new Color(150, 150, 150, 255));
    setPos(hl.node, 0, 0);

    // 提示 Toast
    this.toastNode = makeRect('toast', this.node, 400, 44, new Color(0, 0, 0, 200), 8);
    setPos(this.toastNode, 0, 470);
    this.toastLabel = makeLabel(this.toastNode, '', 19, new Color(255, 230, 120, 255), 't');
    setPos(this.toastLabel.node, 0, 0);
    this.toastNode.active = false;

    this.dialogs.build(this.node);

    // 模拟战斗模式：准备阶段显示"开始战斗"按钮
    if (gm.simOnly) {
      this.manualStartBtn = makeRect('manualStart', this.node, 220, 58, new Color(200, 80, 60, 255), 10);
      setPos(this.manualStartBtn, 210, 540);
      const bl = makeLabel(this.manualStartBtn, '▶ 开始战斗', 24);
      setPos(bl.node, 0, 0);
      this.manualStartBtn.on(Node.EventType.TOUCH_END, () => gm.startManualBattle(), this);
    }

    gm.events.on('refresh', this.renderAll, this);
    gm.events.on('battle-start', this.onBattleStart, this);
    gm.events.on('result', this.onResult, this);
    gm.events.on('eliminated', this.onEliminated, this);
    gm.events.on('victory', this.onVictory, this);

    this.renderAll();
  }

  private renderAll(): void {
    const gm = this.gm;
    this.plist.render(gm);
    this.hand.render(gm.me.hand);
    this.shop.render(gm.me.shop, gm.phase);
    if (gm.phase === Phase.Prep) {
      this.board.renderPrep(gm.me.board);
    }
    this.sellZone.active = gm.phase === Phase.Prep;
    if (this.manualStartBtn) this.manualStartBtn.active = gm.simOnly && gm.phase === Phase.Prep;
  }

  private onBattleStart(): void {
    this.clearDrag();   // 阶段切换时取消进行中的拖拽，避免 ghost 残留
    this.board.enterBattle(this.gm.sim!);
    this.renderAll();
  }

  private onResult(): void {
    this.clearDrag();
    const r = this.gm.playerResult;
    if (!r) return;
    this.dialogs.showResult(r, () => this.gm.confirmResult());
  }

  private onEliminated(): void {
    const finish = () => this.dialogs.showGameOver(this.gm.standings(), false, () => this.restart());
    const r: BattleResult | null = this.gm.playerResult;
    if (r) this.dialogs.showElimination(r, finish); else finish();
  }

  private onVictory(): void {
    this.dialogs.showGameOver(this.gm.standings(), true, () => this.restart());
  }

  private restart(): void {
    if (GameBoot.inst) GameBoot.inst.restart();
  }

  update(dt: number): void {
    if (this.gm) this.hud.update(this.gm);
    if (this.toastTimer > 0) {
      this.toastTimer -= dt;
      if (this.toastTimer <= 0) this.toastNode.active = false;
    }
  }

  // ---------------- 拖拽 ----------------

  attachDrag(node: Node, payload: DragPayload): void {
    node.on(Node.EventType.TOUCH_START, (e: EventTouch) => this.onDragStart(payload, e), this);
    node.on(Node.EventType.TOUCH_MOVE, (e: EventTouch) => this.onDragMove(e), this);
    node.on(Node.EventType.TOUCH_END, (e: EventTouch) => this.onDragEnd(e), this);
    node.on(Node.EventType.TOUCH_CANCEL, (e: EventTouch) => this.onDragEnd(e), this);
  }

  private onDragStart(payload: DragPayload, e: EventTouch): void {
    const p = e.getUILocation();
    this.drag = { payload, sx: p.x, sy: p.y, moved: false, ghost: null };
  }

  private onDragMove(e: EventTouch): void {
    if (!this.drag) return;
    const p = e.getUILocation();
    if (!this.drag.moved && Math.hypot(p.x - this.drag.sx, p.y - this.drag.sy) > 12) {
      this.drag.moved = true;
      this.drag.ghost = this.makeGhost(this.drag.payload);
    }
    if (this.drag.ghost) {
      const local = this.node.getComponent(UITransform)!.convertToNodeSpaceAR(new Vec3(p.x, p.y, 0));
      setPos(this.drag.ghost, local.x, local.y);
    }
  }

  /** 取消进行中的拖拽并销毁 ghost */
  private clearDrag(): void {
    if (this.drag?.ghost) this.drag.ghost.destroy();
    this.drag = null;
  }

  private onDragEnd(e: EventTouch): void {
    if (!this.drag) return;
    const p = e.getUILocation();
    const d = this.drag;
    this.drag = null;
    if (d.ghost) d.ghost.destroy();
    if (!d.moved) this.handleTap(d.payload);
    else this.handleDrop(d.payload, p.x, p.y);
  }

  private makeGhost(payload: DragPayload): Node {
    if (payload.type === 'hand') {
      const c = this.gm.me.hand.find(x => x.uid === payload.uid);
      if (c) {
        return makeCardNode(this.node,
          c.kind === CardKind.Piece ? 'piece' : c.kind === CardKind.Equip ? 'equip' : 'gold',
          { piece: c.piece, star: c.star, equip: c.equip, w: 58, h: 80 });
      }
    } else {
      const b = this.gm.me.board.find(x => x.uid === payload.uid);
      if (b) return makePieceNode(this.node, b.type, b.star, b.equips);
    }
    return makeRect('ghost', this.node, 40, 40, new Color(200, 200, 200, 255), 6);
  }

  private handleTap(payload: DragPayload): void {
    if (payload.type === 'hand') {
      const c = this.gm.me.hand.find(x => x.uid === payload.uid);
      if (c && c.kind === CardKind.Gold) this.gm.useGoldCard(payload.uid);
    }
  }

  private handleDrop(payload: DragPayload, wx: number, wy: number): void {
    const gm = this.gm;

    // 出售区
    if (this.inRect(this.sellZone, wx, wy)) {
      this.toastErr(payload.type === 'hand' ? gm.sellHandCard(payload.uid) : gm.sellBoardPiece(payload.uid));
      return;
    }

    if (payload.type === 'hand') {
      const card = gm.me.hand.find(c => c.uid === payload.uid);
      if (!card) return;

      if (card.kind === CardKind.Piece) {
        const cell = this.board.worldToCell(wx, wy);
        if (cell) this.toastErr(gm.placeCard(card.uid, cell.col, cell.row));
        return;
      }

      if (card.kind === CardKind.Equip) {
        // 拖到棋盘棋子身上 → 穿戴（可触发合成确认）
        const piece = this.board.pieceAtWorld(gm.me.board, wx, wy);
        if (piece) {
          const r = gm.tryEquipCard(card.uid, piece.uid);
          if (r.combine) {
            const ask: CombineAsk = r.combine;
            this.dialogs.showCombine(ask,
              `装备${EQUIP[card.equip].key} + ${PIECE_BASE[piece.type].name}身上的装备${EQUIP[ask.withEquip!].key}`,
              () => gm.confirmEquipCombine(ask));
            return;
          }
          this.toastErr(r.error || null);
          return;
        }
        // 拖到手牌里另一张装备卡上 → 合成确认（战斗阶段也可用）
        const target = this.hand.cardAtWorld(gm.me.hand, wx, wy);
        if (target && target.uid !== card.uid) {
          const r = gm.tryCombineHand(card.uid, target.uid);
          if (r.combine) {
            const ask: CombineAsk = r.combine;
            this.dialogs.showCombine(ask,
              `装备${EQUIP[card.equip].key} + 装备${EQUIP[target.equip].key}`,
              () => gm.confirmCombineHand(ask));
            return;
          }
          this.toastErr(r.error || null);
        }
      }
      return;
    }

    // 棋盘上的棋子：换位置 / 拖回手牌下场
    if (payload.type === 'board') {
      if (this.inRect(this.hand.root, wx, wy)) {
        this.toastErr(gm.returnToHand(payload.uid));
        return;
      }
      const cell = this.board.worldToCell(wx, wy);
      if (cell) this.toastErr(gm.moveBoardPiece(payload.uid, cell.col, cell.row));
    }
  }

  private inRect(node: Node, wx: number, wy: number): boolean {
    if (!node.active) return false;
    const r = node.getComponent(UITransform)!.getBoundingBoxToWorld();
    return r.contains(new Vec2(wx, wy));
  }

  private toastErr(err: string | null): void {
    if (err) this.toast(err);
  }

  private toast(msg: string): void {
    this.toastLabel.string = msg;
    this.toastNode.active = true;
    this.toastTimer = 1.6;
  }
}
