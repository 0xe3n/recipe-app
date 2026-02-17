
import React from 'react';
import { ArrowRight, UtensilsCrossed } from 'lucide-react';

interface LandingViewProps {
  onStart: () => void;
}

const LandingView: React.FC<LandingViewProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between py-16 px-8 text-center bg-[#FAFAFA]">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#F3A23A] rounded-full flex items-center justify-center text-white">
          <UtensilsCrossed size={20} />
        </div>
        <span className="font-bold text-xl tracking-tight">Chef AI</span>
      </div>

      <div className="relative group">
        <div className="absolute inset-0 bg-[#F3A23A]/10 rounded-full blur-3xl group-hover:blur-2xl transition-all"></div>
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl">
          <img 
            src="https://picsum.photos/seed/gourmet-pasta/800/800" 
            alt="Delicious Pasta" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="space-y-4 max-w-sm">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Your AI Sous Chef
        </h1>
        <p className="text-gray-500 text-lg leading-relaxed font-medium">
          Personalized recipes based on what you have in your kitchen right now.
        </p>
      </div>

      <div className="w-full max-w-sm space-y-6">
        <button 
          onClick={onStart}
          className="w-full orange-gradient py-4 rounded-3xl text-white font-bold text-lg flex items-center justify-center gap-2 custom-shadow active:scale-95 transition-transform"
        >
          Get Started
          <ArrowRight size={20} />
        </button>
        <p className="text-gray-400 text-sm font-medium">
          Join 50,000+ home cooks
        </p>
      </div>
    </div>
  );
};

export default LandingView;
