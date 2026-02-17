
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface OnboardingViewProps {
  onComplete: () => void;
  onBack: () => void;
}

const OnboardingView: React.FC<OnboardingViewProps> = ({ onComplete, onBack }) => {
  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-8 text-center bg-[#FAFAFA]">
      <div className="w-full flex justify-start mb-24">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#F3A23A]"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">Create Account</h1>
          <p className="text-gray-400 font-medium">Join us to start your journey today</p>
        </div>

        <button 
          onClick={onComplete}
          className="w-full max-w-sm bg-white border border-gray-100 py-4 px-8 rounded-full flex items-center justify-center gap-3 font-semibold text-gray-700 shadow-sm active:scale-95 transition-all"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <p className="text-gray-500 font-medium">
          Already have an account? <span className="text-[#F3A23A] font-bold cursor-pointer">Log In</span>
        </p>
      </div>
    </div>
  );
};

export default OnboardingView;
