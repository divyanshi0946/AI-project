import React from 'react';
import { motion } from 'motion/react';
import { Plus, Search, Users, Shield, Lock, Globe, ArrowRight, Video, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const rooms = [
  { id: '1', name: 'Software Engineering 101', members: 142, creator: 'Alex R.', type: 'public', tags: ['CS', 'Tech'] },
  { id: '2', name: 'Design & UX Flow', members: 85, creator: 'Sarah K.', type: 'public', tags: ['Design', 'UI'] },
  { id: '3', name: 'Med School Grads', members: 210, creator: 'David L.', type: 'private', tags: ['Medical'] },
  { id: '4', name: 'Deep Work Only', members: 12, creator: 'FocusLoop', type: 'public', tags: ['Deep Work'] },
  { id: '5', name: 'Lofi Study Night', members: 540, creator: 'Lofi Girl', type: 'public', tags: ['Chill', 'Music'] },
  { id: '6', name: 'Web Dev Mastery', members: 92, creator: 'Marcus T.', type: 'public', tags: ['Dev', 'Code'] },
];

export default function Rooms() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Study Rooms</h1>
          <p className="text-gray-400 mt-1">Study live with peers around the world.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/10 transition-all text-sm">
            <Shield className="w-4 h-4" /> Host Private
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-2xl font-bold hover:bg-primary/90 transition-all text-sm shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" /> Create Room
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search for subjects, creators, or tags..."
            className="w-full h-12 bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium placeholder:text-gray-700" 
          />
        </div>
        <div className="flex gap-2">
           {['All', 'Development', 'Design', 'Medical', 'Science'].map((cat) => (
             <button key={cat} className="h-12 px-4 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-gray-500 hover:text-white hover:bg-white/10 transition-all">
                {cat}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room, i) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card group hover:border-primary/20 transition-all"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-1.5">
                  {room.type === 'public' ? (
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-green-500/10 text-[9px] font-black uppercase text-green-500 border border-green-500/20">
                      <Globe className="w-2.5 h-2.5" /> Public
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-amber-500/10 text-[9px] font-black uppercase text-amber-500 border border-amber-500/20">
                      <Lock className="w-2.5 h-2.5" /> Private
                    </div>
                  )}
                  {room.tags.map(tag => (
                    <div key={tag} className="px-2 py-1 rounded-lg bg-white/5 text-[9px] font-black uppercase text-gray-500 border border-white/5">
                      {tag}
                    </div>
                  ))}
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(j => (
                    <img 
                      key={j}
                      src={`https://picsum.photos/seed/user${i}${j}/40/40`}
                      className="w-6 h-6 rounded-full border border-black bg-gray-800"
                      alt="member"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
              </div>

              <h3 className="text-lg font-display font-bold text-white group-hover:text-primary transition-colors">{room.name}</h3>
              <p className="text-xs text-gray-500 mt-1 font-medium italic">By {room.creator}</p>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-xs font-bold text-gray-300">{room.members} Studying</span>
                </div>
                <button className="p-2 rounded-xl bg-white/5 border border-white/5 text-gray-500 group-hover:bg-primary group-hover:text-black transition-all">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-white/5 flex items-center gap-4 bg-black/20">
               <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none">
                  <Video className="w-3 h-3 text-secondary" />
                  Video On
               </div>
               <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none">
                  <MessageCircle className="w-3 h-3 text-accent" />
                  Active Chat
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
