import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { settings, selectedIngredients } = req.body;
    const hasSelectedIngredients = selectedIngredients && selectedIngredients.length > 0;

    const systemPrompt = `You are a professional chef specializing in Hong Kong style home cooking.
Your task is to act as a "Family Kitchen Manager" and generate a meal plan.

Constraints & Settings:
- Number of Diners: ${settings.peopleCount}
- Number of Dishes: ${settings.dishCount}
- Soup Option: ${settings.soupOption}
- Difficulty Level: ${settings.difficulty}
- Vegetarian Strictness: ${settings.vegetarianLevel}
- Preferred Cooking Methods: ${settings.cookingMethods?.length > 0 ? settings.cookingMethods.join(', ') : 'Any'}
- Available Kitchenware: ${settings.kitchenware?.length > 0 ? settings.kitchenware.join(', ') : 'Any'}
- AI Generation Mode: ${settings.generatorMode}

Current Available Ingredients in Fridge:
${hasSelectedIngredients ? selectedIngredients.map((i: any) => i.zh).join(', ') : 'None selected. (Please suggest a full shopping list)'}

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

    const response = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: systemPrompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    
    res.status(200).json(JSON.parse(text));
  } catch (error) {
    console.error("AI Generation Error", error);
    res.status(500).json({ error: String(error) });
  }
}
