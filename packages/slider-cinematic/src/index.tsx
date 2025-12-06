import './styles.css';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Minus, Star } from 'lucide-react';

interface SliderReactionProps {
    apiKey?: string;
    showcaseMode?: boolean;
    onSuccess?: (data: any) => void;
    onError?: (error: Error) => void;
}

const RANGE = Array.from({ length: 10 }, (_, i) => i + 1);

export const SliderCinematic = ({ apiKey, showcaseMode = false, onSuccess, onError }: SliderReactionProps = {}) => {
    const [selected, setSelected] = useState(5);
    const [hovered, setHovered] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleSubmit = async () => {
        if (showcaseMode) {
            setHasSubmitted(true);
            setTimeout(() => setHasSubmitted(false), 2000);
            return;
        }

        if (!apiKey) {
            onError?.(new Error('API key required'));
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch('https://www.zynta.cloud/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                },
                body: JSON.stringify({
                    type: 'slider',
                    rating: selected,
                    component_name: 'SliderReaction',
                    component_variant: 'Cinematic',
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to submit feedback');
            }

            const data = await response.json();
            onSuccess?.(data);
            setHasSubmitted(true);
            setTimeout(() => setHasSubmitted(false), 2000);
        } catch (error) {
            onError?.(error as Error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const displayValue = hovered || selected;

    const activeColor = displayValue <= 4 ? 'text-red-500'
        : displayValue <= 7 ? 'text-yellow-500'
            : 'text-emerald-500';

    const activeGlow = displayValue <= 4 ? 'bg-red-500'
        : displayValue <= 7 ? 'bg-yellow-500'
            : 'bg-emerald-500';

    return (
        <div className="flex flex-col items-center gap-8">
            <div className="relative group w-full max-w-lg">
                <div className="bg-black px-6 py-8 rounded-[2rem] border border-zinc-800 shadow-2xl relative overflow-hidden">

                    <motion.div
                        layoutId="spotlight"
                        className={`absolute top-0 bottom-0 w-20 opacity-20 blur-xl transition-colors duration-500 ${activeGlow}`}
                        animate={{
                            left: `${((displayValue - 1) / 9) * 80 + 5}%`
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    />

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
                        <div className={`w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center transition-colors duration-300 ${activeColor}`}>
                            {displayValue <= 4 ? <Shield size={18} /> :
                                displayValue <= 7 ? <Minus size={18} /> :
                                    <Star size={18} fill="currentColor" className="opacity-50" />}
                        </div>
                    </div>

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
                                    {(isActive || isHovered) && (
                                        <motion.div
                                            layoutId="lens-ring"
                                            className="absolute inset-0 rounded-full border border-white/20 bg-white/5 backdrop-blur-[1px] shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}

                                    <span className={`text-sm font-bold relative z-20 transition-all duration-300 ${isActive ? 'text-white scale-125' : isHovered ? 'text-zinc-300 scale-110' : 'text-zinc-600'}`}>
                                        {num}
                                    </span>

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

                    <div className="mt-8 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || hasSubmitted}
                        className="mt-6 w-full py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {hasSubmitted ? '✓ Submitted' : isSubmitting ? 'Submitting...' : 'Submit Rating'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SliderCinematic;
