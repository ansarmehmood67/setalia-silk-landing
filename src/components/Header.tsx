import React from "react";
import { EnquiryButton } from "@/components/ui/enquiry-button";
import setalieLogo from "@/assets/setalia-logo.png";

interface HeaderProps {
  onEnquiryClick: () => void;
}

const Header = ({ onEnquiryClick }: HeaderProps) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 h-20 md:h-24">
      <div className="h-full flex items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src={setalieLogo} 
            alt="Setalia Logo" 
            className="h-20 md:h-24 w-auto"
          />
        </div>
        
        {/* Enquiry Button */}
        <div className="flex items-center">
          <EnquiryButton 
            onClick={onEnquiryClick}
            className="text-xs md:text-xs px-3 md:px-4"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;