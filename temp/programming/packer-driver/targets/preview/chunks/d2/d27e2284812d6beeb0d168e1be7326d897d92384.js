System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Color, Component, Node, UITransform, Vec2, Vec3, CardKind, Phase, EQUIP, PIECE_BASE, BoardView, Dialogs, HandView, HUDView, PlayersListView, ShopView, makeCardNode, makeLabel, makeNode, makePieceNode, makeRect, setPos, GameBoot, _dec, _class, _crd, ccclass, GameView;

  function _reportPossibleCrUseOfBattleResult(extras) {
    _reporterNs.report("BattleResult", "../core/GameManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCombineAsk(extras) {
    _reporterNs.report("CombineAsk", "../core/GameManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameManager(extras) {
    _reporterNs.report("GameManager", "../core/GameManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCardKind(extras) {
    _reporterNs.report("CardKind", "../data/GameTypes", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPhase(extras) {
    _reporterNs.report("Phase", "../data/GameTypes", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEQUIP(extras) {
    _reporterNs.report("EQUIP", "../data/GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPIECE_BASE(extras) {
    _reporterNs.report("PIECE_BASE", "../data/GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBoardView(extras) {
    _reporterNs.report("BoardView", "./BoardView", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDialogs(extras) {
    _reporterNs.report("Dialogs", "./Dialogs", _context.meta, extras);
  }

  function _reportPossibleCrUseOfHandView(extras) {
    _reporterNs.report("HandView", "./PanelViews", _context.meta, extras);
  }

  function _reportPossibleCrUseOfHUDView(extras) {
    _reporterNs.report("HUDView", "./PanelViews", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPlayersListView(extras) {
    _reporterNs.report("PlayersListView", "./PanelViews", _context.meta, extras);
  }

  function _reportPossibleCrUseOfShopView(extras) {
    _reporterNs.report("ShopView", "./PanelViews", _context.meta, extras);
  }

  function _reportPossibleCrUseOfmakeCardNode(extras) {
    _reporterNs.report("makeCardNode", "./UIFactory", _context.meta, extras);
  }

  function _reportPossibleCrUseOfmakeLabel(extras) {
    _reporterNs.report("makeLabel", "./UIFactory", _context.meta, extras);
  }

  function _reportPossibleCrUseOfmakeNode(extras) {
    _reporterNs.report("makeNode", "./UIFactory", _context.meta, extras);
  }

  function _reportPossibleCrUseOfmakePieceNode(extras) {
    _reporterNs.report("makePieceNode", "./UIFactory", _context.meta, extras);
  }

  function _reportPossibleCrUseOfmakeRect(extras) {
    _reporterNs.report("makeRect", "./UIFactory", _context.meta, extras);
  }

  function _reportPossibleCrUseOfsetPos(extras) {
    _reporterNs.report("setPos", "./UIFactory", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameBoot(extras) {
    _reporterNs.report("GameBoot", "./GameBoot", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Color = _cc.Color;
      Component = _cc.Component;
      Node = _cc.Node;
      UITransform = _cc.UITransform;
      Vec2 = _cc.Vec2;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      CardKind = _unresolved_2.CardKind;
      Phase = _unresolved_2.Phase;
    }, function (_unresolved_3) {
      EQUIP = _unresolved_3.EQUIP;
      PIECE_BASE = _unresolved_3.PIECE_BASE;
    }, function (_unresolved_4) {
      BoardView = _unresolved_4.BoardView;
    }, function (_unresolved_5) {
      Dialogs = _unresolved_5.Dialogs;
    }, function (_unresolved_6) {
      HandView = _unresolved_6.HandView;
      HUDView = _unresolved_6.HUDView;
      PlayersListView = _unresolved_6.PlayersListView;
      ShopView = _unresolved_6.ShopView;
    }, function (_unresolved_7) {
      makeCardNode = _unresolved_7.makeCardNode;
      makeLabel = _unresolved_7.makeLabel;
      makeNode = _unresolved_7.makeNode;
      makePieceNode = _unresolved_7.makePieceNode;
      makeRect = _unresolved_7.makeRect;
      setPos = _unresolved_7.setPos;
    }, function (_unresolved_8) {
      GameBoot = _unresolved_8.GameBoot;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "cd79bx5QA1GvZxUpAO66bkK", "GameView", undefined);

      __checkObsolete__(['_decorator', 'Color', 'Component', 'EventTouch', 'Label', 'Node', 'UITransform', 'Vec2', 'Vec3']);

      ({
        ccclass
      } = _decorator);

      /** 游戏主界面：装配各子视图，处理手牌/棋子的拖拽交互 */
      _export("GameView", GameView = (_dec = ccclass('GameView'), _dec(_class = class GameView extends Component {
        constructor() {
          super(...arguments);
          this.gm = null;
          this.board = null;
          this.hud = new (_crd && HUDView === void 0 ? (_reportPossibleCrUseOfHUDView({
            error: Error()
          }), HUDView) : HUDView)();
          this.plist = new (_crd && PlayersListView === void 0 ? (_reportPossibleCrUseOfPlayersListView({
            error: Error()
          }), PlayersListView) : PlayersListView)();
          this.hand = new (_crd && HandView === void 0 ? (_reportPossibleCrUseOfHandView({
            error: Error()
          }), HandView) : HandView)();
          this.shop = new (_crd && ShopView === void 0 ? (_reportPossibleCrUseOfShopView({
            error: Error()
          }), ShopView) : ShopView)();
          this.dialogs = new (_crd && Dialogs === void 0 ? (_reportPossibleCrUseOfDialogs({
            error: Error()
          }), Dialogs) : Dialogs)();
          this.sellZone = null;
          this.hint = null;
          this.toastNode = null;
          this.toastLabel = null;
          this.toastTimer = 0;
          this.manualStartBtn = null;
          this.drag = null;
        }

        init(gm) {
          this.gm = gm;
          var boardNode = (_crd && makeNode === void 0 ? (_reportPossibleCrUseOfmakeNode({
            error: Error()
          }), makeNode) : makeNode)('Board', this.node);
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(boardNode, 0, 150);
          this.board = boardNode.addComponent(_crd && BoardView === void 0 ? (_reportPossibleCrUseOfBoardView({
            error: Error()
          }), BoardView) : BoardView);
          this.board.build();

          this.board.attachDrag = (n, p) => this.attachDrag(n, p);

          this.hud.build(this.node);
          this.plist.build(this.node);
          this.hand.build(this.node);

          this.hand.attachDrag = (n, p) => this.attachDrag(n, p);

          this.shop.build(this.node);

          this.shop.onBuy = uid => this.toastErr(gm.buyShopCard(uid));

          this.shop.onRefresh = () => this.toastErr(gm.refreshShop()); // 出售区


          this.sellZone = (_crd && makeRect === void 0 ? (_reportPossibleCrUseOfmakeRect({
            error: Error()
          }), makeRect) : makeRect)('sell', this.node, 170, 56, new Color(120, 50, 50, 255), 8);
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(this.sellZone, 230, -605);
          var sl = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
            error: Error()
          }), makeLabel) : makeLabel)(this.sellZone, '拖到此处出售', 18);
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(sl.node, 0, 0);
          this.hint = (_crd && makeNode === void 0 ? (_reportPossibleCrUseOfmakeNode({
            error: Error()
          }), makeNode) : makeNode)('hint', this.node);
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(this.hint, -130, -605);
          var hl = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
            error: Error()
          }), makeLabel) : makeLabel)(this.hint, '拖卡牌上阵/装备；拖棋子回手牌区下场', 14, new Color(150, 150, 150, 255));
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(hl.node, 0, 0); // 提示 Toast

          this.toastNode = (_crd && makeRect === void 0 ? (_reportPossibleCrUseOfmakeRect({
            error: Error()
          }), makeRect) : makeRect)('toast', this.node, 400, 44, new Color(0, 0, 0, 200), 8);
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(this.toastNode, 0, 470);
          this.toastLabel = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
            error: Error()
          }), makeLabel) : makeLabel)(this.toastNode, '', 19, new Color(255, 230, 120, 255), 't');
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(this.toastLabel.node, 0, 0);
          this.toastNode.active = false;
          this.dialogs.build(this.node); // 模拟战斗模式：准备阶段显示"开始战斗"按钮

          if (gm.simOnly) {
            this.manualStartBtn = (_crd && makeRect === void 0 ? (_reportPossibleCrUseOfmakeRect({
              error: Error()
            }), makeRect) : makeRect)('manualStart', this.node, 220, 58, new Color(200, 80, 60, 255), 10);
            (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
              error: Error()
            }), setPos) : setPos)(this.manualStartBtn, 210, 540);
            var bl = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
              error: Error()
            }), makeLabel) : makeLabel)(this.manualStartBtn, '▶ 开始战斗', 24);
            (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
              error: Error()
            }), setPos) : setPos)(bl.node, 0, 0);
            this.manualStartBtn.on(Node.EventType.TOUCH_END, () => gm.startManualBattle(), this);
          }

          gm.events.on('refresh', this.renderAll, this);
          gm.events.on('battle-start', this.onBattleStart, this);
          gm.events.on('result', this.onResult, this);
          gm.events.on('eliminated', this.onEliminated, this);
          gm.events.on('victory', this.onVictory, this);
          this.renderAll();
        }

        renderAll() {
          var gm = this.gm;
          this.plist.render(gm);
          this.hand.render(gm.me.hand);
          this.shop.render(gm.me.shop, gm.phase);

          if (gm.phase === (_crd && Phase === void 0 ? (_reportPossibleCrUseOfPhase({
            error: Error()
          }), Phase) : Phase).Prep) {
            this.board.renderPrep(gm.me.board);
          }

          this.sellZone.active = gm.phase === (_crd && Phase === void 0 ? (_reportPossibleCrUseOfPhase({
            error: Error()
          }), Phase) : Phase).Prep;
          if (this.manualStartBtn) this.manualStartBtn.active = gm.simOnly && gm.phase === (_crd && Phase === void 0 ? (_reportPossibleCrUseOfPhase({
            error: Error()
          }), Phase) : Phase).Prep;
        }

        onBattleStart() {
          this.clearDrag(); // 阶段切换时取消进行中的拖拽，避免 ghost 残留

          this.board.enterBattle(this.gm.sim);
          this.renderAll();
        }

        onResult() {
          this.clearDrag();
          var r = this.gm.playerResult;
          if (!r) return;
          this.dialogs.showResult(r, () => this.gm.confirmResult());
        }

        onEliminated() {
          var finish = () => this.dialogs.showGameOver(this.gm.standings(), false, () => this.restart());

          var r = this.gm.playerResult;
          if (r) this.dialogs.showElimination(r, finish);else finish();
        }

        onVictory() {
          this.dialogs.showGameOver(this.gm.standings(), true, () => this.restart());
        }

        restart() {
          if ((_crd && GameBoot === void 0 ? (_reportPossibleCrUseOfGameBoot({
            error: Error()
          }), GameBoot) : GameBoot).inst) (_crd && GameBoot === void 0 ? (_reportPossibleCrUseOfGameBoot({
            error: Error()
          }), GameBoot) : GameBoot).inst.restart();
        }

        update(dt) {
          if (this.gm) this.hud.update(this.gm);

          if (this.toastTimer > 0) {
            this.toastTimer -= dt;
            if (this.toastTimer <= 0) this.toastNode.active = false;
          }
        } // ---------------- 拖拽 ----------------


        attachDrag(node, payload) {
          node.on(Node.EventType.TOUCH_START, e => this.onDragStart(payload, e), this);
          node.on(Node.EventType.TOUCH_MOVE, e => this.onDragMove(e), this);
          node.on(Node.EventType.TOUCH_END, e => this.onDragEnd(e), this);
          node.on(Node.EventType.TOUCH_CANCEL, e => this.onDragEnd(e), this);
        }

        onDragStart(payload, e) {
          var p = e.getUILocation();
          this.drag = {
            payload,
            sx: p.x,
            sy: p.y,
            moved: false,
            ghost: null
          };
        }

        onDragMove(e) {
          if (!this.drag) return;
          var p = e.getUILocation();

          if (!this.drag.moved && Math.hypot(p.x - this.drag.sx, p.y - this.drag.sy) > 12) {
            this.drag.moved = true;
            this.drag.ghost = this.makeGhost(this.drag.payload);
          }

          if (this.drag.ghost) {
            var local = this.node.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(p.x, p.y, 0));
            (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
              error: Error()
            }), setPos) : setPos)(this.drag.ghost, local.x, local.y);
          }
        }
        /** 取消进行中的拖拽并销毁 ghost */


        clearDrag() {
          var _this$drag;

          if ((_this$drag = this.drag) != null && _this$drag.ghost) this.drag.ghost.destroy();
          this.drag = null;
        }

        onDragEnd(e) {
          if (!this.drag) return;
          var p = e.getUILocation();
          var d = this.drag;
          this.drag = null;
          if (d.ghost) d.ghost.destroy();
          if (!d.moved) this.handleTap(d.payload);else this.handleDrop(d.payload, p.x, p.y);
        }

        makeGhost(payload) {
          if (payload.type === 'hand') {
            var c = this.gm.me.hand.find(x => x.uid === payload.uid);

            if (c) {
              return (_crd && makeCardNode === void 0 ? (_reportPossibleCrUseOfmakeCardNode({
                error: Error()
              }), makeCardNode) : makeCardNode)(this.node, c.kind === (_crd && CardKind === void 0 ? (_reportPossibleCrUseOfCardKind({
                error: Error()
              }), CardKind) : CardKind).Piece ? 'piece' : c.kind === (_crd && CardKind === void 0 ? (_reportPossibleCrUseOfCardKind({
                error: Error()
              }), CardKind) : CardKind).Equip ? 'equip' : 'gold', {
                piece: c.piece,
                star: c.star,
                equip: c.equip,
                w: 58,
                h: 80
              });
            }
          } else {
            var b = this.gm.me.board.find(x => x.uid === payload.uid);
            if (b) return (_crd && makePieceNode === void 0 ? (_reportPossibleCrUseOfmakePieceNode({
              error: Error()
            }), makePieceNode) : makePieceNode)(this.node, b.type, b.star, b.equips);
          }

          return (_crd && makeRect === void 0 ? (_reportPossibleCrUseOfmakeRect({
            error: Error()
          }), makeRect) : makeRect)('ghost', this.node, 40, 40, new Color(200, 200, 200, 255), 6);
        }

        handleTap(payload) {
          if (payload.type === 'hand') {
            var c = this.gm.me.hand.find(x => x.uid === payload.uid);
            if (c && c.kind === (_crd && CardKind === void 0 ? (_reportPossibleCrUseOfCardKind({
              error: Error()
            }), CardKind) : CardKind).Gold) this.gm.useGoldCard(payload.uid);
          }
        }

        handleDrop(payload, wx, wy) {
          var gm = this.gm; // 出售区

          if (this.inRect(this.sellZone, wx, wy)) {
            this.toastErr(payload.type === 'hand' ? gm.sellHandCard(payload.uid) : gm.sellBoardPiece(payload.uid));
            return;
          }

          if (payload.type === 'hand') {
            var card = gm.me.hand.find(c => c.uid === payload.uid);
            if (!card) return;

            if (card.kind === (_crd && CardKind === void 0 ? (_reportPossibleCrUseOfCardKind({
              error: Error()
            }), CardKind) : CardKind).Piece) {
              var cell = this.board.worldToCell(wx, wy);
              if (cell) this.toastErr(gm.placeCard(card.uid, cell.col, cell.row));
              return;
            }

            if (card.kind === (_crd && CardKind === void 0 ? (_reportPossibleCrUseOfCardKind({
              error: Error()
            }), CardKind) : CardKind).Equip) {
              // 拖到棋盘棋子身上 → 穿戴（可触发合成确认）
              var piece = this.board.pieceAtWorld(gm.me.board, wx, wy);

              if (piece) {
                var r = gm.tryEquipCard(card.uid, piece.uid);

                if (r.combine) {
                  var ask = r.combine;
                  this.dialogs.showCombine(ask, "\u88C5\u5907" + (_crd && EQUIP === void 0 ? (_reportPossibleCrUseOfEQUIP({
                    error: Error()
                  }), EQUIP) : EQUIP)[card.equip].key + " + " + (_crd && PIECE_BASE === void 0 ? (_reportPossibleCrUseOfPIECE_BASE({
                    error: Error()
                  }), PIECE_BASE) : PIECE_BASE)[piece.type].name + "\u8EAB\u4E0A\u7684\u88C5\u5907" + (_crd && EQUIP === void 0 ? (_reportPossibleCrUseOfEQUIP({
                    error: Error()
                  }), EQUIP) : EQUIP)[ask.withEquip].key, () => gm.confirmEquipCombine(ask));
                  return;
                }

                this.toastErr(r.error || null);
                return;
              } // 拖到手牌里另一张装备卡上 → 合成确认（战斗阶段也可用）


              var target = this.hand.cardAtWorld(gm.me.hand, wx, wy);

              if (target && target.uid !== card.uid) {
                var _r = gm.tryCombineHand(card.uid, target.uid);

                if (_r.combine) {
                  var _ask = _r.combine;
                  this.dialogs.showCombine(_ask, "\u88C5\u5907" + (_crd && EQUIP === void 0 ? (_reportPossibleCrUseOfEQUIP({
                    error: Error()
                  }), EQUIP) : EQUIP)[card.equip].key + " + \u88C5\u5907" + (_crd && EQUIP === void 0 ? (_reportPossibleCrUseOfEQUIP({
                    error: Error()
                  }), EQUIP) : EQUIP)[target.equip].key, () => gm.confirmCombineHand(_ask));
                  return;
                }

                this.toastErr(_r.error || null);
              }
            }

            return;
          } // 棋盘上的棋子：换位置 / 拖回手牌下场


          if (payload.type === 'board') {
            if (this.inRect(this.hand.root, wx, wy)) {
              this.toastErr(gm.returnToHand(payload.uid));
              return;
            }

            var _cell = this.board.worldToCell(wx, wy);

            if (_cell) this.toastErr(gm.moveBoardPiece(payload.uid, _cell.col, _cell.row));
          }
        }

        inRect(node, wx, wy) {
          if (!node.active) return false;
          var r = node.getComponent(UITransform).getBoundingBoxToWorld();
          return r.contains(new Vec2(wx, wy));
        }

        toastErr(err) {
          if (err) this.toast(err);
        }

        toast(msg) {
          this.toastLabel.string = msg;
          this.toastNode.active = true;
          this.toastTimer = 1.6;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d27e2284812d6beeb0d168e1be7326d897d92384.js.map