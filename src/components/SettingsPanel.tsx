import { AppSettings, Difficulty, GeneratorMode, SoupOption, VegetarianLevel } from '../types';
import { cn } from '../lib/utils';
import { Users, Flame, UtensilsCrossed, Leaf, CheckSquare, Zap, Globe2, RotateCcw } from 'lucide-react';

interface SettingsPanelProps {
  settings: AppSettings;
  onChange: (newSettings: AppSettings) => void;
  onReset: () => void;
}

const VEGETARIAN_OPTIONS: VegetarianLevel[] = ['無', '蛋奶素', '純素'];
const SOUP_OPTIONS: SoupOption[] = ['不需要', '快手滾湯', '老火靚湯'];
const DIFFICULTY_OPTIONS: Difficulty[] = ['容易 (快手菜)', '中等', '困難 (週末廚神)'];
const MODE_OPTIONS: GeneratorMode[] = ['嚴格 (僅用已有食材)', '寬鬆 (可加入新食材)'];

const COOKING_METHODS = ['快炒', '清蒸', '炆燉', '煎炸', '涼拌', '無火烹調'];
const KITCHENWARE = ['明火爐', '電磁爐', '焗爐', '氣炸鍋', '微波爐', '電飯煲'];
const LANGUAGES = ['中文', 'English', 'Bahasa Indonesia'] as const;

export default function SettingsPanel({ settings, onChange, onReset }: SettingsPanelProps) {
  const update = (key: keyof AppSettings, value: any) => {
    onChange({ ...settings, [key]: value });
  };

  const toggleArray = (key: 'cookingMethods' | 'kitchenware', val: string) => {
    const current = settings[key];
    if (current.includes(val)) {
      update(key, current.filter(x => x !== val));
    } else {
      update(key, [...current, val]);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">2. 用餐設定 (Settings)</h2>
          <p className="text-gray-500 text-sm mt-1">設定您的用餐需求，AI 生成的食譜將嚴格遵守這些條件。</p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 bg-white border border-gray-200 rounded-lg hover:border-red-200 hover:bg-red-50 transition-colors shrink-0"
        >
          <RotateCcw size={16} /> 重設 (Reset)
        </button>
      </div>

      <div className="space-y-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        
        {/* Basic Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="flex items-center gap-2 font-medium text-gray-700">
              <Users size={18} className="text-orange-500"/> 用餐人數 (Diners)
            </label>
            <div className="flex items-center gap-4">
              <input 
                type="range" min="1" max="10" step="1"
                value={settings.peopleCount}
                onChange={e => update('peopleCount', parseInt(e.target.value))}
                className="w-full accent-orange-500"
              />
              <span className="font-bold text-xl text-orange-600 w-8">{settings.peopleCount}</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 font-medium text-gray-700">
              <UtensilsCrossed size={18} className="text-orange-500"/> 菜式數量 (Dishes)
            </label>
            <div className="flex items-center gap-4">
              <input 
                type="range" min="1" max="5" step="1"
                value={settings.dishCount}
                onChange={e => update('dishCount', parseInt(e.target.value))}
                className="w-full accent-orange-500"
              />
              <span className="font-bold text-xl text-orange-600 w-8">{settings.dishCount}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-2 font-medium text-gray-700">
            <UtensilsCrossed size={18} className="text-orange-500"/> 難度 (Difficulty)
          </label>
          <div className="flex bg-gray-100 p-1 rounded-lg">
            {DIFFICULTY_OPTIONS.map(opt => (
              <button
                key={opt}
                onClick={() => update('difficulty', opt)}
                className={cn(
                  "flex-1 py-1.5 text-sm font-medium rounded-md transition-all",
                  settings.difficulty === opt ? "bg-white text-orange-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Dietary & Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="flex items-center gap-2 font-medium text-gray-700">
              <Leaf size={18} className="text-orange-500"/> 素食級別 (Vegetarian Level)
            </label>
            <div className="flex bg-gray-100 p-1 rounded-lg">
              {VEGETARIAN_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => update('vegetarianLevel', opt)}
                  className={cn(
                    "flex-1 py-2 text-sm font-medium rounded-md transition-all",
                    settings.vegetarianLevel === opt ? "bg-white text-orange-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
            {settings.vegetarianLevel !== '無' && (
              <p className="text-xs text-orange-600">已啟用素食過濾，非素食食材將於盤點清單中隱藏。</p>
            )}
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 font-medium text-gray-700">
              <UtensilsCrossed size={18} className="text-orange-500"/> 湯品 (Soup)
            </label>
            <div className="flex bg-gray-100 p-1 rounded-lg">
              {SOUP_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => update('soupOption', opt)}
                  className={cn(
                    "flex-1 py-1.5 text-sm font-medium rounded-md transition-all",
                    settings.soupOption === opt ? "bg-white text-orange-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* AI & Cooking options */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 font-medium text-gray-700">
            <Zap size={18} className="text-orange-500"/> 食譜生成模式 (AI Mode)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MODE_OPTIONS.map(opt => (
              <div 
                key={opt} 
                onClick={() => update('generatorMode', opt)}
                className={cn(
                  "border-2 rounded-lg p-4 cursor-pointer transition-colors",
                  settings.generatorMode === opt ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-300"
                )}
              >
                <div className="flex justify-between items-center font-medium">
                  {opt}
                  {settings.generatorMode === opt && <CheckSquare className="text-orange-500" size={18} />}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {opt.includes('嚴格') ? '必須在已選的食材中生成食譜，不建議補購。' : '容許 AI 加入少量新食材以完成菜色，並提供補購清單。'}
                </p>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-gray-100" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cooking Methods */}
          <div className="space-y-3">
             <label className="flex items-center gap-2 font-medium text-gray-700">
              <Flame size={18} className="text-orange-500"/> 傾向煮法 (Cooking Methods)
            </label>
            <div className="flex flex-wrap gap-2">
              {COOKING_METHODS.map(cm => (
                <button
                  key={cm}
                  onClick={() => toggleArray('cookingMethods', cm)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium border transition-colors",
                    settings.cookingMethods.includes(cm) 
                      ? "bg-orange-100 border-orange-500 text-orange-700" 
                      : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
                  )}
                >
                  {cm}
                </button>
              ))}
            </div>
          </div>

          {/* Equipment */}
          <div className="space-y-3">
             <label className="flex items-center gap-2 font-medium text-gray-700">
              <Flame size={18} className="text-orange-500"/> 家中爐具 (Kitchenware)
            </label>
            <div className="flex flex-wrap gap-2">
              {KITCHENWARE.map(kw => (
                <button
                  key={kw}
                  onClick={() => toggleArray('kitchenware', kw)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium border transition-colors",
                    settings.kitchenware.includes(kw) 
                      ? "bg-orange-100 border-orange-500 text-orange-700" 
                      : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
                  )}
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-2 font-medium text-gray-700">
            <Globe2 size={18} className="text-orange-500"/> 食譜步驟語言 (Language)
          </label>
          <select 
            value={settings.targetLanguage}
            onChange={e => update('targetLanguage', e.target.value as any)}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
          >
            {LANGUAGES.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
