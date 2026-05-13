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
    const response = await fetch('/api/generate-recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ settings, selectedIngredients }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate recipes');
    }

    const data = await response.json();
    return data as GenerationResponse;
  } catch (error) {
    console.error("AI Generation Error", error);
    throw error;
  }
}

export async function generateRecipeImage(dishName: string): Promise<string> {
  try {
    const response = await fetch('/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dishName }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate recipe image');
    }

    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    console.error("Image Generation Error", error);
    throw error;
  }
}
