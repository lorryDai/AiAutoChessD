System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, Card, BoardPiece, _crd, PieceType, EquipType, Phase, CardKind, _uid;

  /** 卡牌的购买成本价值（2★=3，3★=9） */
  function cardValue(c) {
    if (c.kind === CardKind.Piece) return Math.pow(3, c.star - 1);
    if (c.kind === CardKind.Equip) return 1;
    return 0;
  }
  /** 出售返还：价值减半，最低 1 */


  function cardSellValue(c) {
    return Math.max(1, Math.floor(cardValue(c) / 2));
  }

  function pieceSellValue(p) {
    return Math.max(1, Math.floor(Math.pow(3, p.star - 1) / 2));
  }

  _export({
    Card: void 0,
    BoardPiece: void 0,
    cardValue: cardValue,
    cardSellValue: cardSellValue,
    pieceSellValue: pieceSellValue
  });

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ef275GmjtZCeb/JSRcK1Xxh", "GameTypes", undefined);

      // 基础类型与枚举定义
      _export("PieceType", PieceType = /*#__PURE__*/function (PieceType) {
        PieceType[PieceType["A"] = 0] = "A";
        PieceType[PieceType["B"] = 1] = "B";
        PieceType[PieceType["C"] = 2] = "C";
        PieceType[PieceType["D"] = 3] = "D";
        return PieceType;
      }({}));

      _export("EquipType", EquipType = /*#__PURE__*/function (EquipType) {
        EquipType[EquipType["A"] = 0] = "A";
        EquipType[EquipType["B"] = 1] = "B";
        EquipType[EquipType["C"] = 2] = "C";
        EquipType[EquipType["D"] = 3] = "D";
        EquipType[EquipType["E"] = 4] = "E";
        EquipType[EquipType["F"] = 5] = "F";
        EquipType[EquipType["G"] = 6] = "G";
        EquipType[EquipType["H"] = 7] = "H";
        EquipType[EquipType["I"] = 8] = "I";
        EquipType[EquipType["J"] = 9] = "J";
        EquipType[EquipType["K"] = 10] = "K";
        EquipType[EquipType["L"] = 11] = "L";
        EquipType[EquipType["M"] = 12] = "M";
        EquipType[EquipType["N"] = 13] = "N";
        return EquipType;
      }({}));

      _export("Phase", Phase = /*#__PURE__*/function (Phase) {
        Phase[Phase["Home"] = 0] = "Home";
        Phase[Phase["Matching"] = 1] = "Matching";
        Phase[Phase["Prep"] = 2] = "Prep";
        Phase[Phase["Battle"] = 3] = "Battle";
        Phase[Phase["Settle"] = 4] = "Settle";
        Phase[Phase["GameOver"] = 5] = "GameOver";
        return Phase;
      }({}));

      _export("CardKind", CardKind = /*#__PURE__*/function (CardKind) {
        CardKind[CardKind["Piece"] = 0] = "Piece";
        CardKind[CardKind["Equip"] = 1] = "Equip";
        CardKind[CardKind["Gold"] = 2] = "Gold";
        return CardKind;
      }({}));

      _uid = 1;
      /** 手牌/商店中的一张卡牌 */

      _export("Card", Card = class Card {
        constructor() {
          this.uid = void 0;
          this.kind = CardKind.Piece;
          this.piece = PieceType.A;
          this.star = 1;
          this.equip = EquipType.A;
          this.uid = _uid++;
        }

        static piece(t, star) {
          if (star === void 0) {
            star = 1;
          }

          var c = new Card();
          c.kind = CardKind.Piece;
          c.piece = t;
          c.star = star;
          return c;
        }

        static equip(t) {
          var c = new Card();
          c.kind = CardKind.Equip;
          c.equip = t;
          return c;
        }

        static gold() {
          var c = new Card();
          c.kind = CardKind.Gold;
          return c;
        }

      });
      /** 已上阵到棋盘的棋子 */


      _export("BoardPiece", BoardPiece = class BoardPiece {
        constructor() {
          this.uid = void 0;
          this.type = PieceType.A;
          this.star = 1;
          this.equips = [];
          this.col = 0;
          this.row = 0;
          this.uid = _uid++;
        }

        static fromCard(c, col, row) {
          var p = new BoardPiece();
          p.type = c.piece;
          p.star = c.star;
          p.col = col;
          p.row = row;
          return p;
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=f94f490789706df9469d4e33779c28aaf35e59f9.js.map