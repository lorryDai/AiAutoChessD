System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, EventTarget, BoardPiece, Card, CardKind, EquipType, Phase, cardSellValue, pieceSellValue, CFG, combineResult, PlayerState, BattleSim, botPrep, cloneBoard, pairPlayers, rollShop, tryMerge, _dec, _class, _class2, _crd, ccclass, GameManager;

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

  function _reportPossibleCrUseOfPhase(extras) {
    _reporterNs.report("Phase", "../data/GameTypes", _context.meta, extras);
  }

  function _reportPossibleCrUseOfcardSellValue(extras) {
    _reporterNs.report("cardSellValue", "../data/GameTypes", _context.meta, extras);
  }

  function _reportPossibleCrUseOfpieceSellValue(extras) {
    _reporterNs.report("pieceSellValue", "../data/GameTypes", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCFG(extras) {
    _reporterNs.report("CFG", "../data/GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfcombineResult(extras) {
    _reporterNs.report("combineResult", "../data/GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPlayerState(extras) {
    _reporterNs.report("PlayerState", "./Models", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBattleSim(extras) {
    _reporterNs.report("BattleSim", "./Battle", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBattleStatLine(extras) {
    _reporterNs.report("BattleStatLine", "./Battle", _context.meta, extras);
  }

  function _reportPossibleCrUseOfbotPrep(extras) {
    _reporterNs.report("botPrep", "./Systems", _context.meta, extras);
  }

  function _reportPossibleCrUseOfcloneBoard(extras) {
    _reporterNs.report("cloneBoard", "./Systems", _context.meta, extras);
  }

  function _reportPossibleCrUseOfpairPlayers(extras) {
    _reporterNs.report("pairPlayers", "./Systems", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPairing(extras) {
    _reporterNs.report("Pairing", "./Systems", _context.meta, extras);
  }

  function _reportPossibleCrUseOfrollShop(extras) {
    _reporterNs.report("rollShop", "./Systems", _context.meta, extras);
  }

  function _reportPossibleCrUseOftryMerge(extras) {
    _reporterNs.report("tryMerge", "./Systems", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      EventTarget = _cc.EventTarget;
    }, function (_unresolved_2) {
      BoardPiece = _unresolved_2.BoardPiece;
      Card = _unresolved_2.Card;
      CardKind = _unresolved_2.CardKind;
      EquipType = _unresolved_2.EquipType;
      Phase = _unresolved_2.Phase;
      cardSellValue = _unresolved_2.cardSellValue;
      pieceSellValue = _unresolved_2.pieceSellValue;
    }, function (_unresolved_3) {
      CFG = _unresolved_3.CFG;
      combineResult = _unresolved_3.combineResult;
    }, function (_unresolved_4) {
      PlayerState = _unresolved_4.PlayerState;
    }, function (_unresolved_5) {
      BattleSim = _unresolved_5.BattleSim;
    }, function (_unresolved_6) {
      botPrep = _unresolved_6.botPrep;
      cloneBoard = _unresolved_6.cloneBoard;
      pairPlayers = _unresolved_6.pairPlayers;
      rollShop = _unresolved_6.rollShop;
      tryMerge = _unresolved_6.tryMerge;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "90f9bdHdshP9rcRwB8As215", "GameManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'EventTarget']);

      ({
        ccclass
      } = _decorator);

      /** 游戏总控：阶段流转、经济、商店、上阵、装备合成、配对与结算 */
      _export("GameManager", GameManager = (_dec = ccclass('GameManager'), _dec(_class = (_class2 = class GameManager extends Component {
        constructor() {
          super(...arguments);
          this.events = new EventTarget();
          this.players = [];
          this.phase = (_crd && Phase === void 0 ? (_reportPossibleCrUseOfPhase({
            error: Error()
          }), Phase) : Phase).Home;
          this.round = 0;
          this.timer = 0;
          this.sim = null;
          this.pairings = [];
          this.playerResult = null;
          this._oppIdx = -1;
          this._oppMirror = false;
        }

        onLoad() {
          GameManager.inst = this;
        }

        get me() {
          return this.players[0];
        }

        get opp() {
          return this._oppIdx >= 0 ? this.players[this._oppIdx] : null;
        }

        get aliveBots() {
          return this.players.filter(p => p.alive && p.isBot).length;
        }

        newMatch(count) {
          if (count === void 0) {
            count = 8;
          }

          this.players = [];

          for (var i = 0; i < count; i++) {
            var p = new (_crd && PlayerState === void 0 ? (_reportPossibleCrUseOfPlayerState({
              error: Error()
            }), PlayerState) : PlayerState)();
            p.name = i === 0 ? '你' : (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).BOT_NAMES[i - 1];
            p.isBot = i !== 0;
            p.hp = (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).START_HP;
            this.players.push(p);
          }

          this.round = 0;
        } // ---------------- 阶段流转 ----------------


        beginPrep() {
          this.round++;
          this.phase = (_crd && Phase === void 0 ? (_reportPossibleCrUseOfPhase({
            error: Error()
          }), Phase) : Phase).Prep;
          this.timer = (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).PREP_TIME;
          this.sim = null;
          this.playerResult = null;

          for (var p of this.players) {
            if (!p.alive) continue;
            p.gold += (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).ROUND_GOLD;
            p.shop = (_crd && rollShop === void 0 ? (_reportPossibleCrUseOfrollShop({
              error: Error()
            }), rollShop) : rollShop)(); // 每回合自动免费刷新一次
          }

          for (var _p of this.players) if (_p.alive && _p.isBot) (_crd && botPrep === void 0 ? (_reportPossibleCrUseOfbotPrep({
            error: Error()
          }), botPrep) : botPrep)(_p);

          this.events.emit('refresh');
          this.events.emit('phase');
        }

        beginBattle() {
          this.phase = (_crd && Phase === void 0 ? (_reportPossibleCrUseOfPhase({
            error: Error()
          }), Phase) : Phase).Battle;
          this.pairings = (_crd && pairPlayers === void 0 ? (_reportPossibleCrUseOfpairPlayers({
            error: Error()
          }), pairPlayers) : pairPlayers)(this.players);
          var mine = this.pairings.find(pr => pr.a === 0 || pr.b === 0) || null;
          this._oppIdx = mine ? mine.a === 0 ? mine.b : mine.a : -1;
          this._oppMirror = mine ? mine.mirror : false; // 机器人之间的对局：瞬间结算

          for (var pr of this.pairings) {
            if (mine && pr.a === mine.a && pr.b === mine.b) continue;
            var sim = new (_crd && BattleSim === void 0 ? (_reportPossibleCrUseOfBattleSim({
              error: Error()
            }), BattleSim) : BattleSim)((_crd && cloneBoard === void 0 ? (_reportPossibleCrUseOfcloneBoard({
              error: Error()
            }), cloneBoard) : cloneBoard)(this.players[pr.a].board), (_crd && cloneBoard === void 0 ? (_reportPossibleCrUseOfcloneBoard({
              error: Error()
            }), cloneBoard) : cloneBoard)(this.players[pr.b].board));
            sim.fastForward();
            this.applyResult(pr.a, pr.b, sim.winner, pr.mirror);
          } // 玩家场次：实时演出


          var oppState = this.opp;
          this.sim = new (_crd && BattleSim === void 0 ? (_reportPossibleCrUseOfBattleSim({
            error: Error()
          }), BattleSim) : BattleSim)((_crd && cloneBoard === void 0 ? (_reportPossibleCrUseOfcloneBoard({
            error: Error()
          }), cloneBoard) : cloneBoard)(this.me.board), (_crd && cloneBoard === void 0 ? (_reportPossibleCrUseOfcloneBoard({
            error: Error()
          }), cloneBoard) : cloneBoard)(oppState ? oppState.board : []));
          this.events.emit('battle-start');
          this.events.emit('refresh');
        }

        update(dt) {
          if (this.phase === (_crd && Phase === void 0 ? (_reportPossibleCrUseOfPhase({
            error: Error()
          }), Phase) : Phase).Prep) {
            this.timer -= dt;

            if (this.timer <= 0) {
              this.timer = 0;
              this.beginBattle();
            }
          } else if (this.phase === (_crd && Phase === void 0 ? (_reportPossibleCrUseOfPhase({
            error: Error()
          }), Phase) : Phase).Battle && this.sim) {
            this.sim.update(dt);
            if (this.sim.finished) this.settleBattle();
          }
        }

        settleBattle() {
          var w = this.sim.winner;
          var oppState = this.opp;
          this.playerResult = {
            won: w === -1 ? null : w === 0,
            stats: this.sim.stats(),
            oppName: (oppState ? oppState.name : '未知') + (this._oppMirror ? '(镜像)' : ''),
            mirror: this._oppMirror,
            round: this.round
          };
          this.applyResult(0, this._oppIdx, w, this._oppMirror);

          for (var p of this.players) if (p.alive && p.hp <= 0) {
            p.hp = 0;
            p.alive = false;
          }

          this.phase = (_crd && Phase === void 0 ? (_reportPossibleCrUseOfPhase({
            error: Error()
          }), Phase) : Phase).Settle;
          this.events.emit('battle-end');
          this.events.emit('refresh');
          this.events.emit('result');
        }
        /** 结算扣血：败方扣血，平局双方扣；镜像对手不受结果影响 */


        applyResult(a, b, winner, mirror) {
          var dmgN = this.round <= (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).EARLY_ROUNDS ? (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).DMG_EARLY : (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).DMG_LATE;
          var A = this.players[a],
              B = this.players[b];

          if (mirror) {
            if (winner === -1 || winner === 1) A.hp -= dmgN;
            return;
          }

          if (winner === -1) {
            A.hp -= dmgN;
            B.hp -= dmgN;
          } else if (winner === 0) {
            B.hp -= dmgN;
          } else {
            A.hp -= dmgN;
          }
        }
        /** 玩家看完战斗结算弹窗后调用：进入下一回合或终局 */


        confirmResult() {
          if (!this.me.alive) {
            this.phase = (_crd && Phase === void 0 ? (_reportPossibleCrUseOfPhase({
              error: Error()
            }), Phase) : Phase).GameOver;
            this.events.emit('eliminated'); // 先弹淘汰界面，确认后由 UI 打开终局

            return;
          }

          if (this.aliveBots === 0) {
            this.phase = (_crd && Phase === void 0 ? (_reportPossibleCrUseOfPhase({
              error: Error()
            }), Phase) : Phase).GameOver;
            this.events.emit('victory');
            return;
          }

          this.beginPrep();
        }
        /** 终局排名：存活优先，再按血量、战力 */


        standings() {
          return this.players.slice().sort((a, b) => (b.alive ? 1 : 0) - (a.alive ? 1 : 0) || b.hp - a.hp || b.power - a.power);
        } // ---------------- 商店 ----------------


        buyShopCard(uid) {
          if (this.phase !== (_crd && Phase === void 0 ? (_reportPossibleCrUseOfPhase({
            error: Error()
          }), Phase) : Phase).Prep) return '只有准备阶段可以购买';
          var me = this.me;
          var idx = me.shop.findIndex(c => c.uid === uid);
          if (idx < 0) return '商品不存在';
          if (me.gold < (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).CARD_COST) return '金币不足';
          if (me.hand.length >= (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).MAX_HAND) return '手牌已满，无法购买';
          me.gold -= (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).CARD_COST;
          me.hand.push(me.shop.splice(idx, 1)[0]);
          (_crd && tryMerge === void 0 ? (_reportPossibleCrUseOftryMerge({
            error: Error()
          }), tryMerge) : tryMerge)(me);
          this.events.emit('refresh');
          return null;
        }

        refreshShop() {
          if (this.phase !== (_crd && Phase === void 0 ? (_reportPossibleCrUseOfPhase({
            error: Error()
          }), Phase) : Phase).Prep) return '只有准备阶段可以刷新';
          var me = this.me;
          if (me.gold < (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).REFRESH_COST) return '金币不足';
          me.gold -= (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).REFRESH_COST;
          me.shop = (_crd && rollShop === void 0 ? (_reportPossibleCrUseOfrollShop({
            error: Error()
          }), rollShop) : rollShop)();
          this.events.emit('refresh');
          return null;
        } // ---------------- 手牌 / 棋盘操作 ----------------


        useGoldCard(uid) {
          var me = this.me;
          var idx = me.hand.findIndex(c => c.uid === uid && c.kind === (_crd && CardKind === void 0 ? (_reportPossibleCrUseOfCardKind({
            error: Error()
          }), CardKind) : CardKind).Gold);
          if (idx < 0) return;
          me.hand.splice(idx, 1);
          me.gold += 1;
          this.events.emit('refresh');
        }
        /** 棋子卡上阵到手牌区以外的己方半场格子 */


        placeCard(uid, col, row) {
          if (this.phase !== (_crd && Phase === void 0 ? (_reportPossibleCrUseOfPhase({
            error: Error()
          }), Phase) : Phase).Prep) return '战斗阶段不能操作棋子';
          var me = this.me;
          if (row < (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).OWN_ROW_MIN || row >= (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).ROWS || col < 0 || col >= (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).COLS) return '只能放在己方半场';
          if (!me.cellFree(col, row)) return '该格子已有棋子';
          if (me.fieldCount >= (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).MAX_FIELD) return "\u573A\u4E0A\u6700\u591A " + (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).MAX_FIELD + " \u4E2A\u68CB\u5B50";
          var idx = me.hand.findIndex(c => c.uid === uid && c.kind === (_crd && CardKind === void 0 ? (_reportPossibleCrUseOfCardKind({
            error: Error()
          }), CardKind) : CardKind).Piece);
          if (idx < 0) return '请拖动手牌中的棋子卡';
          me.board.push((_crd && BoardPiece === void 0 ? (_reportPossibleCrUseOfBoardPiece({
            error: Error()
          }), BoardPiece) : BoardPiece).fromCard(me.hand.splice(idx, 1)[0], col, row));
          this.events.emit('refresh');
          return null;
        }

        moveBoardPiece(uid, col, row) {
          if (this.phase !== (_crd && Phase === void 0 ? (_reportPossibleCrUseOfPhase({
            error: Error()
          }), Phase) : Phase).Prep) return '战斗阶段不能操作棋子';
          var me = this.me;
          if (row < (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).OWN_ROW_MIN || row >= (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).ROWS || col < 0 || col >= (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).COLS) return '只能放在己方半场';
          if (!me.cellFree(col, row)) return '该格子已有棋子';
          var p = me.board.find(b => b.uid === uid);
          if (!p) return '棋子不存在';
          p.col = col;
          p.row = row;
          this.events.emit('refresh');
          return null;
        }
        /** 棋子下场回到手牌 */


        returnToHand(uid) {
          if (this.phase !== (_crd && Phase === void 0 ? (_reportPossibleCrUseOfPhase({
            error: Error()
          }), Phase) : Phase).Prep) return '战斗阶段不能操作棋子';
          var me = this.me;
          var idx = me.board.findIndex(b => b.uid === uid);
          if (idx < 0) return '棋子不存在';
          if (me.hand.length >= (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).MAX_HAND) return '手牌已满';
          var p = me.board.splice(idx, 1)[0];
          var c = (_crd && Card === void 0 ? (_reportPossibleCrUseOfCard({
            error: Error()
          }), Card) : Card).piece(p.type, p.star);
          me.hand.push(c); // 装备随棋子一起回到手牌

          for (var e of p.equips) {
            if (me.hand.length < (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).MAX_HAND) me.hand.push((_crd && Card === void 0 ? (_reportPossibleCrUseOfCard({
              error: Error()
            }), Card) : Card).equip(e));
          }

          this.events.emit('refresh');
          return null;
        } // ---------------- 出售 ----------------


        sellHandCard(uid) {
          if (this.phase !== (_crd && Phase === void 0 ? (_reportPossibleCrUseOfPhase({
            error: Error()
          }), Phase) : Phase).Prep) return '战斗阶段不能出售';
          var me = this.me;
          var idx = me.hand.findIndex(c => c.uid === uid);
          if (idx < 0) return '卡牌不存在';
          var card = me.hand[idx];
          if (card.kind === (_crd && CardKind === void 0 ? (_reportPossibleCrUseOfCardKind({
            error: Error()
          }), CardKind) : CardKind).Gold) return '金币卡请直接使用';
          me.gold += (_crd && cardSellValue === void 0 ? (_reportPossibleCrUseOfcardSellValue({
            error: Error()
          }), cardSellValue) : cardSellValue)(card);
          me.hand.splice(idx, 1);
          this.events.emit('refresh');
          return null;
        }
        /** 出售棋子：装备退回手牌（手牌满则丢弃） */


        sellBoardPiece(uid) {
          if (this.phase !== (_crd && Phase === void 0 ? (_reportPossibleCrUseOfPhase({
            error: Error()
          }), Phase) : Phase).Prep) return '战斗阶段不能出售';
          var me = this.me;
          var idx = me.board.findIndex(b => b.uid === uid);
          if (idx < 0) return '棋子不存在';
          var p = me.board.splice(idx, 1)[0];
          me.gold += (_crd && pieceSellValue === void 0 ? (_reportPossibleCrUseOfpieceSellValue({
            error: Error()
          }), pieceSellValue) : pieceSellValue)(p);

          for (var e of p.equips) {
            if (me.hand.length < (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).MAX_HAND) me.hand.push((_crd && Card === void 0 ? (_reportPossibleCrUseOfCard({
              error: Error()
            }), Card) : Card).equip(e));
          }

          this.events.emit('refresh');
          return null;
        } // ---------------- 装备与合成 ----------------

        /** 把装备卡穿到棋子身上；若可与身上已有基础装备合成，则返回合成请求 */


        tryEquipCard(cardUid, pieceUid) {
          if (this.phase !== (_crd && Phase === void 0 ? (_reportPossibleCrUseOfPhase({
            error: Error()
          }), Phase) : Phase).Prep) return {
            error: '战斗阶段不能给棋子装备（可合成手牌装备）'
          };
          var me = this.me;
          var ci = me.hand.findIndex(c => c.uid === cardUid);
          if (ci < 0) return {
            error: '卡牌不存在'
          };
          var card = me.hand[ci];
          if (card.kind !== (_crd && CardKind === void 0 ? (_reportPossibleCrUseOfCardKind({
            error: Error()
          }), CardKind) : CardKind).Equip) return {
            error: '不是装备卡'
          };
          var piece = me.board.find(b => b.uid === pieceUid);
          if (!piece) return {
            error: '棋子不存在'
          };
          if (piece.equips.length >= 3) return {
            error: '该棋子装备槽已满（3个）'
          };

          if (card.equip <= (_crd && EquipType === void 0 ? (_reportPossibleCrUseOfEquipType({
            error: Error()
          }), EquipType) : EquipType).D) {
            for (var e of piece.equips) {
              var r = (_crd && combineResult === void 0 ? (_reportPossibleCrUseOfcombineResult({
                error: Error()
              }), combineResult) : combineResult)(card.equip, e);

              if (r !== null) {
                return {
                  combine: {
                    kind: 'equip',
                    uid1: cardUid,
                    uid2: pieceUid,
                    withEquip: e,
                    result: r
                  }
                };
              }
            }
          }

          piece.equips.push(card.equip);
          me.hand.splice(ci, 1);
          this.events.emit('refresh');
          return {};
        }

        confirmEquipCombine(ask) {
          var me = this.me;
          var ci = me.hand.findIndex(c => c.uid === ask.uid1);
          var piece = me.board.find(b => b.uid === ask.uid2);
          if (ci < 0 || !piece) return;
          var ei = piece.equips.indexOf(ask.withEquip);
          if (ei < 0) return;
          piece.equips.splice(ei, 1);
          piece.equips.push(ask.result);
          me.hand.splice(ci, 1);
          this.events.emit('refresh');
        }
        /** 手牌内两件基础装备叠放合成（战斗阶段也可用） */


        tryCombineHand(uid1, uid2) {
          var me = this.me;
          var c1 = me.hand.find(c => c.uid === uid1);
          var c2 = me.hand.find(c => c.uid === uid2);
          if (!c1 || !c2 || c1 === c2) return {
            error: '卡牌不存在'
          };
          if (c1.kind !== (_crd && CardKind === void 0 ? (_reportPossibleCrUseOfCardKind({
            error: Error()
          }), CardKind) : CardKind).Equip || c2.kind !== (_crd && CardKind === void 0 ? (_reportPossibleCrUseOfCardKind({
            error: Error()
          }), CardKind) : CardKind).Equip) return {
            error: '只能合成装备卡'
          };
          var r = (_crd && combineResult === void 0 ? (_reportPossibleCrUseOfcombineResult({
            error: Error()
          }), combineResult) : combineResult)(c1.equip, c2.equip);
          if (r === null) return {
            error: '这两件装备无法合成（合成装备不可二次合成）'
          };
          return {
            combine: {
              kind: 'hand',
              uid1,
              uid2,
              result: r
            }
          };
        }

        confirmCombineHand(ask) {
          var me = this.me;
          var i1 = me.hand.findIndex(c => c.uid === ask.uid1);
          var i2 = me.hand.findIndex(c => c.uid === ask.uid2);
          if (i1 < 0 || i2 < 0) return;
          me.hand.splice(Math.max(i1, i2), 1);
          me.hand.splice(Math.min(i1, i2), 1);
          me.hand.push((_crd && Card === void 0 ? (_reportPossibleCrUseOfCard({
            error: Error()
          }), Card) : Card).equip(ask.result));
          this.events.emit('refresh');
        }

      }, _class2.inst = null, _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e1b07fa7ab2c9676801f37f1e934e53b90ad12c5.js.map