import { _decorator, Color, Component, Label, Node, ResolutionPolicy, Sprite, view } from 'cc';
import { GameManager } from '../core/GameManager';
import { CFG } from '../data/GameConfig';
import { GameView } from './GameView';
import { loadSprite, makeLabel, makeNode, makeRect, onTap, setPos } from './UIFactory';

const { ccclass } = _decorator;

/**
 * 启动引导：首页 → 模拟匹配 → 游戏主界面。
 * 使用方法：场景中选中 Canvas → 添加组件 → GameBoot，无需其他配置。
 */
@ccclass('GameBoot')
export class GameBoot extends Component {
  static inst: GameBoot = null!;

  private homeRoot: Node = null!;
  private matchRoot: Node = null!;
  private gameRoot: Node | null = null;
  private slotLabels: Label[] = [];
  private playerCount = 8;

  onLoad(): void {
    GameBoot.inst = this;
    try { view.setDesignResolutionSize(720, 1280, ResolutionPolicy.SHOW_ALL); } catch (e) { /* 编辑器内忽略 */ }

    makeRect('BG', this.node, 1500, 1500, new Color(22, 24, 30, 255), 0);
    // 战场背景图（加载失败时保留纯色底）
    const bgImg = makeNode('BGImg', this.node, 720, 1280);
    const bgSp = bgImg.addComponent(Sprite);
    loadSprite('textures/bg_battle', sf => { if (bgImg.isValid) bgSp.spriteFrame = sf; });
    bgImg.setSiblingIndex(1);
    this.buildHome();
    this.buildMatch();
    this.homeRoot.active = true;
    this.matchRoot.active = false;
  }

  // ---------------- 首页 ----------------

  private buildHome(): void {
    this.homeRoot = makeNode('Home', this.node);
    const title = makeLabel(this.homeRoot, '自走棋', 84, new Color(255, 220, 120, 255));
    setPos(title.node, 0, 300);
    const sub = makeLabel(this.homeRoot, '多人对战 · 自动战斗', 24, new Color(180, 180, 180, 255));
    setPos(sub.node, 0, 220);
    const tip = makeLabel(this.homeRoot, '选择对局人数', 22, new Color(160, 160, 160, 255));
    setPos(tip.node, 0, 130);
    const counts = [2, 4, 8];
    for (let i = 0; i < counts.length; i++) {
      const n = counts[i];
      const btn = makeRect(`start${n}`, this.homeRoot, 180, 84, new Color(70, 160, 90, 255), 12);
      setPos(btn, (i - 1) * 210, 20);
      const bl = makeLabel(btn, `${n} 人对局`, 30);
      setPos(bl.node, 0, 0);
      onTap(btn, this, () => this.startMatching(n));
    }
    // 模拟战斗：单回合、无倒计时、手动开战
    const simBtn = makeRect('sim', this.homeRoot, 280, 70, new Color(200, 120, 60, 255), 10);
    setPos(simBtn, 0, -100);
    const sl = makeLabel(simBtn, '⚔ 模拟战斗（单人演练）', 26);
    setPos(sl.node, 0, 0);
    onTap(simBtn, this, () => this.startSimBattle());
  }

  // ---------------- 模拟匹配 ----------------

  private buildMatch(): void {
    this.matchRoot = makeNode('Match', this.node);
    const t = makeLabel(this.matchRoot, '匹配中…', 36, new Color(200, 220, 255, 255));
    setPos(t.node, 0, 380);
    for (let i = 0; i < 8; i++) {
      const slot = makeRect(`slot${i}`, this.matchRoot, 150, 54, new Color(40, 44, 56, 255), 8);
      const row = Math.floor(i / 4), col = i % 4;
      setPos(slot, (col - 1.5) * 170, 260 - row * 76);
      const lb = makeLabel(slot, '等待中', 18, new Color(120, 120, 120, 255));
      setPos(lb.node, 0, 0);
      this.slotLabels.push(lb);
    }
  }

  private startMatching(count: number): void {
    this.playerCount = count;
    this.homeRoot.active = false;
    this.matchRoot.active = true;
    for (let i = 0; i < this.slotLabels.length; i++) {
      const lb = this.slotLabels[i];
      lb.node.parent!.active = i < count;   // 只显示本局人数的槽位
      lb.string = '等待中';
      lb.color = new Color(120, 120, 120, 255);
    }
    const names = ['你'].concat(CFG.BOT_NAMES.slice(0, count - 1));
    for (let i = 0; i < count; i++) {
      this.scheduleOnce(() => {
        this.slotLabels[i].string = names[i];
        this.slotLabels[i].color = i === 0 ? new Color(120, 220, 255, 255) : Color.WHITE;
      }, 0.3 * (i + 1));
    }
    this.scheduleOnce(() => this.startGame(), 0.3 * count + 0.6);
  }

  // ---------------- 进入游戏 / 重开 ----------------

  private startGame(): void {
    this.matchRoot.active = false;
    if (this.gameRoot) { this.gameRoot.destroy(); this.gameRoot = null; }
    this.gameRoot = makeNode('GameRoot', this.node);
    const gm = this.gameRoot.addComponent(GameManager);
    gm.newMatch(this.playerCount);
    const gv = this.gameRoot.addComponent(GameView);
    gv.init(gm);
    gm.beginPrep();
  }

  /** 模拟战斗：1v1 镜像对手，单回合，准备无倒计时，手动开战 */
  private startSimBattle(): void {
    this.homeRoot.active = false;
    if (this.gameRoot) { this.gameRoot.destroy(); this.gameRoot = null; }
    this.gameRoot = makeNode('GameRoot', this.node);
    const gm = this.gameRoot.addComponent(GameManager);
    gm.newMatch(2);
    gm.simOnly = true;
    const gv = this.gameRoot.addComponent(GameView);
    gv.init(gm);
    gm.beginPrep();
  }

  /** 终局「再来一局」：销毁本局，回到首页 */
  restart(): void {
    if (this.gameRoot) { this.gameRoot.destroy(); this.gameRoot = null; }
    this.homeRoot.active = true;
  }
}
