import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Medal, Crown, TrendingUp, Flame, Zap, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

const leaderboard = [
  { id: '1', name: 'Marcus Tech', points: 12450, streak: 42, level: 32, avatar: '1' },
  { id: '2', name: 'Sarah Designer', points: 11200, streak: 35, level: 29, avatar: '2' },
  { id: '3', name: 'Alex Rivera', points: 8420, streak: 12, level: 24, avatar: '3', isMe: true },
  { id: '4', name: 'David Med', points: 7900, streak: 28, level: 21, avatar: '4' },
  { id: '5', name: 'Emma Dev', points: 7200, streak: 15, level: 19, avatar: '5' },
  { id: '6', name: 'Jason Code', points: 6800, streak: 8, level: 18, avatar: '6' },
  { id: '7', name: 'Lily Art', points: 5400, streak: 5, level: 15, avatar: '7' },
];

export default function Leaderboard() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-display font-bold text-white">Global Ranking</h1>
        <p className="text-gray-400">Competing against 500K+ focus loops globally.</p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-6 items-end pb-12 pt-8">
        {/* 2nd Place */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <img src="https://picsum.photos/seed/user2/100/100" className="w-20 h-20 rounded-2xl border-2 border-gray-400" alt="Sarah" referrerPolicy="no-referrer" />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gray-400 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-xl">2</div>
          </div>
          <p className="mt-6 text-sm font-bold text-white">Sarah D.</p>
          <p className="text-xs text-gray-500 font-bold uppercase mt-1">11,200 Pts</p>
        </motion.div>

        {/* 1st Place */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
              <Crown className="w-10 h-10 text-primary animate-bounce fill-primary/20" />
            </div>
            <img src="https://picsum.photos/seed/user1/120/120" className="w-24 h-24 rounded-3xl border-2 border-primary shadow-[0_0_20px_rgba(16,185,129,0.3)]" alt="Marcus" referrerPolicy="no-referrer" />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-primary text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-base shadow-2xl">1</div>
          </div>
          <p className="mt-8 text-base font-bold text-white">Marcus T.</p>
          <p className="text-sm text-primary font-bold uppercase mt-1 tracking-widest">12,450 Pts</p>
        </motion.div>

        {/* 3rd Place */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <img src={`https://picsum.photos/seed/alex/100/100`} className="w-20 h-20 rounded-2xl border-2 border-amber-600" alt="Alex" referrerPolicy="no-referrer" />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-xl">3</div>
          </div>
          <p className="mt-6 text-sm font-bold text-white">Alex Rivera</p>
          <p className="text-xs text-amber-600 font-bold uppercase mt-1">8,420 Pts</p>
        </motion.div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
           <div className="flex items-center gap-12">
              <span className="w-8">Rank</span>
              <span>User</span>
           </div>
           <div className="flex items-center gap-16 px-4">
              <span>Level</span>
              <span>Streak</span>
              <span className="w-20 text-right">Points</span>
           </div>
        </div>
        <div className="divide-y divide-white/5">
          {leaderboard.map((user, i) => (
            <div 
              key={user.id} 
              className={cn(
                "p-4 flex items-center justify-between group transition-all",
                user.isMe ? "bg-primary/5" : "hover:bg-white/5"
              )}
            >
              <div className="flex items-center gap-12">
                <span className={cn(
                  "w-8 text-sm font-display font-bold",
                  i === 0 ? "text-primary" : i === 1 ? "text-gray-400" : i === 2 ? "text-amber-600" : "text-gray-600"
                )}>
                  {i + 1 < 10 ? `0${i + 1}` : i + 1}
                </span>
                <div className="flex items-center gap-4">
                  <img src={`https://picsum.photos/seed/user${user.avatar}/40/40`} className="w-8 h-8 rounded-lg bg-gray-800" alt={user.name} referrerPolicy="no-referrer" />
                  <span className={cn(
                    "text-sm font-bold",
                    user.isMe ? "text-primary" : "text-white"
                  )}>
                    {user.name}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-16 px-4">
                <span className="text-xs font-bold text-gray-500">Lv. {user.level}</span>
                <div className="flex items-center gap-1 text-xs font-bold text-orange-500">
                  <Flame className="w-3 h-3 fill-current" /> {user.streak}
                </div>
                <div className="w-20 text-right font-display font-bold text-white text-sm">
                  {user.points.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
