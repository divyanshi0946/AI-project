import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Send, X, MessageSquare, Maximize2, Minimize2, Terminal, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GoogleGenAI } from '@google/genai';
import { Message } from '@/types';

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [isDoubtMode, setIsDoubtMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      content: "Hello! I'm your FocusLoop Assistant. How can I help you with your studies today?",
      timestamp: new Date().toISOString(),
    }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const doubtSuggestions = [
    { label: "Step-by-step math", query: "Explain this math concept step by step: " },
    { label: "Debug my code", query: "Identify the bug in this code: " },
    { label: "Summarize topic", query: "Can you provide a simple summary of: " },
    { label: "Historical context", query: "Explain the historical significance of: " }
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
          systemInstruction: isDoubtMode 
            ? "You are a specialized Doubt Solver. Focus on scientific, mathematical, and academic accuracy. Use step-by-step logic, clear bullet points, and provide example problems or metaphors where helpful. Use markdown formatting."
            : "You are a helpful, encouraging study assistant for FocusLoop AI. You help students understand concepts, solve problems, and stay productive. Keep responses concise and use clear steps for explanations.",
        }
      });

      const modelMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: response.text || "I'm sorry, I couldn't process that. Let's try again!",
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
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={cn(
              "glass-card mb-4 flex flex-col overflow-hidden shadow-2xl ring-1 ring-white/10",
              isExpanded ? "w-[600px] h-[700px]" : "w-[380px] h-[580px]"
            )}
          >
            {/* Header */}
            <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                  isDoubtMode ? "bg-accent/20" : "bg-primary/20"
                )}>
                  {isDoubtMode ? <Sparkles className="w-5 h-5 text-accent" /> : <Bot className="w-5 h-5 text-primary" />}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{isDoubtMode ? "Doubt Solver" : "AI Assistant"}</h3>
                  <button 
                    onClick={() => setIsDoubtMode(!isDoubtMode)}
                    className="text-[10px] text-gray-500 hover:text-white transition-colors flex items-center gap-1 font-bold uppercase tracking-widest"
                  >
                    Switch to {isDoubtMode ? "Chat" : "Solver"} 
                    <ArrowRight className="w-2 h-2" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 transition-colors"
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth no-scrollbar"
            >
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={cn(
                    "flex flex-col max-w-[85%]",
                    msg.role === 'user' ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <div className={cn(
                    "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'user' 
                      ? "bg-primary text-black font-semibold rounded-tr-none" 
                      : "bg-white/5 text-gray-200 border border-white/10 rounded-tl-none whitespace-pre-wrap"
                  )}>
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-gray-600 mt-1 px-1 font-bold">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
              {loading && (
                <div className="flex gap-1 items-center px-4 py-3 bg-white/3 rounded-2xl w-fit animate-pulse border border-white/5">
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0s]" />
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            {/* Suggestions */}
            <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar border-t border-white/5 bg-black/20">
              {(isDoubtMode ? doubtSuggestions : [
                { label: "Check focus stats", query: "Can you show me my focus stats for this week?" },
                { label: "Study tips", query: "Give me some quick focus tips for a 50-minute session." },
                { label: "Break ideas", query: "What should I do for a 5-minute study break?" }
              ]).map((s) => (
                <button
                  key={s.label}
                  onClick={() => handleSend(s.query)}
                  className="text-[10px] px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-primary/20 hover:border-primary/30 transition-all whitespace-nowrap font-bold uppercase tracking-wide"
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-black/40 border-t border-white/10">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a doubt..."
                  className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium text-sm transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-3xl bg-primary text-white shadow-[0_8px_32px_rgba(16,185,129,0.3)] flex items-center justify-center relative group"
      >
        <div className="absolute inset-0 bg-primary rounded-3xl animate-ping opacity-20 pointer-events-none group-hover:block hidden" />
        <MessageSquare className="w-7 h-7" />
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-secondary border-2 border-dashboard-bg rounded-full flex items-center justify-center animate-bounce">
          <Sparkles className="w-2.5 h-2.5 text-white" />
        </div>
      </motion.button>
    </div>
  );
}
