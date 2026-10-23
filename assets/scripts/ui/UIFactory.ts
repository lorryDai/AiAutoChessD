import { Color, EventTouch, Graphics, Label, Layers, Node, resources, Sprite, SpriteFrame, UITransform } from 'cc';
import { EquipType, PieceType } from '../data/GameTypes';
import { EQUIP, PIECE_BASE } from '../data/GameConfig';

/** 统一创建 UI_2D 层的节点 */
export function makeNode(name: string, parent: Node, w = 0, h = 0): Node {
  const n = new Node(name);
  n.layer = Layers.Enum.UI_2D;
  parent.addChild(n);
  const ut = n.addComponent(UITransform);
  ut.setContentSize(w, h);
  return n;
}

export function makeRect(name: string, parent: Node, w: number, h: number, color: Color, radius = 6): Node {
  const n = makeNode(name, parent, w, h);
  const g = n.addComponent(Graphics);
  g.fillColor = color;
  if (radius > 0) g.roundRect(-w / 2, -h / 2, w, h, radius);
  else g.rect(-w / 2, -h / 2, w, h);
  g.fill();
  return n;
}

export function makeLabel(parent: Node, text: string, size = 18, color: Color = Color.WHITE, name = 'Label'): Label {
  const n = makeNode(name, parent, 0, 0);
  const lb = n.addComponent(Label);
  lb.string = text;
  lb.fontSize = size;
  lb.lineHeight = size + 4;
  lb.color = color;
  lb.horizontalAlign = Label.HorizontalAlign.CENTER;
  lb.verticalAlign = Label.VerticalAlign.CENTER;
  lb.overflow = Label.Overflow.SHRINK;
  n.getComponent(UITransform)!.setContentSize(400, size + 8);
  return lb;
}

export function setPos(n: Node, x: number, y: number): void {
  n.setPosition(x, y, 0);
}

/** 简单点击（TOUCH_END 触发） */
export function onTap(n: Node, target: any, cb: () => void): void {
  n.on(Node.EventType.TOUCH_END, () => cb(), target);
}

export function pieceColor(t: PieceType): Color {
  const c = PIECE_BASE[t].color;
  return new Color(c[0], c[1], c[2], 255);
}

export function equipColor(e: EquipType): Color {
  if (e <= EquipType.D) return new Color(120, 84, 50, 255);   // 基础装备：棕
  return new Color(128, 90, 200, 255);                        // 合成装备：紫
}

const sfCache: Record<string, SpriteFrame | null> = {};

/** 从 resources 异步加载贴图（带缓存；加载失败时静默回退为纯色底） */
export function loadSprite(path: string, apply: (sf: SpriteFrame) => void): void {
  const hit = sfCache[path];
  if (hit) { apply(hit); return; }
  resources.load(`${path}/spriteFrame`, SpriteFrame, (err, sf) => {
    if (err) { sfCache[path] = null; return; }
    sfCache[path] = sf;
    apply(sf);
  });
}

/** 给节点挂一张异步加载的图标 */
export function addIcon(parent: Node, path: string, size: number, y = 0): void {
  const icon = makeNode('icon', parent, size, size);
  setPos(icon, 0, y);
  const sp = icon.addComponent(Sprite);
  loadSprite(path, sf => { if (icon.isValid) sp.spriteFrame = sf; });
}

/** 棋子圆形头像：AI 图标 + 类型字 + 星级 + 装备字母 */
export function makePieceNode(parent: Node, type: PieceType, star: number, equips: EquipType[], r = 34): Node {
  const n = makeNode('piece', parent, r * 2, r * 2);
  const g = n.addComponent(Graphics);
  g.fillColor = pieceColor(type);
  g.circle(0, 0, r);
  g.fill();

  addIcon(n, `textures/piece_${type}`, r * 2 - 4);

  const g2 = n.addComponent(Graphics);
  g2.strokeColor = star >= 3 ? new Color(255, 215, 0, 255) : (star === 2 ? new Color(192, 192, 192, 255) : new Color(40, 40, 40, 255));
  g2.lineWidth = star > 1 ? 4 : 2;
  g2.circle(0, 0, r);
  g2.stroke();

  const key = makeLabel(n, PIECE_BASE[type].key, 18, Color.WHITE, 'key');
  setPos(key.node, 0, -r * 0.55);

  if (star > 1) {
    const s = makeLabel(n, '★'.repeat(star), 14, new Color(255, 215, 0, 255), 'star');
    setPos(s.node, 0, r + 10);
  }
  if (equips.length > 0) {
    const eq = makeLabel(n, equips.map(e => EQUIP[e].key).join(''), 13, new Color(200, 180, 255, 255), 'equips');
    setPos(eq.node, 0, -r - 10);
  }
  return n;
}

/** 卡牌节点：棋子卡 / 装备卡 / 金币卡 */
export function makeCardNode(parent: Node, kind: 'piece' | 'equip' | 'gold', opt: { piece?: PieceType; star?: number; equip?: EquipType; w?: number; h?: number }): Node {
  const w = opt.w ?? 58, h = opt.h ?? 78;
  let bg: Color;
  if (kind === 'piece') bg = pieceColor(opt.piece!);
  else if (kind === 'equip') bg = equipColor(opt.equip!);
  else bg = new Color(218, 165, 32, 255);
  const n = makeRect('card', parent, w, h, bg, 8);

  // 边框：星级/合成装备高亮
  const g = n.addComponent(Graphics);
  g.lineWidth = 2;
  g.strokeColor = (kind === 'piece' && (opt.star ?? 1) > 1) || (kind === 'equip' && opt.equip! > EquipType.D)
    ? new Color(255, 215, 0, 255) : new Color(30, 30, 30, 255);
  g.roundRect(-w / 2, -h / 2, w, h, 8);
  g.stroke();

  if (kind === 'piece') {
    addIcon(n, `textures/piece_${opt.piece}`, w - 14, 12);
    const nm = makeLabel(n, PIECE_BASE[opt.piece!].name, 14, Color.WHITE, 'n');
    setPos(nm.node, 0, -18);
    if ((opt.star ?? 1) > 1) {
      const s = makeLabel(n, '★'.repeat(opt.star!), 12, new Color(255, 215, 0, 255), 's');
      setPos(s.node, 0, -28);
    }
  } else if (kind === 'equip') {
    const t = makeLabel(n, EQUIP[opt.equip!].key, 26, Color.WHITE, 't');
    setPos(t.node, 0, 12);
    const nm = makeLabel(n, EQUIP[opt.equip!].name, 12, Color.WHITE, 'n');
    setPos(nm.node, 0, -14);
  } else {
    const t = makeLabel(n, '+1', 24, new Color(60, 40, 0, 255), 't');
    setPos(t.node, 0, 10);
    const nm = makeLabel(n, '金币', 14, new Color(60, 40, 0, 255), 'n');
    setPos(nm.node, 0, -14);
  }
  return n;
}
