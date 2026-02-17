
import React from 'react';
import { Home, Compass, Bookmark, User } from 'lucide-react';
import { ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewState;
  setView: (view: ViewState) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setView }) => {
  const navItems = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'explore', label: 'EXPLORE', icon: Compass },
    { id: 'saved', label: 'SAVED', icon: Bookmark },
    { id: 'profile', label: 'PROFILE', icon: User },
  ];

  if (activeView === 'landing' || activeView === 'onboarding') {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24">
      <main className="flex-1 w-full max-w-md mx-auto px-6 py-8">
        {children}
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 px-6 py-3 pb-8 z-50">
        <div className="max-w-md mx-auto flex justify-between items-center">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            const Icon = item.icon;
            
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id as ViewState)}
                className={`flex flex-col items-center gap-1 transition-all duration-200 ${
                  isActive ? 'text-[#F3A23A]' : 'text-gray-400'
                }`}
              >
                <div className={`p-2 rounded-2xl ${isActive ? 'bg-[#FFF5E9]' : ''}`}>
                  <Icon size={24} fill={isActive ? '#F3A23A' : 'none'} />
                </div>
                <span className="text-[10px] font-bold tracking-wider">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
