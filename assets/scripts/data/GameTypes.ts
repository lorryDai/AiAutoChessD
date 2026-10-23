// 基础类型与枚举定义
export enum PieceType { A = 0, B = 1, C = 2, D = 3 }
export enum EquipType { A = 0, B = 1, C = 2, D = 3, E = 4, F = 5, G = 6, H = 7, I = 8, J = 9, K = 10, L = 11, M = 12, N = 13 }
export enum Phase { Home = 0, Matching = 1, Prep = 2, Battle = 3, Settle = 4, GameOver = 5 }
export enum CardKind { Piece = 0, Equip = 1, Gold = 2 }

let _uid = 1;

/** 手牌/商店中的一张卡牌 */
export class Card {
  uid: number;
  kind: CardKind = CardKind.Piece;
  piece: PieceType = PieceType.A;
  star = 1;
  equip: EquipType = EquipType.A;

  private constructor() { this.uid = _uid++; }

  static piece(t: PieceType, star = 1): Card {
    const c = new Card(); c.kind = CardKind.Piece; c.piece = t; c.star = star; return c;
  }
  static equip(t: EquipType): Card {
    const c = new Card(); c.kind = CardKind.Equip; c.equip = t; return c;
  }
  static gold(): Card {
    const c = new Card(); c.kind = CardKind.Gold; return c;
  }
}

/** 已上阵到棋盘的棋子 */
export class BoardPiece {
  uid: number;
  type: PieceType = PieceType.A;
  star = 1;
  equips: EquipType[] = [];
  col = 0;
  row = 0;

  constructor() { this.uid = _uid++; }

  static fromCard(c: Card, col: number, row: number): BoardPiece {
    const p = new BoardPiece();
    p.type = c.piece; p.star = c.star; p.col = col; p.row = row;
    return p;
  }
}

/** 卡牌的购买成本价值（2★=3，3★=9） */
export function cardValue(c: Card): number {
  if (c.kind === CardKind.Piece) return Math.pow(3, c.star - 1);
  if (c.kind === CardKind.Equip) return 1;
  return 0;
}

/** 出售返还：价值减半，最低 1 */
export function cardSellValue(c: Card): number {
  return Math.max(1, Math.floor(cardValue(c) / 2));
}

export function pieceSellValue(p: BoardPiece): number {
  return Math.max(1, Math.floor(Math.pow(3, p.star - 1) / 2));
}
