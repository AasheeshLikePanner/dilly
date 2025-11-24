'use client'
import React, { useEffect, useState } from "react";
import { 
  Trash2, 
  Search, 
  Filter, 
  Smile, 
  SlidersHorizontal,
  FileText,
  Copy,
  X,
  Loader2,
  Calendar,
  Globe,
  Code,
  Hash,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Database Schema Types ---

type Feedback = {
  id: string;              // uuid
  created_at: string;      // timestamp with time zone
  workspace_id: string;    // uuid
  type: string;            // text (e.g., 'emoji', 'slider', 'form')
  rating: number | null;   // integer
  comment: string | null;  // text
  emoji: string | null;    // text
  source: string | null;   // text
  metadata: any | null;    // jsonb
  created_by: string | null; // text
};

// --- Mock Data (Strictly following Schema) ---
const MOCK_DATA: Feedback[] = [
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    created_at: new Date().toISOString(),
    workspace_id: "ws_123",
    type: "emoji",
    rating: 5,
    comment: "Dark mode is perfect.",
    emoji: "🔥",
    source: "web",
    metadata: { path: "/settings" },
    created_by: "Sarah",
  },
  {
    id: "a12bc34d-56ef-7890-g123-4h56i78j90k1",
    created_at: new Date(Date.now() - 3600000).toISOString(),
    workspace_id: "ws_123",
    type: "slider",
    rating: 9,
    comment: null, // No text, just rating
    emoji: null,
    source: "mobile-app",
    metadata: { device: "iPhone 13" },
    created_by: "Mike",
  },
  {
    id: "b23cd45e-67fg-8901-h234-5i67j89k01l2",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    workspace_id: "ws_123",
    type: "form",
    rating: null,
    comment: "The export button is not working on Safari.",
    emoji: null,
    source: "web",
    metadata: { browser: "Safari", version: "16.4" },
    created_by: null, // Anonymous
  },
  {
    id: "c34de56f-78gh-9012-i345-6j78k90l12m3",
    created_at: new Date(Date.now() - 172800000).toISOString(),
    workspace_id: "ws_123",
    type: "emoji",
    rating: 1,
    comment: null,
    emoji: "😡",
    source: "widget",
    metadata: {},
    created_by: "AngryUser",
  },
];

// --- Utility Components ---

const TypeBadge = ({ type }: { type: string }) => {
  const styles: Record<string, string> = {
    emoji: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    slider: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    form: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  };
  
  const icons: Record<string, any> = {
    emoji: Smile,
    slider: SlidersHorizontal,
    form: FileText,
  };
  
  const Icon = icons[type] || Loader2;
  const style = styles[type] || "text-zinc-400 bg-zinc-400/10 border-zinc-400/20";
  
  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md border text-[10px] uppercase tracking-wider font-semibold ${style}`}>
      <Icon className="w-3 h-3" />
      {type}
    </div>
  );
};

const CopyIdButton = ({ id }: { id: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className="group flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-900/50 px-2 py-1 rounded border border-transparent hover:border-zinc-700"
    >
      <span className="truncate max-w-[80px]">{id.slice(0, 8)}...</span>
      {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
    </button>
  );
};

// --- Detail Drawer ---

const DetailDrawer = ({ item, onClose }: { item: Feedback, onClose: () => void }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      />
      <motion.div 
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-zinc-950 border-l border-zinc-800 z-50 shadow-2xl flex flex-col"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800 bg-zinc-900/50">
          <h2 className="text-lg font-semibold text-white">Feedback Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* UUID Section */}
          <div className="p-4 bg-zinc-900/30 rounded-xl border border-zinc-800">
             <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2 font-medium">Feedback ID</div>
             <div className="flex items-center gap-2">
                <code className="text-xs text-zinc-300 font-mono flex-1 break-all">{item.id}</code>
                <button 
                  onClick={() => navigator.clipboard.writeText(item.id)}
                  className="p-1.5 hover:bg-zinc-800 rounded text-zinc-500 hover:text-white"
                >
                  <Copy className="w-4 h-4" />
                </button>
             </div>
          </div>

          {/* Main Data */}
          <div className="space-y-4">
             <div className="flex items-center gap-4">
                <TypeBadge type={item.type} />
                {item.rating !== null && (
                  <div className="px-3 py-1 rounded-full bg-zinc-800 text-sm font-bold text-white border border-zinc-700">
                    Rating: {item.rating}
                  </div>
                )}
             </div>

             <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/50 space-y-3">
               {item.emoji && <div className="text-4xl">{item.emoji}</div>}
               {item.comment ? (
                 <p className="text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap">{item.comment}</p>
               ) : (
                 <span className="text-sm text-zinc-500 italic">No written comment provided.</span>
               )}
             </div>
          </div>

          {/* Metadata JSONB */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-zinc-400">
              <Code className="w-4 h-4" />
              <span className="text-sm font-semibold uppercase tracking-wider">Metadata (JSONB)</span>
            </div>
            <div className="bg-zinc-950 rounded-lg border border-zinc-800 p-4 font-mono text-xs text-zinc-400 overflow-x-auto">
              <pre>{JSON.stringify(item.metadata, null, 2)}</pre>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-xs text-zinc-500">
             <div>
                <span className="block mb-1 font-medium">Created By</span>
                <span className="text-zinc-300">{item.created_by || 'Anonymous'}</span>
             </div>
             <div>
                <span className="block mb-1 font-medium">Source</span>
                <span className="text-zinc-300">{item.source || 'Unknown'}</span>
             </div>
             <div>
                <span className="block mb-1 font-medium">Workspace ID</span>
                <span className="font-mono text-zinc-300">{item.workspace_id}</span>
             </div>
             <div>
                <span className="block mb-1 font-medium">Created At</span>
                <span className="text-zinc-300">{new Date(item.created_at).toLocaleString()}</span>
             </div>
          </div>

        </div>

        <div className="p-6 border-t border-zinc-800 bg-zinc-900/30">
          <button className="w-full py-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2">
            <Trash2 className="w-4 h-4" />
            Delete Record
          </button>
        </div>
      </motion.div>
    </>
  );
};

// --- Main Table Component ---

function FeedbackTable({ workspaceSlug }: { workspaceSlug: string }) {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<Feedback | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simulating fetching data from 'public.feedback'
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 600));
      setFeedback(MOCK_DATA);
      setLoading(false);
    };
    loadData();
  }, [workspaceSlug]);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if(confirm("Delete this feedback record?")) {
      setFeedback(prev => prev.filter(item => item.id !== id));
    }
  };

  const filteredData = feedback.filter(f => 
    (f.comment?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (f.created_by?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (f.id.includes(searchTerm))
  );

  if (loading) return (
    <div className="flex h-64 items-center justify-center">
      <Loader2 className="w-8 h-8 text-zinc-600 animate-spin" />
    </div>
  );

  return (
    <div className="w-full space-y-4">
      {/* Search Bar */}
      <div className="flex items-center gap-3 p-1">
         <div className="relative flex-1 max-w-sm">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
           <input 
             type="text"
             placeholder="Search by ID, comment, or user..."
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-700 placeholder:text-zinc-600"
           />
         </div>
      </div>

      <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950 shadow-sm">
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/50 text-xs font-medium text-zinc-500 uppercase tracking-wider">
              <th className="py-3 px-4 w-[140px]">ID</th>
              <th className="py-3 px-4 w-[140px]">User</th>
              <th className="py-3 px-4 w-[100px] text-center">Type</th>
              <th className="py-3 px-4 w-[100px] text-center">Number</th>
              <th className="py-3 px-4">Content (Emoji / Comment)</th>
              <th className="py-3 px-4 w-[120px]">Source</th>
              <th className="py-3 px-4 w-[160px] text-right">Created At</th>
              <th className="py-3 px-4 w-[60px]"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            <AnimatePresence>
              {filteredData.map((item) => (
                <motion.tr 
                  key={item.id}
                  layout
                  onClick={() => setSelectedItem(item)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="group hover:bg-zinc-900/40 cursor-pointer transition-colors"
                >
                  {/* ID Column */}
                  <td className="py-3 px-4">
                    <CopyIdButton id={item.id} />
                  </td>

                  {/* User Column */}
                  <td className="py-3 px-4">
                    <div className="truncate text-sm font-medium text-zinc-300" title={item.created_by || 'Anonymous'}>
                      {item.created_by || <span className="text-zinc-600 italic">Anonymous</span>}
                    </div>
                  </td>

                  {/* Type Column */}
                  <td className="py-3 px-4 text-center">
                    <TypeBadge type={item.type} />
                  </td>

                  {/* Rating / Number Column */}
                  <td className="py-3 px-4 text-center">
                    {item.rating !== null ? (
                      <span className={`inline-block font-mono font-bold text-sm px-2 py-0.5 rounded ${
                        item.rating >= 7 ? 'text-emerald-400 bg-emerald-500/10' : 
                        item.rating <= 3 ? 'text-red-400 bg-red-500/10' : 
                        'text-amber-400 bg-amber-500/10'
                      }`}>
                        {item.rating}
                      </span>
                    ) : (
                      <span className="text-zinc-700 text-xs">-</span>
                    )}
                  </td>

                  {/* Content Column */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      {item.emoji && (
                        <span className="text-xl flex-shrink-0" title="Emoji feedback">{item.emoji}</span>
                      )}
                      <div className="min-w-0">
                         {item.comment ? (
                           <p className="text-sm text-zinc-300 truncate">{item.comment}</p>
                         ) : (
                           <span className="text-xs text-zinc-600 italic">No text content</span>
                         )}
                      </div>
                    </div>
                  </td>

                  {/* Source Column */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                      <Globe className="w-3 h-3" />
                      <span className="truncate">{item.source || 'Unknown'}</span>
                    </div>
                  </td>

                  {/* Date Column */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-zinc-400 font-mono">
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                      <span className="text-[10px] text-zinc-600">
                        {new Date(item.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                  </td>

                  {/* Actions Column */}
                  <td className="py-3 px-4 text-right">
                    <button 
                      onClick={(e) => handleDelete(item.id, e)}
                      className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-md opacity-0 group-hover:opacity-100 transition-all"
                      title="Delete Feedback"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {filteredData.length === 0 && (
           <div className="py-12 text-center text-zinc-500 text-sm">
             No records found.
           </div>
        )}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <DetailDrawer 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-blue-500/30">
      <div className="max-w-[1400px] mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-white mb-6">Database Feedback Viewer</h1>
        <FeedbackTable workspaceSlug="demo" />
      </div>
    </div>
  );
}