
import React, { useState, useEffect } from 'react';
import { Flame, Star, Clock, Loader2 } from 'lucide-react';
import { Recipe } from '../types';
import { generateImageForRecipe } from '../services/geminiService';

interface ExploreViewProps {
  onRecipeSelect: (recipe: Recipe) => void;
  toggleSave: (recipe: Recipe) => void;
}

const INITIAL_TRENDING_RECIPES: Recipe[] = [
  {
    id: '3',
    title: 'Honey Spicy Pizza',
    cookTime: '40 MINS',
    difficulty: 'Medium',
    category: 'COMFORT',
    image: '', // To be filled by AI
    ingredients: ['Flour', 'Yeast', 'Honey', 'Chili flakes', 'Pepperoni', 'Mozzarella'],
    instructions: ['Prepare dough', 'Add toppings', 'Drizzle honey', 'Bake at 500F'],
    description: 'A perfect balance of sweet, spicy, and savory on a crispy crust.',
    nutritionalInfo: { calories: 850, protein: '28g', carbs: '95g', fat: '32g' }
  },
  {
    id: '4',
    title: 'Summer Pesto Pasta',
    cookTime: '25 MINS',
    difficulty: 'Easy',
    category: 'ITALIAN',
    image: '', // To be filled by AI
    ingredients: ['Pasta', 'Basil', 'Pine nuts', 'Parmesan', 'Olive oil', 'Cherry tomatoes'],
    instructions: ['Boil pasta', 'Blend pesto', 'Toss together', 'Top with tomatoes'],
    description: 'Light, fresh, and bursting with basil aroma.',
    nutritionalInfo: { calories: 520, protein: '12g', carbs: '65g', fat: '24g' }
  }
];

const CATEGORIES = ['Breakfast', 'Vegan', 'Dessert', 'Quick Fix'];

const ExploreView: React.FC<ExploreViewProps> = ({ onRecipeSelect }) => {
  const [trendingRecipes, setTrendingRecipes] = useState<Recipe[]>(INITIAL_TRENDING_RECIPES);
  const [categoryImages, setCategoryImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExploreImages = async () => {
      setLoading(true);
      try {
        // Generate images for trending recipes
        const updatedTrending = await Promise.all(
          INITIAL_TRENDING_RECIPES.map(async (recipe) => {
            const img = await generateImageForRecipe(recipe.title, recipe.description);
            return { ...recipe, image: img };
          })
        );
        setTrendingRecipes(updatedTrending);

        // Generate images for categories
        const catImgs: Record<string, string> = {};
        await Promise.all(
          CATEGORIES.map(async (cat) => {
            const img = await generateImageForRecipe(cat, `A beautiful appetizing cover photo for ${cat} food category.`);
            catImgs[cat] = img;
          })
        );
        setCategoryImages(catImgs);
      } catch (error) {
        console.error("Failed to load explore images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExploreImages();
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight">Explore</h1>
        <p className="text-gray-400 font-medium">Discover what's cooking globally</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Flame size={20} className="text-orange-500" />
          <h2 className="text-xl font-extrabold">Trending Now</h2>
        </div>

        <div className="flex overflow-x-auto pb-4 gap-6 no-scrollbar -mx-6 px-6">
          {trendingRecipes.map(recipe => (
            <div 
              key={recipe.id}
              onClick={() => recipe.image && onRecipeSelect(recipe)}
              className="min-w-[280px] bg-white rounded-[2.5rem] overflow-hidden soft-shadow group cursor-pointer active:scale-95 transition-all"
            >
              <div className="relative h-40 bg-gray-100 flex items-center justify-center">
                {recipe.image ? (
                  <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover transition-opacity duration-500" />
                ) : (
                  <Loader2 className="animate-spin text-[#F3A23A]" />
                )}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-[10px] font-extrabold">
                  <Star size={10} className="fill-yellow-400 text-yellow-400" />
                  4.9
                </div>
              </div>
              <div className="p-5 space-y-1">
                <h3 className="font-extrabold text-lg">{recipe.title}</h3>
                <div className="flex items-center gap-3 text-[10px] font-extrabold text-gray-400 tracking-wider">
                  <span className="flex items-center gap-1"><Clock size={12} /> {recipe.cookTime}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span>{recipe.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-extrabold">Quick & Easy</h2>
        <div className="grid grid-cols-2 gap-4">
          {CATEGORIES.map(cat => (
            <div key={cat} className="h-32 rounded-3xl relative overflow-hidden group cursor-pointer shadow-sm bg-gray-100">
              {categoryImages[cat] ? (
                <img src={categoryImages[cat]} alt={cat} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Loader2 className="animate-spin text-gray-300" size={20} />
                </div>
              )}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <span className="text-white font-extrabold text-lg tracking-tight">{cat}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreView;
