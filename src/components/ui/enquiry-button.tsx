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
          // Enhanced button styles matching client design
          "inline-flex items-center justify-center",
          "h-14 px-12", // Larger button as per client design
          "border-2 border-pure-white bg-transparent",
          "text-pure-white font-secondary font-normal text-base uppercase",
          "tracking-[0.15em]", // Enhanced letter spacing
          "transition-all duration-300 ease-out",
          "rounded-none", // Sharp 90° corners
          "focus:outline-none focus:ring-2 focus:ring-pure-white focus:ring-offset-2 focus:ring-offset-black-silk",
          // Enhanced hover effects
          "hover:border-champagne-gold-bright hover:text-champagne-gold-bright hover:bg-champagne-gold-bright/10",
          "hover:shadow-[0_0_20px_rgba(255,223,186,0.4)]",
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