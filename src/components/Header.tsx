import React from "react";
import { EnquiryButton } from "@/components/ui/enquiry-button";
import setalieLogo from "@/assets/setalia-logo.png";

interface HeaderProps {
  onEnquiryClick: () => void;
}

const Header = ({ onEnquiryClick }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 md:h-20">
      <div className="h-full flex items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src={setalieLogo} 
            alt="Setalia Logo" 
            className="h-14 md:h-18 w-auto"
          />
        </div>
        
        {/* Enquiry Button */}
        <div className="flex items-center">
          <EnquiryButton 
            onClick={onEnquiryClick}
            className="text-xs md:text-sm px-4 md:px-6"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;