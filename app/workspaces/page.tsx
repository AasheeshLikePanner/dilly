'use client'

import React, { useState, useEffect } from 'react';
import { 
  Code, 
  PenTool, 
  BarChart3, 
  Plus, 
  ArrowRight, 
  Loader2, 
  Cpu, 
  Sparkles, 
  Terminal, 
  Shield, 
  Zap,
  LogOut
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Profile, Workspace } from '../../types/supabase';
import { useRouter } from 'next/navigation';

const GOOGLE_API_KEY = ""; // Injected by environment

export default function App() {
  const router = useRouter();
  // --- STATE ---
  const [view, setView] = useState('list'); // 'list', 'create', 'dashboard'
  const [loading, setLoading] = useState(true);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [isLaunching, setIsLaunching] = useState(false);
  
  // Create Workspace Form State
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [newWorkspaceDescription, setNewWorkspaceDescription] = useState('');
  const [newWorkspaceLogo, setNewWorkspaceLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // --- DATA FETCHING ---
  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Fetch profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profile) {
          setUserProfile(profile);
        } else {
          console.error('Error fetching profile:', profileError);
        }

        // Fetch workspaces
        const { data: workspacesData, error: workspacesError } = await supabase
          .from('workspaces')
          .select('*')
          .eq('owner_id', user.id);

        if (workspacesData) {
          setWorkspaces(workspacesData);
        } else {
          console.error('Error fetching workspaces:', workspacesError);
        }
      } else {
        router.push('/auth');
      }
      setLoading(false);
    };
    initData();
  }, []);

  // Cleanup object URL
  useEffect(() => {
    return () => {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewWorkspaceLogo(file);
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const createWorkspace = async () => {
    if (!userProfile || !newWorkspaceName) {
      alert("Workspace name is required.");
      return;
    }

    setIsCreating(true);
    let logoUrl = null;

    // --- 1. UPLOAD LOGO TO CLOUDINARY ---
    if (newWorkspaceLogo) {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        console.error('Cloudinary environment variables are not set.');
        alert('Image upload service is not configured.');
        setIsCreating(false);
        return;
      }

      const formData = new FormData();
      formData.append('file', newWorkspaceLogo);
      formData.append('upload_preset', uploadPreset);

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (data.secure_url) {
          logoUrl = data.secure_url;
        } else {
          throw new Error('Image upload failed');
        }
      } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        alert("Error uploading image. Please try again.");
        setIsCreating(false);
        return;
      }
    }

    // --- 2. CREATE WORKSPACE IN SUPABASE ---
    const newWsData = {
      name: newWorkspaceName,
      description: newWorkspaceDescription,
      owner_id: userProfile.id,
      slug: newWorkspaceName.toLowerCase().replace(/\s+/g, '-'),
      logo_url: logoUrl,
    };

    const { data, error } = await supabase
      .from('workspaces')
      .insert(newWsData)
      .select()
      .single();

    if (data) {
      // Insert into workspace_members
      const { error: memberError } = await supabase
        .from('workspace_members')
        .insert({
          user_id: userProfile.id,
          workspace_id: data.id,
          role: 'owner',
        });

      if (memberError) {
        console.error("Error adding user to workspace_members:", memberError);
        toast.error("Failed to add user as owner to workspace.");
        setIsCreating(false);
        return;
      }

      setWorkspaces([...workspaces, data]);
      // Reset form and view
      setView('list');
      setNewWorkspaceName('');
      setNewWorkspaceDescription('');
      setNewWorkspaceLogo(null);
      setLogoPreview(null);
      toast.success("Workspace created successfully!");
    } else {
      console.error("Error creating workspace:", error);
      toast.error("Failed to create workspace.");
    }
    setIsCreating(false);
  };

  // --- HANDLERS ---
  const handleSelect = (id: string) => {
    if (selectedId === id) setSelectedId(null);
    else setSelectedId(id);
  };

  const handleLaunch = () => {
    if (!selectedId) return;
    setIsLaunching(true);
    setTimeout(() => {
      const workspace = workspaces.find(w => w.id === selectedId);
      if (workspace?.slug) {
        router.push(`/dashboard/${workspace.slug}`);
      } else {
        alert(`Environment Synced. Entering ${workspace?.name}...`);
      }
      setIsLaunching(false);
    }, 1500);
  };

  // --- RENDER HELPERS ---
  const getIcon = () => {
    return Terminal;
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen w-full bg-[#030303] text-[#ededed] font-sans selection:bg-white selection:text-black overflow-hidden relative flex flex-col">
      {/* GLOBAL BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,#1a1a1a_0%,transparent_60%),radial-gradient(circle_at_80%_90%,#0d0d0d_0%,transparent_50%)] z-0" />
      
      {/* --- HEADER --- */}
      <header className="relative z-10 px-10 py-8 flex justify-between items-center animate-fade-in-down">
        <div className="flex items-center gap-3 font-semibold tracking-tight text-sm">
          <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)] animate-pulse" />
          NEXUS OS
        </div>
        <div className="text-xs text-[#404040] font-mono">SYSTEM ONLINE</div>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4">
        
        {view === 'list' && (
          <div className="w-full max-w-2xl flex flex-col items-center text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tighter mb-4 bg-gradient-to-b from-white via-white to-[#666] bg-clip-text text-transparent">
              Where are we working?
            </h1>
            <p className="text-[#888] text-sm mb-12 max-w-md">
              Select a neural environment to synchronize your workflow.
            </p>

            {/* WORKSPACE GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12 w-full">
              {workspaces.map((ws) => {
                const Icon = getIcon();
                const isActive = selectedId === ws.id;
                
                return (
                  <div
                    key={ws.id}
                    onClick={() => handleSelect(ws.id)}
                    className={`
                      group relative aspect-square rounded-2xl border cursor-pointer
                      flex flex-col items-center justify-center gap-4
                      overflow-hidden
                      transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                      ${isActive 
                        ? 'border-white shadow-[0_0_40px_rgba(255,255,255,0.2)] scale-105 -translate-y-2' 
                        : 'border-[#262626] hover:border-white/30 hover:-translate-y-2 hover:shadow-2xl'
                      }
                      ${!ws.logo_url && (isActive ? 'bg-[#ededed]' : 'bg-[#0f0f0f] hover:bg-[#1a1a1a]')}
                    `}
                  >
                    {ws.logo_url ? (
                      <>
                        <img src={ws.logo_url} alt={ws.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <span className="relative z-10 self-end p-2 text-xs font-medium text-white">{ws.name}</span>
                      </>
                    ) : (
                      <>
                        <Icon 
                          size={32} 
                          className={`
                            transition-all duration-500 ease-spring
                            ${isActive ? 'text-black scale-100' : 'text-[#ededed] group-hover:scale-110 group-hover:text-white'}
                          `}
                        />
                        <span className={`
                          text-xs font-medium transition-colors duration-300
                          ${isActive ? 'text-black' : 'text-[#666] group-hover:text-white'}
                        `}>
                          {ws.name}
                        </span>
                      </>
                    )}
                  </div>
                );
              })}

              {/* ADD NEW BUTTON */}
              <button
                onClick={() => setView('create')}
                className="group relative aspect-square rounded-2xl border border-dashed border-[#333] bg-transparent
                  flex flex-col items-center justify-center gap-4 cursor-pointer
                  hover:bg-white/5 hover:border-[#666] transition-all duration-300"
              >
                <Plus size={32} className="text-[#444] group-hover:text-white transition-colors" />
                <span className="text-xs font-medium text-[#444] group-hover:text-white transition-colors">
                  Create New
                </span>
              </button>
            </div>

            {/* LAUNCH BUTTON */}
            <div className="h-14 flex items-center justify-center">
              <button
                onClick={handleLaunch}
                disabled={!selectedId || isLaunching}
                className={`
                  flex items-center gap-3 px-8 py-4 rounded-full bg-[#ededed] text-black font-semibold text-sm
                  transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                  ${selectedId 
                    ? 'translate-y-0 opacity-100 rotate-0' 
                    : 'translate-y-20 opacity-0 rotate-3'
                  }
                  hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105
                `}
              >
                {isLaunching ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    <span>Initializing Environment...</span>
                  </>
                ) : (
                  <>
                    <span>Launch Workspace</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* CREATE NEW VIEW */}
        {view === 'create' && (
          <div className="w-full max-w-md flex flex-col items-center animate-fade-in-up">
            <div className="w-full bg-[#0f0f0f] border border-[#262626] rounded-3xl p-8 shadow-2xl">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-medium text-white">Create Workspace</h2>
                <button 
                  onClick={() => setView('list')}
                  className="text-[#666] hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); createWorkspace(); }} className="space-y-6">
                <div className="flex justify-center">
                  <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleLogoChange}
                      className="hidden"
                      accept="image/png, image/jpeg, image/gif"
                  />
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="w-32 h-32 bg-[#0a0a0a] border-2 border-dashed border-[#333] rounded-lg flex items-center justify-center text-5xl text-[#444] hover:border-white/50 transition-all">
                      {logoPreview ? (
                          <img src={logoPreview} alt="Logo preview" className="w-full h-full rounded-lg object-cover" />
                      ) : (
                          newWorkspaceName ? newWorkspaceName.charAt(0).toUpperCase() : <Plus />
                      )}
                  </button>
                </div>
                <div>
                  <label htmlFor="ws-name" className="text-xs text-[#666] uppercase tracking-wider mb-2 block">Workspace Name</label>
                  <input
                    id="ws-name"
                    type="text"
                    value={newWorkspaceName}
                    onChange={(e) => setNewWorkspaceName(e.target.value)}
                    placeholder="e.g. Project Nebula"
                    className="w-full bg-[#0a0a0a] border border-[#333] rounded-xl p-3 text-sm text-white placeholder:text-[#444] focus:border-white/50 focus:ring-0 transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="ws-desc" className="text-xs text-[#666] uppercase tracking-wider mb-2 block">Description</label>
                  <textarea
                    id="ws-desc"
                    value={newWorkspaceDescription}
                    onChange={(e) => setNewWorkspaceDescription(e.target.value)}
                    placeholder="What is this workspace for?"
                    className="w-full bg-[#0a0a0a] border border-[#333] rounded-xl p-3 text-sm text-white placeholder:text-[#444] focus:border-white/50 focus:ring-0 transition-all resize-none h-24"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="w-full py-3 rounded-xl bg-white text-black text-sm font-bold 
                    hover:bg-[#ccc] transition-all flex items-center justify-center gap-2 group"
                >
                  {isCreating ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <Plus size={16} />
                  )}
                  {isCreating ? 'Creating...' : 'Create Workspace'}
                </button>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* --- FOOTER --- */}
      <footer className="relative z-10 px-10 py-8 flex justify-between items-end animate-fade-in">
        <div className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-white/5 border border-transparent hover:bg-white/10 hover:border-white/10 transition-all cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#333] to-[#111] flex items-center justify-center text-[10px] font-bold border border-white/10">
            {userProfile?.full_name?.[0] || 'U'}
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xs font-medium text-white">{userProfile?.full_name || 'Ghost User'}</span>
            {userProfile?.role && <span className="text-[10px] text-[#888] capitalize">{userProfile.role.replace(/_/g, ' ')}</span>}
          </div>
        </div>

        <div className="flex gap-6 text-xs text-[#444]">
          <span className="hover:text-white cursor-pointer transition-colors">Docs</span>
          <span className="hover:text-white cursor-pointer transition-colors">Support</span>
          <button className="hover:text-white cursor-pointer transition-colors flex items-center gap-1">
            <LogOut size={12} /> Logout
          </button>
        </div>
      </footer>

    </div>
  );
}

// --- LOADING COMPONENT ---
function LoadingScreen() {
  return (
    <div className="h-screen w-full bg-[#030303] flex flex-col items-center justify-center gap-4 text-white font-mono">
      <div className="w-12 h-12 border-2 border-[#333] border-t-white rounded-full animate-spin" />
      <p className="text-xs tracking-widest text-[#444] animate-pulse">ESTABLISHING UPLINK...</p>
    </div>
  );
}
