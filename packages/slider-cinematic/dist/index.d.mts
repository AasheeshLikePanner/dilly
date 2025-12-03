import * as react_jsx_runtime from 'react/jsx-runtime';

interface SliderReactionProps {
    apiKey?: string;
    showcaseMode?: boolean;
    onSuccess?: (data: any) => void;
    onError?: (error: Error) => void;
}
declare const SliderCinematic: ({ apiKey, showcaseMode, onSuccess, onError }?: SliderReactionProps) => react_jsx_runtime.JSX.Element;

export { SliderCinematic, SliderCinematic as default };
