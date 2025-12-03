import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

interface SliderReactionProps {
    apiKey?: string;
    showcaseMode?: boolean;
    onSuccess?: (data: any) => void;
    onError?: (error: Error) => void;
}

const RANGE = Array.from({ length: 10 }, (_, i) => i + 1);

export const SliderCrystal = ({ apiKey, showcaseMode = false, onSuccess, onError }: SliderReactionProps = {}) => {
    const [level, setLevel] = useState(0);
    const [hoverLevel, setHoverLevel] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (showcaseMode) {
            setSubmitted(true);
            return;
        }

        if (!apiKey || level === 0) {
            onError?.(new Error('API key and rating required'));
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                },
                body: JSON.stringify({
                    type: 'slider',
                    rating: level,
                    component_name: 'SliderReaction',
                    component_variant: 'Crystal',
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to submit feedback');
            }

            const data = await response.json();
            onSuccess?.(data);
            setSubmitted(true);
        } catch (error) {
            onError?.(error as Error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getColorForLevel = (l: number) => {
        if (l === 0) return 'bg-zinc-800';
        if (l <= 4) return 'bg-red-500 shadow-[0_0_25px_rgba(239,68,68,0.4)]';
        if (l <= 7) return 'bg-yellow-500 shadow-[0_0_25px_rgba(234,179,8,0.4)]';
        return 'bg-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.4)]';
    };

    return (
        <div className="flex flex-col items-center gap-8">
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
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? <Sparkles size={20} className="animate-spin" /> : <ArrowRight size={24} strokeWidth={2.5} />}
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

export default SliderCrystal;
