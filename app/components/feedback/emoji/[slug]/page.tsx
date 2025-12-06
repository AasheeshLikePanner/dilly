"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Terminal, Box, Play, Clock, Power } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { notFound } from "next/navigation";
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

// Direct imports from packages to showcase the source of truth
import { EmojiDock } from '../../../../../packages/emoji-dock/src';
import { EmojiSoul } from '../../../../../packages/emoji-soul/src';
import { EmojiInteractive } from '../../../../../packages/emoji-interactive/src';

// --- Custom Code Block Component ---
interface CodeSnippetProps {
  title: string;
  code: string;
}

const CodeSnippet = ({ title, code }: CodeSnippetProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#121212]">
      <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/20" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/20" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/20" />
          </div>
          <span className="text-xs font-medium text-zinc-500 font-mono">{title}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md bg-white/5 px-2 py-1 text-xs font-medium text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="overflow-x-auto p-4">
        <pre className="font-mono text-sm text-zinc-300 leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default function EmojiFeedbackPage() {
  if (process.env.NEXT_PUBLIC_SHOW_COMPONENTS === 'false' || (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SHOW_COMPONENTS !== 'true')) {
    notFound();
  }

  const [activeTab, setActiveTab] = useState('interactive');

  // Widget Playground State
  const [isControlled, setIsControlled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [autoShowDelay, setAutoShowDelay] = useState<number>(0);
  const [useTimer, setUseTimer] = useState(false);

  const getComponentName = () => {
    switch (activeTab) {
      case 'dock': return 'EmojiDock';
      case 'soul': return 'EmojiSoul';
      case 'interactive': return 'EmojiInteractive';
      default: return 'EmojiInteractive';
    }
  };

  const getPackageName = () => {
    switch (activeTab) {
      case 'dock': return '@zynta/emoji-dock';
      case 'soul': return '@zynta/emoji-soul';
      case 'interactive': return '@zynta/emoji-interactive';
      default: return '@zynta/emoji-reaction';
    }
  }

  const generateUsageCode = () => {
    const comp = getComponentName();
    const pkg = getPackageName();
    let props = '';
    let stateLogic = '';

    if (useTimer) {
      props += `\n        autoShowDelay={${autoShowDelay || 3000}}`;
    }

    if (isControlled) {
      stateLogic = `  const [isOpen, setIsOpen] = useState(false);\n`;
      props += `\n        open={isOpen}\n        onOpenChange={setIsOpen}`;
    }

    return `import { ${comp} } from '${pkg}';
import { useState } from 'react';

export default function Page() {
${stateLogic}
  return (
    <div className="min-h-screen p-10">
      ${isControlled ? `<button onClick={() => setIsOpen(true)}>Open Feedback</button>\n` : ''}
      <${comp} 
        apiKey="YOUR_API_KEY"${props}
      />
    </div>
  );
}`;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white text-black p-1 rounded-md">
              <Box size={16} strokeWidth={3} />
            </div>
            <h1 className="font-bold tracking-tight text-sm">Component Lab</h1>
          </div>
          <span className="text-xs text-zinc-500 font-mono">v1.1.0</span>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-4">Emoji Feedback Widgets</h2>
          <p className="text-zinc-400 max-w-2xl leading-relaxed">
            Smart, physics-based feedback components. Now with built-in visibility control, auto-show timers, and auto-close functionality.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">

          {/* LEFT: Configuration & Code */}
          <div className="lg:col-span-5 space-y-8">

            {/* Controls */}
            <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 space-y-6">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Power size={14} className="text-indigo-400" /> Configuration
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="space-y-0.5">
                    <Label className="text-sm text-zinc-200">Controlled Mode</Label>
                    <p className="text-xs text-zinc-500">Manage state via props</p>
                  </div>
                  <Switch
                    checked={isControlled}
                    onCheckedChange={setIsControlled}
                    className="data-[state=checked]:bg-white data-[state=unchecked]:bg-black border border-zinc-800"
                  />
                </div>

                {isControlled && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 animate-in slide-in-from-top-2 fade-in">
                    <div className="space-y-0.5">
                      <Label className="text-sm text-zinc-200">Visibility</Label>
                      <p className="text-xs text-zinc-500">Current open state</p>
                    </div>
                    <Switch
                      checked={isVisible}
                      onCheckedChange={setIsVisible}
                      className="data-[state=checked]:bg-white data-[state=unchecked]:bg-black border border-zinc-800"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="space-y-0.5">
                    <Label className="text-sm text-zinc-200">Auto-Show Timer</Label>
                    <p className="text-xs text-zinc-500">Open automatically after delay</p>
                  </div>
                  <Switch
                    checked={useTimer}
                    onCheckedChange={setUseTimer}
                    className="data-[state=checked]:bg-white data-[state=unchecked]:bg-black border border-zinc-800"
                  />
                </div>

                {useTimer && (
                  <div className="space-y-3 pt-2 animate-in slide-in-from-top-2 fade-in">
                    <div className="flex justify-between text-xs text-zinc-400">
                      <span>Delay (ms)</span>
                      <span>{autoShowDelay}ms</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="500"
                      value={autoShowDelay}
                      onChange={(e) => setAutoShowDelay(Number(e.target.value))}
                      className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                    />
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/5">
                <Button
                  className="w-full bg-white text-black hover:bg-zinc-200"
                  onClick={() => {
                    if (isControlled) setIsVisible(true);
                  }}
                  disabled={!isControlled}
                >
                  <Play size={14} className="mr-2" /> Trigger Open (Controlled)
                </Button>
              </div>
            </div>

            {/* Implementation Guide */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Terminal size={14} className="text-indigo-400" /> Implementation
              </h3>

              <div className="text-xs font-mono bg-[#121212] p-3 rounded-lg border border-white/10 text-zinc-400">
                npm install {getPackageName()} framer-motion lucide-react
              </div>

              <CodeSnippet title={`${getComponentName()} Usage`} code={generateUsageCode()} />
            </div>

          </div>

          {/* RIGHT: Preview Area */}
          <div className="lg:col-span-7">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full bg-[#0A0A0A] border border-white/10 p-1 rounded-xl mb-4">
                <TabsTrigger value="interactive" className="flex-1">Interactive</TabsTrigger>
                <TabsTrigger value="dock" className="flex-1">Dock</TabsTrigger>
                <TabsTrigger value="soul" className="flex-1">Soul</TabsTrigger>
              </TabsList>

              <div className="relative h-[600px] rounded-3xl border border-white/10 bg-[#0A0A0A] overflow-hidden shadow-2xl flex items-center justify-center p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/10 via-[#0A0A0A] to-[#0A0A0A]">
                <div className="absolute top-4 left-4 text-xs font-mono text-zinc-600">
                  Preview Canvas
                </div>

                {/* Render Components with Props */}
                {activeTab === 'dock' && (
                  <EmojiDock
                    key={useTimer ? 'timer-dock' : 'dock'}
                    apiKey="demo"
                    showcaseMode={true}
                    open={isControlled ? isVisible : undefined}
                    onOpenChange={setIsVisible}
                    autoShowDelay={useTimer ? (autoShowDelay || 3000) : undefined}
                  />
                )}

                {activeTab === 'soul' && (
                  <EmojiSoul
                    key={useTimer ? 'timer-soul' : 'soul'}
                    apiKey="demo"
                    showcaseMode={true}
                    open={isControlled ? isVisible : undefined}
                    onOpenChange={setIsVisible}
                    autoShowDelay={useTimer ? (autoShowDelay || 3000) : undefined}
                  />
                )}

                {activeTab === 'interactive' && (
                  <EmojiInteractive
                    key={useTimer ? 'timer-interactive' : 'interactive'}
                    apiKey="demo"
                    showcaseMode={true}
                    open={isControlled ? isVisible : undefined}
                    onOpenChange={setIsVisible}
                    autoShowDelay={useTimer ? (autoShowDelay || 3000) : undefined}
                  />
                )}

                {!isVisible && isControlled && (
                  <div className="text-center text-zinc-500 space-y-2">
                    <p>Widget is closed (Controlled).</p>
                    <Button variant="outline" size="sm" onClick={() => setIsVisible(true)}>
                      Open Widget
                    </Button>
                  </div>
                )}

                {!isControlled && !useTimer && (
                  <div className="text-center text-zinc-500 space-y-2">
                    <p>Uncontrolled Mode.</p>
                    <p className="text-xs">Enable "Auto-Show Timer" to see it appear.</p>
                  </div>
                )}
              </div>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}