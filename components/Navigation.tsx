'use client';

import React from 'react';
import { LogOut, Trash2, Bot } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface NavigationProps {
  user: User;
  onLogout: () => void;
  onClearChat: () => void;
}

export function Navigation({ user, onLogout, onClearChat }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
            <Bot size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">AI Assistant</h1>
            <p className="text-xs text-gray-400">Powered by Railway</p>
          </div>
        </div>

        {/* User Info & Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-white">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClearChat}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
              title="Clear chat"
            >
              <Trash2 size={20} />
            </button>
            <button
              onClick={onLogout}
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-all"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
