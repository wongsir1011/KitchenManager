export type VegetarianLevel = '無' | '蛋奶素' | '純素';
export type GeneratorMode = '嚴格 (僅用已有食材)' | '寬鬆 (可加入新食材)';
export type Difficulty = '容易 (快手菜)' | '中等' | '困難 (週末廚神)';
export type SoupOption = '不需要' | '快手滾湯' | '老火靚湯';

export interface AppSettings {
  peopleCount: number;
  dishCount: number;
  soupOption: SoupOption;
  difficulty: Difficulty;
  vegetarianLevel: VegetarianLevel;
  cookingMethods: string[];
  kitchenware: string[];
  generatorMode: GeneratorMode;
  targetLanguage: '中文' | 'English' | 'Bahasa Indonesia'; // for recipe steps
}

export const DEFAULT_SETTINGS: AppSettings = {
  peopleCount: 2,
  dishCount: 3,
  soupOption: '不需要',
  difficulty: '容易 (快手菜)',
  vegetarianLevel: '無',
  cookingMethods: ['快炒', '清蒸'],
  kitchenware: ['明火爐'],
  generatorMode: '嚴格 (僅用已有食材)',
  targetLanguage: '中文'
};
