import './styles.css';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X } from 'lucide-react';

interface EmojiDockProps {
    apiKey?: string;
    showcaseMode?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    autoShowDelay?: number;
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

export const EmojiDock = ({
    apiKey,
    showcaseMode = false,
    open,
    onOpenChange,
    autoShowDelay,
    onSuccess,
    onError
}: EmojiDockProps = {}) => {
    // Internal state for uncontrolled mode
    const [internalOpen, setInternalOpen] = useState(false);
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;

    const [selected, setSelected] = useState<number | null>(null);
    const [hovered, setHovered] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOpenChange = (newOpen: boolean) => {
        if (!isControlled) {
            setInternalOpen(newOpen);
        }
        onOpenChange?.(newOpen);
    };

    // Handle auto-show delay
    useEffect(() => {
        if (autoShowDelay !== undefined && autoShowDelay > 0) {
            const timer = setTimeout(() => {
                handleOpenChange(true);
            }, autoShowDelay);
            return () => clearTimeout(timer);
        }
    }, [autoShowDelay]);

    const handleClose = () => {
        handleOpenChange(false);
        // Reset selection after closing
        setTimeout(() => {
            setSelected(null);
        }, 300);
    };

    const handleSelect = async (option: FeedbackOption) => {
        setSelected(option.id);

        if (showcaseMode) {
            setTimeout(() => {
                handleClose();
            }, 1000);
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
                    type: 'emoji',
                    rating: option.rating,
                    emoji: option.emoji,
                    component_name: 'EmojiReaction',
                    component_variant: 'Dock',
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to submit feedback');
            }

            const data = await response.json();
            onSuccess?.(data);
            setTimeout(() => {
                handleClose();
            }, 1000); // Close after success
        } catch (error) {
            onError?.(error as Error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="flex flex-col items-center justify-center gap-6 relative"
                    >
                        <button
                            onClick={handleClose}
                            className="absolute -top-10 right-0 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white/50 hover:text-white transition-all backdrop-blur-sm"
                        >
                            <X size={14} />
                        </button>

                        <div className="relative group">
                            <div className="flex items-end gap-2 px-4 pb-3 pt-4 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] ring-1 ring-white/5">
                                {FEEDBACK_OPTIONS.map((option) => {
                                    const isSelected = selected === option.id;
                                    const isHovered = hovered === option.id;

                                    const scale = isSelected ? 1.4 : isHovered ? 1.3 : 1;
                                    const y = isSelected ? -12 : isHovered ? -8 : 0;

                                    return (
                                        <motion.button
                                            key={option.id}
                                            onClick={() => !isSubmitting && handleSelect(option)}
                                            onMouseEnter={() => !isSubmitting && setHovered(option.id)}
                                            onMouseLeave={() => setHovered(null)}
                                            disabled={isSubmitting}
                                            initial="idle"
                                            whileHover="hover"
                                            whileTap="tap"
                                            variants={emojiVariants[option.anim]}
                                            className="relative flex flex-col items-center cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <AnimatePresence>
                                                {isSelected && (
                                                    <motion.div
                                                        layoutId="selection"
                                                        className="absolute -inset-2 bg-white/10 rounded-2xl blur-sm"
                                                    />
                                                )}
                                            </AnimatePresence>

                                            <motion.span
                                                className="text-5xl relative z-10"
                                                animate={{ scale, y }}
                                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            >
                                                {option.emoji}
                                            </motion.span>

                                            <AnimatePresence>
                                                {(isHovered || isSelected) && (
                                                    <motion.span
                                                        initial={{ opacity: 0, y: -5, scale: 0.8 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, y: -5, scale: 0.8 }}
                                                        className="absolute -bottom-6 text-[10px] font-bold text-white/70 uppercase tracking-wider whitespace-nowrap"
                                                    >
                                                        {option.label}
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};


