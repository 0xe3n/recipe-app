
import React from 'react';
import { ArrowLeft, Bookmark, Clock, User2, ChefHat, Info } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeDetailViewProps {
  recipe: Recipe;
  onBack: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

const RecipeDetailView: React.FC<RecipeDetailViewProps> = ({ recipe, onBack, isSaved, onToggleSave }) => {
  return (
    <div className="absolute inset-0 z-[60] bg-[#FAFAFA] flex flex-col h-screen overflow-y-auto">
      <div className="relative h-[45vh] w-full flex-shrink-0">
        <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-transparent to-transparent"></div>
        
        <div className="absolute top-12 left-6 right-6 flex justify-between">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-white/90 backdrop-blur flex items-center justify-center text-gray-900 shadow-lg active:scale-95 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <button 
            onClick={onToggleSave}
            className="w-10 h-10 rounded-2xl bg-white/90 backdrop-blur flex items-center justify-center shadow-lg active:scale-95 transition-all"
          >
            <Bookmark size={20} className={isSaved ? 'text-[#F3A23A] fill-[#F3A23A]' : 'text-gray-900'} />
          </button>
        </div>
      </div>

      <div className="flex-1 bg-[#FAFAFA] -mt-20 relative rounded-t-[3rem] px-8 pt-10 pb-16 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-[#FFF5E9] text-[#F3A23A] text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full border border-[#F3A23A]/20 uppercase">
              {recipe.category}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold leading-tight">{recipe.title}</h1>
          <p className="text-gray-500 font-medium leading-relaxed">{recipe.description}</p>
        </div>

        <div className="flex justify-between p-6 bg-white rounded-[2.5rem] soft-shadow">
          <div className="flex flex-col items-center gap-1">
            <Clock className="text-[#F3A23A]" size={20} />
            <span className="text-xs font-bold">{recipe.cookTime}</span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Time</span>
          </div>
          <div className="w-px h-10 bg-gray-100 self-center"></div>
          <div className="flex flex-col items-center gap-1">
            <ChefHat className="text-[#F3A23A]" size={20} />
            <span className="text-xs font-bold">{recipe.difficulty}</span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Skill</span>
          </div>
          <div className="w-px h-10 bg-gray-100 self-center"></div>
          <div className="flex flex-col items-center gap-1">
            <User2 className="text-[#F3A23A]" size={20} />
            <span className="text-xs font-bold">2-3</span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Serves</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold">Ingredients</h2>
            <span className="text-gray-400 font-bold text-sm">{recipe.ingredients.length} items</span>
          </div>
          <div className="space-y-3">
            {recipe.ingredients.map((ing, idx) => (
              <div key={idx} className="flex items-center gap-4 group">
                <div className="w-2 h-2 rounded-full bg-[#F3A23A]/40 group-hover:bg-[#F3A23A] transition-colors"></div>
                <span className="font-bold text-gray-600 text-sm">{ing}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-extrabold">Preparation</h2>
          <div className="space-y-6">
            {recipe.instructions.map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-8 h-8 rounded-xl bg-[#FFF5E9] text-[#F3A23A] flex items-center justify-center flex-shrink-0 font-extrabold text-sm">
                  {idx + 1}
                </div>
                <p className="font-medium text-gray-600 leading-relaxed text-sm pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {recipe.nutritionalInfo && (
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2">
              <Info size={18} className="text-[#F3A23A]" />
              <h2 className="text-xl font-extrabold">Nutrition</h2>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'CAL', val: recipe.nutritionalInfo.calories },
                { label: 'PROT', val: recipe.nutritionalInfo.protein },
                { label: 'CARB', val: recipe.nutritionalInfo.carbs },
                { label: 'FAT', val: recipe.nutritionalInfo.fat },
              ].map(item => (
                <div key={item.label} className="bg-white p-3 rounded-2xl soft-shadow text-center border border-gray-50">
                  <p className="text-[10px] font-extrabold text-gray-400 tracking-wider mb-1 uppercase">{item.label}</p>
                  <p className="text-sm font-extrabold text-[#F3A23A]">{item.val}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <button className="w-full orange-gradient py-5 rounded-[2.5rem] text-white font-extrabold text-lg custom-shadow mt-10 active:scale-95 transition-all">
          Start Cooking Mode
        </button>
      </div>
    </div>
  );
};

export default RecipeDetailView;
