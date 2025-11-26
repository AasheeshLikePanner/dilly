'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';

// Simple Toast System
interface ToastContextType {
    success: (message: string) => void;
    error: (message: string) => void;
}

const ToastContext = React.createContext<ToastContextType | null>(null);

export const useToast = () => {
    const context = React.useContext(ToastContext);
    if (!context) throw new Error("useToast must be used within a ToastProvider");
    return context as ToastContextType;
};

interface ToastProviderProps {
    children: React.ReactNode;
}

interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error';
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = (message: string, type: 'success' | 'error' = 'success') => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => removeToast(id), 3000);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ success: (msg) => addToast(msg, 'success'), error: (msg) => addToast(msg, 'error') }}>
            {children}
            <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-[60] pointer-events-none">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                            className={`px-4 py-3 rounded-lg shadow-2xl border text-sm font-medium pointer-events-auto flex items-center gap-2
                ${toast.type === 'success'
                                    ? 'bg-[#1A1A1A] border-zinc-800 text-white'
                                    : 'bg-red-500/10 border-red-500/20 text-red-400'}`}
                        >
                            {toast.type === 'success' ? <Check size={14} className="text-green-500" /> : <AlertCircle size={14} />}
                            {toast.message}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};
