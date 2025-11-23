"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, Terminal, Sparkles, Box } from 'lucide-react';
import TextInputFeedback from '@/components/text-feedback';

// --- Custom Code Block Component ---
interface CodeSnippetProps {
  title: string;
  code: string;
  language?: string;
}

const CodeSnippet = ({ title, code, language = "typescript" }: CodeSnippetProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#121212]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/20" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/20" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/20" />
          </div>
          <span className="text-xs font-medium text-zinc-500 font-mono">{title}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md bg-white/5 px-2 py-1 text-xs font-medium text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      
      {/* Code Area */}
      <div className="overflow-x-auto p-4">
        <pre className="font-mono text-sm text-zinc-300 leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default function TextFeedbackPage() {
  const installCmd = "npm install @/components/text-feedback framer-motion lucide-react";
  const usageCode = `import TextInputFeedback from '@/components/text-feedback';

export default function Page() {
  return (
    <div className="flex justify-center p-10">
      <TextInputFeedback />
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30">
      {/* Navbar / Header */}
      <div className="border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white text-black p-1 rounded-md">
              <Box size={16} strokeWidth={3} />
            </div>
            <h1 className="font-bold tracking-tight text-sm">UI Components</h1>
          </div>
          <span className="text-xs text-zinc-500 font-mono">v1.0.0</span>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        
        {/* Hero Section */}
        <div className="mb-16 text-center space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-400 mb-4"
          >
            <Sparkles size={12} className="text-yellow-400" />
            <span>New Text Feedback Form</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
            Text Feedback
          </h2>
          <p className="text-zinc-400 text-lg max-w-lg mx-auto leading-relaxed">
            A simple and elegant form for collecting detailed user feedback.
          </p>
        </div>

        {/* Interactive Playground */}
        <div className="grid lg:grid-cols-5 gap-8 mb-20">
          
          {/* Left: The Preview Area */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-white/10 bg-[#0A0A0A] overflow-hidden shadow-2xl shadow-black/50 h-[400px] w-full flex items-center justify-center p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/20 via-[#0A0A0A] to-[#0A0A0A]">
              <TextInputFeedback />
            </div>
          </div>

          {/* Right: Implementation */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Terminal size={14} /> Installation
              </h3>
              <CodeSnippet title="Terminal" code={installCmd} />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Box size={14} /> Usage
              </h3>
              <CodeSnippet title="Page.tsx" code={usageCode} />
            </div>
            
            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 text-xs text-blue-200/80 leading-5">
              <strong>Pro Tip:</strong> The form component is standalone. Ensure you have <code>framer-motion</code> installed for the animations to work.
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}