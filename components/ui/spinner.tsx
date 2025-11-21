// components/ui/spinner.tsx
import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "4" | "5" | "6" | "8"; // Tailwind size classes
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = "4", ...props }, ref) => {
    const sizeClass = {
      sm: "size-4",
      md: "size-6",
      lg: "size-8",
      xl: "size-10",
      "4": "size-4",
      "5": "size-5",
      "6": "size-6",
      "8": "size-8",
    }[size];

    return (
      <div
        ref={ref}
        className={cn(
          "animate-spin rounded-full border-2 border-current border-t-transparent text-blue-500",
          sizeClass,
          className
        )}
        role="status"
        {...props}
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);
Spinner.displayName = "Spinner";