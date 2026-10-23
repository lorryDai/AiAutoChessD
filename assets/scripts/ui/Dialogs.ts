import { Color, EventTouch, Label, Node } from 'cc';
import { BattleResult, CombineAsk } from '../core/GameManager';
import { PlayerState } from '../core/Models';
import { EQUIP } from '../data/GameConfig';
import { makeLabel, makeNode, makeRect, onTap, setPos } from './UIFactory';

interface BtnDef { text: string; color: Color; cb: () => void; }

/** 通用模态弹窗：合成确认 / 战斗结算 / 淘汰 / 终局排名 */
export class Dialogs {
  root!: Node;
  private panel!: Node;
  private title!: Label;
  private body!: Node;
  private btnRow!: Node;

  build(parent: Node): void {
    this.root = makeNode('Dialogs', parent, 720, 1280);
    const mask = makeRect('mask', this.root, 720, 1280, new Color(0, 0, 0, 170), 0);
    // 拦截触摸，防止点到弹窗下方的卡牌/棋子
    for (const t of [Node.EventType.TOUCH_START, Node.EventType.TOUCH_MOVE, Node.EventType.TOUCH_END, Node.EventType.TOUCH_CANCEL]) {
      mask.on(t, (e: EventTouch) => { e.propagationStopped = true; }, this);
    }
    this.panel = makeRect('panel', this.root, 600, 620, new Color(38, 40, 52, 255), 12);
    this.title = makeLabel(this.panel, '', 30, new Color(255, 220, 120, 255), 'title');
    setPos(this.title.node, 0, 268);
    this.body = makeNode('body', this.panel);
    setPos(this.body, 0, 30);
    this.btnRow = makeNode('btns', this.panel);
    setPos(this.btnRow, 0, -258);
    this.root.active = false;
  }

  private showBase(title: string, buildBody: (body: Node) => void, buttons: BtnDef[]): void {
    this.body.removeAllChildren();
    this.btnRow.removeAllChildren();
    this.title.string = title;
    buildBody(this.body);
    const totalW = buttons.length * 180;
    buttons.forEach((b, i) => {
      const btn = makeRect(`btn${i}`, this.btnRow, 160, 52, b.color, 8);
      setPos(btn, (i - (buttons.length - 1) / 2) * 190, 0);
      const lb = makeLabel(btn, b.text, 20);
      setPos(lb.node, 0, 0);
      onTap(btn, this, () => { this.root.active = false; b.cb(); });
    });
    this.root.active = true;
  }

  /** 装备合成确认 */
  showCombine(ask: CombineAsk, fromDesc: string, onConfirm: () => void): void {
    const eb = EQUIP[ask.result];
    this.showBase('装备合成预览', (body) => {
      const l1 = makeLabel(body, fromDesc, 18, Color.WHITE);
      setPos(l1.node, 0, 60);
      const arrow = makeLabel(body, '↓ 合成为 ↓', 18, new Color(180, 180, 180, 255));
      setPos(arrow.node, 0, 20);
      const l2 = makeLabel(body, `${eb.name}（装备${eb.key}）`, 24, new Color(216, 180, 255, 255));
      setPos(l2.node, 0, -20);
      const l3 = makeLabel(body, eb.desc, 15, new Color(200, 200, 200, 255));
      setPos(l3.node, 0, -60);
    }, [
      { text: '确认合成', color: new Color(70, 160, 90, 255), cb: onConfirm },
      { text: '取消', color: new Color(120, 70, 70, 255), cb: () => {} },
    ]);
  }

  private buildStats(body: Node, result: BattleResult): void {
    const head = makeLabel(body, `回合 ${result.round} · 对手 ${result.oppName}`, 18, new Color(200, 200, 200, 255));
    setPos(head.node, 0, 210);
    const col = makeLabel(body, '棋子            伤害 / 承伤 / 治疗', 15, new Color(150, 150, 150, 255));
    setPos(col.node, 0, 180);
    const lines = result.stats.filter(s => s.side === 0).concat(result.stats.filter(s => s.side === 1));
    lines.slice(0, 14).forEach((s, i) => {
      const tag = s.side === 0 ? '' : '[敌] ';
      const lb = makeLabel(body, `${tag}${s.name}：${s.dmg} / ${s.taken} / ${s.heal}`, 15,
        s.side === 0 ? Color.WHITE : new Color(255, 160, 160, 255));
      setPos(lb.node, 0, 152 - i * 26);
    });
  }

  /** 战斗结算 */
  showResult(result: BattleResult, onClose: () => void): void {
    const title = result.won === null ? '平局（双方扣血）' : result.won ? '战斗胜利！' : '战斗失败';
    this.showBase(title, (body) => this.buildStats(body, result), [
      { text: '确定', color: new Color(70, 110, 200, 255), cb: onClose },
    ]);
  }

  /** 玩家被淘汰 */
  showElimination(result: BattleResult, onClose: () => void): void {
    this.showBase('你被淘汰了', (body) => this.buildStats(body, result), [
      { text: '查看最终排名', color: new Color(160, 80, 80, 255), cb: onClose },
    ]);
  }

  /** 终局排名 */
  showGameOver(players: PlayerState[], won: boolean, onRestart: () => void): void {
    this.showBase(won ? '🏆 最终胜利！' : '游戏结束', (body) => {
      players.forEach((p, i) => {
        const hpText = p.alive ? `HP ${p.hp}` : '已淘汰';
        const lb = makeLabel(body, `${i + 1}. ${p.name}  ${hpText}  装备：${p.equipSummary()}`, 15,
          p.isBot ? Color.WHITE : new Color(120, 220, 255, 255));
        setPos(lb.node, 0, 190 - i * 42);
      });
    }, [
      { text: '再来一局', color: new Color(70, 160, 90, 255), cb: onRestart },
    ]);
  }
}
