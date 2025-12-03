import * as react_jsx_runtime from 'react/jsx-runtime';

interface TextFeedbackProps {
    apiKey?: string;
    showcaseMode?: boolean;
    onSuccess?: (data: any) => void;
    onError?: (error: Error) => void;
}
declare const TextFeedback: ({ apiKey, showcaseMode, onSuccess, onError }?: TextFeedbackProps) => react_jsx_runtime.JSX.Element;

export { TextFeedback, TextFeedback as default };
