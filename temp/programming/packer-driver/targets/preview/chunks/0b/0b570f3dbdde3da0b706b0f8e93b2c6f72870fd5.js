System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Color, Component, Graphics, UIOpacity, UITransform, Vec3, tween, CFG, makeLabel, makeNode, makePieceNode, makeRect, setPos, _dec, _class, _class2, _crd, ccclass, BoardView;

  function _reportPossibleCrUseOfBoardPiece(extras) {
    _reporterNs.report("BoardPiece", "../data/GameTypes", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCFG(extras) {
    _reporterNs.report("CFG", "../data/GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBattleSim(extras) {
    _reporterNs.report("BattleSim", "../core/Battle", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBattleUnit(extras) {
    _reporterNs.report("BattleUnit", "../core/Battle", _context.meta, extras);
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
      Graphics = _cc.Graphics;
      UIOpacity = _cc.UIOpacity;
      UITransform = _cc.UITransform;
      Vec3 = _cc.Vec3;
      tween = _cc.tween;
    }, function (_unresolved_2) {
      CFG = _unresolved_2.CFG;
    }, function (_unresolved_3) {
      makeLabel = _unresolved_3.makeLabel;
      makeNode = _unresolved_3.makeNode;
      makePieceNode = _unresolved_3.makePieceNode;
      makeRect = _unresolved_3.makeRect;
      setPos = _unresolved_3.setPos;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "02e16gL5YNKJpLN0CiC1od7", "BoardView", undefined);

      __checkObsolete__(['_decorator', 'Color', 'Component', 'Graphics', 'Label', 'Node', 'UIOpacity', 'UITransform', 'Vec3', 'tween']);

      ({
        ccclass
      } = _decorator);

      /** 棋盘视图：准备阶段渲染我方棋子（可拖拽），战斗阶段渲染双方战斗演出 */
      _export("BoardView", BoardView = (_dec = ccclass('BoardView'), _dec(_class = (_class2 = class BoardView extends Component {
        constructor() {
          super(...arguments);
          this.pieceRoot = null;
          this.sim = null;
          this.unitViews = new Map();

          /** 由 GameView 注入：给棋子节点挂上拖拽 */
          this.attachDrag = null;
        }

        build() {
          var W = (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).COLS * BoardView.CELL,
              H = (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).ROWS * BoardView.CELL;
          this.node.getComponent(UITransform).setContentSize(W, H);
          var grid = (_crd && makeNode === void 0 ? (_reportPossibleCrUseOfmakeNode({
            error: Error()
          }), makeNode) : makeNode)('grid', this.node, W, H);
          var g = grid.addComponent(Graphics);

          for (var r = 0; r < (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).ROWS; r++) {
            for (var c = 0; c < (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).COLS; c++) {
              var own = r >= (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
                error: Error()
              }), CFG) : CFG).OWN_ROW_MIN;
              g.fillColor = own ? new Color(40, 56, 46, 255) : new Color(58, 42, 42, 255);
              var p = this.cellToLocal(c, r);
              g.rect(p.x - 40, p.y - 40, 80, 80);
              g.fill();
            }
          } // 中线


          g.fillColor = new Color(200, 200, 200, 120);
          g.rect(-W / 2, -1, W, 2);
          g.fill();
          this.pieceRoot = (_crd && makeNode === void 0 ? (_reportPossibleCrUseOfmakeNode({
            error: Error()
          }), makeNode) : makeNode)('pieces', this.node, W, H);
        }

        cellToLocal(col, row) {
          return {
            x: (col - ((_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).COLS - 1) / 2) * BoardView.CELL,
            y: (((_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).ROWS - 1) / 2 - row) * BoardView.CELL
          };
        }
        /** 世界/UI 坐标 → 棋盘格子；越界返回 null */


        worldToCell(wx, wy) {
          var ut = this.node.getComponent(UITransform);
          var local = ut.convertToNodeSpaceAR(new Vec3(wx, wy, 0));
          var col = Math.round(local.x / BoardView.CELL + ((_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).COLS - 1) / 2);
          var row = Math.round(((_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).ROWS - 1) / 2 - local.y / BoardView.CELL);
          if (col < 0 || col >= (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).COLS || row < 0 || row >= (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).ROWS) return null;
          return {
            col,
            row
          };
        }
        /** 某 UI 坐标处是否有我方棋子（用于装备拖放目标判定） */


        pieceAtWorld(board, wx, wy) {
          var cell = this.worldToCell(wx, wy);
          if (!cell) return null;
          return board.find(b => b.col === cell.col && b.row === cell.row) || null;
        } // ---------------- 准备阶段 ----------------


        renderPrep(board) {
          this.sim = null;
          this.unitViews.clear();
          this.pieceRoot.removeAllChildren();

          for (var p of board) {
            var n = (_crd && makePieceNode === void 0 ? (_reportPossibleCrUseOfmakePieceNode({
              error: Error()
            }), makePieceNode) : makePieceNode)(this.pieceRoot, p.type, p.star, p.equips);
            var pos = this.cellToLocal(p.col, p.row);
            (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
              error: Error()
            }), setPos) : setPos)(n, pos.x, pos.y);
            if (this.attachDrag) this.attachDrag(n, {
              type: 'board',
              uid: p.uid
            });
          }
        } // ---------------- 战斗演出 ----------------


        enterBattle(sim) {
          this.sim = sim;
          this.unitViews.clear();
          this.pieceRoot.removeAllChildren();

          for (var u of sim.units) {
            var n = (_crd && makePieceNode === void 0 ? (_reportPossibleCrUseOfmakePieceNode({
              error: Error()
            }), makePieceNode) : makePieceNode)(this.pieceRoot, u.type, u.star, u.equips, 30); // 敌方棋子加红圈

            if (u.side === 1) {
              var g = n.addComponent(Graphics);
              g.strokeColor = new Color(255, 60, 60, 255);
              g.lineWidth = 3;
              g.circle(0, 0, 33);
              g.stroke();
            } // 血条


            var barBg = (_crd && makeNode === void 0 ? (_reportPossibleCrUseOfmakeNode({
              error: Error()
            }), makeNode) : makeNode)('hpbg', n, 56, 6);
            var bg = barBg.addComponent(Graphics);
            bg.fillColor = new Color(20, 20, 20, 255);
            bg.rect(-28, -3, 56, 6);
            bg.fill();
            (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
              error: Error()
            }), setPos) : setPos)(barBg, 0, 44);
            var fill = (_crd && makeNode === void 0 ? (_reportPossibleCrUseOfmakeNode({
              error: Error()
            }), makeNode) : makeNode)('hpfill', barBg, 54, 4);
            fill.getComponent(UITransform).setAnchorPoint(0, 0.5);
            var fg = fill.addComponent(Graphics);
            fg.fillColor = u.side === 0 ? new Color(80, 220, 100, 255) : new Color(230, 70, 70, 255);
            fg.rect(0, -2, 54, 4);
            fg.fill();
            (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
              error: Error()
            }), setPos) : setPos)(fill, -27, 0); // 蓝条

            var manaBg = (_crd && makeNode === void 0 ? (_reportPossibleCrUseOfmakeNode({
              error: Error()
            }), makeNode) : makeNode)('manabg', n, 56, 4);
            var mg = manaBg.addComponent(Graphics);
            mg.fillColor = new Color(20, 20, 20, 255);
            mg.rect(-28, -2, 56, 4);
            mg.fill();
            (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
              error: Error()
            }), setPos) : setPos)(manaBg, 0, 37);
            var manaFill = (_crd && makeNode === void 0 ? (_reportPossibleCrUseOfmakeNode({
              error: Error()
            }), makeNode) : makeNode)('manafill', manaBg, 54, 2);
            manaFill.getComponent(UITransform).setAnchorPoint(0, 0.5);
            var mf = manaFill.addComponent(Graphics);
            mf.fillColor = new Color(60, 130, 255, 255);
            mf.rect(0, -1, 54, 2);
            mf.fill();
            (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
              error: Error()
            }), setPos) : setPos)(manaFill, -27, 0); // HP 数值

            var hpText = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
              error: Error()
            }), makeLabel) : makeLabel)(n, '', 11, Color.WHITE, 'hptext');
            (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
              error: Error()
            }), setPos) : setPos)(hpText.node, 0, 55);
            var op = n.addComponent(UIOpacity);
            this.unitViews.set(u, {
              node: n,
              hpFill: fill,
              manaFill,
              hpText,
              op,
              lungeT: 0,
              lungeX: 0,
              lungeY: 0,
              flashT: 0
            });
          }
        }

        exitBattle() {
          this.sim = null;
          this.unitViews.clear();
        }

        update(dt) {
          if (!this.sim) return;
          this.drainEvents();

          for (var [u, v] of this.unitViews) {
            if (!u.alive) {
              v.node.active = false;
              continue;
            } // 基础位置


            var px = (u.x - ((_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).COLS - 1) / 2) * BoardView.CELL;
            var py = (((_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).ROWS - 1) / 2 - u.y) * BoardView.CELL; // 攻击前冲偏移

            if (v.lungeT > 0) {
              v.lungeT -= dt;
              var k = Math.sin(Math.max(0, v.lungeT) / 0.18 * Math.PI) * 10;
              px += v.lungeX * k;
              py += v.lungeY * k;
            }

            (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
              error: Error()
            }), setPos) : setPos)(v.node, px, py); // 受击闪烁

            if (v.flashT > 0) {
              v.flashT -= dt;
              v.op.opacity = 110 + 145 * (1 - Math.max(0, v.flashT) / 0.2);
            } else if (v.op.opacity !== 255) {
              v.op.opacity = 255;
            } // 血条 / 蓝条 / HP 文字


            v.hpFill.setScale(Math.max(0, u.hp / u.maxHp), 1, 1);
            v.manaFill.setScale(Math.max(0, Math.min(1, u.mana / u.maxMana)), 1, 1);
            v.hpText.string = Math.ceil(u.hp) + "/" + Math.ceil(u.maxHp);
          }
        }

        drainEvents() {
          var sim = this.sim;
          if (sim.events.length === 0) return;
          var list = sim.events.splice(0, sim.events.length);

          for (var ev of list) {
            var v = this.unitViews.get(ev.u);

            if (ev.type === 'attack') {
              var tv = ev.t ? this.unitViews.get(ev.t) : null;

              if (v && tv) {
                var dx = tv.node.position.x - v.node.position.x;
                var dy = tv.node.position.y - v.node.position.y;
                var len = Math.hypot(dx, dy) || 1;
                v.lungeX = dx / len;
                v.lungeY = dy / len;
                v.lungeT = 0.18;
                if (ev.u.range > 1) this.spawnProjectile(v.node.position, tv.node.position);
              }
            } else if (ev.type === 'hurt' && v) {
              var _ev$val;

              v.flashT = 0.2;
              this.floatText(v.node.position, "-" + ((_ev$val = ev.val) != null ? _ev$val : 0), new Color(255, 90, 90, 255));
            } else if (ev.type === 'heal' && v) {
              var _ev$val2;

              this.floatText(v.node.position, "+" + ((_ev$val2 = ev.val) != null ? _ev$val2 : 0), new Color(81, 224, 108, 255));
            } else if (ev.type === 'skill' && v) {
              this.shout(v.node.position);
            }
          }
        }

        floatText(pos, str, color) {
          var lb = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
            error: Error()
          }), makeLabel) : makeLabel)(this.pieceRoot, str, 20, color, 'ft');
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(lb.node, pos.x + (Math.random() * 16 - 8), pos.y + 44);
          var op = lb.node.addComponent(UIOpacity);
          tween(lb.node).to(0.6, {
            position: new Vec3(pos.x, pos.y + 84, 0)
          }).start();
          tween(op).delay(0.35).to(0.25, {
            opacity: 0
          }).call(() => lb.node.destroy()).start();
        }

        shout(pos) {
          var lb = (_crd && makeLabel === void 0 ? (_reportPossibleCrUseOfmakeLabel({
            error: Error()
          }), makeLabel) : makeLabel)(this.pieceRoot, '大招!', 26, new Color(255, 215, 94, 255), 'shout');
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(lb.node, pos.x, pos.y + 64);
          lb.node.setScale(0.4, 0.4, 1);
          var op = lb.node.addComponent(UIOpacity);
          tween(lb.node).to(0.12, {
            scale: new Vec3(1.15, 1.15, 1)
          }).to(0.08, {
            scale: new Vec3(1, 1, 1)
          }).start();
          tween(op).delay(0.55).to(0.2, {
            opacity: 0
          }).call(() => lb.node.destroy()).start();
        }

        spawnProjectile(from, to) {
          var p = (_crd && makeRect === void 0 ? (_reportPossibleCrUseOfmakeRect({
            error: Error()
          }), makeRect) : makeRect)('proj', this.pieceRoot, 12, 12, new Color(255, 224, 138, 255), 6);
          (_crd && setPos === void 0 ? (_reportPossibleCrUseOfsetPos({
            error: Error()
          }), setPos) : setPos)(p, from.x, from.y);
          tween(p).to(0.12, {
            position: new Vec3(to.x, to.y, 0)
          }).call(() => p.destroy()).start();
        }

      }, _class2.CELL = 84, _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=0b570f3dbdde3da0b706b0f8e93b2c6f72870fd5.js.map