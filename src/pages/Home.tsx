import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Zap, 
  Target, 
  Users, 
  Bot, 
  ArrowRight, 
  Star, 
  Shield, 
  CheckCircle2, 
  Laptop, 
  Brain, 
  Trophy, 
  Music, 
  MessageSquare,
  ChevronDown,
  Globe,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className="min-h-screen bg-dashboard-bg relative overflow-x-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[160px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[160px] -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Nav */}
      <nav className="container mx-auto px-6 py-8 flex items-center justify-between relative z-50">
        <div className="flex items-center gap-2">
          <Zap className="text-primary w-8 h-8 fill-primary" />
          <span className="font-display font-bold text-2xl tracking-tight text-white">FocusLoop AI</span>
        </div>
        <div className="hidden lg:flex items-center gap-10 text-sm font-semibold text-gray-400">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-primary transition-colors">Method</a>
          <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="hidden sm:block text-sm font-bold text-gray-300 hover:text-white px-4">Login</Link>
          <Link to="/onboarding" className="bg-primary hover:bg-primary/90 text-black px-8 py-3 rounded-2xl font-black transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95 leading-none">
            Join Now
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-6 pt-24 pb-40 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-10 backdrop-blur-md"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <img 
                key={i} 
                src={`https://picsum.photos/seed/face${i}/40/40`} 
                className="w-5 h-5 rounded-full border border-black" 
                alt="user"
                referrerPolicy="no-referrer"
              />
            ))}
          </div>
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Trusted by 500,000+ Students</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-7xl md:text-9xl font-display font-black text-white leading-[0.85] mb-10 tracking-tighter"
        >
          FORCE YOUR <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">FOCUS.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xl md:text-2xl text-gray-400 mb-14 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          The elite study ecosystem for students who demand more. Master deep work with AI tutors, live rooms, and focus rewards.
        </motion.p>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
           className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <Link to="/onboarding" className="w-full sm:w-auto px-12 py-6 bg-white text-black rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-white/90 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:-translate-y-1">
            Start Free Session <ArrowRight className="w-6 h-6" />
          </Link>
          <button className="w-full sm:w-auto px-12 py-6 glass-card border-white/20 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
            Watch Method
          </button>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-32 max-w-6xl mx-auto relative perspective-1000"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl opacity-30 animate-pulse" />
          <div className="glass-card p-2 rounded-[2.5rem] overflow-hidden shadow-2xl skew-y-1 rotate-1 scale-[1.02] border-white/10">
            <div className="bg-black/80 rounded-[2rem] overflow-hidden border border-white/5 relative aspect-video">
              <img 
                src="https://picsum.photos/seed/final-dash/1600/900" 
                alt="Premium Dashboard" 
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dashboard-bg via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 text-left">
                <div className="flex gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center border border-secondary/30">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                <h3 className="text-2xl font-display font-bold text-white tracking-tight">Active Focus Interface v2.4</h3>
                <p className="text-gray-400 text-sm mt-1">Live metrics tracking with AI session optimization</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="container mx-auto px-6 py-40 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-4">Built for Mastery</h2>
          <p className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter">Everything you need <br /> to enter the flow state.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              icon: Bot, 
              title: 'AI Study Tutor', 
              desc: 'Ask complex questions, solve equations, and get instant explanations tailored to your learning style.',
              color: 'text-primary', bg: 'bg-primary/5', border: 'border-primary/20' 
            },
            { 
              icon: Globe, 
              title: 'Global Focus Rooms', 
              desc: 'Join 24/7 live co-working spaces. See others work, share playlists, and stay accountable.',
              color: 'text-secondary', bg: 'bg-secondary/5', border: 'border-secondary/20' 
            },
            { 
              icon: Brain, 
              title: 'Depth Analytics', 
              desc: 'AI analyzes your sessions to predict peak focus times and suggest optimal break intervals.',
              color: 'text-accent', bg: 'bg-accent/5', border: 'border-accent/20' 
            },
            { 
              icon: Trophy, 
              title: 'Focus Rewards', 
              desc: 'Earn points for every focused minute. Unlock premium themes, custom avatars, and exclusive badges.',
              color: 'text-amber-400', bg: 'bg-amber-400/5', border: 'border-amber-400/20' 
            },
            { 
              icon: Music, 
              title: 'Ambient Engine', 
              desc: 'Built-in studio quality binaural beats, lofi, and white noise calibrated for cognitive performance.',
              color: 'text-pink-400', bg: 'bg-pink-400/5', border: 'border-pink-400/20' 
            },
            { 
              icon: Shield, 
              title: 'Privacy First', 
              desc: 'Your study data is encrypted. We focus on your focus, not your personal information.',
              color: 'text-gray-400', bg: 'bg-gray-400/5', border: 'border-gray-400/20' 
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className={cn("glass-card p-10 border rounded-[2rem] transition-all group", feature.border, feature.bg)}
            >
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border group-hover:scale-110 transition-transform", feature.border, feature.bg)}>
                <feature.icon className={cn("w-7 h-7", feature.color)} />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed font-medium">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it Works / Method */}
      <section id="how-it-works" className="bg-black/40 border-y border-white/5 py-40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-xs font-black text-secondary uppercase tracking-[0.3em] mb-4">The Method</h2>
              <p className="text-5xl md:text-7xl font-display font-bold text-white tracking-tighter leading-[0.9] mb-10">Stop drifting. <br /> Start looping.</p>
              
              <div className="space-y-12">
                {[
                  { step: '01', title: 'Initialize Session', desc: 'Define your goal and set your timer. The AI locks your environment for minimum friction.' },
                  { step: '02', title: 'Deep Work Phase', desc: 'Enter the flow. AI detects drop-offs in focus and gently nudges you back via ambient shifts.' },
                  { step: '03', title: 'Earn & Analyze', desc: 'Receive your points. Get an instant teardown of your focus depth and areas of improvement.' },
                ].map((step, i) => (
                  <div key={i} className="flex gap-8 group">
                    <span className="text-3xl font-display font-black text-white/10 group-hover:text-secondary transition-colors duration-500">{step.step}</span>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                      <p className="text-gray-400 font-medium leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-secondary/20 blur-[120px] rounded-full animate-float" />
              <img 
                src="https://picsum.photos/seed/phone/800/1200" 
                className="w-full h-auto rounded-[3rem] border border-white/10 shadow-2xl relative z-10" 
                alt="Mobile App" 
                referrerPolicy="no-referrer"
              />
              {/* Floating Stat Card */}
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="absolute -right-8 top-1/2 glass-card p-6 border-secondary/30 z-20 w-64 shadow-2xl shadow-secondary/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Zap className="text-secondary w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-gray-500">Flow Depth</p>
                    <p className="text-sm font-bold text-white">Advanced Zen</p>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-3/4" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container mx-auto px-6 py-40">
        <div className="text-center mb-24">
          <h2 className="text-xs font-black text-accent uppercase tracking-[0.3em] mb-4">Investment</h2>
          <p className="text-5xl md:text-7xl font-display font-bold text-white tracking-tighter">Choose your path.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-8">
           {/* Free Tier */}
           <div className="glass-card p-12 border-white/5 bg-white/2 hover:border-white/10 transition-all flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Student</h3>
                <p className="text-gray-500 text-sm mb-8">Perfect for getting started with focus.</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-display font-black text-white">$0</span>
                  <span className="text-gray-500 font-bold uppercase text-xs">Forever</span>
                </div>
                <ul className="space-y-4 mb-12">
                   {['2 Active Focus Sessions/day', 'Access to Public Rooms', 'Basic Study Analytics', 'Standard Reward Tier'].map(f => (
                     <li key={f} className="flex items-center gap-3 text-sm text-gray-400 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-gray-700" /> {f}
                     </li>
                   ))}
                </ul>
              </div>
              <Link to="/signup" className="w-full py-5 border border-white/10 rounded-2xl text-white font-bold text-center hover:bg-white/5 transition-all">
                 Join Free
              </Link>
           </div>

           {/* Pro Tier */}
           <div className="glass-card p-12 border-primary/40 bg-primary/5 hover:border-primary/60 transition-all flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 px-6 py-2 bg-primary text-black font-black uppercase text-[10px] tracking-widest rounded-bl-2xl">
                 Most Popular
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Focused Pro</h3>
                <p className="text-primary/70 text-sm mb-8">For serious high-achievers.</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-display font-black text-white">$9</span>
                  <span className="text-gray-500 font-bold uppercase text-xs">Per Month</span>
                </div>
                <ul className="space-y-4 mb-12">
                   {['Unlimited Focus Sessions', 'Host Private Study Rooms', 'Full AI Tutor Access', 'Advanced Cognitive Insights', 'Exclusive Premium Themes', 'Early Access to v3.0'].map(f => (
                     <li key={f} className="flex items-center gap-3 text-sm text-white font-bold">
                        <CheckCircle2 className="w-4 h-4 text-primary" /> {f}
                     </li>
                   ))}
                </ul>
              </div>
              <Link to="/onboarding" className="w-full py-5 bg-primary rounded-2xl text-black font-black text-center shadow-[0_20px_40px_rgba(16,185,129,0.2)] hover:scale-105 transition-all">
                 Upgrade to Pro
              </Link>
           </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container mx-auto px-6 py-40 max-w-4xl">
        <div className="text-center mb-24">
          <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-4">Support</h2>
          <p className="text-5xl font-display font-bold text-white tracking-tighter">Clear doubts.</p>
        </div>

        <div className="space-y-4">
          {[
            { q: 'Is FocusLoop AI suitable for all majors?', a: 'Absolutely. Whether you are studying medicine, law, engineering, or design, our AI assistant is trained on vast academic datasets to provide contextually relevant help across all disciplines.' },
            { q: 'How does the AI optimize my focus?', a: 'Our engine monitors your interaction patterns and session quality. It then adjusts the ambient music and interface cues to minimize cognitive load, helping you stay in the "Zone" for longer periods.' },
            { q: 'Can I study with my existing friends?', a: 'Yes! Pro users can create private rooms and share invite links. Free users can join any public room or be invited to private ones.' },
            { q: 'Which devices are supported?', a: 'FocusLoop is available on Web, iOS, and Android. Your streaks and rewards sync seamlessly across all your devices.' },
          ].map((faq, i) => (
            <div key={i} className="glass-card p-8 border-white/5 hover:border-white/10 transition-all group cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{faq.q}</h4>
                <ChevronDown className="w-5 h-5 text-gray-700 group-hover:text-primary transition-all" />
              </div>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-6 py-40">
        <div className="glass-card p-20 border-primary/20 bg-primary/5 text-center relative overflow-hidden rounded-[4rem]">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_100%)]" />
           <motion.div
             initial={{ scale: 0.9, opacity: 0 }}
             whileInView={{ scale: 1, opacity: 1 }}
             viewport={{ once: true }}
             className="relative z-10"
           >
              <h2 className="text-6xl md:text-8xl font-display font-black text-white mb-10 tracking-tighter leading-none">
                READY TO <br /> ENTER THE <span className="text-primary italic">LOOP?</span>
              </h2>
              <p className="text-xl text-gray-400 mb-14 max-w-xl mx-auto font-medium">
                Join 500,000+ high-achievers and transform your productivity today. Free forever, upgrade whenever.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                 <Link to="/onboarding" className="w-full sm:w-auto px-12 py-6 bg-primary text-black rounded-3xl font-black text-xl shadow-[0_20px_40px_rgba(16,185,129,0.3)] hover:scale-105 transition-all">
                    Get Started Free
                 </Link>
                 <Link to="/login" className="w-full sm:w-auto px-12 py-6 glass-card border-white/20 text-white rounded-3xl font-black text-xl hover:bg-white/10 transition-all">
                    Existing User? Log In
                 </Link>
              </div>
           </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 pt-32 pb-20 bg-black/40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-24">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <Zap className="text-primary w-8 h-8 fill-primary" />
                <span className="font-display font-bold text-2xl text-white">FocusLoop AI</span>
              </div>
              <p className="text-gray-500 mb-8 max-w-xs font-medium leading-relaxed">
                The ultimate productivity ecosystem for modern students and lifelong learners.
              </p>
              <div className="flex gap-4">
                 {[1, 2, 3, 4].map(i => (
                   <div key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary text-gray-500 transition-all cursor-pointer">
                      <Plus className="w-5 h-5 rotate-45" />
                   </div>
                 ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-[10px] font-black uppercase text-white tracking-[0.2em] mb-8">Product</h4>
              <ul className="space-y-4 text-sm font-bold text-gray-600">
                <li><a href="#" className="hover:text-primary transition-colors">Platform</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">AI Assistant</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Rewards</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Enterprise</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black uppercase text-white tracking-[0.2em] mb-8">Community</h4>
              <ul className="space-y-4 text-sm font-bold text-gray-600">
                <li><a href="#" className="hover:text-primary transition-colors">Study Rooms</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Leaderboard</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Forums</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black uppercase text-white tracking-[0.2em] mb-8">Company</h4>
              <ul className="space-y-4 text-sm font-bold text-gray-600">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black uppercase text-white tracking-[0.2em] mb-8">Download</h4>
              <ul className="space-y-4 text-sm font-bold text-gray-600">
                <li><a href="#" className="hover:text-primary transition-colors">iOS App</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Android App</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Mac / Windows</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-white/5">
             <p className="text-[10px] font-black uppercase text-gray-700 tracking-widest">
                © 2026 FocusLoop AI Inc. All Rights Reserved.
             </p>
             <div className="flex gap-8 text-[10px] font-black uppercase text-gray-700 tracking-widest">
                <a href="#" className="hover:text-primary transition-all underline decoration-gray-900 underline-offset-4">Terms of Service</a>
                <a href="#" className="hover:text-primary transition-all underline decoration-gray-900 underline-offset-4">Cookie Policy</a>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
