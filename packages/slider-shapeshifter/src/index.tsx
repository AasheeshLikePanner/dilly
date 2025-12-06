import './styles.css';
import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { TrendingDown, Minus, Zap } from 'lucide-react';

interface SliderReactionProps {
    apiKey?: string;
    showcaseMode?: boolean;
    onSuccess?: (data: any) => void;
    onError?: (error: Error) => void;
}

export const SliderShapeShifter = ({ apiKey, showcaseMode = false, onSuccess, onError }: SliderReactionProps = {}) => {
    const [value, setValue] = useState(5);
    const [isDragging, setIsDragging] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const constraintsRef = useRef(null);

    const x = useMotionValue(0);
    const width = 300;

    useEffect(() => { x.set(width / 2); }, []);

    const progress = useTransform(x, [0, width], [0, 1]);

    const color = useTransform(progress, [0, 0.5, 1], [
        '#ef4444', '#eab308', '#10b981'
    ]);

    const borderRadius = useTransform(progress, [0, 0.5, 1], [
        '20%', '50%', '30%'
    ]);

    const rotate = useTransform(progress, [0, 1], [-45, 45]);

    const handleDrag = () => {
        const p = x.get() / width;
        const newValue = Math.min(Math.max(Math.round(p * 9) + 1, 1), 10);
        if (newValue !== value) setValue(newValue);
    };

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
                    rating: value,
                    component_name: 'SliderReaction',
                    component_variant: 'ShapeShifter',
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

    const getIcon = () => {
        if (value <= 3) return TrendingDown;
        if (value <= 7) return Minus;
        return Zap;
    };
    const Icon = getIcon();

    return (
        <div className="flex flex-col items-center gap-8">
            <div className="bg-zinc-900/80 backdrop-blur-xl p-10 rounded-[3rem] border border-white/5 shadow-2xl w-full max-w-md flex flex-col items-center relative overflow-hidden">

                <motion.div
                    style={{ backgroundColor: color }}
                    className="absolute -top-20 -right-20 w-64 h-64 opacity-10 blur-[80px] rounded-full"
                />
                <motion.div
                    style={{ backgroundColor: color }}
                    className="absolute -bottom-20 -left-20 w-64 h-64 opacity-10 blur-[80px] rounded-full"
                />

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

                <div className="w-[300px] relative h-16 flex items-center justify-center" ref={constraintsRef}>

                    <div className="absolute w-full h-4 bg-black rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)] overflow-hidden">
                        <motion.div
                            style={{ width: x, backgroundColor: color }}
                            className="h-full opacity-50"
                        />
                    </div>

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

                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || hasSubmitted}
                    className="mt-6 w-full py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {hasSubmitted ? '✓ Submitted' : isSubmitting ? 'Submitting...' : 'Submit Rating'}
                </button>
            </div>
        </div>
    );
};

export default SliderShapeShifter;
