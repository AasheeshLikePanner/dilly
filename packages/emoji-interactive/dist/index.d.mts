import * as react_jsx_runtime from 'react/jsx-runtime';

interface EmojiReactionProps {
    apiKey?: string;
    showcaseMode?: boolean;
    onSuccess?: (data: any) => void;
    onError?: (error: Error) => void;
}
declare const EmojiInteractive: ({ apiKey, showcaseMode, onSuccess, onError }?: EmojiReactionProps) => react_jsx_runtime.JSX.Element;

export { EmojiInteractive, EmojiInteractive as default };
