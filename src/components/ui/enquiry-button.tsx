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
          // Base button styles with exact specifications
          "inline-flex items-center justify-center",
          "h-12 px-8", // 48px height, generous padding
          "border border-pure-white bg-transparent",
          "text-pure-white font-secondary font-normal text-sm uppercase",
          "tracking-[0.075em]", // +2 letter spacing
          "transition-all duration-300 ease-out",
          "rounded-none", // Sharp 90° corners
          "focus:outline-none focus:ring-2 focus:ring-pure-white focus:ring-offset-2 focus:ring-offset-black-silk",
          // Hover effects
          "hover:border-champagne-gold-bright hover:text-champagne-gold-bright",
          "hover:shadow-[0_0_12px_rgba(255,255,255,0.3)]",
          // Active state
          "active:scale-[0.98]",
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