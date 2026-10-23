System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Color, Component, ResolutionPolicy, view, GameManager, CFG, GameView, makeLabel, makeNode, makeRect, onTap, setPos, _dec, _class, _class2, _crd, ccclass, GameBoot;

  function _reportPossibleCrUseOfGameManager(extras) {
    _reporterNs.report("GameManager", "../core/GameManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCFG(extras) {
    _reporterNs.report("CFG", "../data/GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameView(extras) {
    _reporterNs.report("GameView", "./GameView", _context.meta, extras);
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
      ResolutionPolicy = _cc.ResolutionPolicy;
      view = _cc.view;
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }, function (_unresolved_3) {
      CFG = _unresolved_3.CFG;
    }, function (_unresolved_4) {
      GameView = _unresolved_4.GameView;
    }, function (_unresolved_5) {
      makeLabel = _unresolved_5.makeLabel;
      makeNode = _unresolved_5.makeNode;
      makeRect = _unresolved_5.makeRect;
      onTap = _unresolved_5.onTap;
      setPos = _unresolved_5.setPos;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a0c0cHlERFAAIAAAAAAAAAB", "GameBoot", undefined);

      __checkObsolete__(['_decorator', 'Color', 'Component', 'Label', 'Node', 'ResolutionPolicy', 'view']);

      ({
        ccclass
      } = _decorator);
      /**
       * 启动引导：首页 → 模拟匹配 → 游戏主界面。
       * 使用方法：场景中选中 Canvas → 添加组件 → GameBoot，无需其他配置。
       */

      _export("GameBoot", GameBoot = (_dec = ccclass('GameBoot'), _dec(_class = (_class2 = class GameBoot extends Component {
        constructor() {
          super(...arguments);
          this.homeRoot = null;
          this.matchRoot = null;
          this.gameRoot = null;
          this.slotLabels = [];
          this.playerCount = 8;
        }

        onLoad() {
          GameBoot.inst = this;

          try {
            view.setDesignResolutionSize(720, 1280, ResolutionPolicy.SHOW_ALL);
          } catch (e) {
            /* 编辑器内忽略 */
          }

          (_crd && makeRect === void 0 ? (_reportPossibleCrUseOfmakeRect({
            error: Error()
          }), makeRect) : makeRect)('BG', this.node, 1500, 1500, new Color(22, 24, 30, 255), 0);
          this.buildHome();
          this.buildMatch();
          this.homeRoot.active = true;
          this.matchRoot.active = false;
        } // ---------------- 首页 ----------------


        buildHome() {
          var _this = this;

          this.homeRoot = (_crd && makeNode === void 0 ? (_reportPossibleCrUseOfmakeNode({
            error: Error()
          }), makeNode) : makeNode)('Home', this.node);
          var title = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
            error: Error()
          }), makeLabel) : makeLabel)(this.homeRoot, '自走棋', 84, new Color(255, 220, 120, 255));
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(title.node, 0, 300);
          var sub = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
            error: Error()
          }), makeLabel) : makeLabel)(this.homeRoot, '多人对战 · 自动战斗', 24, new Color(180, 180, 180, 255));
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(sub.node, 0, 220);
          var tip = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
            error: Error()
          }), makeLabel) : makeLabel)(this.homeRoot, '选择对局人数', 22, new Color(160, 160, 160, 255));
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(tip.node, 0, 130);
          var counts = [2, 4, 8];

          var _loop = function _loop() {
            var n = counts[i];
            var btn = (_crd && makeRect === void 0 ? (_reportPossibleCrUseOfmakeRect({
              error: Error()
            }), makeRect) : makeRect)("start" + n, _this.homeRoot, 180, 84, new Color(70, 160, 90, 255), 12);
            (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
              error: Error()
            }), setPos) : setPos)(btn, (i - 1) * 210, 20);
            var bl = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
              error: Error()
            }), makeLabel) : makeLabel)(btn, n + " \u4EBA\u5BF9\u5C40", 30);
            (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
              error: Error()
            }), setPos) : setPos)(bl.node, 0, 0);
            (_crd && onTap === void 0 ? (_reportPossibleCrUseOfonTap({
              error: Error()
            }), onTap) : onTap)(btn, _this, () => _this.startMatching(n));
          };

          for (var i = 0; i < counts.length; i++) {
            _loop();
          }
        } // ---------------- 模拟匹配 ----------------


        buildMatch() {
          this.matchRoot = (_crd && makeNode === void 0 ? (_reportPossibleCrUseOfmakeNode({
            error: Error()
          }), makeNode) : makeNode)('Match', this.node);
          var t = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
            error: Error()
          }), makeLabel) : makeLabel)(this.matchRoot, '匹配中…', 36, new Color(200, 220, 255, 255));
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(t.node, 0, 380);

          for (var i = 0; i < 8; i++) {
            var slot = (_crd && makeRect === void 0 ? (_reportPossibleCrUseOfmakeRect({
              error: Error()
            }), makeRect) : makeRect)("slot" + i, this.matchRoot, 150, 54, new Color(40, 44, 56, 255), 8);
            var row = Math.floor(i / 4),
                col = i % 4;
            (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
              error: Error()
            }), setPos) : setPos)(slot, (col - 1.5) * 170, 260 - row * 76);
            var lb = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
              error: Error()
            }), makeLabel) : makeLabel)(slot, '等待中', 18, new Color(120, 120, 120, 255));
            (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
              error: Error()
            }), setPos) : setPos)(lb.node, 0, 0);
            this.slotLabels.push(lb);
          }
        }

        startMatching(count) {
          var _this2 = this;

          this.playerCount = count;
          this.homeRoot.active = false;
          this.matchRoot.active = true;

          for (var i = 0; i < this.slotLabels.length; i++) {
            var lb = this.slotLabels[i];
            lb.node.parent.active = i < count; // 只显示本局人数的槽位

            lb.string = '等待中';
            lb.color = new Color(120, 120, 120, 255);
          }

          var names = ['你'].concat((_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).BOT_NAMES.slice(0, count - 1));

          var _loop2 = function _loop2(_i) {
            _this2.scheduleOnce(() => {
              _this2.slotLabels[_i].string = names[_i];
              _this2.slotLabels[_i].color = _i === 0 ? new Color(120, 220, 255, 255) : Color.WHITE;
            }, 0.3 * (_i + 1));
          };

          for (var _i = 0; _i < count; _i++) {
            _loop2(_i);
          }

          this.scheduleOnce(() => this.startGame(), 0.3 * count + 0.6);
        } // ---------------- 进入游戏 / 重开 ----------------


        startGame() {
          this.matchRoot.active = false;

          if (this.gameRoot) {
            this.gameRoot.destroy();
            this.gameRoot = null;
          }

          this.gameRoot = (_crd && makeNode === void 0 ? (_reportPossibleCrUseOfmakeNode({
            error: Error()
          }), makeNode) : makeNode)('GameRoot', this.node);
          var gm = this.gameRoot.addComponent(_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager);
          gm.newMatch(this.playerCount);
          var gv = this.gameRoot.addComponent(_crd && GameView === void 0 ? (_reportPossibleCrUseOfGameView({
            error: Error()
          }), GameView) : GameView);
          gv.init(gm);
          gm.beginPrep();
        }
        /** 终局「再来一局」：销毁本局，回到首页 */


        restart() {
          if (this.gameRoot) {
            this.gameRoot.destroy();
            this.gameRoot = null;
          }

          this.homeRoot.active = true;
        }

      }, _class2.inst = null, _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=eb9f7f9c3695532bf9ddb7fd59473461ad735ecf.js.map