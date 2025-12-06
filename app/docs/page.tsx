"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Copy,
    Check,
    Terminal,
    ChevronRight,
    Hash,
    ArrowRight,
    Code
} from 'lucide-react';
import { toast } from 'sonner';

// --- Components ---

const MultiLangCodeBlock = ({
    examples
}: {
    examples: { language: string, label: string, code: string }[]
}) => {
    const [activeLang, setActiveLang] = useState(examples[0].language);
    const [copied, setCopied] = useState(false);

    const activeExample = examples.find(e => e.language === activeLang) || examples[0];

    const handleCopy = () => {
        navigator.clipboard.writeText(activeExample.code);
        setCopied(true);
        toast.success("Copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="group relative my-8 border border-zinc-900 rounded-xl overflow-hidden bg-[#0A0A0A]">
            {/* Language Tabs */}
            <div className="flex items-center border-b border-zinc-900 bg-zinc-900/20 px-2">
                {examples.map((ex) => (
                    <button
                        key={ex.language}
                        onClick={() => setActiveLang(ex.language)}
                        className={`
              px-4 py-3 text-xs font-medium transition-colors relative
              ${activeLang === ex.language ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}
            `}
                    >
                        {ex.label}
                        {activeLang === ex.language && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                            />
                        )}
                    </button>
                ))}
                <div className="ml-auto pr-2">
                    <button
                        onClick={handleCopy}
                        className="p-1.5 rounded-md text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all"
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                </div>
            </div>

            {/* Code Content */}
            <div className="p-5 overflow-x-auto">
                <pre className="text-[13px] font-mono leading-relaxed text-zinc-300">
                    <code>{activeExample.code}</code>
                </pre>
            </div>
        </div>
    );
};

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-xl font-medium text-white tracking-tight mt-16 mb-6 flex items-center gap-2">
        {children}
    </h2>
);

const SubHeading = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-sm font-medium text-zinc-200 mt-10 mb-4">
        {children}
    </h3>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
    <p className="text-sm text-zinc-500 leading-7 mb-4 max-w-2xl">
        {children}
    </p>
);

const EndpointBadge = ({ method, url }: { method: string, url: string }) => (
    <div className="flex items-center gap-3 font-mono text-[13px] my-6 p-3 rounded-lg bg-zinc-900/30 border border-zinc-900">
        <span className={`
      px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide
      ${method === 'POST' ? 'bg-blue-500/10 text-blue-500' : 'bg-green-500/10 text-green-500'}
    `}>
            {method}
        </span>
        <span className="text-zinc-400">{url}</span>
    </div>
);

export default function DocsPage() {
    return (
        <div className="min-h-screen bg-[#030303] text-zinc-200 font-sans selection:bg-white/20">

            {/* Navigation / Header */}
            <header className="sticky top-0 z-50 bg-[#030303]/80 backdrop-blur-xl border-b border-zinc-900">
                <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                        <span className="text-sm font-medium tracking-tight text-white">Zynta API</span>
                    </div>
                    <a href="/settings" className="text-xs text-zinc-500 hover:text-white transition-colors flex items-center gap-1">
                        Get API Key <ArrowRight size={12} />
                    </a>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-16">

                {/* Intro */}
                <div className="mb-16">
                    <h1 className="text-4xl font-medium text-white tracking-tighter mb-6">
                        Documentation
                    </h1>
                    <Paragraph>
                        Welcome to the Zynta API documentation. Our API is designed around REST principles,
                        providing a simple and powerful way to integrate bug tracking and feedback collection
                        directly into your applications.
                    </Paragraph>
                </div>

                <div className="w-full h-px bg-zinc-900 my-12" />

                {/* Authentication */}
                <section id="authentication">
                    <SectionHeading>Authentication</SectionHeading>
                    <Paragraph>
                        Authenticate your requests using the <code className="text-xs bg-zinc-900 px-1.5 py-0.5 rounded text-zinc-300">x-api-key</code> header.
                        You can generate and manage your API keys in the workspace settings.
                    </Paragraph>

                    <MultiLangCodeBlock
                        examples={[
                            {
                                language: 'curl',
                                label: 'cURL',
                                code: `curl -X GET https://zynta.cloud/api/workspaces \\
  -H "x-api-key: ak_live_..."`
                            },
                            {
                                language: 'js',
                                label: 'JavaScript',
                                code: `fetch('https://zynta.cloud/api/workspaces', {
  headers: {
    'x-api-key': 'ak_live_...'
  }
});`
                            }
                        ]}
                    />

                    <div className="bg-zinc-900/30 border border-zinc-900 rounded-lg p-4 mt-6">
                        <div className="flex gap-3">
                            <div className="mt-0.5 text-zinc-400"><Hash size={14} /></div>
                            <div>
                                <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-1">Client-Side Usage</h4>
                                <p className="text-xs text-zinc-500 leading-relaxed">
                                    To use the API directly from a browser, you must configure <strong>Allowed Origins</strong> in your settings.
                                    This ensures that only your domains can make requests using your API key.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="w-full h-px bg-zinc-900 my-12" />

                {/* Bugs */}
                <section id="bugs">
                    <SectionHeading>Bug Reporting</SectionHeading>
                    <Paragraph>
                        Programmatically submit bug reports from your application, CI/CD pipeline, or monitoring tools.
                    </Paragraph>

                    <EndpointBadge method="POST" url="https://zynta.cloud/api/bugs" />

                    <SubHeading>Submit a Bug</SubHeading>
                    <MultiLangCodeBlock
                        examples={[
                            {
                                language: 'curl',
                                label: 'cURL',
                                code: `curl -X POST https://zynta.cloud/api/bugs \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: ak_live_..." \\
  -d '{
    "workspace_id": "ws_123",
    "title": "Login page crash",
    "description": "App crashes when clicking login...",
    "type": "bug",
    "priority": "high"
  }'`
                            },
                            {
                                language: 'js',
                                label: 'JavaScript',
                                code: `const response = await fetch('https://zynta.cloud/api/bugs', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'ak_live_...'
  },
  body: JSON.stringify({
    workspace_id: 'ws_123',
    title: 'Login page crash',
    description: 'App crashes when clicking login...',
    type: 'bug',
    priority: 'high'
  })
});`
                            },
                            {
                                language: 'go',
                                label: 'Go',
                                code: `package main

import (
	"bytes"
	"encoding/json"
	"net/http"
)

func main() {
	values := map[string]string{
    "workspace_id": "ws_123",
    "title": "Login page crash", 
    "type": "bug",
  }
	jsonData, _ := json.Marshal(values)

	req, _ := http.NewRequest("POST", "https://zynta.cloud/api/bugs", bytes.NewBuffer(jsonData))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("x-api-key", "ak_live_...")

	client := &http.Client{}
	resp, _ := client.Do(req)
}`
                            },
                            {
                                language: 'python',
                                label: 'Python',
                                code: `import requests

url = "https://zynta.cloud/api/bugs"
headers = {
    "Content-Type": "application/json",
    "x-api-key": "ak_live_..."
}
data = {
    "workspace_id": "ws_123",
    "title": "Login page crash",
    "type": "bug"
}

response = requests.post(url, headers=headers, json=data)`
                            }
                        ]}
                    />
                </section>

                <div className="w-full h-px bg-zinc-900 my-12" />

                {/* Feedback */}
                <section id="feedback">
                    <SectionHeading>Feedback Collection</SectionHeading>
                    <Paragraph>
                        Collect user sentiment and general feedback. Perfect for embedding in your application's footer or help menu.
                    </Paragraph>

                    <EndpointBadge method="POST" url="https://zynta.cloud/api/feedback" />

                    <SubHeading>Submit Feedback</SubHeading>
                    <MultiLangCodeBlock
                        examples={[
                            {
                                language: 'curl',
                                label: 'cURL',
                                code: `curl -X POST https://zynta.cloud/api/feedback \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: ak_live_..." \\
  -d '{
    "workspace_id": "ws_123",
    "content": "Love the new dark mode!",
    "type": "praise",
    "sentiment": "positive"
  }'`
                            },
                            {
                                language: 'js',
                                label: 'JavaScript',
                                code: `const response = await fetch('https://zynta.cloud/api/feedback', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'ak_live_...'
  },
  body: JSON.stringify({
    workspace_id: 'ws_123',
    content: 'Love the new dark mode!',
    type: 'praise',
    sentiment: 'positive'
  })
});`
                            },
                            {
                                language: 'go',
                                label: 'Go',
                                code: `values := map[string]string{
  "workspace_id": "ws_123",
  "content": "Love the new dark mode!",
  "type": "praise",
}
jsonData, _ := json.Marshal(values)

req, _ := http.NewRequest("POST", "https://zynta.cloud/api/feedback", bytes.NewBuffer(jsonData))
req.Header.Set("x-api-key", "ak_live_...")
// ... execute request`
                            },
                            {
                                language: 'python',
                                label: 'Python',
                                code: `import requests

requests.post("https://zynta.cloud/api/feedback", 
    headers={"x-api-key": "ak_live_..."},
    json={
        "workspace_id": "ws_123",
        "content": "Love the new dark mode!",
        "type": "praise"
    }
)`
                            }
                        ]}
                    />
                </section>

            </main>
        </div>
    );
}
