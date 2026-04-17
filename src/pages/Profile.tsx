import React from 'react';
import { motion } from 'motion/react';
import { User as UserIcon, Mail, Shield, Zap, Target, Flame, Settings, Camera, LogOut, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold text-white">My Profile</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition-all">
           <Settings className="w-4 h-4" /> Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Avatar & Basic Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-8 flex flex-col items-center text-center relative overflow-hidden">
             <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-primary/20 to-transparent" />
             <div className="relative mt-4">
                <div className="w-32 h-32 rounded-3xl bg-gray-900 border-2 border-primary p-1 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                   <img 
                     src="https://picsum.photos/seed/alex/200/200" 
                     className="w-full h-full rounded-2xl object-cover" 
                     alt="Alex Rivera"
                     referrerPolicy="no-referrer"
                   />
                </div>
                <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-black border border-white/10 rounded-xl flex items-center justify-center text-primary hover:text-white transition-colors shadow-2xl">
                   <Camera className="w-5 h-5" />
                </button>
             </div>
             <h2 className="mt-8 text-2xl font-display font-bold text-white">{user?.displayName || 'User'}</h2>
             <p className="text-secondary font-bold text-xs uppercase tracking-widest mt-1">Level 1 • Novice Focus</p>
             <div className="mt-8 w-full p-4 bg-white/5 rounded-2xl border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                   <span className="text-xs font-medium text-gray-500">Exp Progress</span>
                   <span className="text-xs font-bold text-white">85%</span>
                </div>
                <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                   <div className="h-full bg-primary w-[85%]" />
                </div>
             </div>
          </div>

          <div className="glass-card p-6 divide-y divide-white/5">
             {[
               { icon: Mail, label: 'Email', value: user?.email || 'No email set' },
               { icon: Shield, label: 'Account', value: 'Free Member' },
               { icon: UserIcon, label: 'User ID', value: user?.uid.substring(0, 12) + '...' },
             ].map((item, i) => (
               <div key={i} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-500">
                     <item.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                     <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest leading-none mb-1">{item.label}</p>
                     <p className="text-xs font-bold text-gray-300">{item.value}</p>
                  </div>
               </div>
             ))}
          </div>

          <button 
            onClick={handleLogout}
            className="w-full h-12 glass-card bg-red-400/5 border-red-400/10 text-red-400 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-red-400/10 transition-all font-bold uppercase tracking-widest text-[10px]"
          >
             <LogOut className="w-5 h-5" /> Logout Session
          </button>
        </div>

        {/* Right Side: Achievements & Stats */}
        <div className="lg:col-span-2 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Flame, label: 'Highest Streak', val: '45 Days', color: 'text-orange-500' },
                { icon: Zap, label: 'Skill Points', val: '24.2K Total', color: 'text-primary' },
                { icon: Target, label: 'Goals Hit', val: '128 Total', color: 'text-secondary' },
              ].map((stat, i) => (
                <div key={i} className="glass-card p-6 border-white/5 text-center">
                   <stat.icon className={cn("w-6 h-6 mx-auto mb-4", stat.color)} />
                   <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                   <p className="text-xl font-display font-bold text-white">{stat.val}</p>
                </div>
              ))}
           </div>

           <div className="glass-card p-8">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-lg font-bold text-white">Recent Achievements</h3>
                 <button className="text-xs font-bold text-primary uppercase hover:underline">View All</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {[
                   { name: 'Early Bird', desc: 'Started a focus session before 6 AM', unlocked: true },
                   { name: 'Zen Master', desc: '4 hours of focus without any distraction', unlocked: true },
                   { name: 'Social Hero', desc: 'Joined 10 public study rooms', unlocked: false },
                   { name: 'AI Scholar', desc: 'Solved 50 doubts with AI Assistant', unlocked: false },
                 ].map((badge, i) => (
                   <div key={i} className={cn(
                     "p-4 rounded-2xl border flex items-center gap-4 transition-all group cursor-pointer",
                     badge.unlocked ? "bg-white/5 border-white/5 hover:border-primary/20" : "bg-black/40 border-white/5 opacity-50 grayscale"
                   )}>
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                        badge.unlocked ? "bg-primary/20 text-primary group-hover:scale-110" : "bg-white/5 text-gray-700"
                      )}>
                         <Zap className="w-6 h-6 fill-current" />
                      </div>
                      <div className="flex-1">
                         <h4 className="text-sm font-bold text-white">{badge.name}</h4>
                         <p className="text-[10px] text-gray-500 mt-1">{badge.desc}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-700" />
                   </div>
                 ))}
              </div>
           </div>

           <div className="glass-card p-8">
              <h3 className="text-lg font-bold text-white mb-6">Learning Path</h3>
              <div className="space-y-6">
                 {[
                   { name: 'Frontend Excellence', progress: 75, color: 'bg-primary' },
                   { name: 'Data Structures', progress: 40, color: 'bg-secondary' },
                   { name: 'UI/UX Principles', progress: 90, color: 'bg-accent' },
                 ].map((path, i) => (
                   <div key={i} className="space-y-3">
                      <div className="flex items-center justify-between">
                         <span className="text-sm font-bold text-white">{path.name}</span>
                         <span className="text-xs font-bold text-gray-500">{path.progress}%</span>
                      </div>
                      <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${path.progress}%` }}
                           transition={{ duration: 1, delay: i * 0.2 }}
                           className={cn("h-full", path.color)} 
                         />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
