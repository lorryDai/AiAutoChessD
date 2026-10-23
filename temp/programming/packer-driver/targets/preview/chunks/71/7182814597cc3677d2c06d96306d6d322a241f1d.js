System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Color, UITransform, Vec3, CardKind, Phase, CFG, makeCardNode, makeLabel, makeNode, makeRect, onTap, setPos, HUDView, PlayersListView, HandView, ShopView, _crd;

  function _reportPossibleCrUseOfGameManager(extras) {
    _reporterNs.report("GameManager", "../core/GameManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCard(extras) {
    _reporterNs.report("Card", "../data/GameTypes", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCardKind(extras) {
    _reporterNs.report("CardKind", "../data/GameTypes", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPhase(extras) {
    _reporterNs.report("Phase", "../data/GameTypes", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCFG(extras) {
    _reporterNs.report("CFG", "../data/GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPlayerState(extras) {
    _reporterNs.report("PlayerState", "../core/Models", _context.meta, extras);
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

  function _reportPossibleCrUseOfmakeRect(extras) {
    _reporterNs.report("makeRect", "./UIFactory", _context.meta, extras);
  }

  function _reportPossibleCrUseOfonTap(extras) {
    _reporterNs.report("onTap", "./UIFactory", _context.meta, extras);
  }

  function _reportPossibleCrUseOfsetPos(extras) {
    _reporterNs.report("setPos", "./UIFactory", _context.meta, extras);
  }

  _export({
    HUDView: void 0,
    PlayersListView: void 0,
    HandView: void 0,
    ShopView: void 0
  });

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Color = _cc.Color;
      UITransform = _cc.UITransform;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      CardKind = _unresolved_2.CardKind;
      Phase = _unresolved_2.Phase;
    }, function (_unresolved_3) {
      CFG = _unresolved_3.CFG;
    }, function (_unresolved_4) {
      makeCardNode = _unresolved_4.makeCardNode;
      makeLabel = _unresolved_4.makeLabel;
      makeNode = _unresolved_4.makeNode;
      makeRect = _unresolved_4.makeRect;
      onTap = _unresolved_4.onTap;
      setPos = _unresolved_4.setPos;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "33977e+9blPva4QIYot2/7v", "PanelViews", undefined);

      __checkObsolete__(['Color', 'Label', 'Node', 'UITransform', 'Vec3']);

      /** 顶部信息栏：回合 / 阶段 / 倒计时 / 金币 / HP / 对手信息 */
      _export("HUDView", HUDView = class HUDView {
        constructor() {
          this.root = void 0;
          this.lbRound = void 0;
          this.lbPhase = void 0;
          this.lbTimer = void 0;
          this.lbGold = void 0;
          this.lbHp = void 0;
          this.lbOpp = void 0;
        }

        build(parent) {
          this.root = (_crd && makeNode === void 0 ? (_reportPossibleCrUseOfmakeNode({
            error: Error()
          }), makeNode) : makeNode)('HUD', parent);
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(this.root, 0, 600);
          (_crd && makeRect === void 0 ? (_reportPossibleCrUseOfmakeRect({
            error: Error()
          }), makeRect) : makeRect)('bg', this.root, 720, 70, new Color(30, 32, 40, 255), 0);
          this.lbRound = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
            error: Error()
          }), makeLabel) : makeLabel)(this.root, '', 22, Color.WHITE, 'round');
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(this.lbRound.node, -300, 0);
          this.lbPhase = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
            error: Error()
          }), makeLabel) : makeLabel)(this.root, '', 22, new Color(255, 220, 120, 255), 'phase');
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(this.lbPhase.node, -160, 0);
          this.lbTimer = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
            error: Error()
          }), makeLabel) : makeLabel)(this.root, '', 26, new Color(120, 220, 255, 255), 'timer');
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(this.lbTimer.node, -20, 0);
          this.lbGold = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
            error: Error()
          }), makeLabel) : makeLabel)(this.root, '', 22, new Color(255, 215, 0, 255), 'gold');
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(this.lbGold.node, 140, 0);
          this.lbHp = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
            error: Error()
          }), makeLabel) : makeLabel)(this.root, '', 22, new Color(255, 120, 120, 255), 'hp');
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(this.lbHp.node, 300, 0);
          this.lbOpp = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
            error: Error()
          }), makeLabel) : makeLabel)(parent, '', 18, new Color(255, 170, 170, 255), 'opp');
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(this.lbOpp.node, 0, 552);
        }

        update(gm) {
          this.lbRound.string = "\u56DE\u5408 " + gm.round;
          this.lbPhase.string = gm.phase === (_crd && Phase === void 0 ? (_reportPossibleCrUseOfPhase({
            error: Error()
          }), Phase) : Phase).Prep ? '准备阶段' : gm.phase === (_crd && Phase === void 0 ? (_reportPossibleCrUseOfPhase({
            error: Error()
          }), Phase) : Phase).Battle ? '战斗阶段' : '';

          if (gm.phase === (_crd && Phase === void 0 ? (_reportPossibleCrUseOfPhase({
            error: Error()
          }), Phase) : Phase).Prep) {
            this.lbTimer.string = Math.ceil(gm.timer) + "s";
          } else if (gm.phase === (_crd && Phase === void 0 ? (_reportPossibleCrUseOfPhase({
            error: Error()
          }), Phase) : Phase).Battle && gm.sim) {
            var t = Math.floor(gm.sim.time);
            this.lbTimer.string = gm.sim.time >= (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).SPEEDUP_AT ? t + "s \u52A0\u901F\u4E2D" : t + "s";
          } else {
            this.lbTimer.string = '';
          }

          this.lbGold.string = "\u91D1\u5E01 " + gm.me.gold;
          this.lbHp.string = "HP " + gm.me.hp;
          this.lbOpp.string = (gm.phase === (_crd && Phase === void 0 ? (_reportPossibleCrUseOfPhase({
            error: Error()
          }), Phase) : Phase).Battle || gm.phase === (_crd && Phase === void 0 ? (_reportPossibleCrUseOfPhase({
            error: Error()
          }), Phase) : Phase).Settle) && gm.opp ? "\u5BF9\u624B\uFF1A" + gm.opp.name + "  HP " + gm.opp.hp : '';
        }

      });
      /** 右侧玩家列表：8 人血量一览 */


      _export("PlayersListView", PlayersListView = class PlayersListView {
        constructor() {
          this.root = void 0;
          this.rows = [];
        }

        build(parent) {
          this.root = (_crd && makeNode === void 0 ? (_reportPossibleCrUseOfmakeNode({
            error: Error()
          }), makeNode) : makeNode)('PlayersList', parent);
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(this.root, 292, 480);
          var title = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
            error: Error()
          }), makeLabel) : makeLabel)(this.root, '玩家', 16, new Color(180, 180, 180, 255));
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(title.node, 0, 18);

          for (var i = 0; i < 8; i++) {
            var row = (_crd && makeNode === void 0 ? (_reportPossibleCrUseOfmakeNode({
              error: Error()
            }), makeNode) : makeNode)("row" + i, this.root);
            (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
              error: Error()
            }), setPos) : setPos)(row, 0, -14 - i * 34);
            var bg = (_crd && makeRect === void 0 ? (_reportPossibleCrUseOfmakeRect({
              error: Error()
            }), makeRect) : makeRect)('bg', row, 130, 30, new Color(36, 38, 48, 255), 4);
            var lb = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
              error: Error()
            }), makeLabel) : makeLabel)(row, '', 15, Color.WHITE, 'lb');
            this.rows.push({
              bg,
              lb,
              idx: i
            });
          }
        }

        render(gm) {
          for (var i = 0; i < this.rows.length; i++) {
            var p = gm.players[i];
            var r = this.rows[i];

            if (!p) {
              r.lb.string = '';
              continue;
            }

            r.lb.string = p.alive ? p.name + " HP" + p.hp : p.name + " \u6DD8\u6C70";
            r.lb.color = p.alive ? p.isBot ? Color.WHITE : new Color(120, 220, 255, 255) : new Color(120, 120, 120, 255);
          }
        }

      });
      /** 备战席（手牌）：10 格，棋子卡/装备卡/金币卡共用 */


      _export("HandView", HandView = class HandView {
        constructor() {
          this.root = void 0;
          this.cardRoot = void 0;
          this.attachDrag = null;
        }

        build(parent) {
          this.root = (_crd && makeNode === void 0 ? (_reportPossibleCrUseOfmakeNode({
            error: Error()
          }), makeNode) : makeNode)('Hand', parent);
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(this.root, 0, -262);
          this.root.getComponent(UITransform).setContentSize(668, 100); // 供“棋子拖回手牌区”命中判定

          (_crd && makeRect === void 0 ? (_reportPossibleCrUseOfmakeRect({
            error: Error()
          }), makeRect) : makeRect)('bg', this.root, 668, 100, new Color(28, 30, 38, 255), 8);

          for (var i = 0; i < (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).MAX_HAND; i++) {
            var slot = (_crd && makeRect === void 0 ? (_reportPossibleCrUseOfmakeRect({
              error: Error()
            }), makeRect) : makeRect)("slot" + i, this.root, 60, 84, new Color(45, 48, 60, 255), 6);
            (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
              error: Error()
            }), setPos) : setPos)(slot, (i - ((_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).MAX_HAND - 1) / 2) * HandView.SLOT_W, 0);
          }

          this.cardRoot = (_crd && makeNode === void 0 ? (_reportPossibleCrUseOfmakeNode({
            error: Error()
          }), makeNode) : makeNode)('cards', this.root);
        }

        render(cards) {
          this.cardRoot.removeAllChildren();

          for (var i = 0; i < cards.length; i++) {
            var c = cards[i];
            var n = (_crd && makeCardNode === void 0 ? (_reportPossibleCrUseOfmakeCardNode({
              error: Error()
            }), makeCardNode) : makeCardNode)(this.cardRoot, c.kind === (_crd && CardKind === void 0 ? (_reportPossibleCrUseOfCardKind({
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
            (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
              error: Error()
            }), setPos) : setPos)(n, (i - ((_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).MAX_HAND - 1) / 2) * HandView.SLOT_W, 0);
            if (this.attachDrag) this.attachDrag(n, {
              type: 'hand',
              uid: c.uid
            });
          }
        }
        /** UI 坐标命中的手牌（用于装备卡叠放合成） */


        cardAtWorld(cards, wx, wy) {
          var v = new Vec3();
          var nodes = this.cardRoot.children;

          for (var i = 0; i < nodes.length; i++) {
            nodes[i].getWorldPosition(v);
            if (Math.abs(wx - v.x) < 30 && Math.abs(wy - v.y) < 42) return cards[i] || null;
          }

          return null;
        }

      });
      /** 商店：上排 5 件装备，下排 5 个棋子，点选购买 */


      HandView.SLOT_W = 64;

      _export("ShopView", ShopView = class ShopView {
        constructor() {
          this.root = void 0;
          this.equipRow = void 0;
          this.pieceRow = void 0;
          this.battleMask = void 0;
          this.onBuy = null;
          this.onRefresh = null;
        }

        build(parent) {
          this.root = (_crd && makeNode === void 0 ? (_reportPossibleCrUseOfmakeNode({
            error: Error()
          }), makeNode) : makeNode)('Shop', parent);
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(this.root, 0, -442);
          (_crd && makeRect === void 0 ? (_reportPossibleCrUseOfmakeRect({
            error: Error()
          }), makeRect) : makeRect)('bg', this.root, 470, 260, new Color(28, 30, 38, 255), 8);
          var title = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
            error: Error()
          }), makeLabel) : makeLabel)(this.root, '商店（全部 1 金币）', 16, new Color(200, 200, 200, 255));
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(title.node, -130, 108);
          var btn = (_crd && makeRect === void 0 ? (_reportPossibleCrUseOfmakeRect({
            error: Error()
          }), makeRect) : makeRect)('refresh', this.root, 120, 40, new Color(70, 110, 200, 255), 6);
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(btn, 150, 108);
          var bl = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
            error: Error()
          }), makeLabel) : makeLabel)(btn, '刷新 -1金', 17);
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(bl.node, 0, 0);
          (_crd && onTap === void 0 ? (_reportPossibleCrUseOfonTap({
            error: Error()
          }), onTap) : onTap)(btn, this, () => {
            if (this.onRefresh) this.onRefresh();
          });
          var eqTag = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
            error: Error()
          }), makeLabel) : makeLabel)(this.root, '装备', 14, new Color(200, 160, 120, 255));
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(eqTag.node, -200, 48);
          var pcTag = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
            error: Error()
          }), makeLabel) : makeLabel)(this.root, '棋子', 14, new Color(160, 200, 255, 255));
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(pcTag.node, -200, -62);
          this.equipRow = (_crd && makeNode === void 0 ? (_reportPossibleCrUseOfmakeNode({
            error: Error()
          }), makeNode) : makeNode)('equips', this.root);
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(this.equipRow, 10, 40);
          this.pieceRow = (_crd && makeNode === void 0 ? (_reportPossibleCrUseOfmakeNode({
            error: Error()
          }), makeNode) : makeNode)('pieces', this.root);
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(this.pieceRow, 10, -70); // 战斗阶段遮罩（仅提示，购买操作由 GameManager 拦截）

          this.battleMask = (_crd && makeRect === void 0 ? (_reportPossibleCrUseOfmakeRect({
            error: Error()
          }), makeRect) : makeRect)('mask', this.root, 470, 260, new Color(0, 0, 0, 180), 8);
          var ml = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
            error: Error()
          }), makeLabel) : makeLabel)(this.battleMask, '战斗中（手牌装备可拖放合成）', 20);
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(ml.node, 0, 0);
          this.battleMask.active = false;
        }

        render(shop, phase) {
          var _this = this;

          this.battleMask.active = phase !== (_crd && Phase === void 0 ? (_reportPossibleCrUseOfPhase({
            error: Error()
          }), Phase) : Phase).Prep;
          this.equipRow.removeAllChildren();
          this.pieceRow.removeAllChildren();
          var ei = 0,
              pi = 0;

          var _loop = function _loop(c) {
            if (c.kind === (_crd && CardKind === void 0 ? (_reportPossibleCrUseOfCardKind({
              error: Error()
            }), CardKind) : CardKind).Equip) {
              var n = (_crd && makeCardNode === void 0 ? (_reportPossibleCrUseOfmakeCardNode({
                error: Error()
              }), makeCardNode) : makeCardNode)(_this.equipRow, 'equip', {
                equip: c.equip,
                w: 76,
                h: 92
              });
              (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
                error: Error()
              }), setPos) : setPos)(n, (ei - 2) * 86, 0);
              (_crd && onTap === void 0 ? (_reportPossibleCrUseOfonTap({
                error: Error()
              }), onTap) : onTap)(n, _this, () => {
                if (_this.onBuy) _this.onBuy(c.uid);
              });
              ei++;
            } else if (c.kind === (_crd && CardKind === void 0 ? (_reportPossibleCrUseOfCardKind({
              error: Error()
            }), CardKind) : CardKind).Piece) {
              var _n = (_crd && makeCardNode === void 0 ? (_reportPossibleCrUseOfmakeCardNode({
                error: Error()
              }), makeCardNode) : makeCardNode)(_this.pieceRow, 'piece', {
                piece: c.piece,
                star: c.star,
                w: 76,
                h: 92
              });

              (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
                error: Error()
              }), setPos) : setPos)(_n, (pi - 2) * 86, 0);
              (_crd && onTap === void 0 ? (_reportPossibleCrUseOfonTap({
                error: Error()
              }), onTap) : onTap)(_n, _this, () => {
                if (_this.onBuy) _this.onBuy(c.uid);
              });
              pi++;
            }
          };

          for (var c of shop) {
            _loop(c);
          }
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7182814597cc3677d2c06d96306d6d322a241f1d.js.map