import React from "react";
import { EnquiryButton } from "@/components/ui/enquiry-button";
import setalieLogo from "@/assets/setalia-logo.png";

interface HeaderProps {
  onEnquiryClick: () => void;
}

const Header = ({ onEnquiryClick }: HeaderProps) => {
  return (
    <header
      className={[
        // sticky, safe area, compact
        "sticky top-0 z-50 pt-[env(safe-area-inset-top)] py-1.5 md:py-2",
        // base translucent layer (fallback)
        "bg-black/15",
        // real glass: blur + saturation when supported
        "supports-[backdrop-filter]:bg-black/5 supports-[backdrop-filter]:backdrop-blur-xl supports-[backdrop-filter]:backdrop-saturate-150",
        // premium depth: soft shadow + hairline divider
        "shadow-[0_8px_24px_rgba(0,0,0,0.25)] border-b border-white/15",
        // gentle inner top highlight for “sheen”
        "relative before:content-[''] before:absolute before:inset-0 before:pointer-events-none",
        "before:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.22),rgba(255,255,255,0)_30%)]",
        // ultra-fine noise to kill banding (very subtle)
        "after:content-[''] after:absolute after:inset-0 after:opacity-20 after:pointer-events-none",
        "after:bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAIElEQVQYV2NkwA7+z0AEGJgY/8+ZQGQyQJgGQxE0Q0E0wAAtp0D5H2Zx2kAAAAASUVORK5CYII=')]",
      ].join(" ")}
    >
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex items-center justify-between px-4 md:px-10">
          {/* LOGO — unchanged sizing */}
          <div className="flex items-center">
            <img
              src={setalieLogo}
              alt="Setalia Logo"
              className="h-16 md:h-24 w-auto block object-contain"
            />
          </div>

          {/* BUTTON — unchanged styles */}
          <div className="flex items-center">
            <EnquiryButton
              onClick={onEnquiryClick}
              className="text-[11px] px-2 py-1 md:text-xs md:px-4 md:py-2"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
