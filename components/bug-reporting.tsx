import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug, Send, Check } from 'lucide-react';

export const VariantSimpleBugForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'sent'

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setStatus('sent');
      setTimeout(() => {
        setStatus('idle');
        setTitle('');
        setDescription('');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <span className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase">Variant 01: Simple Bug Report</span>
      
      <motion.div
        layout
        className="relative w-full max-w-md bg-[#121214] border border-white/5 rounded-[28px] overflow-hidden z-10 ring-1 ring-white/5"
      >
        {/* Success Overlay */}
        <AnimatePresence>
          {status === 'sent' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 bg-[#121214]/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-4 ring-1 ring-emerald-500/20"
              >
                <Check size={32} strokeWidth={3} />
              </motion.div>
              <motion.h3 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-white font-bold text-xl tracking-tight"
              >
                Bug Report Sent
              </motion.h3>
              <motion.p 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-zinc-500 text-sm mt-2 max-w-[200px] leading-relaxed"
              >
                Thanks for helping us squash bugs!
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-red-500/20 text-red-400">
              <Bug size={18} />
            </div>
            <div>
               <span className="block text-sm font-semibold text-white tracking-tight">Report a Bug</span>
               <span className="block text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Help us improve</span>
            </div>
          </div>

          <div>
            <label htmlFor="bug-title" className="sr-only">Bug Title</label>
            <input
              type="text"
              id="bug-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Short summary of the bug"
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg p-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/50"
              required
            />
          </div>

          <div>
            <label htmlFor="bug-description" className="sr-only">Bug Description</label>
            <textarea
              id="bug-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description of the bug, steps to reproduce, expected behavior, etc."
              rows={5}
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg p-3 text-sm text-white placeholder:text-zinc-500 resize-y focus:outline-none focus:ring-2 focus:ring-red-500/50"
              required
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all duration-300
              ${!title.trim() || !description.trim() || status === 'sending'
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                : 'bg-red-500 text-white hover:bg-red-600 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
              }
            `}
            disabled={!title.trim() || !description.trim() || status === 'sending'}
          >
            <AnimatePresence mode="wait">
              {status === 'sending' ? (
                <motion.span
                  key="sending"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Bug size={16} className="animate-spin" />
                  <span>Sending...</span>
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Send size={16} />
                  <span>Submit Bug Report</span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
