import { BoardPiece, Card } from '../data/GameTypes';
import { CFG, PIECE_BASE, STAR_MUL } from '../data/GameConfig';

/** 一名玩家（真人或机器人）的全部状态 */
export class PlayerState {
  name = '';
  isBot = true;
  alive = true;
  hp = CFG.START_HP;
  gold = 0;
  hand: Card[] = [];          // 备战席（手牌），棋子卡/装备卡/金币卡共用
  board: BoardPiece[] = [];   // 已上阵棋子
  shop: Card[] = [];          // 当前商店 10 格

  get fieldCount(): number { return this.board.length; }

  cellFree(col: number, row: number): boolean {
    return !this.board.some(b => b.col === col && b.row === row);
  }

  /** 战力评估（用于镜像配对与机器人参考） */
  get power(): number {
    let p = 0;
    for (const b of this.board) {
      const s = PIECE_BASE[b.type];
      p += (s.hp + s.atk * 8 + s.def * 6) * STAR_MUL[b.star - 1];
    }
    return Math.round(p);
  }

  /** 最终装备摘要（结算界面展示用） */
  equipSummary(): string {
    const parts: string[] = [];
    for (const b of this.board) {
      if (b.equips.length > 0) parts.push(`${PIECE_BASE[b.type].name}[${b.equips.map(e => 'ABCDEFGHIJ'[e]).join('')}]`);
    }
    return parts.length > 0 ? parts.join(' ') : '无';
  }
}
