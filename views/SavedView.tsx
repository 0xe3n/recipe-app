
import React, { useState } from 'react';
import { Search, Bookmark } from 'lucide-react';
import { Recipe } from '../types';

interface SavedViewProps {
  recipes: Recipe[];
  onRecipeSelect: (recipe: Recipe) => void;
  toggleSave: (recipe: Recipe) => void;
}

const SavedView: React.FC<SavedViewProps> = ({ recipes, onRecipeSelect, toggleSave }) => {
  const [search, setSearch] = useState('');

  const filteredRecipes = recipes.filter(r => 
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight">Saved Recipes</h1>
        <p className="text-[#F3A23A] font-bold text-sm">{recipes.length} items curated</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Search your library..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#F5F5F5] border-none rounded-3xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-[#F3A23A]/20 transition-all font-medium text-gray-600 outline-none"
        />
      </div>

      <div className="space-y-6">
        {filteredRecipes.length > 0 ? filteredRecipes.map((recipe) => (
          <div 
            key={recipe.id}
            onClick={() => onRecipeSelect(recipe)}
            className="flex items-center gap-4 cursor-pointer group"
          >
            <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-md">
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
            </div>
            
            <div className="flex-1 space-y-1 border-b border-gray-100 pb-4">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg leading-tight">{recipe.title}</h3>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSave(recipe);
                  }}
                  className="text-[#F3A23A]"
                >
                  <Bookmark size={20} fill="#F3A23A" />
                </button>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-extrabold tracking-widest text-[#F3A23A]">
                <span>{recipe.cookTime}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F3A23A]"></span>
                <span>{recipe.category}</span>
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center py-12 text-gray-400">
            <p>No recipes found in your library.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedView;
