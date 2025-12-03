'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DetailDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: React.ReactNode;
    badge?: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
    width?: string;
}

export function DetailDrawer({
    isOpen,
    onClose,
    title,
    badge,
    children,
    footer,
    width = "max-w-2xl"
}: DetailDrawerProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
        }

        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-40"
                    />

                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className={`fixed right-0 top-0 bottom-0 w-full ${width} bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 z-50 shadow-xl flex flex-col`}
                    >
                        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-200 dark:border-zinc-800">
                            <div className="flex items-center gap-3">
                                <div className="font-mono text-xs text-zinc-500">
                                    {title}
                                </div>

                                {badge && <div>{badge}</div>}
                            </div>

                            <button
                                onClick={onClose}
                                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                aria-label="Close drawer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            {children}
                        </div>

                        {footer && (
                            <div className="p-6 border-t border-zinc-200 dark:border-zinc-800">
                                {footer}
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
