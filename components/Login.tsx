import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

const Login: React.FC = () => {
    const { currentUser, signInWithGoogle, logout } = useAuth();

    if (currentUser) {
        return (
            <div className="flex items-center gap-3">
                {currentUser.photoURL && (
                    <img
                        src={currentUser.photoURL}
                        alt={currentUser.displayName || 'User'}
                        className="w-8 h-8 rounded-full border border-gray-200"
                    />
                )}
                <button
                    onClick={logout}
                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                    title="Sign Out"
                >
                    <LogOut size={20} />
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={signInWithGoogle}
            className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
        >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            <span className="text-sm font-medium text-gray-700">Sign in</span>
        </button>
    );
};

export default Login;
