import { GoogleGenAI } from '@google/genai';

let genAI: GoogleGenAI | null = null;

function getGenAI() {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    genAI = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAI;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { dishName } = req.body;
    const currentGenAI = getGenAI();
    const response = await currentGenAI.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `A high quality, appetizing food photography shot of a Chinese dish called "${dishName}". Professional lighting, top-down or slight angle, beautifully plated, photorealistic.`,
          },
        ],
      },
      config: {
         imageConfig: {
            aspectRatio: "16:9"
         }
      }
    });
    
    let base64ImageUrl = null;
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        base64ImageUrl = `data:image/jpeg;base64,${base64EncodeString}`;
        break;
      }
    }
    
    if (!base64ImageUrl) throw new Error('Image not found in response');
    res.status(200).json({ imageUrl: base64ImageUrl });
  } catch (error: any) {
    console.error("Image Generation Error", error);
    res.status(500).json({ error: String(error) });
  }
}
