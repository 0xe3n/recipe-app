
import React from 'react';
import { Settings, Bell, Shield, LogOut, ChevronRight } from 'lucide-react';
import { User } from '../types';

interface ProfileViewProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user }) => {
  const menuItems = [
    { icon: Bell, label: 'Notifications', color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: Settings, label: 'Preferences', color: 'text-[#F3A23A]', bg: 'bg-[#FFF5E9]' },
    { icon: Shield, label: 'Privacy & Security', color: 'text-green-500', bg: 'bg-green-50' },
    { icon: LogOut, label: 'Sign Out', color: 'text-red-500', bg: 'bg-red-50' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col items-center gap-4 py-6">
        <div className="relative">
          <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl">
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          </div>
          <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#F3A23A] rounded-full border-4 border-white flex items-center justify-center text-white shadow-lg">
            <Settings size={16} />
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-extrabold">{user.name}</h2>
          <p className="text-gray-400 font-medium">{user.email}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-extrabold tracking-tight px-2">Dietary Preferences</h3>
        <div className="flex flex-wrap gap-2 px-2">
          {user.dietaryPreferences.map(pref => (
            <span key={pref} className="bg-white px-5 py-2.5 rounded-2xl text-sm font-bold text-gray-700 soft-shadow border border-gray-50">
              {pref}
            </span>
          ))}
          <button className="bg-[#F3A23A]/10 text-[#F3A23A] px-5 py-2.5 rounded-2xl text-sm font-bold border border-dashed border-[#F3A23A]/30">
            + Add
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-4 soft-shadow">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button 
              key={item.label}
              className={`w-full flex items-center justify-between p-4 ${idx !== menuItems.length - 1 ? 'border-b border-gray-50' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 ${item.bg} rounded-2xl flex items-center justify-center ${item.color}`}>
                  <Icon size={20} />
                </div>
                <span className="font-bold text-gray-700">{item.label}</span>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileView;
