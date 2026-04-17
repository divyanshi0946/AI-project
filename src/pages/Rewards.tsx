import React from 'react';
import { motion } from 'motion/react';
import { Gift, Zap, Star, Shield, Palette, UserCircle, BadgeCheck, Lock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Reward } from '@/types';

const rewards: Reward[] = [
  { id: '1', name: 'Neon Green Theme', cost: 1200, description: 'Unlock the original FocusLoop neon aesthetic.', icon: 'Palette', category: 'theme', unlocked: true },
  { id: '2', name: 'Cyberpunk Avatar', cost: 2500, description: 'Exclusive futuristic profile character.', icon: 'UserCircle', category: 'avatar', unlocked: false },
  { id: '3', name: 'Master Focus Badge', cost: 5000, description: 'Show everyone your dedication.', icon: 'BadgeCheck', category: 'badge', unlocked: false },
  { id: '4', name: 'Midnight Purple Theme', cost: 1800, description: 'Deep purple glassmorphism theme.', icon: 'Palette', category: 'theme', unlocked: false },
  { id: '5', name: 'Golden Streak Icon', cost: 3000, description: 'Turn your streak icon into pure gold.', icon: 'Zap', category: 'badge', unlocked: false },
  { id: '6', name: 'Pro Profile Border', cost: 800, description: 'Animated glowing border for your avatar.', icon: 'Shield', category: 'avatar', unlocked: false },
];

const iconMap: any = { Palette, UserCircle, BadgeCheck, Zap, Shield };

export default function Rewards() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Rewards Store</h1>
          <p className="text-gray-400 mt-1">Exhange your points for exclusive digital assets.</p>
        </div>
        <div className="flex gap-4 p-4 glass-card border-secondary/20 bg-secondary/5">
           <div className="text-right">
              <p className="text-[10px] font-bold text-secondary uppercase">Balance</p>
              <p className="text-xl font-display font-bold text-white leading-none">8,420 Pts</p>
           </div>
           <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-secondary fill-secondary" />
           </div>
        </div>
      </div>

      <div className="flex gap-2">
         {['All Items', 'Themes', 'Avatars', 'Badges'].map((cat) => (
           <button key={cat} className="px-6 py-2.5 rounded-full bg-white/5 border border-white/5 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/10 transition-all">
              {cat}
           </button>
         ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward, i) => {
          const Icon = iconMap[reward.icon];
          return (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "glass-card p-6 border-white/5 flex flex-col justify-between group relative overflow-hidden",
                !reward.unlocked && "hover:border-primary/20"
              )}
            >
              {reward.unlocked && (
                <div className="absolute top-4 right-4 px-2 py-1 rounded bg-primary/20 text-primary border border-primary/20 text-[9px] font-black uppercase z-10">
                  Unlocked
                </div>
              )}
              
              <div className="flex items-center gap-6 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white/5 group-hover:bg-primary/10 border border-white/5 group-hover:border-primary/20 flex items-center justify-center text-gray-500 group-hover:text-primary transition-all">
                  <Icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors">{reward.name}</h3>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{reward.category}</p>
                </div>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 h-8">
                {reward.description}
              </p>

              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-secondary font-display font-bold">
                   <Star className="w-4 h-4 fill-secondary" />
                   {reward.cost}
                </div>
                <button 
                  disabled={reward.unlocked}
                  className={cn(
                  "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                  reward.unlocked 
                    ? "bg-white/5 text-gray-600 cursor-not-allowed" 
                    : "bg-primary text-black hover:bg-primary/90 shadow-lg hover:shadow-primary/20"
                )}>
                  {reward.unlocked ? 'Purchased' : 'Unlock Now'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
