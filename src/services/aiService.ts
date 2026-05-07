import { AppSettings } from '../types';
import { Ingredient } from '../data/ingredients';
import { GoogleGenAI } from "@google/genai";

// Initialize the API using the injected environment variable
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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
  const hasSelectedIngredients = selectedIngredients.length > 0;
  
  const systemPrompt = `You are a professional chef specializing in Hong Kong style home cooking.
Your task is to act as a "Family Kitchen Manager" and generate a meal plan.

Constraints & Settings:
- Number of Diners: ${settings.peopleCount}
- Number of Dishes: ${settings.dishCount}
- Soup Option: ${settings.soupOption}
- Difficulty Level: ${settings.difficulty}
- Vegetarian Strictness: ${settings.vegetarianLevel}
- Preferred Cooking Methods: ${settings.cookingMethods.length > 0 ? settings.cookingMethods.join(', ') : 'Any'}
- Available Kitchenware: ${settings.kitchenware.length > 0 ? settings.kitchenware.join(', ') : 'Any'}
- AI Generation Mode: ${settings.generatorMode}

Current Available Ingredients in Fridge:
${hasSelectedIngredients ? selectedIngredients.map(i => i.zh).join(', ') : 'None selected. (Please suggest a full shopping list)'}

Important Directives:
1. "嚴格 (僅用已有食材)" mode: You MUST ONLY use the available ingredients provided. DO NOT suggest missing ingredients unless absolutely necessary for basic seasoning (salt, oil).
2. "寬鬆 (可加入新食材)" mode: You can suggest a few missing main ingredients.
3. If vegetarian option is not '無', the recipes MUST strictly adhere to the vegetarian level.
4. Provide all textual output strictly in multi-language objects (Traditional Chinese for zh, English for en, and Bahasa Indonesia for id).

Output EXACTLY as a JSON object with this schema, and nothing else:
{
  "recipes": [
    {
      "dishName": { "zh": "", "en": "", "id": "" },
      "cookingMethod": { "zh": "", "en": "", "id": "" },
      "difficulty": { "zh": "", "en": "", "id": "" },
      "nutrition": { "zh": "Per capita nutrition in zh", "en": "in en", "id": "in id" },
      "ingredients": {
        "have": [{ "zh": "", "en": "", "id": "" }],
        "needToBuy": [{ "zh": "", "en": "", "id": "" }]
      },
      "steps": [{ "zh": "Step 1 in zh", "en": "Step 1 in en", "id": "Step 1 in id" }],
      "tips": { "zh": "", "en": "", "id": "" }
    }
  ],
  "shoppingList": [{ "zh": "Item 1", "en": "Item 1", "id": "Item 1" }]
}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: systemPrompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    
    return JSON.parse(text) as GenerationResponse;
  } catch (error) {
    console.error("AI Generation Error", error);
    throw error;
  }
}
