
import React, { useState, useRef } from 'react';
import { Camera, Plus, X, Loader2, ChefHat, Sparkles } from 'lucide-react';
import { analyzeIngredientsFromImage, generateRecipesFromIngredients } from '../services/geminiService';
import { Recipe, User } from '../types';

interface HomeViewProps {
  onRecipeSelect: (recipe: Recipe) => void;
  user: User;
}

const HomeView: React.FC<HomeViewProps> = ({ onRecipeSelect, user }) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addIngredient = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (inputValue.trim() && !ingredients.includes(inputValue.trim())) {
      setIngredients([...ingredients, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeIngredient = (ing: string) => {
    setIngredients(ingredients.filter(i => i !== ing));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setLoadingStep('Analyzing your fridge...');
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      const detected = await analyzeIngredientsFromImage(base64);
      setIngredients(prev => Array.from(new Set([...prev, ...detected])));
      setLoading(false);
      setLoadingStep('');
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (ingredients.length === 0) return;
    setLoading(true);
    setLoadingStep('Crafting your custom recipes...');
    try {
      // First phase: Recipe text generation
      const results = await generateRecipesFromIngredients(ingredients, user.dietaryPreferences);
      setRecipes(results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  };

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Hello, {user.name.split(' ')[0]}!</h1>
          <p className="text-gray-400 font-medium">What's in your kitchen today?</p>
        </div>
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
          <img src={user.avatar} alt="User profile" />
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 soft-shadow space-y-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex-shrink-0 w-14 h-14 bg-[#FFF5E9] rounded-2xl flex items-center justify-center text-[#F3A23A] hover:bg-[#F3A23A] hover:text-white transition-all active:scale-95"
          >
            <Camera size={24} />
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileUpload} 
            />
          </button>
          
          <form onSubmit={addIngredient} className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Add ingredients manually..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full bg-[#F5F5F5] border-none rounded-2xl py-4 pl-6 pr-12 focus:ring-2 focus:ring-[#F3A23A]/20 transition-all font-medium text-gray-600 outline-none"
            />
            <button 
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F3A23A]"
            >
              <Plus size={24} />
            </button>
          </form>
        </div>

        {ingredients.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {ingredients.map(ing => (
              <span 
                key={ing} 
                className="bg-[#FAFAFA] text-gray-600 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 border border-gray-100 animate-in zoom-in-50 duration-200"
              >
                {ing}
                <button onClick={() => removeIngredient(ing)}>
                  <X size={14} className="text-gray-300 hover:text-red-400" />
                </button>
              </span>
            ))}
          </div>
        )}

        <button 
          onClick={handleGenerate}
          disabled={ingredients.length === 0 || loading}
          className="w-full orange-gradient py-4 rounded-3xl text-white font-bold text-lg flex items-center justify-center gap-2 custom-shadow active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
        >
          {loading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="animate-spin mb-1" size={20} />
              <span className="text-xs font-medium animate-pulse">{loadingStep || 'Cooking...'}</span>
            </div>
          ) : (
            <>
              <Sparkles size={20} />
              Generate Recipes
            </>
          )}
        </button>
      </div>

      {recipes.length > 0 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center gap-2">
            <ChefHat size={20} className="text-[#F3A23A]" />
            <h2 className="text-xl font-extrabold tracking-tight">AI Curated Picks</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {recipes.map((recipe) => (
              <div 
                key={recipe.id}
                onClick={() => onRecipeSelect(recipe)}
                className="bg-white rounded-[2.5rem] overflow-hidden soft-shadow group cursor-pointer active:scale-[0.98] transition-all"
              >
                <div className="relative h-48">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest text-[#F3A23A]">
                    {recipe.cookTime}
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <p className="text-[#F3A23A] font-extrabold text-[10px] tracking-widest">{recipe.category}</p>
                  <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-[#F3A23A] transition-colors">{recipe.title}</h3>
                  <p className="text-gray-400 text-sm font-medium line-clamp-2">{recipe.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeView;
