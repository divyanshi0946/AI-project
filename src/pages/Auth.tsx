import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User as UserIcon, Github, Zap, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { auth } from '@/lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';

interface AuthProps {
  type: 'login' | 'signup' | 'onboarding';
}

export default function Auth({ type }: AuthProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  });
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (type === 'login') {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        navigate('/dashboard');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        if (formData.fullName) {
          await updateProfile(userCredential.user, {
            displayName: formData.fullName
          });
        }
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error('Firebase Auth Error:', err);
      let message = 'An error occurred during authentication.';
      
      const errorCode = err.code;
      
      if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-credential') {
        message = 'Invalid email or password.';
      } else if (errorCode === 'auth/email-already-in-use') {
        message = 'This email is already registered.';
      } else if (errorCode === 'auth/weak-password') {
        message = 'Password should be at least 6 characters.';
      } else if (errorCode === 'auth/invalid-email') {
        message = 'Please enter a valid email address.';
      } else if (errorCode === 'auth/operation-not-allowed') {
        message = 'Email/Password authentication is not enabled. Please enable it in the Firebase Console.';
      } else if (errorCode === 'auth/too-many-requests') {
        message = 'Too many failed attempts. Please try again later.';
      } else if (err.message) {
        // Fallback to Firebase's own error message for debugging
        message = err.message.replace('Firebase: ', '').replace(/\(auth\/.*\)\.?/, '').trim();
      }
      
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-dashboard-bg flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_100%)]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="text-primary w-6 h-6 fill-primary" />
            </div>
          </Link>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">
            {type === 'login' ? 'Welcome Back' : 'Join FocusLoop'}
          </h1>
          <p className="text-gray-500 mt-2">
            {type === 'login' ? 'Sign in to continue your journey.' : 'Unlock your potential with AI-driven focus.'}
          </p>
        </div>

        <div className="glass-card p-8 border-white/10 shadow-2xl relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-sm font-medium"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {type !== 'login' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                <div className="relative group">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                  <input 
                    name="fullName"
                    type="text" 
                    placeholder="John Doe"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full h-12 bg-white/5 border border-white/5 rounded-xl pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm transition-all placeholder:text-gray-700" 
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                <input 
                  name="email"
                  type="email" 
                  placeholder="alex@example.com"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full h-12 bg-white/5 border border-white/5 rounded-xl pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm transition-all placeholder:text-gray-700" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                <input 
                  name="password"
                  type="password" 
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full h-12 bg-white/5 border border-white/5 rounded-xl pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm transition-all placeholder:text-gray-700" 
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl transition-all shadow-lg hover:shadow-primary/20 flex items-center justify-center mt-6 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : type === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4 text-gray-600">
            <div className="h-px bg-white/5 flex-1" />
            <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Or Continue With</span>
            <div className="h-px bg-white/5 flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <button className="h-12 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all text-sm font-medium">
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
              Google
            </button>
            <button className="h-12 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all text-sm font-medium">
              <Github className="w-4 h-4" />
              GitHub
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            {type === 'login' ? (
              <>Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Sign up</Link></>
            ) : (
              <>Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link></>
            )}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
