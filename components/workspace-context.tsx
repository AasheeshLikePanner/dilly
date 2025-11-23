'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// Removed useParams and axios as they are no longer needed here

interface WorkspaceContextType {
  workspaceId: string | null;
  isLoading: boolean;
  error: string | null;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

interface WorkspaceProviderProps {
  children: ReactNode;
  initialWorkspaceId: string | null;
  initialLoading?: boolean;
  initialError?: string | null;
}

export const WorkspaceProvider = ({
  children,
  initialWorkspaceId,
  initialLoading = false,
  initialError = null,
}: WorkspaceProviderProps) => {
  const [workspaceId, setWorkspaceId] = useState<string | null>(initialWorkspaceId);
  const [isLoading, setIsLoading] = useState<boolean>(initialLoading);
  const [error, setError] = useState<string | null>(initialError);

  useEffect(() => {
    setWorkspaceId(initialWorkspaceId);
    setIsLoading(initialLoading);
    setError(initialError);
  }, [initialWorkspaceId, initialLoading, initialError]);

  return (
    <WorkspaceContext.Provider value={{ workspaceId, isLoading, error }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};
