import { AppSettings } from '../types';
import { Ingredient } from '../data/ingredients';

export interface MultiLangText {
  zh: string;
  en?: string;
  id: string;
}

export interface RecipeResult {
  dishName: MultiLangText;
  cookingMethod: MultiLangText;
  difficulty: MultiLangText;
  nutrition: MultiLangText;
  ingredients: {
    have: MultiLangText[];
    needToBuy: MultiLangText[];
  };
  steps: MultiLangText[];
  tips: MultiLangText;
}

export interface GenerationResponse {
  recipes: RecipeResult[];
  shoppingList: MultiLangText[];
}

export async function generateRecipes(settings: AppSettings, selectedIngredients: Ingredient[]): Promise<GenerationResponse> {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        settings,
        selectedIngredients
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error((errorData && errorData.error) ? errorData.error : `API Error: ${response.statusText}`);
    }

    return await response.json() as GenerationResponse;
  } catch (error) {
    console.error("AI Generation Error", error);
    throw error;
  }
}
