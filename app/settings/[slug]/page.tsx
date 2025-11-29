'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Key,
  User,
  Settings as Gear,
  Copy,
  Check,
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  Bell,
  Globe,
  Lock,
  LockOpen,
  X,
  Eye,
  Plus,
  RotateCcw,
  Loader2
} from 'lucide-react';
import { Trash } from 'phosphor-react'; // Import Trash from phosphor-react
import axios from 'axios';
import { WorkspaceProvider, useWorkspace } from '@/components/workspace-context'; // Import WorkspaceProvider and useWorkspace
import { useParams } from 'next/navigation';
import { useToast, ToastProvider } from '@/hooks/use-toast'; // Import from shared hook
import { OriginsSettingsContent } from './origins/page';

// --- Mock Backend & Utilities ---

interface ApiKey {
  id: string;
  name: string;
  last_used_at: string | null;
  created_at: string;
  updated_at: string;
  expires_at: string | null;
  rate_limit_per_minute: number | null;
  is_active: boolean;
}

// --- Reusable UI Components ---

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  isLoading?: boolean;
}

const Button = ({ children, variant = 'primary', className = '', isLoading, disabled, ...props }: ButtonProps) => {
  const baseStyle = "h-9 px-4 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#141414] focus:ring-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-white text-black hover:bg-zinc-200 shadow-[0_1px_2px_rgba(0,0,0,0.1)] border border-transparent",
    secondary: "bg-[#1A1A1A] text-zinc-300 border border-zinc-800 hover:bg-[#222] hover:text-white hover:border-zinc-700",
    danger: "bg-red-500/5 text-red-500 border border-red-500/10 hover:bg-red-500/10 hover:border-red-500/20",
    ghost: "text-zinc-500 hover:text-white hover:bg-white/5"
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <Loader2 size={14} className="animate-spin" />}
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  type?: string;
  autoFocus?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input = ({ label, placeholder, value, onChange, readOnly = false, type = "text", autoFocus, onKeyDown, className = "" }: InputProps) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">{label}</label>}
    <div className="relative group">
      <input
        type={type}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onKeyDown={onKeyDown}
        className={`w-full bg-[#0A0A0A] text-zinc-200 text-sm border border-zinc-800 rounded-lg px-3 py-2.5 outline-none transition-all duration-200 placeholder:text-zinc-700
        ${readOnly ? 'cursor-default text-zinc-500 bg-zinc-900/30' : 'focus:border-zinc-600 focus:bg-[#0F0F0F] hover:border-zinc-700'}
        ${className}
        `}
      />
    </div>
  </div>
);

interface BadgeProps {
  children: React.ReactNode;
  color?: 'green' | 'zinc';
}

const Badge = ({ children, color = 'green' }: BadgeProps) => {
  const colors = {
    green: "bg-green-500/10 text-green-500 border-green-500/20",
    zinc: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wide ${colors[color] || colors.zinc}`}>
      {children}
    </span>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-50"
        />
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="w-full max-w-md bg-[#141414] border border-zinc-800 rounded-2xl shadow-2xl pointer-events-auto flex flex-col overflow-hidden"
          >
            <div className="p-5 border-b border-zinc-800/50 flex items-center justify-between">
              <h3 className="text-base font-semibold text-white tracking-tight">{title}</h3>
              <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        </div>
      </>
    )}
  </AnimatePresence>
);

interface SectionHeaderProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

const SectionHeader = ({ title, description, action }: SectionHeaderProps) => (
  <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
    <div>
      <h2 className="text-2xl font-bold text-white tracking-tight mb-2">{title}</h2>
      <p className="text-zinc-500 text-sm max-w-lg leading-relaxed">{description}</p>
    </div>
    {action}
  </div>
);

// --- Feature Components ---

interface ApiKeyItemProps {
  apiKey: ApiKey;
  onDelete: (keyId: string) => void;
}

const ApiKeyItem = ({ apiKey, onDelete }: ApiKeyItemProps) => {
  return (
    <div className="group bg-[#1A1A1A] border border-zinc-800 hover:border-zinc-700 rounded-xl p-5 transition-all duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800 text-zinc-400">
            <Key size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-zinc-200">{apiKey.name}</h4>
              <Badge color={apiKey.is_active ? 'green' : 'zinc'}>
                {apiKey.is_active ? 'Active' : 'Revoked'}
              </Badge>
            </div>
            <p className="text-xs text-zinc-500 mt-1 font-mono">
              Created {new Date(apiKey.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="danger" onClick={() => onDelete(apiKey.id)} className="h-12 w-12 p-0 rounded-md flex items-center justify-center">
            <Trash style={{ fontSize: '2rem', color: 'red' }} />
          </Button>
        </div>
      </div>

      {/* Key Mask Visualization */}
      <div className="bg-[#0A0A0A] rounded-lg p-3 border border-zinc-800 flex items-center justify-between gap-3 group-hover:border-zinc-700 transition-colors">
        <code className="text-xs font-mono text-zinc-600 tracking-wide select-none blur-[2px]">
          sk_live_{apiKey.id.substring(0, 8)}••••••••••••••••••••••••
        </code>
        <span className="text-[10px] text-zinc-700 uppercase font-bold tracking-wider">Hidden</span>
      </div>
    </div>
  );
};

const ApiKeySection = () => {
  const toast = useToast();
  const { workspaceId, isLoading, error } = useWorkspace(); // Destructure isLoading and error
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);

  // Create Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyPassword, setNewKeyPassword] = useState('');
  const [creating, setCreating] = useState(false);
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null); // Stores raw key just once

  // Delete Confirmation Modal State
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    setLoading(true);
    try {
      const response = await axios.get<ApiKey[]>('/api/api-keys');
      setApiKeys(response.data);
    } catch (error: any) {
      console.error('Error fetching API keys:', error);
      toast.error('Failed to fetch API keys.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName) {
      toast.error('API Key name is required.');
      return;
    }
    if (!workspaceId) { // Ensure workspaceId is available
      toast.error('Workspace ID is not available. Cannot create API key.');
      return;
    }

    setCreating(true);
    try {
      const response = await axios.post<{ id: string; name: string; created_at: string; api_key: string }>(
        '/api/api-keys',
        {
          name: newKeyName,
          password: newKeyPassword || undefined,
          workspace_id: workspaceId // Use workspaceId from context
        }
      );
      toast.success('API Key created successfully!');
      setNewlyCreatedKey(response.data.api_key); // Display the new key
      setNewKeyName('');
      setNewKeyPassword('');
      setIsCreateModalOpen(false); // Close the creation modal
      fetchApiKeys(); // Refresh the list of keys
    } catch (error: any) {
      console.error('Error creating API key:', error);
      toast.error(`Failed to create API key: ${error.response?.data?.error || error.message}`);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = (keyId: string) => {
    setKeyToDelete(keyId);
    setIsDeleteConfirmModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!keyToDelete) return;

    try {
      await axios.delete(`/api/api-keys/${keyToDelete}`);
      toast.success('API Key deleted successfully!');
      fetchApiKeys(); // Refresh the list
      setIsDeleteConfirmModalOpen(false);
      setKeyToDelete(null);
    } catch (error: any) {
      console.error('Error deleting API key:', error);
      toast.error(`Failed to delete API key: ${error.response?.data?.error || error.message}`);
    }
  };

  const getMaskedKey = (id: string) => {
    if (!id) return '••••••••••••••••••••••••••••••••••••';
    return id.substring(0, 8) + '••••••••••••••••••••••••••••••••••••';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 max-w-4xl"
    >
      <SectionHeader
        title="API Keys"
        description="Manage your API keys for authentication. Keys allow full access to your project, so keep them secure."
        action={
          <Button onClick={() => setIsCreateModalOpen(true)} disabled={isLoading || !!error}>
            <Plus size={16} /> Create New Key
          </Button>
        }
      />

      {isLoading && (
        <div className="text-center py-12 border border-dashed border-zinc-800 rounded-xl">
          <Loader2 size={24} className="animate-spin mx-auto text-zinc-500" />
          <p className="text-zinc-500 mt-4">Loading workspace details...</p>
        </div>
      )}

      {error && !isLoading && (
        <div className="text-center py-12 border border-red-500/20 bg-red-500/5 rounded-xl text-red-400">
          <AlertCircle size={24} className="mx-auto" />
          <p className="mt-4">Error: {error}</p>
          <p className="text-sm text-red-500/70">Cannot create API keys without a valid workspace.</p>
        </div>
      )}

      {!isLoading && !error && (
        <>
          {/* Newly Created Key Alert Block */}
          <AnimatePresence>
            {newlyCreatedKey && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6 mb-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-green-500/50" />
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 w-full">
                      <h4 className="text-green-400 font-semibold flex items-center gap-2">
                        <Check size={16} /> New Key Generated
                      </h4>
                      <p className="text-green-500/60 text-sm">
                        Please copy this key now. It will not be shown again.
                      </p>
                      <div className="flex items-center gap-2 mt-3 w-full">
                        <code className="flex-1 bg-black/30 border border-green-500/20 rounded p-3 font-mono text-green-200 text-sm break-all select-all">
                          {newlyCreatedKey}
                        </code>
                        <Button variant="secondary" onClick={() => { navigator.clipboard.writeText(newlyCreatedKey); toast.success("Copied to clipboard"); }}>
                          <Copy size={16} />
                        </Button>
                      </div>
                    </div>
                    <button onClick={() => setNewlyCreatedKey(null)} className="text-green-500/40 hover:text-green-400">
                      <X size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Key List */}
          <div className="space-y-4">
            {loading ? (
              <div className="flex flex-col gap-4">
                {[1, 2].map(i => <div key={i} className="h-32 bg-[#1A1A1A] rounded-xl animate-pulse" />)}
              </div>
            ) : apiKeys.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-zinc-800 rounded-xl">
                <p className="text-zinc-500">No API keys found.</p>
              </div>
            ) : (
              apiKeys.map(key => (
                <ApiKeyItem
                  key={key.id}
                  apiKey={key}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </>
      )}

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New API Key"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-5">
          <Input
            label="Key Name"
            placeholder="e.g. Production V2"
            value={newKeyName}
            onChange={e => setNewKeyName(e.target.value)}
            autoFocus
            required
          />
          <div className="space-y-2">
            <Input
              label="Password Protection (Optional)"
              placeholder="Enter a password to secure this key"
              type="password"
              value={newKeyPassword}
              onChange={e => setNewKeyPassword(e.target.value)}
            />
            <p className="text-[10px] text-zinc-500">
              If set, you will need this password to view or regenerate the key later.
            </p>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
            <Button type="submit" isLoading={creating} disabled={!newKeyName || isLoading || !!error}>Create Key</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteConfirmModalOpen}
        onClose={() => setIsDeleteConfirmModalOpen(false)}
        title="Confirm Deletion"
      >
        <div className="space-y-4">
          <p className="text-zinc-400">
            Are you sure you want to delete this API key? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsDeleteConfirmModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={confirmDelete}>Delete</Button>
          </div>
        </div>
      </Modal>
    </motion.div>);
};


// --- General Section (Placeholder) ---
const GeneralSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 max-w-4xl"
    >
      <SectionHeader
        title="General Settings"
        description="Configure general workspace settings."
      />
      <div className="text-center py-12 border border-dashed border-zinc-800 rounded-xl">
        <p className="text-zinc-500">General settings coming soon...</p>
      </div>
    </motion.div>
  );
};

// --- Main Layout ---

export default function SettingsPage() {
  const params = useParams(); // Get params using useParams()
  const slug = typeof params.slug === 'string' ? params.slug : null; // Safely access slug
  const [activeTab, setActiveTab] = useState('api');
  const [resolvedWorkspaceId, setResolvedWorkspaceId] = useState<string | null>(null);
  const [isLoadingWorkspace, setIsLoadingWorkspace] = useState<boolean>(true);
  const [workspaceError, setWorkspaceError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkspaceId = async () => {
      if (slug) { // Use the safely accessed slug
        setIsLoadingWorkspace(true);
        setWorkspaceError(null);
        try {
          const response = await axios.get<{ workspace_id: string }>(
            `/api/workspaces/resolve-slug/${slug}` // Use the safely accessed slug
          );
          setResolvedWorkspaceId(response.data.workspace_id);
        } catch (err: any) {
          console.error('Error fetching workspace ID in SettingsPage:', err);
          setWorkspaceError(err.response?.data?.error || 'Failed to load workspace ID');
          setResolvedWorkspaceId(null);
        } finally {
          setIsLoadingWorkspace(false);
        }
      } else {
        setResolvedWorkspaceId(null);
        setIsLoadingWorkspace(false);
        setWorkspaceError('No workspace slug provided in URL.');
      }
    };

    fetchWorkspaceId();
  }, [slug]); // Depend on the safely accessed slug

  const navItems = [
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'origins', label: 'Origins', icon: Globe },
    { id: 'general', label: 'General', icon: Gear },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <ToastProvider>
      <div className="min-h-screen bg-background text-zinc-200 font-sans selection:bg-white/20">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 lg:px-8">

          <div className="mb-16">
            <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Settings</h1>
            <p className="text-zinc-500 text-lg">Manage your workspace configuration.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-16">

            {/* Navigation Sidebar */}
            <aside className="lg:w-60 flex-shrink-0">
              <nav className="flex flex-col space-y-1">
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`
                        relative group flex items-center gap-3 px-4 py-2.5 rounded-lg text-[15px] font-medium transition-all duration-200 outline-none
                        ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}
                      `}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="nav-bg"
                          className="absolute inset-0 bg-zinc-900 border border-zinc-800 rounded-lg"
                          initial={false}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-3">
                        <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </aside>

            {/* Content Area */}
            <main className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                {activeTab === 'api' && (
                  <WorkspaceProvider
                    initialWorkspaceId={resolvedWorkspaceId}
                    initialLoading={isLoadingWorkspace}
                    initialError={workspaceError}
                  >
                    <ApiKeySection key="api" />
                  </WorkspaceProvider>
                )}


                {activeTab === 'origins' && (
                  <div key="origins">
                    <OriginsSettingsContent />
                  </div>
                )}
                {activeTab === 'general' && <GeneralSection key="general" />}
                {/* Add other sections as needed */}
              </AnimatePresence>
            </main>

          </div>
        </div>
      </div>
    </ToastProvider>
  );
}