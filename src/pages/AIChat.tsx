import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Bot, Send, User, Sparkles, Terminal, Code2, Calculator, HelpCircle, History, Trash2, Plus, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GoogleGenAI } from '@google/genai';
import { Message } from '@/types';

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      content: "Hello Alex! I'm your FocusLoop AI Tutor. Need help with a complex problem, code snippet, or just some study advice?",
      timestamp: new Date().toISOString(),
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const solveTemplates = [
    { label: "Step-by-step Math", query: "Can you solve this math problem step-by-step with clear logic? [PASTE PROBLEM HERE]" },
    { label: "Code Debugger", query: "Review this code and find any bugs or performance issues. Suggested fix appreciated. [PASTE CODE HERE]" },
    { label: "Concept breakdown", query: "Explain this complex concept so a beginner can understand it. Use an analogy. [PASTE CONCEPT HERE]" },
    { label: "Exam Preparation", query: "Generate 5 practice questions with answers for this topic: [PASTE TOPIC HERE]" }
  ];

  const handleSend = async (overrideInput?: string) => {
    const finalInput = overrideInput || input;
    if (!finalInput.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: finalInput,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages.map(m => ({ role: m.role, parts: [{ text: m.content }] })), { role: 'user', parts: [{ text: finalInput }] }].slice(-10),
        config: {
          systemInstruction: "You are a senior Academic Tutor and Solver for FocusLoop AI. You excel at STEM subjects, Coding, and Literature. Provide detailed, accurate, and encouraging responses. Use LaTeX for math if possible (wrap in $$), use code blocks for snippets, and always provide a 'Key Takeaway' at the end of long explanations.",
        }
      });

      const modelMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: response.text || "I'm having trouble thinking right now. Let's try again in a moment.",
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
       console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex gap-8">
      {/* Sidebar for Chat History */}
      <div className="w-80 flex flex-col gap-4">
        <div className="glass-card p-6 space-y-4">
          <button className="w-full h-12 bg-primary text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
             <Plus className="w-4 h-4" /> New Session
          </button>
          
          <div className="pt-4 border-t border-white/5 space-y-2">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2">History</p>
            {[
              { id: '1', title: 'Binary Search Trees', date: '2h ago' },
              { id: '2', title: 'Calculus IV Intro', date: 'Yesterday' },
              { id: '3', title: 'React Performance', date: '2 days ago' },
            ].map(chat => (
              <button key={chat.id} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all text-left group">
                <div className="flex items-center gap-3 overflow-hidden">
                   <MessageSquare className="w-4 h-4 text-gray-600 flex-shrink-0" />
                   <span className="text-xs font-medium text-gray-400 group-hover:text-white truncate">{chat.title}</span>
                </div>
                <span className="text-[10px] font-medium text-gray-700">{chat.date}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 bg-accent/5 border-accent/20">
          <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            Doubt Solving Tools
          </h3>
          <p className="text-[10px] text-gray-500 mb-6 font-medium">Quick templates for complex tasks.</p>
          <div className="grid grid-cols-1 gap-2">
            {solveTemplates.map(template => (
              <button 
                key={template.label} 
                onClick={() => handleSend(template.query)}
                className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3 text-left hover:bg-white/10 transition-all font-bold group"
              >
                 <Plus className="w-3 h-3 text-gray-700 group-hover:text-primary" />
                 <span className="text-[11px] text-gray-400 group-hover:text-white leading-tight">{template.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 glass-card flex flex-col overflow-hidden relative border-white/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] -z-10" />

        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/20">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Advanced Tutor AI</h2>
              <p className="text-[10px] text-primary flex items-center gap-1 font-bold uppercase tracking-widest">
                System: Active & Thinking
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <button className="p-2 rounded-xl hover:bg-white/5 text-gray-500 hover:text-white transition-all"><History className="w-5 h-5" /></button>
             <button className="p-2 rounded-xl hover:bg-white/5 text-gray-500 hover:text-red-400 transition-all"><Trash2 className="w-5 h-5" /></button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth no-scrollbar"
        >
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-6 max-w-[90%]",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center border",
                msg.role === 'user' ? "bg-white/5 border-white/10" : "bg-primary/20 border-primary/20"
              )}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-gray-400" /> : <Bot className="w-5 h-5 text-primary" />}
              </div>
              <div className={cn(
                "space-y-2",
                msg.role === 'user' ? "text-right" : "text-left"
              )}>
                <div className={cn(
                  "px-6 py-4 rounded-3xl text-sm leading-relaxed",
                  msg.role === 'user' 
                    ? "bg-primary text-black font-medium rounded-tr-none shadow-xl" 
                    : "bg-white/5 text-gray-300 border border-white/10 rounded-tl-none"
                )}>
                  {msg.content}
                </div>
                <p className="text-[10px] text-gray-500 font-bold uppercase px-2">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
          {loading && (
             <div className="flex items-center gap-6 mr-auto animate-pulse">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                   <Bot className="w-5 h-5 text-gray-500" />
                </div>
                <div className="flex gap-1.5 p-4 bg-white/5 rounded-2xl rounded-tl-none border border-white/10">
                   <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" />
                   <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                   <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
             </div>
          )}
        </div>

        <div className="p-8 bg-black/40 border-t border-white/5">
          <div className="max-w-3xl mx-auto flex gap-4">
             <div className="flex-1 relative group">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask anything... Explain binary search, solve a math problem, or help me code."
                  className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm text-white"
                />
                <button 
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-black hover:scale-110 active:scale-95 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                   <Send className="w-5 h-5" />
                </button>
             </div>
          </div>
          <p className="text-[10px] text-center text-gray-600 mt-4 lowercase font-medium tracking-wide">
             FocusLoop AI can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
}

