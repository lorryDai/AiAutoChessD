System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, BoardPiece, Card, CardKind, PieceType, CFG, _crd;

  /** 生成一版商店：上排 5 件装备 + 下排 5 个棋子，全部 1 金币 */

  /**
   * 升星：手牌 + 棋盘合计 3 个同名同星 → 1 个高一星，并返还 1 张金币卡（手牌满则丢弃）。
   * 材料含棋盘棋子时，结果落在棋盘原位（装备合并保留前 3 件，超出退回手牌）；
   * 否则结果为手牌卡。链式合成直到无可合成为止。返回是否发生了合成。
   */

  /** 机器人准备阶段 AI：买牌 → 自动升星 → 上阵（坦克前排）→ 穿装备 */

  /** 每回合配对：按血量相近两两配对；奇数人时血量最低者对战战力最近者的镜像 */

  /** 复制一方棋盘（用于开战快照/镜像对手，互不影响） */
  function rollShop() {
    const out = [];

    for (let i = 0; i < (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
      error: Error()
    }), CFG) : CFG).SHOP_SLOTS; i++) out.push((_crd && Card === void 0 ? (_reportPossibleCrUseOfCard({
      error: Error()
    }), Card) : Card).equip(Math.floor(Math.random() * 4)));

    for (let i = 0; i < (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
      error: Error()
    }), CFG) : CFG).SHOP_SLOTS; i++) out.push((_crd && Card === void 0 ? (_reportPossibleCrUseOfCard({
      error: Error()
    }), Card) : Card).piece(Math.floor(Math.random() * 4)));

    return out;
  }

  function tryMerge(p) {
    let merged = false;
    let again = true;

    while (again) {
      again = false;

      for (let t = 0; t < 4 && !again; t++) {
        for (let star = 1; star <= 2; star++) {
          const inHand = p.hand.filter(c => c.kind === (_crd && CardKind === void 0 ? (_reportPossibleCrUseOfCardKind({
            error: Error()
          }), CardKind) : CardKind).Piece && c.piece === t && c.star === star);
          const onBoard = p.board.filter(b => b.type === t && b.star === star);
          if (inHand.length + onBoard.length < 3) continue; // 材料：优先消耗棋盘棋子（结果落在棋盘），不足部分从手牌补

          const useBoard = onBoard.slice(0, 3);
          const useHand = inHand.slice(0, 3 - useBoard.length);
          const equips = [];

          for (const b of useBoard) equips.push(...b.equips); // 移除材料


          for (const c of useHand) p.hand.splice(p.hand.indexOf(c), 1);

          let slot = null;

          if (useBoard.length > 0) {
            slot = {
              col: useBoard[0].col,
              row: useBoard[0].row
            };

            for (const b of useBoard) p.board.splice(p.board.indexOf(b), 1);
          } // 生成升星结果


          if (slot) {
            const nb = new (_crd && BoardPiece === void 0 ? (_reportPossibleCrUseOfBoardPiece({
              error: Error()
            }), BoardPiece) : BoardPiece)();
            nb.type = t;
            nb.star = star + 1;
            nb.col = slot.col;
            nb.row = slot.row;
            nb.equips = equips.slice(0, 3);

            for (const e of equips.slice(3)) {
              if (p.hand.length < (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
                error: Error()
              }), CFG) : CFG).MAX_HAND) p.hand.push((_crd && Card === void 0 ? (_reportPossibleCrUseOfCard({
                error: Error()
              }), Card) : Card).equip(e)); // 超出装备退回手牌，满则丢弃
            }

            p.board.push(nb);
          } else {
            p.hand.push((_crd && Card === void 0 ? (_reportPossibleCrUseOfCard({
              error: Error()
            }), Card) : Card).piece(t, star + 1));
          }

          if (p.hand.length < (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).MAX_HAND) p.hand.push((_crd && Card === void 0 ? (_reportPossibleCrUseOfCard({
            error: Error()
          }), Card) : Card).gold()); // 升星返还金币卡，手牌满丢弃

          merged = true;
          again = true;
          break;
        }
      }
    }

    return merged;
  }

  function botPrep(bot) {
    let guard = 24;

    while (bot.gold > 0 && bot.hand.length < (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
      error: Error()
    }), CFG) : CFG).MAX_HAND && guard-- > 0) {
      bot.gold--;
      bot.hand.push(Math.random() < 0.6 ? (_crd && Card === void 0 ? (_reportPossibleCrUseOfCard({
        error: Error()
      }), Card) : Card).piece(Math.floor(Math.random() * 4)) : (_crd && Card === void 0 ? (_reportPossibleCrUseOfCard({
        error: Error()
      }), Card) : Card).equip(Math.floor(Math.random() * 4)));
      tryMerge(bot);
    } // 上阵：坦克放靠前行（贴近敌方），其余放后排，列优先中间


    while (bot.board.length < (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
      error: Error()
    }), CFG) : CFG).MAX_FIELD) {
      const idx = bot.hand.findIndex(c => c.kind === (_crd && CardKind === void 0 ? (_reportPossibleCrUseOfCardKind({
        error: Error()
      }), CardKind) : CardKind).Piece);
      if (idx < 0) break;
      const card = bot.hand[idx];
      const rows = card.piece === (_crd && PieceType === void 0 ? (_reportPossibleCrUseOfPieceType({
        error: Error()
      }), PieceType) : PieceType).A ? [4, 5, 6] : [6, 5, 4];
      const cols = [1, 2, 0, 3];
      let placed = false;

      for (const r of rows) {
        for (const c of cols) {
          if (bot.cellFree(c, r)) {
            bot.board.push((_crd && BoardPiece === void 0 ? (_reportPossibleCrUseOfBoardPiece({
              error: Error()
            }), BoardPiece) : BoardPiece).fromCard(card, c, r));
            bot.hand.splice(idx, 1);
            placed = true;
            break;
          }
        }

        if (placed) break;
      }

      if (!placed) break;
    } // 穿装备（随机分配，不做合成）


    for (const b of bot.board) {
      if (b.equips.length >= 3) continue;
      const idx = bot.hand.findIndex(c => c.kind === (_crd && CardKind === void 0 ? (_reportPossibleCrUseOfCardKind({
        error: Error()
      }), CardKind) : CardKind).Equip);
      if (idx < 0) break;
      b.equips.push(bot.hand.splice(idx, 1)[0].equip);
    }
  }

  function pairPlayers(ps) {
    const alive = ps.map((p, i) => ({
      p,
      i
    })).filter(e => e.p.alive);
    alive.sort((x, y) => y.p.hp - x.p.hp || y.p.power - x.p.power);
    const out = [];

    for (let i = 0; i + 1 < alive.length; i += 2) {
      out.push({
        a: alive[i].i,
        b: alive[i + 1].i,
        mirror: false
      });
    }

    if (alive.length % 2 === 1) {
      const left = alive[alive.length - 1];
      let best = -1,
          bd = Infinity;

      for (const e of alive) {
        if (e.i === left.i) continue;
        const d = Math.abs(e.p.power - left.p.power);

        if (d < bd) {
          bd = d;
          best = e.i;
        }
      }

      out.push({
        a: left.i,
        b: best,
        mirror: true
      });
    }

    return out;
  }

  function cloneBoard(board) {
    return board.map(b => {
      const n = new (_crd && BoardPiece === void 0 ? (_reportPossibleCrUseOfBoardPiece({
        error: Error()
      }), BoardPiece) : BoardPiece)();
      n.type = b.type;
      n.star = b.star;
      n.equips = b.equips.slice();
      n.col = b.col;
      n.row = b.row;
      return n;
    });
  }

  function _reportPossibleCrUseOfBoardPiece(extras) {
    _reporterNs.report("BoardPiece", "../data/GameTypes", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCard(extras) {
    _reporterNs.report("Card", "../data/GameTypes", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCardKind(extras) {
    _reporterNs.report("CardKind", "../data/GameTypes", _context.meta, extras);
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

  function _reportPossibleCrUseOfPlayerState(extras) {
    _reporterNs.report("PlayerState", "./Models", _context.meta, extras);
  }

  _export({
    rollShop: rollShop,
    tryMerge: tryMerge,
    botPrep: botPrep,
    pairPlayers: pairPlayers,
    cloneBoard: cloneBoard
  });

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      BoardPiece = _unresolved_2.BoardPiece;
      Card = _unresolved_2.Card;
      CardKind = _unresolved_2.CardKind;
      PieceType = _unresolved_2.PieceType;
    }, function (_unresolved_3) {
      CFG = _unresolved_3.CFG;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "67245Bawi1LNpTFslRIdm6F", "Systems", undefined);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=58ce656b445c39535ff4584ea796d20461ebb2c3.js.map