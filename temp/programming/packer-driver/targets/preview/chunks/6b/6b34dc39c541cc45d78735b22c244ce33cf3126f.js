System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Color, Graphics, Label, Layers, Node, resources, Sprite, SpriteFrame, UITransform, EquipType, EQUIP, PIECE_BASE, _crd, sfCache;

  /** 统一创建 UI_2D 层的节点 */

  /** 简单点击（TOUCH_END 触发） */
  function makeNode(name, parent, w, h) {
    if (w === void 0) {
      w = 0;
    }

    if (h === void 0) {
      h = 0;
    }

    var n = new Node(name);
    n.layer = Layers.Enum.UI_2D;
    parent.addChild(n);
    var ut = n.addComponent(UITransform);
    ut.setContentSize(w, h);
    return n;
  }

  function makeRect(name, parent, w, h, color, radius) {
    if (radius === void 0) {
      radius = 6;
    }

    var n = makeNode(name, parent, w, h);
    var g = n.addComponent(Graphics);
    g.fillColor = color;
    if (radius > 0) g.roundRect(-w / 2, -h / 2, w, h, radius);else g.rect(-w / 2, -h / 2, w, h);
    g.fill();
    return n;
  }

  function makeLabel(parent, text, size, color, name) {
    if (size === void 0) {
      size = 18;
    }

    if (color === void 0) {
      color = Color.WHITE;
    }

    if (name === void 0) {
      name = 'Label';
    }

    var n = makeNode(name, parent, 0, 0);
    var lb = n.addComponent(Label);
    lb.string = text;
    lb.fontSize = size;
    lb.lineHeight = size + 4;
    lb.color = color;
    lb.horizontalAlign = Label.HorizontalAlign.CENTER;
    lb.verticalAlign = Label.VerticalAlign.CENTER;
    lb.overflow = Label.Overflow.SHRINK;
    n.getComponent(UITransform).setContentSize(400, size + 8);
    return lb;
  }

  function setPos(n, x, y) {
    n.setPosition(x, y, 0);
  }

  function onTap(n, target, cb) {
    n.on(Node.EventType.TOUCH_END, () => cb(), target);
  }

  function pieceColor(t) {
    var c = (_crd && PIECE_BASE === void 0 ? (_reportPossibleCrUseOfPIECE_BASE({
      error: Error()
    }), PIECE_BASE) : PIECE_BASE)[t].color;
    return new Color(c[0], c[1], c[2], 255);
  }

  function equipColor(e) {
    if (e <= (_crd && EquipType === void 0 ? (_reportPossibleCrUseOfEquipType({
      error: Error()
    }), EquipType) : EquipType).D) return new Color(120, 84, 50, 255); // 基础装备：棕

    return new Color(128, 90, 200, 255); // 合成装备：紫
  }

  /** 从 resources 异步加载贴图（带缓存；加载失败时静默回退为纯色底） */
  function loadSprite(path, apply) {
    var hit = sfCache[path];

    if (hit) {
      apply(hit);
      return;
    }

    resources.load(path + "/spriteFrame", SpriteFrame, (err, sf) => {
      if (err) {
        sfCache[path] = null;
        return;
      }

      sfCache[path] = sf;
      apply(sf);
    });
  }
  /** 给节点挂一张异步加载的图标 */


  function addIcon(parent, path, size, y) {
    if (y === void 0) {
      y = 0;
    }

    var icon = makeNode('icon', parent, size, size);
    setPos(icon, 0, y);
    var sp = icon.addComponent(Sprite);
    loadSprite(path, sf => {
      if (icon.isValid) sp.spriteFrame = sf;
    });
  }
  /** 棋子圆形头像：AI 图标 + 类型字 + 星级 + 装备字母 */


  function makePieceNode(parent, type, star, equips, r) {
    if (r === void 0) {
      r = 34;
    }

    var n = makeNode('piece', parent, r * 2, r * 2);
    var g = n.addComponent(Graphics);
    g.fillColor = pieceColor(type);
    g.circle(0, 0, r);
    g.fill();
    addIcon(n, "textures/piece_" + type, r * 2 - 4);
    var g2 = n.addComponent(Graphics);
    g2.strokeColor = star >= 3 ? new Color(255, 215, 0, 255) : star === 2 ? new Color(192, 192, 192, 255) : new Color(40, 40, 40, 255);
    g2.lineWidth = star > 1 ? 4 : 2;
    g2.circle(0, 0, r);
    g2.stroke();
    var key = makeLabel(n, (_crd && PIECE_BASE === void 0 ? (_reportPossibleCrUseOfPIECE_BASE({
      error: Error()
    }), PIECE_BASE) : PIECE_BASE)[type].key, 18, Color.WHITE, 'key');
    setPos(key.node, 0, -r * 0.55);

    if (star > 1) {
      var s = makeLabel(n, '★'.repeat(star), 14, new Color(255, 215, 0, 255), 'star');
      setPos(s.node, 0, r + 10);
    }

    if (equips.length > 0) {
      var eq = makeLabel(n, equips.map(e => (_crd && EQUIP === void 0 ? (_reportPossibleCrUseOfEQUIP({
        error: Error()
      }), EQUIP) : EQUIP)[e].key).join(''), 13, new Color(200, 180, 255, 255), 'equips');
      setPos(eq.node, 0, -r - 10);
    }

    return n;
  }
  /** 卡牌节点：棋子卡 / 装备卡 / 金币卡 */


  function makeCardNode(parent, kind, opt) {
    var _opt$w, _opt$h, _opt$star;

    var w = (_opt$w = opt.w) != null ? _opt$w : 58,
        h = (_opt$h = opt.h) != null ? _opt$h : 78;
    var bg;
    if (kind === 'piece') bg = pieceColor(opt.piece);else if (kind === 'equip') bg = equipColor(opt.equip);else bg = new Color(218, 165, 32, 255);
    var n = makeRect('card', parent, w, h, bg, 8); // 边框：星级/合成装备高亮

    var g = n.addComponent(Graphics);
    g.lineWidth = 2;
    g.strokeColor = kind === 'piece' && ((_opt$star = opt.star) != null ? _opt$star : 1) > 1 || kind === 'equip' && opt.equip > (_crd && EquipType === void 0 ? (_reportPossibleCrUseOfEquipType({
      error: Error()
    }), EquipType) : EquipType).D ? new Color(255, 215, 0, 255) : new Color(30, 30, 30, 255);
    g.roundRect(-w / 2, -h / 2, w, h, 8);
    g.stroke();

    if (kind === 'piece') {
      var _opt$star2;

      addIcon(n, "textures/piece_" + opt.piece, w - 14, 12);
      var nm = makeLabel(n, (_crd && PIECE_BASE === void 0 ? (_reportPossibleCrUseOfPIECE_BASE({
        error: Error()
      }), PIECE_BASE) : PIECE_BASE)[opt.piece].name, 14, Color.WHITE, 'n');
      setPos(nm.node, 0, -18);

      if (((_opt$star2 = opt.star) != null ? _opt$star2 : 1) > 1) {
        var s = makeLabel(n, '★'.repeat(opt.star), 12, new Color(255, 215, 0, 255), 's');
        setPos(s.node, 0, -28);
      }
    } else if (kind === 'equip') {
      var t = makeLabel(n, (_crd && EQUIP === void 0 ? (_reportPossibleCrUseOfEQUIP({
        error: Error()
      }), EQUIP) : EQUIP)[opt.equip].key, 26, Color.WHITE, 't');
      setPos(t.node, 0, 12);

      var _nm = makeLabel(n, (_crd && EQUIP === void 0 ? (_reportPossibleCrUseOfEQUIP({
        error: Error()
      }), EQUIP) : EQUIP)[opt.equip].name, 12, Color.WHITE, 'n');

      setPos(_nm.node, 0, -14);
    } else {
      var _t = makeLabel(n, '+1', 24, new Color(60, 40, 0, 255), 't');

      setPos(_t.node, 0, 10);

      var _nm2 = makeLabel(n, '金币', 14, new Color(60, 40, 0, 255), 'n');

      setPos(_nm2.node, 0, -14);
    }

    return n;
  }

  function _reportPossibleCrUseOfEquipType(extras) {
    _reporterNs.report("EquipType", "../data/GameTypes", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPieceType(extras) {
    _reporterNs.report("PieceType", "../data/GameTypes", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEQUIP(extras) {
    _reporterNs.report("EQUIP", "../data/GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPIECE_BASE(extras) {
    _reporterNs.report("PIECE_BASE", "../data/GameConfig", _context.meta, extras);
  }

  _export({
    makeNode: makeNode,
    makeRect: makeRect,
    makeLabel: makeLabel,
    setPos: setPos,
    onTap: onTap,
    pieceColor: pieceColor,
    equipColor: equipColor,
    loadSprite: loadSprite,
    addIcon: addIcon,
    makePieceNode: makePieceNode,
    makeCardNode: makeCardNode
  });

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Color = _cc.Color;
      Graphics = _cc.Graphics;
      Label = _cc.Label;
      Layers = _cc.Layers;
      Node = _cc.Node;
      resources = _cc.resources;
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
      UITransform = _cc.UITransform;
    }, function (_unresolved_2) {
      EquipType = _unresolved_2.EquipType;
    }, function (_unresolved_3) {
      EQUIP = _unresolved_3.EQUIP;
      PIECE_BASE = _unresolved_3.PIECE_BASE;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "20805Q8W6lGerIYQ8DbLFrI", "UIFactory", undefined);

      __checkObsolete__(['Color', 'EventTouch', 'Graphics', 'Label', 'Layers', 'Node', 'resources', 'Sprite', 'SpriteFrame', 'UITransform']);

      sfCache = {};

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=6b34dc39c541cc45d78735b22c244ce33cf3126f.js.map