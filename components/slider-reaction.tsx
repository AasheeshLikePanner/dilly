import React, { useState, useRef, useEffect } from 'react';
import { 
  motion, 
  useMotionValue, 
  useTransform, 
  animate, 
  AnimatePresence,
  useSpring
} from 'framer-motion';
import { Check, ArrowRight, Sparkles, TrendingDown, Minus, Zap, Star, Heart, Shield } from 'lucide-react';

/**
 * SHARED UTILS
 */
const RANGE = Array.from({ length: 10 }, (_, i) => i + 1);

// --- VARIANT 1: THE SHAPE-SHIFTER ---
// A slider where the handle morphs geometry and icon based on value
export const VariantShapeShifter = () => {
    const [value, setValue] = useState(5);
    const [isDragging, setIsDragging] = useState(false);
    const constraintsRef = useRef(null);
    
    // Motion
    const x = useMotionValue(0);
    const width = 300;
    
    // Initialize center
    useEffect(() => { x.set(width / 2); }, []);

    // Transforms
    const progress = useTransform(x, [0, width], [0, 1]);
    
    // 1. Color Interpolation
    const color = useTransform(progress, [0, 0.5, 1], [
        '#ef4444', '#eab308', '#10b981'
    ]);
    
    // 2. Border Radius Morph (Sharp -> Round -> Soft)
    const borderRadius = useTransform(progress, [0, 0.5, 1], [
        '20%', '50%', '30%' 
    ]);

    // 3. Rotation for dynamic feel
    const rotate = useTransform(progress, [0, 1], [-45, 45]);

    const handleDrag = () => {
        const p = x.get() / width;
        const newValue = Math.min(Math.max(Math.round(p * 9) + 1, 1), 10);
        if (newValue !== value) setValue(newValue);
    };

    // Icon Logic
    const getIcon = () => {
        if (value <= 3) return TrendingDown;
        if (value <= 7) return Minus;
        return Zap;
    };
    const Icon = getIcon();

    return (
        <div className="flex flex-col items-center gap-8">
            <span className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase">Variant 01: Shape Shifter</span>
            
            <div className="bg-zinc-900/80 backdrop-blur-xl p-10 rounded-[3rem] border border-white/5 shadow-2xl w-full max-w-md flex flex-col items-center relative overflow-hidden">
                
                {/* Dynamic Background Mesh */}
                <motion.div 
                    style={{ backgroundColor: color }}
                    className="absolute -top-20 -right-20 w-64 h-64 opacity-10 blur-[80px] rounded-full"
                />
                <motion.div 
                    style={{ backgroundColor: color }}
                    className="absolute -bottom-20 -left-20 w-64 h-64 opacity-10 blur-[80px] rounded-full"
                />

                {/* Text Feedback */}
                <div className="mb-12 text-center">
                    <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">Your Rating</h3>
                    <motion.div 
                        key={value}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold text-white flex items-center justify-center gap-3"
                    >
                        {value}
                        <span className="text-lg font-medium text-zinc-600">/ 10</span>
                    </motion.div>
                </div>

                {/* Slider Container */}
                <div className="w-[300px] relative h-16 flex items-center justify-center" ref={constraintsRef}>
                    
                    {/* Track */}
                    <div className="absolute w-full h-4 bg-black rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)] overflow-hidden">
                        {/* Fill */}
                        <motion.div 
                            style={{ width: x, backgroundColor: color }}
                            className="h-full opacity-50"
                        />
                    </div>

                    {/* The Morphing Handle */}
                    <motion.div
                        drag="x"
                        dragConstraints={constraintsRef}
                        dragElastic={0}
                        dragMomentum={false}
                        onDrag={handleDrag}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={() => setIsDragging(false)}
                        style={{ x, borderRadius, backgroundColor: color, rotate }}
                        className="absolute left-[-32px] w-16 h-16 flex items-center justify-center cursor-grab active:cursor-grabbing z-20 shadow-[0_0_30px_rgba(0,0,0,0.5)] border-4 border-zinc-900"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Inner Icon that swaps out */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={value <= 3 ? 'low' : value <= 7 ? 'mid' : 'high'}
                                initial={{ scale: 0, rotate: -90 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 90 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Icon size={24} color="white" strokeWidth={3} />
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                </div>

                <div className="w-full flex justify-between px-2 mt-8 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                     <span>Worse</span>
                     <span>Better</span>
                </div>
            </div>
        </div>
    );
};

// --- VARIANT 2: CINEMATIC SPOTLIGHT ---
// A ruler where the light follows the selection
export const VariantCinematic = () => {
    const [selected, setSelected] = useState(5);
    const [hovered, setHovered] = useState<number | null>(null);

    const displayValue = hovered || selected;

    // Get color based on current focus
    const activeColor = displayValue <= 4 ? 'text-red-500' 
                      : displayValue <= 7 ? 'text-yellow-500' 
                      : 'text-emerald-500';
    
    const activeGlow = displayValue <= 4 ? 'bg-red-500' 
                     : displayValue <= 7 ? 'bg-yellow-500' 
                     : 'bg-emerald-500';

    return (
        <div className="flex flex-col items-center gap-8">
            <span className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase">Variant 02: Cinematic Spotlight</span>

            <div className="relative group w-full max-w-lg">
                {/* Main Card */}
                <div className="bg-black px-6 py-8 rounded-[2rem] border border-zinc-800 shadow-2xl relative overflow-hidden">
                    
                    {/* The Spotlight Beam (Behind numbers) */}
                    <motion.div 
                        layoutId="spotlight"
                        className={`absolute top-0 bottom-0 w-20 opacity-20 blur-xl transition-colors duration-500 ${activeGlow}`}
                        animate={{ 
                            left: `${((displayValue - 1) / 9) * 80 + 5}%` // Approx position math
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    />
                    
                    {/* Label + Icon Reaction */}
                    <div className="flex justify-between items-center mb-8 px-2">
                        <div className="flex flex-col">
                            <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Likelihood</span>
                            <div className="flex items-baseline gap-2">
                                <span className={`text-3xl font-bold transition-colors duration-300 ${activeColor}`}>
                                    {displayValue}
                                </span>
                                <span className="text-zinc-600 text-sm">/ 10</span>
                            </div>
                        </div>
                        {/* Abstract Reaction Icon */}
                        <div className={`w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center transition-colors duration-300 ${activeColor}`}>
                             {displayValue <= 4 ? <Shield size={18} /> : 
                              displayValue <= 7 ? <Minus size={18} /> : 
                              <Star size={18} fill="currentColor" className="opacity-50" />}
                        </div>
                    </div>

                    {/* Number Row */}
                    <div className="relative flex justify-between items-center z-10">
                        {RANGE.map((num) => {
                            const isActive = selected === num;
                            const isHovered = hovered === num;
                            
                            return (
                                <button
                                    key={num}
                                    onClick={() => setSelected(num)}
                                    onMouseEnter={() => setHovered(num)}
                                    onMouseLeave={() => setHovered(null)}
                                    className="relative w-8 h-12 flex items-center justify-center outline-none group/btn"
                                >
                                    {/* The "Lens" Circle for selection */}
                                    {(isActive || isHovered) && (
                                        <motion.div
                                            layoutId="lens-ring"
                                            className="absolute inset-0 rounded-full border border-white/20 bg-white/5 backdrop-blur-[1px] shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}

                                    {/* The Number */}
                                    <span className={`text-sm font-bold relative z-20 transition-all duration-300 ${isActive ? 'text-white scale-125' : isHovered ? 'text-zinc-300 scale-110' : 'text-zinc-600'}`}>
                                        {num}
                                    </span>
                                    
                                    {/* Small Particles for High Scores */}
                                    {isActive && num >= 8 && (
                                        <>
                                            <motion.div 
                                                className={`absolute -top-2 w-1 h-1 rounded-full ${activeGlow}`}
                                                animate={{ y: -20, opacity: 0 }}
                                                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                                            />
                                             <motion.div 
                                                className={`absolute -top-1 right-0 w-0.5 h-0.5 rounded-full ${activeGlow}`}
                                                animate={{ y: -15, opacity: 0 }}
                                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                                            />
                                        </>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                    
                    {/* Bottom decorative line */}
                    <div className="mt-8 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
                </div>
            </div>
        </div>
    );
};

// --- VARIANT 3: CRYSTAL SEGMENTS (Polished) ---
export const VariantCrystal = () => {
    const [level, setLevel] = useState(0);
    const [hoverLevel, setHoverLevel] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const getColorForLevel = (l: number) => {
        if (l === 0) return 'bg-zinc-800'; 
        if (l <= 4) return 'bg-red-500 shadow-[0_0_25px_rgba(239,68,68,0.4)]';
        if (l <= 7) return 'bg-yellow-500 shadow-[0_0_25px_rgba(234,179,8,0.4)]';
        return 'bg-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.4)]';
    };

    return (
        <div className="flex flex-col items-center gap-8">
            <span className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase">Variant 03: Crystal Charge</span>

            <div 
                className="bg-black/50 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/5 shadow-2xl"
                onMouseLeave={() => setHoverLevel(0)}
            >
                <div className="flex gap-2 mb-8">
                    {RANGE.map((val) => {
                        const isActive = (hoverLevel || level) >= val;
                        
                        return (
                            <motion.button
                                key={val}
                                onClick={() => !submitted && setLevel(val)}
                                onMouseEnter={() => !submitted && setHoverLevel(val)}
                                disabled={submitted}
                                className="relative w-7 h-24 rounded-lg overflow-hidden outline-none group bg-zinc-900/50 border border-white/5"
                                whileHover={{ scaleY: 1.15, translateY: -4 }}
                                whileTap={{ scaleY: 0.95 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                            >
                                <motion.div 
                                    initial={false}
                                    animate={{ 
                                        height: isActive ? '100%' : '0%',
                                        opacity: isActive ? 1 : 0
                                    }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    className={`absolute bottom-0 left-0 right-0 w-full ${getColorForLevel(hoverLevel || level)}`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                            </motion.button>
                        );
                    })}
                </div>
                
                <div className="flex justify-between items-center h-12 px-2">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1">Your Rating</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-white leading-none">{(hoverLevel || level)}</span>
                            <span className="text-zinc-600 text-sm font-medium">/ 10</span>
                        </div>
                    </div>
                    
                    <AnimatePresence>
                        {level > 0 && !submitted && (
                             <motion.button
                                initial={{ scale: 0, opacity: 0, rotate: -45 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                exit={{ scale: 0, opacity: 0 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSubmitted(true)}
                                className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                            >
                                <ArrowRight size={24} strokeWidth={2.5} />
                            </motion.button>
                        )}
                        
                        {submitted && (
                             <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="h-12 w-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                            >
                                <Check size={24} strokeWidth={3} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};