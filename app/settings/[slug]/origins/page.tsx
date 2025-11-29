'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Globe, AlertCircle, Check, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useToast, ToastProvider } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Origin {
    url: string;
    id: string;
}

function OriginsSettingsContent() {
    const params = useParams();
    const slug = typeof params.slug === 'string' ? params.slug : null;
    const toast = useToast();
    // ... existing component logic remains unchanged ...


    const [origins, setOrigins] = useState<Origin[]>([]);
    const [loading, setLoading] = useState(true);
    const [newOrigin, setNewOrigin] = useState('');
    const [adding, setAdding] = useState(false);
    const [workspaceId, setWorkspaceId] = useState<string | null>(null);

    // Fetch workspace ID from slug
    useEffect(() => {
        const fetchWorkspaceId = async () => {
            if (!slug) return;
            try {
                const response = await axios.get(`/api/workspaces/resolve-slug/${slug}`);
                setWorkspaceId(response.data.workspace_id);
            } catch (error) {
                console.error('Error fetching workspace ID:', error);
                toast.error('Failed to load workspace');
            }
        };
        fetchWorkspaceId();
    }, [slug]);

    // Fetch allowed origins
    useEffect(() => {
        const fetchOrigins = async () => {
            if (!workspaceId) return;
            setLoading(true);
            try {
                const response = await axios.get(`/api/workspaces/${workspaceId}/origins`);
                setOrigins(response.data.origins.map((url: string, index: number) => ({
                    url,
                    id: `${url}-${index}`
                })));
            } catch (error: any) {
                console.error('Error fetching origins:', error);
                toast.error(error.response?.data?.error || 'Failed to load origins');
            } finally {
                setLoading(false);
            }
        };
        fetchOrigins();
    }, [workspaceId]);

    const validateOrigin = (url: string): boolean => {
        try {
            const parsed = new URL(url);
            // Allow http/https only
            if (!['http:', 'https:'].includes(parsed.protocol)) {
                toast.error('Only HTTP and HTTPS protocols are allowed');
                return false;
            }
            return true;
        } catch {
            toast.error('Invalid URL format. Example: https://example.com');
            return false;
        }
    };

    const handleAddOrigin = async () => {
        if (!newOrigin.trim()) {
            toast.error('Please enter an origin URL');
            return;
        }

        if (!validateOrigin(newOrigin.trim())) {
            return;
        }

        setAdding(true);
        try {
            await axios.post(`/api/workspaces/${workspaceId}/origins`, {
                origin: newOrigin.trim()
            });

            // Refresh origins list
            const response = await axios.get(`/api/workspaces/${workspaceId}/origins`);
            setOrigins(response.data.origins.map((url: string, index: number) => ({
                url,
                id: `${url}-${index}`
            })));

            setNewOrigin('');
            toast.success('Origin added successfully');
        } catch (error: any) {
            console.error('Error adding origin:', error);
            toast.error(error.response?.data?.error || 'Failed to add origin');
        } finally {
            setAdding(false);
        }
    };

    const handleRemoveOrigin = async (originUrl: string) => {
        try {
            await axios.delete(`/api/workspaces/${workspaceId}/origins`, {
                data: { origin: originUrl }
            });

            setOrigins(origins.filter(o => o.url !== originUrl));
            toast.success('Origin removed successfully');
        } catch (error: any) {
            console.error('Error removing origin:', error);
            toast.error(error.response?.data?.error || 'Failed to remove origin');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-white tracking-tight">Allowed Origins</h1>
                <p className="text-zinc-400 text-sm leading-relaxed">
                    Configure which domains can use your API keys to submit feedback and bug reports.
                    This prevents unauthorized usage even if your API key is exposed.
                </p>
            </div>

            {/* Info Alert */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3"
            >
                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                    <p className="text-sm font-medium text-blue-400">How it works</p>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                        When someone submits feedback or a bug report, we check if the request comes from one of your allowed origins.
                        Even if your API key is visible in the browser, it can only be used from these approved domains.
                    </p>
                </div>
            </motion.div>

            {/* Add Origin Form */}
            <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Add New Origin
                </h2>

                <div className="flex gap-3">
                    <Input
                        type="text"
                        value={newOrigin}
                        onChange={(e) => setNewOrigin(e.target.value)}
                        placeholder="https://example.com"
                        className="flex-1"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleAddOrigin();
                            }
                        }}
                    />
                    <Button
                        onClick={handleAddOrigin}
                        disabled={adding || !newOrigin.trim()}
                        className="bg-white text-black hover:bg-zinc-200"
                    >
                        {adding ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                <Plus className="w-4 h-4 mr-2" />
                                Add
                            </>
                        )}
                    </Button>
                </div>

                <div className="space-y-2">
                    <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Examples</p>
                    <div className="flex flex-wrap gap-2">
                        {['https://myapp.com', 'https://staging.myapp.com', 'http://localhost:3000'].map((example) => (
                            <button
                                key={example}
                                onClick={() => setNewOrigin(example)}
                                className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white text-xs rounded-lg transition-colors"
                            >
                                {example}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Origins List */}
            <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold text-white">
                    Current Origins ({origins.length})
                </h2>

                {origins.length === 0 ? (
                    <div className="text-center py-12 space-y-3">
                        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto">
                            <Globe className="w-8 h-8 text-zinc-600" />
                        </div>
                        <p className="text-zinc-500 text-sm">No origins configured yet</p>
                        <p className="text-zinc-600 text-xs max-w-md mx-auto">
                            Add your first origin above to start accepting requests from your website
                        </p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <AnimatePresence mode="popLayout">
                            {origins.map((origin) => (
                                <motion.div
                                    key={origin.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95, x: -20 }}
                                    className="flex items-center justify-between p-4 bg-zinc-800/50 hover:bg-zinc-800 border border-white/5 rounded-lg group transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center">
                                            <Check className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">{origin.url}</p>
                                            <p className="text-xs text-zinc-500">Requests from this origin are allowed</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveOrigin(origin.url)}
                                        className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/10 text-zinc-500 hover:text-red-400 rounded-lg transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Security Note */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex gap-3"
            >
                <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                    <p className="text-sm font-medium text-yellow-400">Security Note</p>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                        While origin validation prevents casual abuse, sophisticated attackers with server-side proxies could potentially bypass this.
                        For high-security use cases, consider additional measures like rate limiting or IP whitelisting.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

export { OriginsSettingsContent };

export default function OriginsSettingsPage() {
    return (
        <ToastProvider>
            <OriginsSettingsContent />
        </ToastProvider>
    );
}
