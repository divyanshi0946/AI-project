import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Music, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  Maximize2, 
  Minimize2,
  Headphones,
  Wind,
  CloudRain,
  Flame,
  Radio,
  Coffee
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Track = {
  id: string;
  name: string;
  category: 'Lofi' | 'Nature' | 'Deep Work' | 'Ambient';
  icon: any;
  color: string;
};

const tracks: Track[] = [
  { id: '1', name: 'Late Night Study', category: 'Lofi', icon: Coffee, color: 'text-orange-400' },
  { id: '2', name: 'Morning Dew', category: 'Nature', icon: CloudRain, color: 'text-blue-400' },
  { id: '3', name: 'Binaural Alpha', category: 'Deep Work', icon: Headphones, color: 'text-primary' },
  { id: '4', name: 'Summer Wind', category: 'Nature', icon: Wind, color: 'text-teal-400' },
  { id: '5', name: 'Cozy Fireplace', category: 'Ambient', icon: Flame, color: 'text-red-400' },
  { id: '6', name: 'Focus Frequency', category: 'Deep Work', icon: Radio, color: 'text-secondary' },
];

export function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [volume, setVolume] = useState(80);

  return (
    <div className="fixed bottom-8 left-8 z-[100]">
      <AnimatePresence>
        {!isOpen ? (
          <motion.button
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 20 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-white hover:text-primary hover:border-primary/50 transition-all shadow-2xl group relative"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <Music className="w-6 h-6 relative z-10" />
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-primary" />
              </span>
            )}
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="w-80 glass-card bg-black/60 p-6 shadow-[0_32px_64px_rgba(0,0,0,0.5)] border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Music className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-white uppercase tracking-widest leading-none">Focus Music</h3>
                  <p className="text-[10px] text-gray-500 font-bold mt-1">AI Curated Tracks</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/5 rounded-lg text-gray-600 hover:text-white transition-colors"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 mb-6 border border-white/5 group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-10 group-hover:bg-primary/10 transition-colors" />
              <div className="flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-xl bg-black flex items-center justify-center shadow-lg border border-white/5", currentTrack.color)}>
                  <currentTrack.icon className="w-6 h-6 animate-pulse" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="text-sm font-bold text-white truncate">{currentTrack.name}</h4>
                  <p className="text-[10px] font-bold text-primary tracking-widest uppercase">{currentTrack.category}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-6">
                <button className="text-gray-600 hover:text-white transition-colors"><SkipBack className="w-5 h-5" /></button>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl shadow-white/5"
                >
                  {isPlaying ? <Pause className="fill-current w-5 h-5" /> : <Play className="fill-current w-5 h-5 ml-0.5" />}
                </button>
                <button className="text-gray-600 hover:text-white transition-colors"><SkipForward className="w-5 h-5" /></button>
              </div>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-2 no-scrollbar">
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-3 px-1">Library</p>
              {tracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => setCurrentTrack(track)}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-xl transition-all group",
                    currentTrack.id === track.id ? "bg-primary/10 border border-primary/20" : "hover:bg-white/5"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <track.icon className={cn("w-4 h-4", currentTrack.id === track.id ? track.color : "text-gray-600")} />
                    <span className={cn(
                      "text-xs font-bold transition-colors",
                      currentTrack.id === track.id ? "text-white" : "text-gray-500 group-hover:text-gray-300"
                    )}>{track.name}</span>
                  </div>
                  {currentTrack.id === track.id && (
                    <div className="flex gap-0.5 items-end h-3">
                      <div className="w-0.5 bg-primary animate-[music-bar_0.8s_ease-in-out_infinite]" />
                      <div className="w-0.5 bg-primary animate-[music-bar_1.2s_ease-in-out_infinite]" />
                      <div className="w-0.5 bg-primary animate-[music-bar_1s_ease-in-out_infinite]" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-4">
              <Volume2 className="w-4 h-4 text-gray-500" />
              <input 
                type="range" 
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary" 
              />
              <span className="text-[10px] font-black text-gray-600 w-6">{volume}%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
