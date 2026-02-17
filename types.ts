
export interface Recipe {
  id: string;
  title: string;
  cookTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  nutritionalInfo?: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
  description: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  dietaryPreferences: string[];
  savedRecipes: string[]; // IDs
}

export type ViewState = 'landing' | 'onboarding' | 'home' | 'explore' | 'saved' | 'profile' | 'recipe-detail';
