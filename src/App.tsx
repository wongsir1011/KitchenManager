/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ChefHat, Settings, Refrigerator } from 'lucide-react';
import { AppSettings, DEFAULT_SETTINGS } from './types';
import { INGREDIENTS_DATA, Ingredient } from './data/ingredients';
import Inventory from './components/Inventory';
import SettingsPanel from './components/SettingsPanel';
import RecipeGen from './components/RecipeGen';

export default function App() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'settings' | 'recipe'>('inventory');
  
  // App State
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('km_settings');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });
  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('km_selectedIngredients');
      const parsed = saved ? JSON.parse(saved) : [];
      return new Set(Array.isArray(parsed) ? parsed : []);
    } catch {
      return new Set();
    }
  });
  const [customIngredients, setCustomIngredients] = useState<Ingredient[]>(() => {
    try {
      const saved = localStorage.getItem('km_customIngredients');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('km_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('km_selectedIngredients', JSON.stringify(Array.from(selectedIngredients)));
  }, [selectedIngredients]);

  useEffect(() => {
    localStorage.setItem('km_customIngredients', JSON.stringify(customIngredients));
  }, [customIngredients]);

  const toggleIngredient = (id: string) => {
    setSelectedIngredients(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAddCustomIngredient = (ingredient: Ingredient) => {
    setCustomIngredients(prev => [...prev, ingredient]);
    setSelectedIngredients(prev => new Set(prev).add(ingredient.id));
  };

  const getSelectedIngredientObjects = () => {
    return Array.from(selectedIngredients).map(id => {
      let found = INGREDIENTS_DATA.find(i => i.id === id);
      if (!found) found = customIngredients.find(i => i.id === id);
      if (found) return found;
      // Fallback
      return { id, category: '其他食品/調味料', zh: '未知', en: 'Unknown', id_name: 'Unknown', isVegetarian: true, isVegan: true } as Ingredient;
    }).filter(item => {
      if (settings.vegetarianLevel === '蛋奶素') return item.isVegetarian;
      if (settings.vegetarianLevel === '純素') return item.isVegan;
      return true;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <ChefHat className="text-orange-500" size={28} />
            <h1 className="font-bold text-xl tracking-tight hidden sm:block">今晚食乜餸 (Kitchen Manager)</h1>
          </div>
          <nav className="flex gap-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'inventory' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
               <div className="flex items-center gap-1.5"><Refrigerator size={16}/> <span className="hidden sm:inline">盤點食材</span></div>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'settings' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
               <div className="flex items-center gap-1.5"><Settings size={16}/> <span className="hidden sm:inline">用餐設定</span></div>
            </button>
            <button
              onClick={() => setActiveTab('recipe')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'recipe' ? 'bg-white shadow-sm text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
               <div className="flex items-center gap-1.5"><ChefHat size={16}/> <span className="hidden sm:inline">生成食譜</span></div>
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div style={{ display: activeTab === 'inventory' ? 'block' : 'none' }}>
          <Inventory 
             settings={settings}
             selectedIds={selectedIngredients}
             onToggle={toggleIngredient}
             customIngredients={customIngredients}
             onAddCustomIngredient={handleAddCustomIngredient}
          />
        </div>
        <div style={{ display: activeTab === 'settings' ? 'block' : 'none' }}>
          <SettingsPanel 
            settings={settings}
            onChange={setSettings}
          />
        </div>
        <div style={{ display: activeTab === 'recipe' ? 'block' : 'none' }}>
          <RecipeGen 
            settings={settings}
            selectedIngredients={getSelectedIngredientObjects()}
          />
        </div>
      </main>

      {/* Floating Action Button for smaller screens or quick access */}
      {activeTab !== 'recipe' && (
        <div className="fixed bottom-6 left-0 right-0 flex justify-center px-4 z-20 pointer-events-none">
             <button 
                onClick={() => setActiveTab(activeTab === 'inventory' ? 'settings' : 'recipe')}
                className="pointer-events-auto bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full shadow-lg flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
              >
               繼續 Next
             </button>
        </div>
      )}
    </div>
  );
}
