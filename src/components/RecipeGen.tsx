import { useState, useEffect } from 'react';
import { AppSettings } from '../types';
import { Ingredient } from '../data/ingredients';
import { generateRecipes, GenerationResponse, MultiLangText } from '../services/aiService';
import { ChefHat, ShoppingCart, Loader2, Sparkles, Navigation, Check, Globe } from 'lucide-react';
import { cn } from '../lib/utils';

interface RecipeGenProps {
  settings: AppSettings;
  selectedIngredients: Ingredient[];
}

export default function RecipeGen({ settings, selectedIngredients }: RecipeGenProps) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<GenerationResponse | null>(() => {
    const saved = localStorage.getItem('km_generated_recipe');
    return saved ? JSON.parse(saved) : null;
  });
  const [error, setError] = useState<string | null>(null);
  
  // Local language override for seamless switching
  const [displayLang, setDisplayLang] = useState<'zh' | 'en' | 'id'>('zh');

  // Sync initial language from settings, but allow local override
  useEffect(() => {
    if (settings.targetLanguage === '中文') setDisplayLang('zh');
    else if (settings.targetLanguage === 'Bahasa Indonesia') setDisplayLang('id');
    else setDisplayLang('en');
  }, [settings.targetLanguage]);

  // For the shopping list collaboration
  const [checkedItems, setCheckedItems] = useState<Set<number>>(() => {
    const saved = localStorage.getItem('km_recipe_checked');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Persistence Effects
  useEffect(() => {
    if (data) {
      localStorage.setItem('km_generated_recipe', JSON.stringify(data));
    } else {
      localStorage.removeItem('km_generated_recipe');
    }
  }, [data]);

  useEffect(() => {
    localStorage.setItem('km_recipe_checked', JSON.stringify(Array.from(checkedItems)));
  }, [checkedItems]);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateRecipes(settings, selectedIngredients);
      setData(result);
      setCheckedItems(new Set()); // Reset shopping list checkboxes
    } catch (err: any) {
      setError(err.message || '生成失敗，請再試一次。');
    } finally {
      setLoading(false);
    }
  };

  const toggleCheck = (index: number) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const getText = (multiLang?: MultiLangText) => {
    if (!multiLang) return '';
    if (displayLang === 'zh') return multiLang.zh;
    if (displayLang === 'id') return multiLang.id || multiLang.en || multiLang.zh;
    return multiLang.en || multiLang.zh;
  };

  const getBilingualText = (multiLang?: MultiLangText) => {
    if (!multiLang) return '';
    if (displayLang === 'zh') return multiLang.zh;
    const secondary = displayLang === 'id' ? multiLang.id : multiLang.en;
    if (!secondary || secondary === multiLang.zh) return multiLang.zh;
    return `${multiLang.zh} / ${secondary}`;
  };

  if (!data && !loading && !error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm px-4">
        <div className="bg-orange-100 p-4 rounded-full mb-4">
          <ChefHat size={48} className="text-orange-500" />
        </div>
        <h2 className="text-xl font-bold mb-2">準備好為您編寫今晚菜單！</h2>
        <p className="text-gray-500 text-center max-w-md mb-8">
          我們將根據您選取的 {selectedIngredients.length} 項食材，以及「{settings.vegetarianLevel}」素食要求、「{settings.generatorMode}」模式等設定，為您度身訂造食譜。
        </p>
        <button
          onClick={handleGenerate}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full shadow-lg flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
        >
          <Sparkles size={20} />
          立即生成食譜 (Generate Recipes)
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {loading && (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-xl border border-gray-200">
           <Loader2 className="animate-spin text-orange-500 mb-4" size={48} />
           <p className="text-lg font-medium text-gray-700">正在構思完美食譜...</p>
           <p className="text-sm text-gray-500 mt-2">分析 {selectedIngredients.length} 種食材，配對雙語步驟 (Bilingual Steps)</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700">
          <p className="font-bold">發生錯誤</p>
          <p>{error}</p>
          <button onClick={handleGenerate} className="mt-4 underline text-sm">重新嘗試</button>
        </div>
      )}

      {data && !loading && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <ChefHat className="text-orange-500" /> 今晚食乜餸
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                <Globe size={16} className="text-gray-500 ml-2" />
                <button
                  onClick={() => setDisplayLang('zh')}
                  className={cn("px-3 py-1.5 text-sm font-medium rounded-md transition-all", displayLang === 'zh' ? "bg-white shadow-sm text-orange-600" : "text-gray-600 hover:text-gray-900")}
                >
                  中文
                </button>
                <button
                  onClick={() => setDisplayLang('id')}
                  className={cn("px-3 py-1.5 text-sm font-medium rounded-md transition-all", displayLang === 'id' ? "bg-white shadow-sm text-orange-600" : "text-gray-600 hover:text-gray-900")}
                >
                  Bahasa
                </button>
                <button
                  onClick={() => setDisplayLang('en')}
                  className={cn("px-3 py-1.5 text-sm font-medium rounded-md transition-all", displayLang === 'en' ? "bg-white shadow-sm text-orange-600" : "text-gray-600 hover:text-gray-900")}
                >
                  EN
                </button>
              </div>
              <button
                onClick={handleGenerate}
                className="px-4 py-2 bg-orange-50 text-orange-700 hover:bg-orange-100 rounded-lg text-sm font-bold transition-colors"
              >
                ↻ 重新生成
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Recipes Column */}
            <div className="lg:col-span-2 space-y-6">
              {data.recipes.map((recipe, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900">{getBilingualText(recipe.dishName)}</h3>
                    <div className="flex flex-wrap gap-2 text-xs font-medium">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">{getText(recipe.cookingMethod)}</span>
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">{getText(recipe.difficulty)}</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-6 bg-gray-50 p-3 rounded-lg flex items-start gap-2">
                    <Sparkles size={16} className="text-yellow-500 shrink-0 mt-0.5" />
                    <span><strong className="text-gray-800">營養估算 (Nutrition):</strong> {getText(recipe.nutrition)}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-sm text-green-700 mb-2 flex items-center gap-1">
                        <Check size={16}/> 已有食材 (Have)
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1 ml-5 list-disc">
                        {recipe.ingredients.have.map((item, i) => <li key={i}>{getBilingualText(item)}</li>)}
                        {recipe.ingredients.have.length === 0 && <li className="italic text-gray-400">無</li>}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-red-600 mb-2 flex items-center gap-1">
                        <ShoppingCart size={16}/> 需購買 (Need to Buy)
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1 ml-5 list-disc">
                        {recipe.ingredients.needToBuy.map((item, i) => <li key={i}>{getBilingualText(item)}</li>)}
                        {recipe.ingredients.needToBuy.length === 0 && <li className="italic text-gray-400">無需補購</li>}
                      </ul>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-lg mb-3 border-l-4 border-orange-500 pl-2">烹飪步驟 (Steps)</h4>
                    <ul className="space-y-4 text-gray-700">
                      {recipe.steps.map((step, i) => (
                        <li key={i} className="flex gap-3 text-sm leading-relaxed bg-gray-50/50 p-3 rounded-lg">
                          <span className="bg-orange-100 text-orange-700 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold">{i+1}</span>
                          <span className="pt-0.5">{getText(step)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {recipe.tips && recipe.tips.zh && (
                    <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl text-sm text-orange-800 flex gap-3">
                      <ChefHat size={20} className="shrink-0" />
                      <div>
                        <strong>小貼士 (Pro Tips):</strong> {getText(recipe.tips)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Shopping List Column */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 sticky top-24">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                  <ShoppingCart className="text-orange-500" />
                  <h3 className="text-xl font-bold">買餸紙 Shopping List</h3>
                </div>
                
                {data.shoppingList.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-6">您擁有的食材已足夠，無需買餸！</p>
                ) : (
                  <>
                    <p className="text-xs text-gray-500 mb-4">輕觸項目即可打剔 (Tap to check)</p>
                    <div className="space-y-2">
                      {data.shoppingList.map((item, idx) => {
                        const isChecked = checkedItems.has(idx);
                        return (
                          <div 
                            key={idx} 
                            onClick={() => toggleCheck(idx)}
                            className={cn(
                              "flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-colors border",
                              isChecked ? "bg-gray-50 border-gray-200 opacity-60" : "bg-white border-orange-100 hover:border-orange-300 shadow-sm"
                            )}
                          >
                            <div className={cn("mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-colors", isChecked ? "bg-orange-500 border-orange-500" : "border-gray-300 bg-white")}>
                              {isChecked && <Check size={14} className="text-white" />}
                            </div>
                            <span className={cn("text-sm font-medium", isChecked ? "line-through text-gray-400" : "text-gray-700")}>
                              {getBilingualText(item)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
                
                <div className="mt-8 bg-blue-50/50 border border-blue-100 p-4 rounded-xl">
                  <h4 className="flex items-center gap-2 text-sm font-bold text-blue-800 mb-2">
                    <Navigation size={16} /> 外傭協作模式
                  </h4>
                  <p className="text-xs text-blue-700/80 leading-relaxed">
                     這個清單已針對姐姐優化。您可以將手機交給姐姐，讓她在街市直接打剔。切換上方語言按鈕可切換印尼文。
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
