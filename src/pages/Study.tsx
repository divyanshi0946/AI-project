import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Target, Coffee, Brain, Info, Settings, Music, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Study() {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break' | 'long'>('focus');
  const [isZenMode, setIsZenMode] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      // Play sound notification here if needed
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'focus') setTime(25 * 60);
    else if (mode === 'break') setTime(5 * 60);
    else setTime(15 * 60);
  };

  const changeMode = (newMode: typeof mode) => {
    setMode(newMode);
    setIsActive(false);
    if (newMode === 'focus') setTime(25 * 60);
    else if (newMode === 'break') setTime(5 * 60);
    else setTime(15 * 60);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 relative">
      <AnimatePresence>
        {isZenMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-3xl flex flex-col items-center justify-center space-y-12"
          >
            <div className="absolute top-10 right-10">
              <button 
                onClick={() => setIsZenMode(false)}
                className="p-4 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all group"
              >
                <Maximize2 className="w-8 h-8 group-hover:scale-110 transition-transform" />
              </button>
            </div>

            <div className="text-center space-y-4">
               <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em]">Deep Flow Active</h2>
               <p className="text-gray-500 font-bold uppercase text-[10px]">All distractions hidden</p>
            </div>

            <div className="relative">
               <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full animate-pulse" />
               <h2 className="text-[12rem] font-display font-black text-white tracking-tighter tabular-nums leading-none drop-shadow-2xl">
                 {formatTime(time)}
               </h2>
            </div>

            <div className="flex items-center gap-12">
               <button onClick={resetTimer} className="text-gray-600 hover:text-white transition-colors"><RotateCcw className="w-8 h-8" /></button>
               <button 
                 onClick={toggleTimer}
                 className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 active:scale-95 transition-all shadow-[0_0_60px_rgba(255,255,255,0.2)]"
               >
                 {isActive ? <Pause className="w-12 h-12 fill-current" /> : <Play className="w-12 h-12 fill-current ml-2" />}
               </button>
               <button className="text-gray-600 hover:text-white transition-colors"><Settings className="w-8 h-8" /></button>
            </div>

            <p className="max-w-md text-center text-gray-500 font-medium leading-relaxed italic">
              "Focus is the art of saying no to everything else."
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Focus Session</h1>
          <p className="text-gray-400 mt-1">Eliminate distractions and find your flow.</p>
        </div>
        <div className="flex gap-2">
          <button className="p-3 rounded-xl bg-white/5 border border-white/5 text-gray-400 hover:text-white transition-all">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-12 flex flex-col items-center justify-center relative overflow-hidden"
          >
            {/* Background Animation */}
            <div className={cn(
              "absolute inset-0 opacity-10 blur-[100px] transition-colors duration-1000",
              mode === 'focus' ? "bg-primary" : "bg-secondary"
            )} />

            <div className="flex gap-2 mb-12 p-1 bg-black/40 rounded-2xl border border-white/5 relative z-10">
              {[
                { id: 'focus', label: 'Focus', icon: Brain },
                { id: 'break', label: 'Short Break', icon: Coffee },
                { id: 'long', label: 'Long Break', icon: Coffee },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => changeMode(m.id as any)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all",
                    mode === m.id 
                      ? "bg-white/10 text-white shadow-xl" 
                      : "text-gray-500 hover:text-gray-300"
                  )}
                >
                  <m.icon className="w-4 h-4" />
                  {m.label}
                </button>
              ))}
            </div>

            <div className="relative mb-12">
              <svg className="w-80 h-80 -rotate-90">
                <circle
                  cx="160"
                  cy="160"
                  r="140"
                  className="stroke-white/5 fill-none"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="160"
                  cy="160"
                  r="140"
                  className={cn(
                    "fill-none",
                    mode === 'focus' ? "stroke-primary" : "stroke-secondary"
                  )}
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "880 880", strokeDashoffset: 880 }}
                  animate={{ 
                    strokeDashoffset: (880 * (1 - time / (mode === 'focus' ? 1500 : mode === 'break' ? 300 : 900))) 
                  }}
                  transition={{ duration: 1, ease: 'linear' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-7xl font-display font-bold text-white tracking-tighter tabular-nums">
                  {formatTime(time)}
                </span>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-2">
                  {isActive ? 'Keep Going' : 'Ready?'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6 relative z-10">
              <button 
                onClick={resetTimer}
                className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all hover:scale-110 active:scale-95"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
              <button 
                onClick={toggleTimer}
                className={cn(
                  "w-24 h-24 rounded-3xl flex items-center justify-center transition-all shadow-2xl hover:scale-105 active:scale-95",
                  isActive 
                    ? "bg-white/5 border border-white/10 text-white" 
                    : mode === 'focus' ? "bg-primary text-black" : "bg-secondary text-white"
                )}
              >
                {isActive ? <Pause className="w-10 h-10 fill-current" /> : <Play className="w-10 h-10 fill-current ml-2" />}
              </button>
              <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all hover:scale-110 active:scale-95">
                <Target className="w-6 h-6" />
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
             <div className="glass-card p-6 border-primary/20 bg-primary/5">
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Session Goal</h4>
                <p className="text-lg font-display font-bold text-white">Mastering Algorithms</p>
                <div className="mt-4 flex items-center gap-2">
                   <div className="flex-1 h-1.5 bg-black/40 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-2/3" />
                   </div>
                   <span className="text-[10px] font-bold text-gray-500">65%</span>
                </div>
             </div>
             <div className="glass-card p-6 border-white/5 cursor-pointer hover:border-primary/30 transition-all group" onClick={() => setIsZenMode(true)}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Focus Mode</h4>
                  <Maximize2 className="w-4 h-4 text-gray-700 group-hover:text-primary" />
                </div>
                <p className="text-lg font-display font-bold text-white">Zen Interface</p>
                <p className="text-[10px] text-gray-500 mt-2 font-medium">Click to hide all UI and enter total deep work.</p>
             </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="glass-card p-6">
              <h3 className="text-sm font-bold text-white mb-4">Focus Tips</h3>
              <div className="space-y-4">
                 {[
                   { icon: Brain, title: 'Single Tasking', desc: 'Focusing on one task increases efficiency by 40%.' },
                   { icon: Info, title: 'Drink Water', desc: 'Hydration improves brain function and focus levels.' },
                   { icon: Music, title: 'Lofi Beats', desc: 'Background music helps block distracting noises.' },
                 ].map((tip, i) => (
                   <div key={i} className="flex gap-4">
                      <div className="mt-1">
                        <tip.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{tip.title}</h4>
                        <p className="text-[10px] text-gray-500 leading-relaxed mt-0.5">{tip.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="glass-card p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-sm font-bold text-white mb-4">Tasks for this Session</h3>
              <div className="space-y-3">
                 {[
                   { label: 'Solve 3 LeetCode problems', done: true },
                   { label: 'Read Binary Search docs', done: false },
                   { label: 'Take notes on BFS/DFS', done: false },
                 ].map((task, i) => (
                   <div key={i} className="flex items-center gap-3">
                      <div className={cn(
                        "w-5 h-5 rounded-md border flex items-center justify-center transition-all cursor-pointer",
                        task.done ? "bg-primary border-primary" : "bg-white/5 border-white/10 hover:border-primary/50"
                      )}>
                        {task.done && <Play className="w-3 h-3 text-black fill-current rotate-90" />}
                      </div>
                      <span className={cn("text-xs font-medium transition-all", task.done ? "text-gray-500 line-through" : "text-gray-300")}>
                        {task.label}
                      </span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
