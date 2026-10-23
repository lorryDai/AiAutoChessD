import { EquipType } from './GameTypes';

/** 全局数值配置（所有平衡数值都在这里调整） */
export const CFG = {
  COLS: 4, ROWS: 7, OWN_ROW_MIN: 4,     // 棋盘 4 列 7 行，0~3 敌方，4~6 我方
  MAX_FIELD: 4,                          // 场上棋子最多 4 个
  MAX_HAND: 10,                          // 备战席（手牌）最多 10 张
  START_HP: 30,
  ROUND_GOLD: 10,                        // 每个准备阶段发放 10 金币
  REFRESH_COST: 1,                       // 手动刷新商店 1 金币
  CARD_COST: 1,                          // 商店所有卡牌 1 金币
  PREP_TIME: 30,                         // 准备阶段 30 秒
  BATTLE_TIME: 60,                       // 战斗最长 60 秒
  SPEEDUP_AT: 40,                        // 40 秒后加速
  SPEEDUP_FACTOR: 2,
  DMG_EARLY: 3,                          // 前 3 回合败方扣血
  DMG_LATE: 5,                           // 第 4 回合起败方扣血
  EARLY_ROUNDS: 3,
  SHOP_SLOTS: 5,                         // 商店每排 5 格
  MANA_MAX: 100,                         // 蓝量上限
  MANA_ATK: 25,                          // 攻击回蓝
  MANA_HIT: 15,                          // 受击回蓝
  BOT_NAMES: ['机器人1', '机器人2', '机器人3', '机器人4', '机器人5', '机器人6', '机器人7'],
};

export interface PieceBase {
  key: string; name: string;
  hp: number; atk: number; def: number;
  move: number;        // 格/秒
  interval: number;    // 秒/次攻击
  range: number;       // 攻击距离（格，切比雪夫距离）
  color: [number, number, number];
  skill: string;
}

/** 棋子基础属性（1 星） */
export const PIECE_BASE: PieceBase[] = [
  { key: '盾', name: '坦克',   hp: 620, atk: 45,  def: 28, move: 0.8, interval: 1.6, range: 1, color: [66, 133, 244],  skill: '蓝量满时：8秒内防御×1.5' },
  { key: '刺', name: '刺客',   hp: 380, atk: 120, def: 5,  move: 1.8, interval: 0.8, range: 1, color: [234, 67, 53],   skill: '蓝量满时：2秒内攻击×1.8、移速×1.5' },
  { key: '射', name: '射手',   hp: 350, atk: 70,  def: 5,  move: 0.9, interval: 1.2, range: 3, color: [52, 168, 83],   skill: '蓝量满时：2秒内攻速×2，并同时攻击2个目标' },
  { key: '治', name: '治疗师', hp: 420, atk: 40,  def: 6,  move: 0.9, interval: 1.6, range: 3, color: [251, 188, 5],   skill: '蓝量满时：治疗全体友军已损失血量的10%' },
];

/** 升星属性倍率（血/攻/防） */
export const STAR_MUL = [1, 1.8, 3.2];

export type EquipEffect = '' | 'reduceAS' | 'forbidAtk' | 'slowMove' | 'ignoreDmg' | 'reduceAtk' | 'rangePlus' | 'reflect' | 'hpBoost' | 'silenceRanged';

export interface EquipBase {
  key: string; name: string;
  as: number;    // 攻速加成（0.3 = +30%）
  def: number;
  hp: number;
  move: number;  // 移速加成（格/秒）
  effect: EquipEffect;
  desc: string;
}

export const EQUIP: EquipBase[] = [
  { key: 'A', name: '迅捷之刃', as: 0.3, def: 0,  hp: 0,   move: 0,   effect: '',          desc: '攻速+30%' },
  { key: 'B', name: '守护铠甲', as: 0,   def: 15, hp: 0,   move: 0,   effect: '',          desc: '防御+15' },
  { key: 'C', name: '生命宝石', as: 0,   def: 0,  hp: 150, move: 0,   effect: '',          desc: '血量+150' },
  { key: 'D', name: '疾风之靴', as: 0,   def: 0,  hp: 0,   move: 0.3, effect: '',          desc: '移速+0.3格/秒' },
  { key: 'E', name: '寒铁战刃', as: 0.3, def: 15, hp: 0,   move: 0,   effect: 'reduceAS',  desc: '攻速+30% 防御+15｜命中降低目标攻速20%（2秒）' },
  { key: 'F', name: '沉默之刃', as: 0.3, def: 0,  hp: 150, move: 0,   effect: 'forbidAtk', desc: '攻速+30% 血量+150｜命中使目标3秒无法攻击（冷却8秒）' },
  { key: 'G', name: '霜冻之刃', as: 0.3, def: 0,  hp: 0,   move: 0.3, effect: 'slowMove',  desc: '攻速+30% 移速+0.3｜命中降低目标移速30%（2秒）' },
  { key: 'H', name: '不朽壁垒', as: 0,   def: 15, hp: 150, move: 0,   effect: 'ignoreDmg', desc: '防御+15 血量+150｜受击后3秒内无视伤害（冷却8秒）' },
  { key: 'I', name: '虚弱重铠', as: 0,   def: 15, hp: 0,   move: 0.3, effect: 'reduceAtk', desc: '防御+15 移速+0.3｜命中降低目标攻击15%（2秒）' },
  { key: 'J', name: '泥泞护符', as: 0,   def: 0,  hp: 150, move: 0.3, effect: 'slowMove',  desc: '血量+150 移速+0.3｜命中降低目标移速30%（2秒）' },
  { key: 'K', name: '暴风双刃', as: 0.6, def: 0,  hp: 0,   move: 0,   effect: 'rangePlus', desc: '攻速+60%｜攻击距离+1' },
  { key: 'L', name: '荆棘重甲', as: 0,   def: 30, hp: 0,   move: 0,   effect: 'reflect',   desc: '防御+30｜反伤20%' },
  { key: 'M', name: '巨人之心', as: 0,   def: 0,  hp: 300, move: 0,   effect: 'hpBoost',   desc: '血量+300｜血量额外+30%' },
  { key: 'N', name: '疾风迅雷', as: 0,   def: 0,  hp: 0,   move: 0.6, effect: 'silenceRanged', desc: '移速+0.6｜开局随机一个敌方远程棋子2秒无法攻击' },
];

/** 基础装备合成表：A+B=E, A+C=F, A+D=G, B+C=H, B+D=I, C+D=J；A+A=K, B+B=L, C+C=M, D+D=N；不可二次合成 */
export function combineResult(a: EquipType, b: EquipType): EquipType | null {
  if (a > EquipType.D || b > EquipType.D) return null;
  const lo = Math.min(a, b), hi = Math.max(a, b);
  if (lo === hi) return (EquipType.K + lo) as EquipType;  // 同装备合成：A+A=K, B+B=L, C+C=M, D+D=N
  if (lo === 0 && hi === 1) return EquipType.E;
  if (lo === 0 && hi === 2) return EquipType.F;
  if (lo === 0 && hi === 3) return EquipType.G;
  if (lo === 1 && hi === 2) return EquipType.H;
  if (lo === 1 && hi === 3) return EquipType.I;
  if (lo === 2 && hi === 3) return EquipType.J;
  return null;
}
