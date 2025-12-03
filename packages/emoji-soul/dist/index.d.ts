import * as react_jsx_runtime from 'react/jsx-runtime';

interface EmojiReactionProps {
    apiKey?: string;
    showcaseMode?: boolean;
    onSuccess?: (data: any) => void;
    onError?: (error: Error) => void;
}
declare const EmojiSoul: ({ apiKey, showcaseMode, onSuccess, onError }?: EmojiReactionProps) => react_jsx_runtime.JSX.Element;

export { EmojiSoul, EmojiSoul as default };
