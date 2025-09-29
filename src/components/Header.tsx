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
        py-2 md:py-4        /* more vertical breathing room on desktop */
      "
    >
      <div className="flex items-center justify-between px-4 md:px-10">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={setalieLogo}
            alt="Setalia Logo"
            className="
              h-16                /* mobile size */
              md:h-28             /* slightly bigger on desktop */
              w-auto
            "
          />
        </div>

        {/* Enquiry Button */}
        <div className="flex items-center">
          <EnquiryButton
            onClick={onEnquiryClick}
            className="
              text-[11px] px-2 py-1    /* smaller on mobile */
              md:text-xs md:px-4 md:py-2
            "
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
