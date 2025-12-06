import './styles.css';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface EmojiReactionProps {
    apiKey?: string;
    showcaseMode?: boolean;
    onSuccess?: (data: any) => void;
    onError?: (error: Error) => void;
}

const emojiVariants: { [key: string]: Variants } = {
    shake: {
        hover: { x: [0, -2, 2, -2, 2, 0], transition: { duration: 0.4 } },
        tap: { x: [0, -4, 4, -4, 4, 0], scale: 1.2 }
    },
    droop: {
        hover: { rotate: -15, y: 2, transition: { type: "spring", stiffness: 300 } },
        tap: { scale: 0.9, rotate: -25 }
    },
    glance: {
        hover: { rotate: [0, 5, -5, 0], transition: { duration: 0.5 } },
        tap: { scale: 1.1 }
    },
    bounce: {
        hover: { y: -4, transition: { type: "spring", stiffness: 300 } },
        tap: { scale: 1.3 }
    },
    heartbeat: {
        hover: { scale: 1.2, transition: { type: "spring", stiffness: 400 } },
        tap: { scale: [1, 1.4, 1], transition: { duration: 0.3 } }
    }
};

type FeedbackOption = {
    id: number;
    label: string;
    emoji: string;
    anim: keyof typeof emojiVariants;
    color: string;
    rating: number;
};

const FEEDBACK_OPTIONS: FeedbackOption[] = [
    { id: 1, label: 'Terrible', emoji: '😖', anim: 'shake', color: 'bg-red-500', rating: 0 },
    { id: 2, label: 'Bad', emoji: '😞', anim: 'droop', color: 'bg-orange-500', rating: 3 },
    { id: 3, label: 'Okay', emoji: '😐', anim: 'glance', color: 'bg-yellow-500', rating: 5 },
    { id: 4, label: 'Good', emoji: '😄', anim: 'bounce', color: 'bg-blue-500', rating: 8 },
    { id: 5, label: 'Amazing', emoji: '😍', anim: 'heartbeat', color: 'bg-rose-500', rating: 10 },
];

export const EmojiSoul = ({ apiKey, showcaseMode = false, onSuccess, onError }: EmojiReactionProps = {}) => {
    const [selected, setSelected] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSelect = async (option: FeedbackOption) => {
        setSelected(option.id);

        if (showcaseMode) {
            return;
        }

        if (!apiKey) {
            onError?.(new Error('API key required'));
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch('https://zynta.cloud/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                },
                body: JSON.stringify({
                    type: 'emoji',
                    rating: option.rating,
                    emoji: option.emoji,
                    component_name: 'EmojiReaction',
                    component_variant: 'Soul',
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to submit feedback');
            }

            const data = await response.json();
            onSuccess?.(data);
        } catch (error) {
            onError?.(error as Error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="bg-black relative w-full max-w-md rounded-[2rem] border border-zinc-800 p-1 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 opacity-30 transition-colors duration-700 ease-in-out bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_70%)]" />

                <AnimatePresence>
                    {selected && (
                        <motion.div
                            key={selected}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.15 }}
                            exit={{ opacity: 0 }}
                            className={`absolute inset-0 ${FEEDBACK_OPTIONS.find(o => o.id === selected)?.color} blur-3xl`}
                        />
                    )}
                </AnimatePresence>

                <div className="relative z-10 bg-zinc-900/80 backdrop-blur-sm rounded-[1.8rem] p-8 text-center">
                    <h3 className="text-white font-medium text-xl mb-8 tracking-tight">How was the quality?</h3>

                    <div className="flex justify-between items-center px-2">
                        {FEEDBACK_OPTIONS.map((option) => {
                            const isSelected = selected === option.id;

                            return (
                                <motion.button
                                    key={option.id}
                                    onClick={() => handleSelect(option)}
                                    whileHover="hover"
                                    whileTap="tap"
                                    disabled={isSubmitting}
                                    variants={emojiVariants[option.anim]}
                                    className="relative outline-none group"
                                >
                                    <motion.div
                                        animate={{
                                            scale: isSelected ? 1.5 : 1,
                                            opacity: selected && !isSelected ? 0.3 : 1,
                                            filter: isSelected ? 'grayscale(0%)' : selected ? 'grayscale(100%)' : 'grayscale(0%)'
                                        }}
                                        className="text-4xl transition-all duration-300"
                                    >
                                        {option.emoji}
                                    </motion.div>

                                    {isSelected && (
                                        <motion.div
                                            layoutId="soul-dot"
                                            className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${option.color.replace('bg-', 'bg-')}`}
                                        />
                                    )}
                                </motion.button>
                            )
                        })}
                    </div>

                    <div className="mt-10 h-8">
                        {selected && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm text-zinc-400"
                            >
                                Thanks for feedback!
                            </motion.p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmojiSoul;
