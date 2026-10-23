System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, CFG, PIECE_BASE, STAR_MUL, PlayerState, _crd;

  function _reportPossibleCrUseOfBoardPiece(extras) {
    _reporterNs.report("BoardPiece", "../data/GameTypes", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCard(extras) {
    _reporterNs.report("Card", "../data/GameTypes", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCFG(extras) {
    _reporterNs.report("CFG", "../data/GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPIECE_BASE(extras) {
    _reporterNs.report("PIECE_BASE", "../data/GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSTAR_MUL(extras) {
    _reporterNs.report("STAR_MUL", "../data/GameConfig", _context.meta, extras);
  }

  _export("PlayerState", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      CFG = _unresolved_2.CFG;
      PIECE_BASE = _unresolved_2.PIECE_BASE;
      STAR_MUL = _unresolved_2.STAR_MUL;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d857dfrS/hNg5d1WzcYZYH2", "Models", undefined);

      /** 一名玩家（真人或机器人）的全部状态 */
      _export("PlayerState", PlayerState = class PlayerState {
        constructor() {
          this.name = '';
          this.isBot = true;
          this.alive = true;
          this.hp = (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).START_HP;
          this.gold = 0;
          this.hand = [];
          // 备战席（手牌），棋子卡/装备卡/金币卡共用
          this.board = [];
          // 已上阵棋子
          this.shop = [];
        }

        // 当前商店 10 格
        get fieldCount() {
          return this.board.length;
        }

        cellFree(col, row) {
          return !this.board.some(b => b.col === col && b.row === row);
        }
        /** 战力评估（用于镜像配对与机器人参考） */


        get power() {
          var p = 0;

          for (var b of this.board) {
            var s = (_crd && PIECE_BASE === void 0 ? (_reportPossibleCrUseOfPIECE_BASE({
              error: Error()
            }), PIECE_BASE) : PIECE_BASE)[b.type];
            p += (s.hp + s.atk * 8 + s.def * 6) * (_crd && STAR_MUL === void 0 ? (_reportPossibleCrUseOfSTAR_MUL({
              error: Error()
            }), STAR_MUL) : STAR_MUL)[b.star - 1];
          }

          return Math.round(p);
        }
        /** 最终装备摘要（结算界面展示用） */


        equipSummary() {
          var parts = [];

          for (var b of this.board) {
            if (b.equips.length > 0) parts.push((_crd && PIECE_BASE === void 0 ? (_reportPossibleCrUseOfPIECE_BASE({
              error: Error()
            }), PIECE_BASE) : PIECE_BASE)[b.type].name + "[" + b.equips.map(e => 'ABCDEFGHIJ'[e]).join('') + "]");
          }

          return parts.length > 0 ? parts.join(' ') : '无';
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=2b85b34e13f191c696161aded57bf650e0a07a79.js.map