
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'AIzaSyDHDzKxGsPcqmm5BTgsbPuLMZGb82EivOg' });

const RECIPE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING },
    title: { type: Type.STRING },
    cookTime: { type: Type.STRING },
    difficulty: { type: Type.STRING },
    category: { type: Type.STRING },
    description: { type: Type.STRING },
    ingredients: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    instructions: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    nutritionalInfo: {
      type: Type.OBJECT,
      properties: {
        calories: { type: Type.NUMBER },
        protein: { type: Type.STRING },
        carbs: { type: Type.STRING },
        fat: { type: Type.STRING }
      },
      required: ["calories", "protein", "carbs", "fat"]
    }
  },
  required: ["id", "title", "cookTime", "difficulty", "category", "description", "ingredients", "instructions", "nutritionalInfo"]
};

/**
 * Generates a high-quality food photography image for a specific recipe using the nano banana model.
 */
export const generateImageForRecipe = async (title: string, description: string): Promise<string> => {
  try {
    const prompt = `Professional food photography of ${title}. ${description}. 
    High-end restaurant plating, cinematic lighting, 8k resolution, appetizing, sharp focus, vibrant colors. 
    Top-down or 45-degree angle shot.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    // Iterate through parts to find the image data
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    // Fallback if no image generated
    return `https://picsum.photos/seed/${title.replace(/\s/g, '')}/600/400`;
  } catch (error) {
    console.error("Error generating image for recipe:", error);
    return `https://picsum.photos/seed/${title.replace(/\s/g, '')}/600/400`;
  }
};

export const generateRecipesFromIngredients = async (ingredients: string[], dietaryPrefs: string[]): Promise<Recipe[]> => {
  const prompt = `Create 3 distinct, delicious recipes using some or all of these ingredients: ${ingredients.join(', ')}. 
  Consider these dietary preferences: ${dietaryPrefs.join(', ')}. 
  Return the recipes in a structured JSON format.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: RECIPE_SCHEMA
        }
      }
    });

    const text = response.text || '[]';
    const recipes: Recipe[] = JSON.parse(text);

    // Generate actual relevant images for each recipe in parallel using nano banana
    const recipesWithImages = await Promise.all(
      recipes.map(async (recipe) => {
        const imageUrl = await generateImageForRecipe(recipe.title, recipe.description);
        return {
          ...recipe,
          image: imageUrl
        };
      })
    );

    return recipesWithImages;
  } catch (error) {
    console.error("Error generating recipes:", error);
    throw error;
  }
};

export const analyzeIngredientsFromImage = async (base64Image: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image.split(',')[1] || base64Image
          }
        },
        { text: "List the food items and ingredients you see in this photo. Return as a simple JSON array of strings." }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const text = response.text || '[]';
    return JSON.parse(text);
  } catch (error) {
    console.error("Error analyzing image:", error);
    return [];
  }
};
