import * as react_jsx_runtime from 'react/jsx-runtime';

interface EmojiDockProps {
    apiKey?: string;
    showcaseMode?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    autoShowDelay?: number;
    metadata?: Record<string, any>;
    userId?: string;
    onSuccess?: (data: any) => void;
    onError?: (error: Error) => void;
}
declare const EmojiDock: ({ apiKey, showcaseMode, open, onOpenChange, autoShowDelay, metadata, userId, onSuccess, onError }?: EmojiDockProps) => react_jsx_runtime.JSX.Element;

export { EmojiDock };
