import React from 'react';
import { Search, Bell, User as UserIcon } from 'lucide-react';
import { motion } from 'motion/react';

export function TopBar() {
  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-20 border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between ml-64"
    >
      <div className="relative w-96 group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
        <input 
          type="text" 
          placeholder="Search rooms, tasks, or AI help..."
          className="w-full h-11 bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-white/10 transition-all font-medium placeholder:text-gray-600"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 rounded-xl hover:bg-white/5 transition-colors text-gray-400 hover:text-white">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-dashboard-bg" />
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-white/10">
          <div className="text-right">
            <p className="text-sm font-bold text-white leading-none">Alex Rivera</p>
            <p className="text-xs font-medium text-primary mt-1">Level 24 • 8,420 Pts</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gray-800 to-gray-700 border border-white/10 p-0.5">
            <div className="w-full h-full rounded-lg bg-gray-900 flex items-center justify-center overflow-hidden">
              <img 
                src="https://picsum.photos/seed/alex/100/100" 
                alt="Avatar" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
