import * as react_jsx_runtime from 'react/jsx-runtime';

interface BugReportingProps {
    apiKey?: string;
    showcaseMode?: boolean;
    onSuccess?: (data: any) => void;
    onError?: (error: Error) => void;
}
declare const BugReporter: ({ apiKey, showcaseMode, onSuccess, onError }?: BugReportingProps) => react_jsx_runtime.JSX.Element;

export { BugReporter, BugReporter as default };
