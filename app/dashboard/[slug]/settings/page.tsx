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
  EyeOff,
  Plus,
  RotateCcw, // Added RotateCcw
  Trash2
} from 'lucide-react';import axios from '@/lib/axios'; // Import the custom Axios instance
import { toast } from 'sonner';

// --- UI Components ---

const Button = ({ children, variant = 'primary', className = '', disabled, ...props }) => {
  const baseStyle = "h-10 px-4 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#141414] focus:ring-zinc-600";
  
  const variants = {
    primary: "bg-white text-black hover:bg-zinc-200 shadow-sm border border-transparent disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed",
    secondary: "bg-[#1A1A1A] text-zinc-300 border border-zinc-800 hover:bg-[#202020] hover:text-white hover:border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed",
    danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20",
    ghost: "text-zinc-500 hover:text-white hover:bg-white/5"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ label, placeholder, value, onChange, readOnly = false, type = "text", autoFocus, onKeyDown, className = "" }) => (
  <div className="flex flex-col gap-2 w-full">
    {label && <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{label}</label>}
    <div className="relative group">
      <input
        type={type}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onKeyDown={onKeyDown}
        className={`w-full bg-[#0A0A0A] text-zinc-300 text-sm border border-zinc-800 rounded-md px-3 py-2.5 outline-none transition-all duration-200 
        ${readOnly ? 'cursor-default text-zinc-500' : 'focus:border-zinc-600 focus:bg-[#0F0F0F] hover:border-zinc-700'}
        ${className}
        `}
      />
    </div>
  </div>
);

const Toggle = ({ active, onToggle }) => (
  <button 
    onClick={onToggle}
    className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${active ? 'bg-white' : 'bg-zinc-800'}`}
  >
    <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-black transition-transform duration-200 ${active ? 'translate-x-5' : 'translate-x-0'}`} />
  </button>
);

const SectionHeader = ({ title, description, action }) => (
  <div className="mb-8 border-b border-zinc-800/50 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
    <div>
      <h2 className="text-2xl font-semibold text-white tracking-tight mb-2">{title}</h2>
      <p className="text-zinc-500 text-sm max-w-2xl leading-relaxed">{description}</p>
    </div>
    {action}
  </div>
);

const Modal = ({ isOpen, onClose, title, children }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        />
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md bg-[#141414] border border-zinc-800 rounded-xl shadow-2xl pointer-events-auto flex flex-col overflow-hidden"
          >
            <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                <X size={20} />
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

// Define a type for API keys (matching the data returned by GET /api/api-keys)
interface ApiKey {
  id: string;
  name: string;
  last_used_at: string | null;
  created_at: string;
  updated_at: string;
  expires_at: string | null;
  rate_limit_per_minute: number | null;
  is_active: boolean;
  hashed_password?: string | null; // Include for UI logic, though not returned by GET
}

// --- Content Sections ---

const ApiKeySection = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyPassword, setNewKeyPassword] = useState('');
  const [showNewKey, setShowNewKey] = useState<string | null>(null); // To display the newly generated key
  const [creatingKey, setCreatingKey] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for unlocking/viewing a key
  const [keyToUnlock, setKeyToUnlock] = useState<ApiKey | null>(null);
  const [unlockPassword, setUnlockPassword] = useState('');
  const [unlockError, setUnlockError] = useState(false);
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const [revealedKey, setRevealedKey] = useState<string | null>(null); // For regenerated key

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

  const handleCreateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingKey(true);
    setShowNewKey(null); // Clear previous new key display

    try {
      const response = await axios.post<{ id: string; name: string; created_at: string; api_key: string }>(
        '/api/api-keys',
        { name: newKeyName, password: newKeyPassword || undefined }
      );
      toast.success('API Key created successfully!');
      setShowNewKey(response.data.api_key); // Display the new key
      setNewKeyName('');
      setNewKeyPassword('');
      setIsModalOpen(false); // Close the creation modal
      fetchApiKeys(); // Refresh the list of keys
    } catch (error: any) {
      console.error('Error creating API key:', error);
      toast.error(`Failed to create API key: ${error.response?.data?.error || error.message}`);
    } finally {
      setCreatingKey(false);
    }
  };

  const handleRevokeKey = async (keyId: string) => {
    if (!confirm('Are you sure you want to revoke this API key?')) return;

    try {
      await axios.delete(`/api/api-keys/${keyId}`);
      toast.success('API Key revoked successfully!');
      fetchApiKeys(); // Refresh the list
    } catch (error: any) {
      console.error('Error revoking API key:', error);
      toast.error(`Failed to revoke API key: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleRegenerateKey = async (key: ApiKey) => {
    if (!confirm(`Are you sure you want to regenerate the API key "${key.name}"? The old key will be invalidated.`)) return;

    setKeyToUnlock(key); // Set key for potential password prompt
    setUnlockPassword('');
    setUnlockError(false);
    setRevealedKey(null); // Clear previously revealed key

    if (key.hashed_password) {
      // If key is password protected, open unlock modal first
      setIsUnlockModalOpen(true);
    } else {
      // If not password protected, regenerate directly
      await performRegenerate(key.id);
    }
  };

  const performRegenerate = async (keyId: string, password?: string) => {
    try {
      const response = await axios.post<{ message: string; api_key: string }>(
        `/api/api-keys/${keyId}/regenerate`,
        { password }
      );
      toast.success(response.data.message);
      setRevealedKey(response.data.api_key); // Display the new key
      fetchApiKeys(); // Refresh the list
      setIsUnlockModalOpen(false); // Close modal if open
    } catch (error: any) {
      console.error('Error regenerating API key:', error);
      toast.error(`Failed to regenerate API key: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleUnlockKey = async (key: ApiKey) => {
    setKeyToUnlock(key);
    setUnlockPassword('');
    setUnlockError(false);
    setRevealedKey(null); // Clear previously revealed key
    setIsUnlockModalOpen(true);
  };

  const handleUnlockSubmit = async () => {
    if (!keyToUnlock || !unlockPassword) {
      setUnlockError(true);
      return;
    }

    try {
      const response = await axios.post<{ message: string }>(
        `/api/api-keys/${keyToUnlock.id}/unlock`,
        { password: unlockPassword }
      );
      toast.success(response.data.message);
      // If unlock is successful, we can now proceed with regeneration or just confirm access
      // For "unlock to view", we might just show a success message or enable a "view metadata" section
      // Since the actual key is not stored, we can't "view" it.
      // For now, we'll just close the modal and confirm success.
      setIsUnlockModalOpen(false);
      setUnlockPassword('');
      setUnlockError(false);
      toast.info('Password verified. You can now regenerate the key if needed.');
    } catch (error: any) {
      console.error('Error unlocking API key:', error);
      setUnlockError(true);
      toast.error(`Failed to verify password: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleUnlockModalClose = () => {
    setIsUnlockModalOpen(false);
    setKeyToUnlock(null);
    setUnlockPassword('');
    setUnlockError(false);
    setRevealedKey(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="space-y-8"
    >
      <SectionHeader 
        title="API Keys" 
        description="Manage your API keys."
        action={
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Generate New Key
          </Button>
        }
      />

      <div className="bg-[#1A1A1A] border border-zinc-800 rounded-lg overflow-hidden transition-colors duration-300">
        {/* Display newly generated key */}
        {showNewKey && (
          <div className="p-4 bg-green-900/50 text-green-200 break-all border-b border-green-800">
            <p className="font-semibold">Your new API Key (copy now, it won't be shown again):</p>
            <code className="block mt-1 p-2 bg-green-800 rounded-sm">{showNewKey.substring(0, 8)}••••••••••••••••••••••••••••••••••••</code>
            <Button variant="secondary" className="mt-2" onClick={() => { navigator.clipboard.writeText(showNewKey); toast.success('Copied!'); setShowNewKey(null); }}>
              <Copy size={16} /> Copy & Close
            </Button>
          </div>
        )}

        {/* Existing API Keys List */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-3">Your API Keys</h2>
          {loading ? (
            <p className="text-gray-400">Loading API keys...</p>
          ) : apiKeys.length === 0 ? (
            <p className="text-gray-400">No API keys found. Create one above!</p>
          ) : (
            <ul className="space-y-4">
              {apiKeys.map((key) => (
                <li key={key.id} className="bg-gray-700 p-3 rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-medium text-white">{key.name} {key.is_active ? '' : '(Inactive)'}</p>
                    <p className="text-xs text-gray-400">Created: {new Date(key.created_at).toLocaleDateString()}</p>
                    {key.expires_at && <p className="text-xs text-gray-400}>Expires: {new Date(key.expires_at).toLocaleDateString()}</p>}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="secondary"
                      onClick={() => handleRegenerateKey(key)}
                      className="h-8 text-xs"
                      title="Regenerate Key"
                    >
                      <RotateCcw className="h-4 w-4" /> Regenerate
                    </Button>
                  {key.hashed_password && ( // Use hashed_password directly for UI logic
                    <Button
                      variant="secondary"
                      onClick={() => handleUnlockKey(key)}
                      className="h-8 text-xs"
                      title="Unlock to View"
                    >
                      <Eye className="h-4 w-4" /> Unlock
                    </Button>
                  )}
                    <Button
                      variant="danger"
                      onClick={() => handleRevokeKey(key.id)}
                      className="h-8 text-xs"
                      title="Revoke Key"
                    >
                      <Trash2 className="h-4 w-4" /> Revoke
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="bg-blue-500/5 border border-blue-500/10 rounded-lg p-4 flex gap-3">
        <AlertCircle size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-blue-400 text-sm font-medium">Security Note</h4>
          <p className="text-blue-500/70 text-xs leading-relaxed">
            Your API key grants full access to your account. Never share it in client-side code (browsers, apps) or public repositories.
          </p>
        </div>
      </div>

      {/* Create Key Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Generate New API Key"
      >
        <form onSubmit={handleCreateKey} className="space-y-4">
          <Input 
            label="Key Name" 
            placeholder="e.g., Development Server, Mobile App" 
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            required
          />
          <Input 
            label="Password (Optional)" 
            placeholder="Set a password to protect viewing/regenerating this key" 
            type="password"
            value={newKeyPassword}
            onChange={(e) => setNewKeyPassword(e.target.value)}
          />
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Permissions</label>
            <div className="bg-[#0A0A0A] border border-zinc-800 rounded-md p-3 space-y-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" defaultChecked className="accent-white w-4 h-4 rounded border-zinc-700 bg-transparent" />
                <span className="text-sm text-zinc-300 group-hover:text-white">Read Access</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" defaultChecked className="accent-white w-4 h-4 rounded border-zinc-700 bg-transparent" />
                <span className="text-sm text-zinc-300 group-hover:text-white">Write Access</span>
              </label>
            </div>
          </div>
          <div className="pt-4 flex gap-3 justify-end">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={creatingKey}>
              {creatingKey ? 'Generating...' : <><Plus size={16} /> Generate Key</>}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Unlock/Regenerate Modal */}
      <Modal
        isOpen={isUnlockModalOpen}
        onClose={handleUnlockModalClose}
        title={revealedKey ? "New API Key Generated" : `Unlock Key: ${keyToUnlock?.name || ''}`}
      >
        {revealedKey ? (
          <div className="space-y-4">
            <p className="font-semibold text-white">Your new API Key (copy now, it won't be shown again):</p>
            <code className="block mt-1 p-2 bg-green-800 rounded-sm text-green-200 break-all">{revealedKey}</code>
            <Button variant="primary" className="w-full" onClick={() => { navigator.clipboard.writeText(revealedKey); toast.success('Copied!'); setRevealedKey(null); handleUnlockModalClose(); }}>
              <Copy size={16} /> Copy & Close
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Input
              label="Password"
              placeholder="Enter password to proceed"
              type="password"
              value={unlockPassword}
              onChange={(e) => {
                setUnlockPassword(e.target.value);
                if (unlockError) setUnlockError(false);
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleUnlockSubmit()}
              autoFocus
              className={`${unlockError ? 'border-red-500/50 text-red-400 focus:border-red-500' : ''}`}
            />
            {unlockError && (
              <p className="text-red-500 text-sm -mt-2">Incorrect password. Please try again.</p>
            )}
            <div className="pt-4 flex gap-3 justify-end">
              <Button variant="ghost" onClick={handleUnlockModalClose}>Cancel</Button>
              <Button variant="primary" onClick={handleUnlockSubmit}>
                <LockOpen size={16} /> Unlock
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

const ProfileSection = () => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
    className="space-y-8"
  >
    <SectionHeader 
      title="Profile" 
      description="Manage your personal information and how your account appears to others." 
    />

    <div className="bg-[#1A1A1A] border border-zinc-800 rounded-lg p-6 space-y-6">
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-500 border border-zinc-700">
          <User size={32} strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="text-white font-medium">Avatar</h3>
          <p className="text-zinc-500 text-xs mb-3">Min 400x400px, PNG or JPG.</p>
          <div className="flex gap-3">
            <Button variant="secondary" className="h-8 text-xs">Upload New</Button>
            <Button variant="ghost" className="h-8 text-xs">Remove</Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-zinc-800">
        <Input label="Display Name" value="Alex Anderson" readOnly={true} />
        <Input label="Username" value="alex_dev" readOnly={true} />
        <Input label="Email Address" value="alex@example.com" type="email" readOnly={true} />
        <Input label="Role" value="Administrator" readOnly={true} />
      </div>

      <div className="pt-4 flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  </motion.div>
);

const GeneralSection = () => {
  const [marketing, setMarketing] = useState(false);
  const [security, setSecurity] = useState(true);

  const PreferenceRow = ({ icon: Icon, title, description, active, onToggle }) => (
    <div className="flex items-center justify-between py-4 border-b border-zinc-800/50 last:border-0">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-zinc-900 rounded-md text-zinc-400 border border-zinc-800">
            <Icon size={18} />
        </div>
        <div>
          <h4 className="text-zinc-200 text-sm font-medium">{title}</h4>
          <p className="text-zinc-500 text-xs max-w-md">{description}</p>
        </div>
      </div>
      <Toggle active={active} onToggle={onToggle} />
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="space-y-8"
    >
      <SectionHeader 
        title="General Settings" 
        description="Configure global application preferences and notification settings." 
      />

      <div className="bg-[#1A1A1A] border border-zinc-800 rounded-lg px-6 py-2">
        <PreferenceRow 
          icon={Globe}
          title="Language & Region"
          description="Automatically format dates and numbers based on your location."
          active={true}
          onToggle={() => {}}
        />
        <PreferenceRow 
          icon={ShieldCheck}
          title="Two-Factor Authentication"
          description="Require an extra security step when logging in from a new device."
          active={security}
          onToggle={() => setSecurity(!security)}
        />
        <PreferenceRow 
          icon={Bell}
          title="Marketing Emails"
          description="Receive updates about new features and special offers."
          active={marketing}
          onToggle={() => setMarketing(!marketing)}
        />
      </div>

       <div className="bg-[#1A1A1A] border border-zinc-800 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-red-400 font-medium text-sm">Delete Account</h4>
            <p className="text-zinc-500 text-xs mt-1">Permanently remove your account and all data.</p>
          </div>
          <Button variant="danger" className="w-full md:w-auto">Delete Account</Button>
       </div>
    </motion.div>
  );
};

// --- Layout & Main App ---

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('api');

  const navItems = [
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'general', label: 'General', icon: Gear },
  ];

  return (
    <div className="min-h-screen bg-[#141414] text-zinc-300 font-sans selection:bg-white/20">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 lg:px-8">
        
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>
          <p className="text-zinc-500 mt-2">Manage your workspace configuration and preferences.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Sidebar - Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`
                      relative group flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200
                      ${isActive ? 'text-white bg-white/5' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]'}
                    `}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute left-0 w-0.5 h-full bg-white rounded-full py-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <item.icon size={18} className={isActive ? "text-white" : "text-zinc-500 group-hover:text-zinc-400"} />
                    {item.label}
                    {isActive && <ChevronRight size={14} className="ml-auto text-zinc-600" />}
                  </button>
                );
              })}
            </nav>

            <div className="mt-12 px-4">
              <div className="p-4 rounded-lg bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-800/50">
                <p className="text-xs font-semibold text-white mb-1">Pro Plan</p>
                <p className="text-[10px] text-zinc-500 mb-3">You are using 45% of your monthly API limit.</p>
                <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                  <div className="w-[45%] bg-white h-full rounded-full" />
                </div>
                <button className="text-[10px] text-zinc-300 mt-3 hover:underline">Manage Subscription</button>
              </div>
            </div>
          </aside>

          {/* Right Section - Content */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {activeTab === 'api' && <ApiKeySection key="api" />}
              {activeTab === 'profile' && <ProfileSection key="profile" />}
              {activeTab === 'general' && <GeneralSection key="general" />}
            </AnimatePresence>
          </main>

        </div>
      </div>
    </div>
  );
}
