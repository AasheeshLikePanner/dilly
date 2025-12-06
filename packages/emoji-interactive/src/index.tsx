import './styles.css';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X } from 'lucide-react';

interface EmojiReactionProps {
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

export const EmojiInteractive = ({
    apiKey,
    showcaseMode = false,
    open,
    onOpenChange,
    autoShowDelay,
    onSuccess,
    onError
}: EmojiReactionProps = {}) => {
    // Internal state for uncontrolled mode
    const [internalOpen, setInternalOpen] = useState(false);
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;

    const [step, setStep] = useState('rate');
    const [rating, setRating] = useState<number | null>(null);
    const [comment, setComment] = useState('');
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

    const handleRate = (id: number) => {
        setRating(id);
        setTimeout(() => setStep('comment'), 400);
    };

    const handleClose = () => {
        handleOpenChange(false);
        // Reset state after closing animation
        setTimeout(() => {
            setStep('rate');
            setRating(null);
            setComment('');
        }, 300);
    };

    const handleSubmit = async () => {
        if (showcaseMode) {
            setStep('done');
            setTimeout(() => {
                handleClose();
            }, 3000); // Close after 3s success message
            return;
        }

        if (!apiKey || rating === null) {
            onError?.(new Error('API key and rating required'));
            return;
        }

        setIsSubmitting(true);
        try {
            const selectedOption = FEEDBACK_OPTIONS.find(o => o.id === rating);
            if (!selectedOption) {
                throw new Error('Invalid rating');
            }

            const response = await fetch('https://www.zynta.cloud/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                },
                body: JSON.stringify({
                    type: 'emoji',
                    rating: selectedOption.rating,
                    emoji: selectedOption.emoji,
                    comment: comment || undefined,
                    component_name: 'EmojiReaction',
                    component_variant: 'Interactive',
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to submit feedback');
            }

            const data = await response.json();
            onSuccess?.(data);

            setStep('done');
            setTimeout(() => {
                handleClose();
            }, 3000); // Close after 3s success message
        } catch (error) {
            onError?.(error as Error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
                    <motion.div
                        layout
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="bg-[#111] w-full max-w-sm rounded-3xl shadow-2xl border border-white/5 overflow-hidden relative"
                    >
                        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                        <div
                            className="absolute top-4 right-4 z-20 text-zinc-600 hover:text-zinc-300 cursor-pointer transition-colors"
                            onClick={handleClose}
                        >
                            <X size={18} />
                        </div>

                        <AnimatePresence mode="wait">
                            {step === 'rate' && (
                                <motion.div
                                    key="step-rate"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                                    className="p-8 flex flex-col items-center pt-12"
                                >
                                    <h3 className="text-white font-bold text-2xl mb-2 tracking-tight">Rate Experience</h3>
                                    <p className="text-zinc-500 text-sm text-center mb-10 leading-relaxed">
                                        Help us improve by selecting<br />how you felt about the service.
                                    </p>

                                    <div className="flex justify-center gap-2 w-full">
                                        {FEEDBACK_OPTIONS.map((option) => (
                                            <motion.button
                                                key={option.id}
                                                onClick={() => handleRate(option.id)}
                                                whileHover="hover"
                                                whileTap="tap"
                                                variants={emojiVariants[option.anim]}
                                                className="p-3 rounded-2xl hover:bg-white/5 transition-colors relative outline-none"
                                            >
                                                <span className="text-4xl block">{option.emoji}</span>
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step === 'comment' && (
                                <motion.div
                                    key="step-comment"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    className="p-6 pt-8"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <button onClick={() => setStep('rate')} className="text-xs font-medium text-zinc-500 hover:text-white transition-colors uppercase tracking-wider">Back</button>

                                        {rating && (() => {
                                            const opt = FEEDBACK_OPTIONS.find(o => o.id === rating);
                                            if (!opt) return null;
                                            return (
                                                <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                                                    <span className="text-lg">{opt.emoji}</span>
                                                    <span className="text-xs font-bold text-white">{opt.label}</span>
                                                </div>
                                            )
                                        })()}
                                    </div>

                                    <textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Tell us what made you feel this way..."
                                        className="w-full h-32 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 text-sm text-white resize-none focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-zinc-700 transition-all mb-4 placeholder:text-zinc-600"
                                    />

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="w-full py-4 bg-white text-black rounded-xl font-bold text-sm hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                                    </motion.button>
                                </motion.div>
                            )}

                            {step === 'done' && (
                                <motion.div
                                    key="step-done"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="p-10 h-[340px] flex flex-col items-center justify-center text-center"
                                >
                                    <motion.div
                                        initial={{ scale: 0, rotate: 180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                                        className="text-6xl mb-6"
                                    >
                                        ✨
                                    </motion.div>
                                    <h3 className="text-white font-bold text-2xl mb-2">Received!</h3>
                                    <p className="text-zinc-500 text-sm max-w-[200px]">
                                        Your feedback helps us create better experiences.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default EmojiInteractive;


