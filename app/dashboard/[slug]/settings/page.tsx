"use client";

import React, { useState, useEffect } from 'react';
import axios from '@/lib/axios'; // Import the custom Axios instance
import { toast } from 'sonner';
import { Plus, Key, Trash2, RotateCcw, Eye, EyeOff } from 'lucide-react'; // Icons

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

export default function SettingsPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyPassword, setNewKeyPassword] = useState('');
  const [showNewKey, setShowNewKey] = useState<string | null>(null); // To display the newly generated key
  const [creatingKey, setCreatingKey] = useState(false);

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

  // Placeholder for Regenerate and Unlock functionality (will add later)
  const handleRegenerateKey = async (keyId: string) => {
    toast.info('Regenerate functionality coming soon!');
    // Implement regeneration logic here
  };

  const handleUnlockKey = async (keyId: string) => {
    toast.info('Unlock functionality coming soon!');
    // Implement unlock logic here
  };


  if (loading) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">API Key Management</h1>
        <p>Loading API keys...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">API Key Management</h1>

      {/* Create New API Key Form */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-3">Create New API Key</h2>
        <form onSubmit={handleCreateKey} className="space-y-3">
          <div>
            <label htmlFor="newKeyName" className="block text-sm font-medium text-gray-300">Key Name</label>
            <input
              type="text"
              id="newKeyName"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="newKeyPassword" className="block text-sm font-medium text-gray-300">Password (Optional)</label>
            <input
              type="password"
              id="newKeyPassword"
              value={newKeyPassword}
              onChange={(e) => setNewKeyPassword(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={creatingKey}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {creatingKey ? 'Creating...' : <><Plus className="mr-2 h-4 w-4" /> Create Key</>}
          </button>
        </form>
        {showNewKey && (
          <div className="mt-4 p-3 bg-green-900/50 rounded-md text-green-200 break-all">
            <p className="font-semibold">Your new API Key (copy now, it won't be shown again):</p>
            <code className="block mt-1 p-2 bg-green-800 rounded-sm">{showNewKey}</code>
          </div>
        )}
      </div>

      {/* Existing API Keys List */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-3">Your API Keys</h2>
        {apiKeys.length === 0 ? (
          <p className="text-gray-400">No API keys found. Create one above!</p>
        ) : (
          <ul className="space-y-4">
            {apiKeys.map((key) => (
              <li key={key.id} className="bg-gray-700 p-3 rounded-md flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">{key.name} {key.is_active ? '' : '(Inactive)'}</p>
                  <p className="text-xs text-gray-400">Created: {new Date(key.created_at).toLocaleDateString()}</p>
                  {key.expires_at && <p className="text-xs text-gray-400">Expires: {new Date(key.expires_at).toLocaleDateString()}</p>}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleRegenerateKey(key.id)}
                    className="p-2 rounded-full text-blue-400 hover:bg-blue-900/50"
                    title="Regenerate Key"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </button>
                  {/* Only show unlock if key has a password */}
                  {key.hashed_password && ( // Assuming hashed_password is part of the ApiKey type for UI logic
                    <button
                      onClick={() => handleUnlockKey(key.id)}
                      className="p-2 rounded-full text-yellow-400 hover:bg-yellow-900/50"
                      title="Unlock to View"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleRevokeKey(key.id)}
                    className="p-2 rounded-full text-red-400 hover:bg-red-900/50"
                    title="Revoke Key"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}