import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  Clock, 
  Zap, 
  Flame, 
  ArrowUpRight, 
  Play, 
  Users, 
  MessageSquare,
  TrendingUp,
  Brain,
  Target
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Link } from 'react-router-dom';

const data = [
  { day: 'Mon', minutes: 120 },
  { day: 'Tue', minutes: 180 },
  { day: 'Wed', minutes: 150 },
  { day: 'Thu', minutes: 240 },
  { day: 'Fri', minutes: 210 },
  { day: 'Sat', minutes: 300 },
  { day: 'Sun', minutes: 270 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-white">Focus Overview</h1>
        <p className="text-gray-400 mt-1">Welcome back, Alex. Ready to hit your goals today?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Focus Time', value: '17h 30m', icon: Clock, color: 'text-primary', progress: 75 },
          { label: 'Total Points', value: '8,420', icon: Zap, color: 'text-secondary', progress: 60, sub: '+420 today' },
          { label: 'Current Streak', value: '12 Days', icon: Flame, color: 'text-orange-500', progress: 85, sub: 'Level Up in 3 days' },
          { label: 'Distractions', value: '14', icon: Brain, color: 'text-accent', progress: 20, invert: true, sub: '-15% from Monday' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 border-white/5 group hover:border-white/10 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <stat.icon className={stat.color} />
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-primary transition-colors" />
            </div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest leading-none mb-2">{stat.label}</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-display font-bold text-white">{stat.value}</span>
              {stat.sub && <span className="text-[10px] text-gray-500 font-bold">{stat.sub}</span>}
            </div>
            <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${stat.progress}%` }}
                className={`h-full ${stat.color.replace('text', 'bg')}`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Graph */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-8 min-h-[400px]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold text-white">Focus Performance</h3>
                <p className="text-xs text-gray-500">Your weekly study minutes breakdown</p>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary">
                  Weekly
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400">
                  Monthly
                </div>
              </div>
            </div>
            
            <div className="h-[280px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6B7280', fontSize: 10, fontWeight: 700 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6B7280', fontSize: 10, fontWeight: 700 }}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#10B981', fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="minutes" 
                    stroke="#10B981" 
                    fillOpacity={1} 
                    fill="url(#colorMin)" 
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20 relative overflow-hidden group">
               <Zap className="absolute -bottom-4 -right-4 w-24 h-24 text-primary/5 group-hover:scale-110 transition-transform" />
               <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">Daily Goal</h4>
               <p className="text-2xl font-display font-bold text-white">4h 00m</p>
               <p className="text-xs text-gray-400 mt-2">You're 2.5 hours away from your goal!</p>
               <Link to="/study" className="mt-4 w-full h-10 bg-primary text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all text-sm leading-none">
                 <Play className="w-4 h-4 fill-current" /> Start Study
               </Link>
            </div>

            <div className="glass-card p-6 bg-gradient-to-br from-secondary/10 to-transparent border-secondary/20 relative overflow-hidden group">
               <Users className="absolute -bottom-4 -right-4 w-24 h-24 text-secondary/5 group-hover:scale-110 transition-transform" />
               <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">Active Rooms</h4>
               <p className="text-2xl font-display font-bold text-white">1,242 Live</p>
               <p className="text-xs text-gray-400 mt-2">Join a co-working space now.</p>
               <Link to="/rooms" className="mt-4 w-full h-10 bg-secondary text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-secondary/90 transition-all text-sm leading-none">
                 <Users className="w-4 h-4" /> Join Room
               </Link>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Brain className="w-4 h-4 text-primary" />
              AI Insights
            </h3>
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <p className="text-[11px] font-bold text-primary uppercase mb-1">Concentration Peak</p>
                <p className="text-xs text-gray-300 leading-relaxed">
                  "You focus best between **9 AM - 11 AM**. Your energy drops significantly after 45 mins. Try implementing Pomodoro."
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <p className="text-[11px] font-bold text-secondary uppercase mb-1">Trend Alert</p>
                <p className="text-xs text-gray-300 leading-relaxed">
                  "Your study streak is at 12 days! You're performing 20% better than last week."
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white">Recent Sessions</h3>
              <Link to="/study" className="text-[10px] font-bold text-primary uppercase hover:underline">View All</Link>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Data Structures', time: '2h 15m', date: 'Today' },
                { name: 'System Design', time: '1h 30m', date: 'Yesterday' },
                { name: 'Algorithm Review', time: '45m', date: '2 days ago' },
              ].map((session, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Target className="w-4 h-4 text-gray-500 group-hover:text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{session.name}</p>
                      <p className="text-[10px] text-gray-500 font-medium">{session.date}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400">{session.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Assistant Call */}
          <div className="glass-card p-6 border-accent/20 bg-accent/5">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-accent" />
              Quick Doubt Solve
            </h3>
            <p className="text-[11px] text-gray-400 mb-4 leading-relaxed line-clamp-2">
              Stuck on a problem? Ask our AI assistant instantly.
            </p>
            <Link to="/ai-assistant" className="w-full h-10 bg-white/10 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-white/20 transition-all text-xs leading-none">
               Open Assistant
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
