import { _decorator, Color, Component, Graphics, Label, Node, UIOpacity, UITransform, Vec3, tween } from 'cc';
import { BoardPiece } from '../data/GameTypes';
import { CFG } from '../data/GameConfig';
import { BattleSim, BattleUnit } from '../core/Battle';
import { makeLabel, makeNode, makePieceNode, makeRect, setPos } from './UIFactory';

const { ccclass } = _decorator;

interface UnitView {
  node: Node;
  hpFill: Node;
  manaFill: Node;
  hpText: Label;
  op: UIOpacity;
  lungeT: number; lungeX: number; lungeY: number;
  flashT: number;
}

/** 棋盘视图：准备阶段渲染我方棋子（可拖拽），战斗阶段渲染双方战斗演出 */
@ccclass('BoardView')
export class BoardView extends Component {
  static CELL = 84;

  pieceRoot: Node = null!;
  sim: BattleSim | null = null;
  unitViews = new Map<BattleUnit, UnitView>();

  /** 由 GameView 注入：给棋子节点挂上拖拽 */
  attachDrag: ((node: Node, payload: { type: string; uid: number }) => void) | null = null;

  build(): void {
    const W = CFG.COLS * BoardView.CELL, H = CFG.ROWS * BoardView.CELL;
    this.node.getComponent(UITransform)!.setContentSize(W, H);

    const grid = makeNode('grid', this.node, W, H);
    const g = grid.addComponent(Graphics);
    for (let r = 0; r < CFG.ROWS; r++) {
      for (let c = 0; c < CFG.COLS; c++) {
        const own = r >= CFG.OWN_ROW_MIN;
        g.fillColor = own ? new Color(40, 56, 46, 255) : new Color(58, 42, 42, 255);
        const p = this.cellToLocal(c, r);
        g.rect(p.x - 40, p.y - 40, 80, 80);
        g.fill();
      }
    }
    // 中线
    g.fillColor = new Color(200, 200, 200, 120);
    g.rect(-W / 2, -1, W, 2);
    g.fill();

    this.pieceRoot = makeNode('pieces', this.node, W, H);
  }

  cellToLocal(col: number, row: number): { x: number; y: number } {
    return { x: (col - (CFG.COLS - 1) / 2) * BoardView.CELL, y: ((CFG.ROWS - 1) / 2 - row) * BoardView.CELL };
  }

  /** 世界/UI 坐标 → 棋盘格子；越界返回 null */
  worldToCell(wx: number, wy: number): { col: number; row: number } | null {
    const ut = this.node.getComponent(UITransform)!;
    const local = ut.convertToNodeSpaceAR(new Vec3(wx, wy, 0));
    const col = Math.round(local.x / BoardView.CELL + (CFG.COLS - 1) / 2);
    const row = Math.round((CFG.ROWS - 1) / 2 - local.y / BoardView.CELL);
    if (col < 0 || col >= CFG.COLS || row < 0 || row >= CFG.ROWS) return null;
    return { col, row };
  }

  /** 某 UI 坐标处是否有我方棋子（用于装备拖放目标判定） */
  pieceAtWorld(board: BoardPiece[], wx: number, wy: number): BoardPiece | null {
    const cell = this.worldToCell(wx, wy);
    if (!cell) return null;
    return board.find(b => b.col === cell.col && b.row === cell.row) || null;
  }

  // ---------------- 准备阶段 ----------------

  renderPrep(board: BoardPiece[]): void {
    this.sim = null;
    this.unitViews.clear();
    this.pieceRoot.removeAllChildren();
    for (const p of board) {
      const n = makePieceNode(this.pieceRoot, p.type, p.star, p.equips);
      const pos = this.cellToLocal(p.col, p.row);
      setPos(n, pos.x, pos.y);
      if (this.attachDrag) this.attachDrag(n, { type: 'board', uid: p.uid });
    }
  }

  // ---------------- 战斗演出 ----------------

  enterBattle(sim: BattleSim): void {
    this.sim = sim;
    this.unitViews.clear();
    this.pieceRoot.removeAllChildren();
    for (const u of sim.units) {
      const n = makePieceNode(this.pieceRoot, u.type, u.star, u.equips, 30);
      // 敌方棋子加红圈
      if (u.side === 1) {
        const g = n.addComponent(Graphics);
        g.strokeColor = new Color(255, 60, 60, 255);
        g.lineWidth = 3;
        g.circle(0, 0, 33);
        g.stroke();
      }
      // 血条
      const barBg = makeNode('hpbg', n, 56, 6);
      const bg = barBg.addComponent(Graphics);
      bg.fillColor = new Color(20, 20, 20, 255);
      bg.rect(-28, -3, 56, 6);
      bg.fill();
      setPos(barBg, 0, 44);

      const fill = makeNode('hpfill', barBg, 54, 4);
      fill.getComponent(UITransform)!.setAnchorPoint(0, 0.5);
      const fg = fill.addComponent(Graphics);
      fg.fillColor = u.side === 0 ? new Color(80, 220, 100, 255) : new Color(230, 70, 70, 255);
      fg.rect(0, -2, 54, 4);
      fg.fill();
      setPos(fill, -27, 0);

      // 蓝条
      const manaBg = makeNode('manabg', n, 56, 4);
      const mg = manaBg.addComponent(Graphics);
      mg.fillColor = new Color(20, 20, 20, 255);
      mg.rect(-28, -2, 56, 4);
      mg.fill();
      setPos(manaBg, 0, 37);

      const manaFill = makeNode('manafill', manaBg, 54, 2);
      manaFill.getComponent(UITransform)!.setAnchorPoint(0, 0.5);
      const mf = manaFill.addComponent(Graphics);
      mf.fillColor = new Color(60, 130, 255, 255);
      mf.rect(0, -1, 54, 2);
      mf.fill();
      setPos(manaFill, -27, 0);

      // HP 数值
      const hpText = makeLabel(n, '', 11, Color.WHITE, 'hptext');
      setPos(hpText.node, 0, 55);

      const op = n.addComponent(UIOpacity);
      this.unitViews.set(u, { node: n, hpFill: fill, manaFill, hpText, op, lungeT: 0, lungeX: 0, lungeY: 0, flashT: 0 });
    }
  }

  exitBattle(): void {
    this.sim = null;
    this.unitViews.clear();
  }

  update(dt: number): void {
    if (!this.sim) return;
    this.drainEvents();
    for (const [u, v] of this.unitViews) {
      if (!u.alive) { v.node.active = false; continue; }
      // 基础位置
      let px = (u.x - (CFG.COLS - 1) / 2) * BoardView.CELL;
      let py = ((CFG.ROWS - 1) / 2 - u.y) * BoardView.CELL;
      // 攻击前冲偏移
      if (v.lungeT > 0) {
        v.lungeT -= dt;
        const k = Math.sin(Math.max(0, v.lungeT) / 0.18 * Math.PI) * 10;
        px += v.lungeX * k;
        py += v.lungeY * k;
      }
      setPos(v.node, px, py);
      // 受击闪烁
      if (v.flashT > 0) {
        v.flashT -= dt;
        v.op.opacity = 110 + 145 * (1 - Math.max(0, v.flashT) / 0.2);
      } else if (v.op.opacity !== 255) {
        v.op.opacity = 255;
      }
      // 血条 / 蓝条 / HP 文字
      v.hpFill.setScale(Math.max(0, u.hp / u.maxHp), 1, 1);
      v.manaFill.setScale(Math.max(0, Math.min(1, u.mana / u.maxMana)), 1, 1);
      v.hpText.string = `${Math.ceil(u.hp)}/${Math.ceil(u.maxHp)}`;
    }
  }

  private drainEvents(): void {
    const sim = this.sim!;
    if (sim.events.length === 0) return;
    const list = sim.events.splice(0, sim.events.length);
    for (const ev of list) {
      const v = this.unitViews.get(ev.u);
      if (ev.type === 'attack') {
        const tv = ev.t ? this.unitViews.get(ev.t) : null;
        if (v && tv) {
          const dx = tv.node.position.x - v.node.position.x;
          const dy = tv.node.position.y - v.node.position.y;
          const len = Math.hypot(dx, dy) || 1;
          v.lungeX = dx / len; v.lungeY = dy / len; v.lungeT = 0.18;
          if (ev.u.range > 1) this.spawnProjectile(v.node.position, tv.node.position);
        }
      } else if (ev.type === 'hurt' && v) {
        v.flashT = 0.2;
        this.floatText(v.node.position, `-${ev.val ?? 0}`, new Color(255, 90, 90, 255));
      } else if (ev.type === 'heal' && v) {
        this.floatText(v.node.position, `+${ev.val ?? 0}`, new Color(81, 224, 108, 255));
      } else if (ev.type === 'skill' && v) {
        this.shout(v.node.position);
      }
    }
  }

  private floatText(pos: Vec3, str: string, color: Color): void {
    const lb = makeLabel(this.pieceRoot, str, 20, color, 'ft');
    setPos(lb.node, pos.x + (Math.random() * 16 - 8), pos.y + 44);
    const op = lb.node.addComponent(UIOpacity);
    tween(lb.node).to(0.6, { position: new Vec3(pos.x, pos.y + 84, 0) }).start();
    tween(op).delay(0.35).to(0.25, { opacity: 0 }).call(() => lb.node.destroy()).start();
  }

  private shout(pos: Vec3): void {
    const lb = makeLabel(this.pieceRoot, '大招!', 26, new Color(255, 215, 94, 255), 'shout');
    setPos(lb.node, pos.x, pos.y + 64);
    lb.node.setScale(0.4, 0.4, 1);
    const op = lb.node.addComponent(UIOpacity);
    tween(lb.node).to(0.12, { scale: new Vec3(1.15, 1.15, 1) }).to(0.08, { scale: new Vec3(1, 1, 1) }).start();
    tween(op).delay(0.55).to(0.2, { opacity: 0 }).call(() => lb.node.destroy()).start();
  }

  private spawnProjectile(from: Vec3, to: Vec3): void {
    const p = makeRect('proj', this.pieceRoot, 12, 12, new Color(255, 224, 138, 255), 6);
    setPos(p, from.x, from.y);
    tween(p).to(0.12, { position: new Vec3(to.x, to.y, 0) }).call(() => p.destroy()).start();
  }
}
