'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

// --- Animations ---
const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const }
  }
};

const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

const HoverText = ({ text, hoverText, className }: { text: string, hoverText: string, className?: string }) => {
  return (
    <motion.div
      className={`relative overflow-hidden cursor-pointer grid ${className}`}
      initial="initial"
      whileHover="hover"
    >
      <motion.div
        className="col-start-1 row-start-1"
        variants={{
          initial: { y: 0 },
          hover: { y: "100%" }
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {text}
      </motion.div>
      <motion.div
        className="col-start-1 row-start-1"
        variants={{
          initial: { y: "-100%" },
          hover: { y: 0 }
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {hoverText}
      </motion.div>
    </motion.div>
  )
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-zinc-300 font-sans selection:bg-white/20 selection:text-white !scroll-smooth">

      {/* --- Ambient Background Glow --- */}
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-zinc-900/20 rounded-full blur-[120px] opacity-40 mix-blend-screen" />
      </div>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${scrolled ? 'py-4 backdrop-blur-xl border-b border-white/10' : 'py-8 bg-transparent'
          }`}
      >
        <div className="w-full md:w-[550px] mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
            <img src="/cat.png" alt="zynta logo" className="w-6 h-6 rounded-sm object-cover" />
            <span className="font-medium text-[10px] tracking-widest text-white uppercase">zynta</span>
          </div>

          <Link href="/auth" className="text-[10px] font-medium text-white/60 hover:text-white transition-colors uppercase tracking-wide">
            Get Started
          </Link>
        </div>
      </nav>

      {/* --- Main Content (Blog Layout) --- */}
      <main className="relative z-10 w-full md:w-[550px] mx-auto px-6 pt-60 pb-32">

        <motion.article
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col gap-6"
        >

          {/* Blog Title Area */}
          <motion.header variants={fadeUp} className="mb-2">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1 h-1 rounded-full bg-green-500 shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
              <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 font-medium">Engineering</span>
            </div>
            {/* Made Title Smaller */}
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tighter text-white leading-[1.1]">
              The art of doing less.
            </h1>
          </motion.header>

          <div className="w-full h-px bg-white/5 my-2" />

          {/* Narrative Paragraphs - Made Smaller */}
          <motion.div variants={fadeUp} className="space-y-6 text-sm md:text-[15px] leading-[1.8] text-zinc-400 font-normal">
            <p>
              <strong className="text-white font-medium">Software has become too loud.</strong> Somewhere along the way, we decided that bug reporting tools needed to be complex enterprise suites. We disagreed. We built zynta to be quiet.
            </p>

            <p>
              It starts with a simple premise: you shouldn't have to configure a feedback tool. It should just exist. We designed a tiny SDK that you drop into your layout file. No configuration objects, no heavy styling overrides. You import it, you render it, and suddenly your users have a voice.
            </p>

            <p>
              <strong className="text-white font-medium">We are open source.</strong> We believe tools like this should be accessible to everyone. You can host zynta entirely for free just plug in your API keys and environment variables, and you're live.
            </p>

            <p>
              Whether you need a quick emoji slider for sentiment analysis, a detailed form for bug reporting, or custom component variants, it's all included. We provide the building blocks; you choose how to use them. And with more features shipping every week, your toolkit keeps growing.
            </p>

            <p>
              We removed the clutter. Instead of complex JIRA-style boards, we give you a clean, linear workspace. You see the bug, you fix the bug, you close the bug. If you want to show your users what you're working on, you can toggle on a public page with a single click. It's transparency by default, privacy by choice.
            </p>
          </motion.div>

          {/* Call to Action (Inline) */}
          <motion.div variants={fadeUp} className="pt-6">
            <Link href="/auth" className="group flex items-center gap-3 text-white text-xs font-medium hover:text-zinc-300 transition-colors">
              <span className="border-b border-white/30 pb-0.5 group-hover:border-white transition-all">
                Start your integration
              </span>
              <ArrowRight className="w-3 h-3 opacity-50 group-hover:translate-x-1 group-hover:text-white transition-all" />
            </Link>
          </motion.div>

        </motion.article>

        {/* --- Minimal Footer --- */}
        <motion.footer variants={fadeUp} className="mt-24 pt-8 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-600 tracking-wider uppercase">
          <span>© 2025 zynta</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-400 transition-colors">Twitter</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Github</a>
          </div>
        </motion.footer>

      </main>

      {/* --- Fixed Corner Element (The Glitchy Cat) --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: ["0%", "-3%", "0%"], // Floating
        }}
        transition={{
          opacity: { delay: 1, duration: 0.8 },
          scale: { delay: 1, duration: 0.8 },
          y: {
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }
        }}
        className="fixed bottom-8 right-8 z-50 flex flex-col items-end pointer-events-none mix-blend-luminosity"
      >
        <div className="relative group">
          {/* Noise/Glitch Filter Overlay */}
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-20 mix-blend-overlay pointer-events-none z-10" />

          <motion.img
            src="https://png.pngtree.com/png-vector/20240124/ourmid/pngtree-sleeping-cat-illustration-png-image_11490666.png"
            alt="Resting cat"
            // Jitter/Glitch Animation
            animate={{
              x: [0, -2, 2, -1, 1, 0],
              filter: [
                "grayscale(100%) contrast(120%) brightness(90%)",
                "grayscale(100%) contrast(150%) brightness(110%) blur(1px)",
                "grayscale(100%) contrast(120%) brightness(90%)"
              ]
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatDelay: 4, // Jitters every 4 seconds
              ease: "linear"
            }}
            className="w-24 md:w-28 opacity-80"
          />
          <div className="absolute -bottom-2 right-4 translate-y-full opacity-60">
            <p className="text-[9px] text-zinc-500 font-mono tracking-tight text-right w-32">
              System Status: Asleep
            </p>
          </div>
        </div>
      </motion.div>

    </div>
  );
}