"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

interface WorkspaceContextType {
    workspaceId: string | null;
    slug: string | null;
    loading: boolean;
    error: string | null;
}

const WorkspaceContext = createContext<WorkspaceContextType>({
    workspaceId: null,
    slug: null,
    loading: true,
    error: null,
});

export const useWorkspace = () => useContext(WorkspaceContext);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
    const params = useParams();
    // Handle both string and array params (though slug is usually a string)
    const rawSlug = params?.slug;
    const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

    const [workspaceId, setWorkspaceId] = useState<string | null>(null);
    const [currentSlug, setCurrentSlug] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // If no slug in URL (e.g. root page), we might not be in a workspace context
        if (!slug) {
            setLoading(false);
            return;
        }

        // If slug hasn't changed, don't re-fetch
        if (slug === currentSlug && workspaceId) {
            return;
        }

        const fetchWorkspaceId = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`/api/workspaces/resolve-slug/${slug}`);
                setWorkspaceId(response.data.workspace_id);
                setCurrentSlug(slug);
            } catch (err) {
                console.error("Failed to resolve workspace slug:", err);
                setError("Failed to load workspace");
                setWorkspaceId(null);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkspaceId();
    }, [slug, currentSlug, workspaceId]);

    return (
        <WorkspaceContext.Provider value={{ workspaceId, slug: currentSlug, loading, error }}>
            {children}
        </WorkspaceContext.Provider>
    );
}
