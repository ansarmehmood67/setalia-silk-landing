import React from "react";
import { EnquiryButton } from "@/components/ui/enquiry-button";
import setalieLogo from "@/assets/setalia-logo.png";

interface HeaderProps {
  onEnquiryClick: () => void;
}

const Header = ({ onEnquiryClick }: HeaderProps) => {
  return (
    <header
      className="
        absolute top-0 left-0 right-0 z-50
        pt-[env(safe-area-inset-top)] py-2 md:py-4
      "
    >
      <div className="flex items-center justify-between px-4 md:px-10">
        {/* Logo (bigger on mobile + bigger on desktop) */}
        <div className="flex items-center">
          <img
            src={setalieLogo}
            alt="Setalia Logo"
            className="
              h-20          /* ↑ bigger on mobile */
              md:h-32       /* ↑ bigger on desktop */
              w-auto
            "
          />
        </div>

        {/* Enquiry Button (smaller on mobile) */}
        <div className="flex items-center">
          <EnquiryButton
            onClick={onEnquiryClick}
            className="
              text-[11px] px-2 py-1       /* compact on mobile */
              md:text-xs md:px-4 md:py-2  /* normal on desktop */
            "
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
