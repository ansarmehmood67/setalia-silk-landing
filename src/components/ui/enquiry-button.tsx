import * as React from "react";
import { cn } from "@/lib/utils";

interface EnquiryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const EnquiryButton = React.forwardRef<HTMLButtonElement, EnquiryButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={cn(
          // Ultra-minimal luxury button styles
          "inline-flex items-center justify-center",
          "h-12 px-8", // 48px height, generous padding
          "border border-pure-white/60 bg-transparent", // Ultra-thin 1px border
          "text-pure-white font-secondary font-light text-sm uppercase",
          "tracking-[0.075em]", // Wide letter spacing maintained
          "transition-all duration-500 ease-out",
          "rounded-none", // Sharp 90° corners
          "focus:outline-none focus:ring-1 focus:ring-pure-white/50 focus:ring-offset-1 focus:ring-offset-transparent",
          // Ultra-subtle hover effects - faint glow
          "hover:border-pure-white hover:text-pure-white",
          "hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]", // Faint glow
          "hover:bg-pure-white/5", // Barely visible background
          // Minimal active state
          "active:scale-[0.99]",
          className
        )}
        ref={ref}
        {...props}
      >
        ENQUIRY
      </button>
    );
  }
);

EnquiryButton.displayName = "EnquiryButton";

export { EnquiryButton };