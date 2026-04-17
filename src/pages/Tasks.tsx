import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Search, Calendar, CheckCircle2, Circle, MoreVertical, Trash2, Filter, Zap, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Task } from '@/types';

const initialTasks: Task[] = [
  { id: '1', title: 'Complete Calculus Assignment', completed: false, priority: 'high', createdAt: new Date().toISOString() },
  { id: '2', title: 'Research Binary Search Trees', completed: true, priority: 'medium', createdAt: new Date().toISOString() },
  { id: '3', title: 'Update Resume', completed: false, priority: 'low', createdAt: new Date().toISOString() },
  { id: '4', title: 'Design Flow for Landing Page', completed: false, priority: 'high', createdAt: new Date().toISOString() },
];

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (!input.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: input,
      completed: false,
      priority: 'medium',
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
    setInput('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Daily Tasks</h1>
          <p className="text-gray-400 mt-1">Organize your work and track progress.</p>
        </div>
        <div className="flex gap-4 p-4 glass-card bg-primary/5 border-primary/10">
           <div className="text-right">
              <p className="text-[10px] font-bold text-primary uppercase">Completed</p>
              <p className="text-xl font-display font-bold text-white leading-none">{completedCount}/{tasks.length}</p>
           </div>
           <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
           </div>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
        <div className="relative flex items-center gap-3 glass-card p-4 border-white/10 group-focus-within:border-primary/50 transition-all">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            placeholder="Add a new task (e.g. Study Physics for 2 hours)"
            className="flex-1 bg-transparent border-none focus:outline-none text-white font-medium"
          />
          <button 
            onClick={addTask}
            disabled={!input.trim()}
            className="px-6 py-2 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-all text-sm disabled:opacity-50"
          >
            Add Task
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-gray-500">
         <div className="flex gap-6 text-xs font-bold uppercase tracking-widest">
            <button className="text-primary border-b-2 border-primary pb-2 px-1">All Tasks</button>
            <button className="hover:text-white transition-colors pb-2 px-1">Active</button>
            <button className="hover:text-white transition-colors pb-2 px-1">Completed</button>
         </div>
         <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 hover:text-white transition-all">
               <Filter className="w-4 h-4" /> <span className="text-[10px] font-bold uppercase">Filter</span>
            </button>
         </div>
      </div>

      <div className="space-y-3">
        {tasks.map((task, i) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              "group glass-card p-4 border-white/5 hover:border-white/10 transition-all flex items-center justify-between",
              task.completed && "opacity-60 grayscale-[0.8]"
            )}
          >
            <div className="flex items-center gap-4">
              <button 
                onClick={() => toggleTask(task.id)}
                className={cn(
                "w-6 h-6 rounded-lg border flex items-center justify-center transition-all",
                task.completed ? "bg-primary border-primary" : "bg-white/5 border-white/10 hover:border-primary/50"
              )}>
                {task.completed && <CheckCircle2 className="w-4 h-4 text-black" />}
              </button>
              <div>
                <h4 className={cn("text-sm font-medium transition-all", task.completed ? "text-gray-500 line-through" : "text-white")}>
                  {task.title}
                </h4>
                <div className="flex items-center gap-3 mt-1 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                   <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> 2:00 PM
                   </div>
                   <div className={cn(
                     "px-1.5 py-0.5 rounded bg-white/5 border border-white/5",
                     task.priority === 'high' ? "text-red-400 border-red-400/20" : 
                     task.priority === 'medium' ? "text-amber-400 border-amber-400/20" : "text-gray-400"
                   )}>
                     {task.priority}
                   </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <button 
                 onClick={() => removeTask(task.id)}
                 className="p-2 rounded-lg hover:bg-red-400/10 text-gray-600 hover:text-red-400 transition-all"
               >
                 <Trash2 className="w-4 h-4" />
               </button>
               <button className="p-2 rounded-lg hover:bg-white/5 text-gray-600 hover:text-white transition-all">
                 <MoreVertical className="w-4 h-4" />
               </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
