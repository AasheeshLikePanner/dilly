import * as react_jsx_runtime from 'react/jsx-runtime';

interface EmojiDockProps {
    apiKey?: string;
    showcaseMode?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    autoShowDelay?: number;
    onSuccess?: (data: any) => void;
    onError?: (error: Error) => void;
}
declare const EmojiDock: ({ apiKey, showcaseMode, open, onOpenChange, autoShowDelay, onSuccess, onError }?: EmojiDockProps) => react_jsx_runtime.JSX.Element;

export { EmojiDock };
