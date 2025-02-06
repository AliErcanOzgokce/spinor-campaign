'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to subscribe');
    }

    // Reset status after 3 seconds
    setTimeout(() => {
      setStatus('idle');
      setErrorMessage('');
    }, 3000);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="relative flex items-center">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={status === 'loading' || status === 'success'}
          className="w-full px-6 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 focus:border-purple-500 transition-all duration-300 outline-none text-lg disabled:opacity-50"
          required
        />
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.button
              key="submit"
              type="submit"
              className="absolute right-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Join Waitlist
            </motion.button>
          )}
          
          {status === 'loading' && (
            <motion.div
              key="loading"
              className="absolute right-2 px-6 py-2.5 bg-purple-600/50 text-white rounded-lg flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Joining...</span>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div
              key="success"
              className="absolute right-2 px-6 py-2.5 bg-emerald-600/50 text-white rounded-lg flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Welcome aboard!</span>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              key="error"
              className="absolute right-2 px-6 py-2.5 bg-red-600/50 text-white rounded-lg flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <XCircle className="w-4 h-4" />
              <span>{errorMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>Early access to beta features</span>
      </div>
    </motion.form>
  );
} 