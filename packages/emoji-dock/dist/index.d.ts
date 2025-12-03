import * as react_jsx_runtime from 'react/jsx-runtime';

interface EmojiDockProps {
    apiKey?: string;
    showcaseMode?: boolean;
    onSuccess?: (data: any) => void;
    onError?: (error: Error) => void;
}
declare const EmojiDock: ({ apiKey, showcaseMode, onSuccess, onError }?: EmojiDockProps) => react_jsx_runtime.JSX.Element;

export { EmojiDock, EmojiDock as default };
