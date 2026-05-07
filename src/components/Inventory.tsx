import React, { useState, useMemo } from 'react';
import { INGREDIENTS_DATA, Category, Ingredient } from '../data/ingredients';
import { AppSettings } from '../types';
import { Check, Plus, Search, RotateCcw } from 'lucide-react';
import { cn } from '../lib/utils';

interface InventoryProps {
  settings: AppSettings;
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  customIngredients: Ingredient[];
  onAddCustomIngredient: (ingredient: Ingredient) => void;
  onReset: () => void;
}

const CATEGORIES: Category[] = [
  '蔬菜類', '肉類', '水產類', '家禽類', '水果', '燒味/滷味', '冷藏食品', '其他食品/調味料'
];

export default function Inventory({ settings, selectedIds, onToggle, customIngredients, onAddCustomIngredient, onReset }: InventoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('蔬菜類');
  
  const [newIngredientName, setNewIngredientName] = useState('');
  const [customCategory, setCustomCategory] = useState<Category>('蔬菜類');
  const [customIsVegetarian, setCustomIsVegetarian] = useState(false);
  const [customIsVegan, setCustomIsVegan] = useState(false);

  // Sync default form values with active states
  React.useEffect(() => {
    setCustomCategory(activeCategory);
  }, [activeCategory]);

  React.useEffect(() => {
    if (settings.vegetarianLevel === '無') {
      setCustomIsVegetarian(false);
      setCustomIsVegan(false);
    } else if (settings.vegetarianLevel === '蛋奶素') {
      setCustomIsVegetarian(true);
      setCustomIsVegan(false);
    } else if (settings.vegetarianLevel === '純素') {
      setCustomIsVegetarian(true);
      setCustomIsVegan(true);
    }
  }, [settings.vegetarianLevel]);

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIngredientName.trim()) return;
    
    const newId = `custom_${Date.now()}`;
    const newItem: Ingredient = {
      id: newId,
      category: customCategory,
      zh: newIngredientName.trim(),
      en: newIngredientName.trim(),
      id_name: newIngredientName.trim(),
      isVegetarian: customIsVegetarian,
      isVegan: customIsVegan,
    };
    
    onAddCustomIngredient(newItem);
    setNewIngredientName('');
  };

  const filteredIngredients = useMemo(() => {
    let list = [...INGREDIENTS_DATA, ...customIngredients];

    // Filter by vegetarian level
    if (settings.vegetarianLevel === '蛋奶素') {
      list = list.filter(item => item.isVegetarian);
    } else if (settings.vegetarianLevel === '純素') {
      list = list.filter(item => item.isVegan);
    }

    // Filter by search term
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      list = list.filter(item => 
        item.zh.includes(lowerSearch) || 
        item.en.toLowerCase().includes(lowerSearch) || 
        item.id_name.toLowerCase().includes(lowerSearch)
      );
    }

    return list;
  }, [settings.vegetarianLevel, searchTerm, customIngredients]);

  const itemsByCategory = useMemo(() => {
    const grouped = {} as Record<Category, Ingredient[]>;
    CATEGORIES.forEach(c => grouped[c] = []);
    filteredIngredients.forEach(item => {
      if (grouped[item.category]) {
        grouped[item.category].push(item);
      }
    });
    return grouped;
  }, [filteredIngredients]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">1. 盤點食材 (Inventory)</h2>
          <p className="text-gray-500 text-sm mt-1">選取家中現有的食材。受「素食級別」設定影響，部分不符合的選項將被隱藏。</p>
        </div>
        
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 bg-white border border-gray-200 rounded-lg hover:border-red-200 hover:bg-red-50 transition-colors"
          >
            <RotateCcw size={16} /> 重設 (Reset)
          </button>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="搜尋食材 Search..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[500px]">
        {/* Categories Sidebar */}
        <div className="w-1/3 md:w-1/4 bg-gray-50 border-r border-gray-200 flex flex-col">
          {CATEGORIES.map(category => {
            const count = itemsByCategory[category].length;
            const selectedCount = itemsByCategory[category].filter(i => selectedIds.has(i.id)).length;
            
            return (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setSearchTerm('');
                }}
                className={cn(
                  "px-4 py-3 text-left text-sm font-medium transition-colors flex justify-between items-center outline-none",
                  activeCategory === category 
                    ? "bg-white text-orange-600 border-l-4 border-orange-500" 
                    : "text-gray-600 hover:bg-gray-100 border-l-4 border-transparent"
                )}
              >
                <span className="truncate pr-2">{category}</span>
                {selectedCount > 0 && (
                  <span className="bg-orange-100 text-orange-600 text-[10px] sm:text-xs py-0.5 px-2 rounded-full shrink-0">
                    {selectedCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Items Grid */}
        <div className="w-2/3 md:w-3/4 p-4 md:p-6 bg-white overflow-y-auto max-h-[600px] flex flex-col">
          {searchTerm && (
            <div className="mb-4 text-sm text-gray-500">
              搜尋結果: {filteredIngredients.length} 項
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 flex-1 content-start">
            {(searchTerm ? filteredIngredients : itemsByCategory[activeCategory]).map(item => {
              const isSelected = selectedIds.has(item.id);
              return (
                <div 
                  key={item.id}
                  onClick={() => onToggle(item.id)}
                  className={cn(
                    "relative flex flex-col p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 select-none",
                    isSelected 
                      ? "border-orange-500 bg-orange-50" 
                      : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/50"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-gray-900">{item.zh}</span>
                    {isSelected && <Check className="text-orange-500" size={18} />}
                  </div>
                  <span className="text-xs text-gray-500 mt-1">{item.en}</span>
                  <span className="text-xs text-gray-400">{item.id_name}</span>
                </div>
              );
            })}
          </div>

          {((searchTerm && filteredIngredients.length === 0) || (!searchTerm && itemsByCategory[activeCategory].length === 0)) && (
            <div className="text-center py-12 text-gray-500">
              <p>無符合的食材。</p>
              {settings.vegetarianLevel !== '無' && (
                <p className="text-sm mt-2 text-orange-600">注意: 您目前開啟了「{settings.vegetarianLevel}」模式，部分食材會被隱藏。</p>
              )}
            </div>
          )}

          {/* Add custom feature */}
          <div className="mt-8 pt-6 border-t border-gray-200">
             <h3 className="text-sm font-semibold text-gray-700 mb-3">找不到想要的食材？自行新增</h3>
             <form onSubmit={handleAddCustom} className="bg-gray-50 p-4 rounded-xl space-y-4 border border-gray-200">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <label className="block text-xs text-gray-500 mb-1">食材名稱 (中/英/印皆可)</label>
                   <input 
                     type="text" 
                     placeholder="如：香茅 / Lemongrass"
                     value={newIngredientName}
                     onChange={e => setNewIngredientName(e.target.value)}
                     className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                   />
                 </div>
                 <div>
                   <label className="block text-xs text-gray-500 mb-1">分類</label>
                   <select
                     value={customCategory}
                     onChange={e => setCustomCategory(e.target.value as Category)}
                     className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                   >
                     {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                   </select>
                 </div>
               </div>

               <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-2 gap-4">
                 <div className="flex gap-4">
                   <label className="flex items-center gap-2 text-sm cursor-pointer text-gray-700 hover:text-gray-900">
                     <input 
                       type="checkbox" 
                       checked={customIsVegetarian}
                       onChange={e => {
                         setCustomIsVegetarian(e.target.checked);
                         if (!e.target.checked) setCustomIsVegan(false);
                       }}
                       className="rounded text-orange-500 focus:ring-orange-500 h-4 w-4 border-gray-300"
                     />
                     蛋奶素 (Vegetarian)
                   </label>
                   <label className="flex items-center gap-2 text-sm cursor-pointer text-gray-700 hover:text-gray-900">
                     <input 
                       type="checkbox" 
                       checked={customIsVegan}
                       onChange={e => {
                         setCustomIsVegan(e.target.checked);
                         if (e.target.checked) setCustomIsVegetarian(true);
                       }}
                       className="rounded text-orange-500 focus:ring-orange-500 h-4 w-4 border-gray-300"
                     />
                     純素 (Vegan)
                   </label>
                 </div>
                 <button 
                   type="submit"
                   disabled={!newIngredientName.trim()}
                   className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                 >
                   <Plus size={16} /> 新增
                 </button>
               </div>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
}
