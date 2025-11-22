import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Send } from 'lucide-react';

export const VariantForm = () => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFeedback(''); // Clear feedback after submission
      setTimeout(() => setSubmitted(false), 3000); // Reset submitted state
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <span className="text-xs font-bold tracking-[0.2em] text-zinc-600 uppercase">Variant 01: Text Feedback Form</span>
      
      <motion.div
        layout
        className="bg-[#111] w-full max-w-md rounded-3xl shadow-2xl border border-white/5 overflow-hidden relative"
      >
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

        <div className="p-8 flex flex-col items-center pt-12">
          <h3 className="text-white font-bold text-2xl mb-2 tracking-tight">Share Your Thoughts</h3>
          <p className="text-zinc-500 text-sm text-center mb-10 leading-relaxed">
            We appreciate your feedback! Please tell us what's on your mind.
          </p>
          
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Type your feedback here..."
              rows={6}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 text-sm text-white resize-none focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-zinc-700 transition-all placeholder:text-zinc-600"
              required
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-white text-black rounded-xl font-bold text-sm hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
              disabled={loading || submitted}
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </motion.span>
                ) : submitted ? (
                  <motion.span
                    key="submitted"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-emerald-600"
                  >
                    <Check size={20} />
                    Submitted!
                  </motion.span>
                ) : (
                  <motion.span
                    key="submit"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Send size={20} />
                    Submit Feedback
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
