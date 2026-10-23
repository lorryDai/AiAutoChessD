System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Color, Node, EQUIP, makeLabel, makeNode, makeRect, onTap, setPos, Dialogs, _crd;

  function _reportPossibleCrUseOfBattleResult(extras) {
    _reporterNs.report("BattleResult", "../core/GameManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCombineAsk(extras) {
    _reporterNs.report("CombineAsk", "../core/GameManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPlayerState(extras) {
    _reporterNs.report("PlayerState", "../core/Models", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEQUIP(extras) {
    _reporterNs.report("EQUIP", "../data/GameConfig", _context.meta, extras);
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

  _export("Dialogs", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Color = _cc.Color;
      Node = _cc.Node;
    }, function (_unresolved_2) {
      EQUIP = _unresolved_2.EQUIP;
    }, function (_unresolved_3) {
      makeLabel = _unresolved_3.makeLabel;
      makeNode = _unresolved_3.makeNode;
      makeRect = _unresolved_3.makeRect;
      onTap = _unresolved_3.onTap;
      setPos = _unresolved_3.setPos;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "390bf5VtONLc653SCqV/twW", "Dialogs", undefined);

      __checkObsolete__(['Color', 'EventTouch', 'Label', 'Node']);

      /** 通用模态弹窗：合成确认 / 战斗结算 / 淘汰 / 终局排名 */
      _export("Dialogs", Dialogs = class Dialogs {
        constructor() {
          this.root = void 0;
          this.panel = void 0;
          this.title = void 0;
          this.body = void 0;
          this.btnRow = void 0;
        }

        build(parent) {
          this.root = (_crd && makeNode === void 0 ? (_reportPossibleCrUseOfmakeNode({
            error: Error()
          }), makeNode) : makeNode)('Dialogs', parent, 720, 1280);
          var mask = (_crd && makeRect === void 0 ? (_reportPossibleCrUseOfmakeRect({
            error: Error()
          }), makeRect) : makeRect)('mask', this.root, 720, 1280, new Color(0, 0, 0, 170), 0); // 拦截触摸，防止点到弹窗下方的卡牌/棋子

          for (var t of [Node.EventType.TOUCH_START, Node.EventType.TOUCH_MOVE, Node.EventType.TOUCH_END, Node.EventType.TOUCH_CANCEL]) {
            mask.on(t, e => {
              e.propagationStopped = true;
            }, this);
          }

          this.panel = (_crd && makeRect === void 0 ? (_reportPossibleCrUseOfmakeRect({
            error: Error()
          }), makeRect) : makeRect)('panel', this.root, 600, 620, new Color(38, 40, 52, 255), 12);
          this.title = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
            error: Error()
          }), makeLabel) : makeLabel)(this.panel, '', 30, new Color(255, 220, 120, 255), 'title');
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(this.title.node, 0, 268);
          this.body = (_crd && makeNode === void 0 ? (_reportPossibleCrUseOfmakeNode({
            error: Error()
          }), makeNode) : makeNode)('body', this.panel);
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(this.body, 0, 30);
          this.btnRow = (_crd && makeNode === void 0 ? (_reportPossibleCrUseOfmakeNode({
            error: Error()
          }), makeNode) : makeNode)('btns', this.panel);
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(this.btnRow, 0, -258);
          this.root.active = false;
        }

        showBase(title, buildBody, buttons) {
          this.body.removeAllChildren();
          this.btnRow.removeAllChildren();
          this.title.string = title;
          buildBody(this.body);
          var totalW = buttons.length * 180;
          buttons.forEach((b, i) => {
            var btn = (_crd && makeRect === void 0 ? (_reportPossibleCrUseOfmakeRect({
              error: Error()
            }), makeRect) : makeRect)("btn" + i, this.btnRow, 160, 52, b.color, 8);
            (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
              error: Error()
            }), setPos) : setPos)(btn, (i - (buttons.length - 1) / 2) * 190, 0);
            var lb = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
              error: Error()
            }), makeLabel) : makeLabel)(btn, b.text, 20);
            (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
              error: Error()
            }), setPos) : setPos)(lb.node, 0, 0);
            (_crd && onTap === void 0 ? (_reportPossibleCrUseOfonTap({
              error: Error()
            }), onTap) : onTap)(btn, this, () => {
              this.root.active = false;
              b.cb();
            });
          });
          this.root.active = true;
        }
        /** 装备合成确认 */


        showCombine(ask, fromDesc, onConfirm) {
          var eb = (_crd && EQUIP === void 0 ? (_reportPossibleCrUseOfEQUIP({
            error: Error()
          }), EQUIP) : EQUIP)[ask.result];
          this.showBase('装备合成预览', body => {
            var l1 = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
              error: Error()
            }), makeLabel) : makeLabel)(body, fromDesc, 18, Color.WHITE);
            (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
              error: Error()
            }), setPos) : setPos)(l1.node, 0, 60);
            var arrow = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
              error: Error()
            }), makeLabel) : makeLabel)(body, '↓ 合成为 ↓', 18, new Color(180, 180, 180, 255));
            (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
              error: Error()
            }), setPos) : setPos)(arrow.node, 0, 20);
            var l2 = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
              error: Error()
            }), makeLabel) : makeLabel)(body, eb.name + "\uFF08\u88C5\u5907" + eb.key + "\uFF09", 24, new Color(216, 180, 255, 255));
            (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
              error: Error()
            }), setPos) : setPos)(l2.node, 0, -20);
            var l3 = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
              error: Error()
            }), makeLabel) : makeLabel)(body, eb.desc, 15, new Color(200, 200, 200, 255));
            (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
              error: Error()
            }), setPos) : setPos)(l3.node, 0, -60);
          }, [{
            text: '确认合成',
            color: new Color(70, 160, 90, 255),
            cb: onConfirm
          }, {
            text: '取消',
            color: new Color(120, 70, 70, 255),
            cb: () => {}
          }]);
        }

        buildStats(body, result) {
          var head = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
            error: Error()
          }), makeLabel) : makeLabel)(body, "\u56DE\u5408 " + result.round + " \xB7 \u5BF9\u624B " + result.oppName, 18, new Color(200, 200, 200, 255));
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(head.node, 0, 210);
          var col = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
            error: Error()
          }), makeLabel) : makeLabel)(body, '棋子            伤害 / 承伤 / 治疗', 15, new Color(150, 150, 150, 255));
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(col.node, 0, 180);
          var lines = result.stats.filter(s => s.side === 0).concat(result.stats.filter(s => s.side === 1));
          lines.slice(0, 14).forEach((s, i) => {
            var tag = s.side === 0 ? '' : '[敌] ';
            var lb = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
              error: Error()
            }), makeLabel) : makeLabel)(body, "" + tag + s.name + "\uFF1A" + s.dmg + " / " + s.taken + " / " + s.heal, 15, s.side === 0 ? Color.WHITE : new Color(255, 160, 160, 255));
            (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
              error: Error()
            }), setPos) : setPos)(lb.node, 0, 152 - i * 26);
          });
        }
        /** 战斗结算 */


        showResult(result, onClose) {
          var title = result.won === null ? '平局（双方扣血）' : result.won ? '战斗胜利！' : '战斗失败';
          this.showBase(title, body => this.buildStats(body, result), [{
            text: '确定',
            color: new Color(70, 110, 200, 255),
            cb: onClose
          }]);
        }
        /** 玩家被淘汰 */


        showElimination(result, onClose) {
          this.showBase('你被淘汰了', body => this.buildStats(body, result), [{
            text: '查看最终排名',
            color: new Color(160, 80, 80, 255),
            cb: onClose
          }]);
        }
        /** 终局排名 */


        showGameOver(players, won, onRestart) {
          this.showBase(won ? '🏆 最终胜利！' : '游戏结束', body => {
            players.forEach((p, i) => {
              var hpText = p.alive ? "HP " + p.hp : '已淘汰';
              var lb = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
                error: Error()
              }), makeLabel) : makeLabel)(body, i + 1 + ". " + p.name + "  " + hpText + "  \u88C5\u5907\uFF1A" + p.equipSummary(), 15, p.isBot ? Color.WHITE : new Color(120, 220, 255, 255));
              (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
                error: Error()
              }), setPos) : setPos)(lb.node, 0, 190 - i * 42);
            });
          }, [{
            text: '再来一局',
            color: new Color(70, 160, 90, 255),
            cb: onRestart
          }]);
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d64ec864377e6fbe819692b79811e7a4e7684c25.js.map