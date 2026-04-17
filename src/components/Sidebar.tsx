import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Timer, 
  Users, 
  Gift, 
  Trophy, 
  CheckSquare, 
  Bot, 
  User, 
  Settings,
  LogOut,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Timer, label: 'Study', path: '/study' },
  { icon: Users, label: 'Rooms', path: '/rooms' },
  { icon: Gift, label: 'Rewards', path: '/rewards' },
  { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
  { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
  { icon: Bot, label: 'AI Assistant', path: '/ai-assistant' },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn(
        "h-screen fixed left-0 top-0 border-r border-white/5 bg-black/40 backdrop-blur-2xl z-50 transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <Zap className="text-white w-6 h-6 fill-white" />
        </div>
        {!isCollapsed && (
          <span className="font-display font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            FocusLoop AI
          </span>
        )}
      </div>

      <nav className="mt-6 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative overflow-hidden",
              isActive 
                ? "bg-primary/10 text-primary border border-primary/20" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className="w-5 h-5" />
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
            
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-6 left-0 w-full px-4 space-y-2">
        <NavLink
          to="/profile"
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
            isActive ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
          )}
        >
          <User className="w-5 h-5" />
          {!isCollapsed && <span className="font-medium">Profile</span>}
        </NavLink>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-400/5 transition-all"
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </motion.div>
  );
}
