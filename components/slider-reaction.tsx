import React, { useState, useRef, useEffect } from 'react';
import { 
  motion, 
  useMotionValue, 
  useTransform, 
  animate, 
  AnimatePresence 
} from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

/**
 * UTILITIES & SHARED CONFIG
 */
const RANGE = Array.from({ length: 10 }, (_, i) => i + 1); // [1, 2, ... 10]

// Interpolates color from Red (1) to Yellow (5) to Green (10)
const getColor = (value) => {
    if (value <= 4) return 'rgb(239, 68, 68)';   // Red-500
    if (value <= 7) return 'rgb(234, 179, 8)';   // Yellow-500
    return 'rgb(16, 185, 129)';                  // Emerald-500
};

// --- VARIANT 1: PHOTON BEAM ---
// A smooth, glowing slider with a floating number tag
export const VariantPhoton = () => {
    const [value, setValue] = useState(5);
    const constraintsRef = useRef(null);
    const x = useMotionValue(0);
    const width = 300;
    
    // Map x to value (1-10)
    const progress = useTransform(x, [0, width], [0, 1]);
    const background = useTransform(progress, [0, 0.5, 1], [
        'rgb(239, 68, 68)', 'rgb(234, 179, 8)', 'rgb(16, 185, 129)'
    ]);

    // Initial position
    useEffect(() => {
        // Set initial x based on default value 5
        x.set((5 / 10) * width);
    }, []);

    const handleDrag = () => {
        const p = x.get() / width;
        const newValue = Math.round(p * 9) + 1; // Map 0-1 to 1-10
        if (newValue !== value) setValue(newValue);
    };

    return (
        <div className="flex flex-col items-center gap-6">
            <span className="text-xs font-bold tracking-[0.2em] text-zinc-600 uppercase">Variant 01: Photon Beam</span>
            
            <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 shadow-2xl w-full max-w-md flex flex-col items-center relative overflow-hidden">
                {/* Background Ambient Glow */}
                <motion.div 
                    style={{ backgroundColor: background }}
                    className="absolute inset-0 opacity-5 blur-3xl"
                />

                <h3 className="text-white font-bold text-lg mb-10 relative z-10">How likely are you to recommend us?</h3>

                <div className="w-[300px] relative h-12 flex items-center" ref={constraintsRef}>
                    {/* Track: Dark Base */}
                    <div className="absolute w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        {/* Track: Active Fill (Beam) */}
                        <motion.div 
                            style={{ width: x, backgroundColor: background }}
                            className="h-full shadow-[0_0_20px_currentColor]"
                        />
                    </div>

                    {/* Ticks */}
                    <div className="absolute w-full flex justify-between px-1 pointer-events-none">
                        {RANGE.map(n => (
                            <div key={n} className={`w-0.5 h-1.5 rounded-full ${n === 1 || n === 10 ? 'bg-zinc-600 h-2' : 'bg-zinc-800'}`} />
                        ))}
                    </div>

                    {/* The Photon Handle */}
                    <motion.div
                        drag="x"
                        dragConstraints={constraintsRef}
                        dragElastic={0}
                        dragMomentum={false}
                        onDrag={handleDrag}
                        style={{ x }}
                        className="absolute top-1/2 -translate-y-1/2 -left-3 cursor-grab active:cursor-grabbing z-20"
                    >
                        {/* Floating Number Tag */}
                        <motion.div 
                            style={{ backgroundColor: background }}
                            className="absolute -top-12 left-1/2 -translate-x-1/2 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                            whileTap={{ scale: 1.1, y: -5 }}
                        >
                            <span className="text-black font-bold text-lg">{value}</span>
                            {/* Little Triangle Arrow */}
                            <motion.div 
                                style={{ borderTopColor: background }}
                                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px]" 
                            />
                        </motion.div>

                        {/* The Glowing Orb Handle */}
                        <motion.div 
                            style={{ backgroundColor: background }}
                            className="w-6 h-6 rounded-full border-2 border-white shadow-[0_0_15px_currentColor]"
                        />
                    </motion.div>
                </div>

                <div className="w-full flex justify-between mt-4 text-xs font-medium text-zinc-600 uppercase tracking-wider">
                    <span>Unlikely</span>
                    <span>Very Likely</span>
                </div>
            </div>
        </div>
    );
};

// --- VARIANT 2: MAGNETIC RULER ---
// Numbers magnify as you hover/drag over them
export const VariantMagnetic = () => {
    const [hovered, setHovered] = useState(null);
    const [selected, setSelected] = useState(null);

    return (
        <div className="flex flex-col items-center gap-6">
            <span className="text-xs font-bold tracking-[0.2em] text-zinc-600 uppercase">Variant 02: Magnetic Ruler</span>

            <div className="bg-black p-2 rounded-full border border-zinc-800 shadow-2xl flex items-center gap-1 relative">
                {/* Background Slider Pill */}
                <AnimatePresence>
                    {selected && (
                        <motion.div
                            layoutId="magnetic-pill"
                            className="absolute top-2 bottom-2 bg-zinc-800 rounded-full z-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            // We need to calculate position manually for layoutId to work across list items perfectly, 
                            // but for this simplified version we'll rely on the button's own background state or 
                            // just let the numbers pop.
                            // Let's stick to individual button animations for simplicity and robustness here.
                            style={{ display: 'none' }} 
                        />
                    )}
                </AnimatePresence>

                {RANGE.map((num) => (
                    <MagneticNumber 
                        key={num} 
                        num={num} 
                        isSelected={selected === num}
                        onClick={() => setSelected(num)}
                    />
                ))}
            </div>
            
            <div className="h-8 text-center">
                <AnimatePresence mode="wait">
                    {selected && (
                        <motion.div
                            key={selected}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-lg font-medium text-zinc-300"
                        >
                            You selected <span className="text-white font-bold">{selected}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

// Sub-component for Magnetic Effect
const MagneticNumber = ({ num, isSelected, onClick }) => {
    return (
        <motion.button
            onClick={onClick}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            animate={isSelected ? "selected" : "idle"}
            variants={{
                idle: { scale: 1, backgroundColor: "rgba(255,255,255,0)" },
                hover: { scale: 1.5, backgroundColor: "rgba(255,255,255,0.1)", zIndex: 10 },
                tap: { scale: 0.9 },
                selected: { scale: 1.2, backgroundColor: "rgba(255,255,255,1)", color: "#000", zIndex: 5 }
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={`
                relative w-10 h-14 rounded-full flex items-center justify-center 
                text-sm font-bold cursor-pointer select-none transition-colors
                ${isSelected ? 'text-black' : 'text-zinc-500 hover:text-white'}
            `}
        >
            {num}
        </motion.button>
    );
};


// --- VARIANT 3: CRYSTAL SEGMENTS ---
// Click or drag to fill glass shards.
export const VariantCrystal = () => {
    const [level, setLevel] = useState(0);
    const [hoverLevel, setHoverLevel] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const handleInteraction = (val) => {
        if (submitted) return;
        setLevel(val);
    };

    const getColorForLevel = (l) => {
        if (l === 0) return 'bg-zinc-800'; // Empty
        if (l <= 4) return 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]';
        if (l <= 7) return 'bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]';
        return 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]';
    };

    return (
        <div className="flex flex-col items-center gap-6">
            <span className="text-xs font-bold tracking-[0.2em] text-zinc-600 uppercase">Variant 03: Crystal Charge</span>

            <div 
                className="bg-black/50 backdrop-blur-md p-6 rounded-[2rem] border border-white/5 shadow-2xl"
                onMouseLeave={() => setHoverLevel(0)}
            >
                <div className="flex gap-1.5 mb-6">
                    {RANGE.map((val) => {
                        const isActive = (hoverLevel || level) >= val;
                        const isHovered = hoverLevel >= val;
                        
                        return (
                            <motion.button
                                key={val}
                                onClick={() => !submitted && setLevel(val)}
                                onMouseEnter={() => !submitted && setHoverLevel(val)}
                                disabled={submitted}
                                className="relative w-6 h-20 rounded-lg overflow-hidden outline-none group"
                                whileHover={{ scaleY: 1.1 }}
                                whileTap={{ scaleY: 0.95 }}
                            >
                                {/* Base Glass */}
                                <div className="absolute inset-0 bg-zinc-800/50 border border-white/5" />
                                
                                {/* Active Fill */}
                                <motion.div 
                                    initial={false}
                                    animate={{ 
                                        height: isActive ? '100%' : '0%',
                                        opacity: isActive ? 1 : 0
                                    }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    className={`absolute bottom-0 left-0 right-0 w-full ${getColorForLevel(hoverLevel || level)}`}
                                />
                                
                                {/* Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            </motion.button>
                        );
                    })}
                </div>
                
                <div className="flex justify-between items-center h-10 px-2">
                    <div className="flex flex-col">
                        <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Rating</span>
                        <span className="text-2xl font-bold text-white leading-none">{(hoverLevel || level)}<span className="text-zinc-600 text-lg">/10</span></span>
                    </div>
                    
                    {level > 0 && !submitted && (
                         <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSubmitted(true)}
                            className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-black shadow-lg hover:bg-zinc-200"
                        >
                            <ArrowRight size={20} />
                        </motion.button>
                    )}
                    
                    {submitted && (
                         <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="h-10 w-10 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                        >
                            <Check size={20} />
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};
