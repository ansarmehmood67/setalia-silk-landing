import React, { useState } from "react";
import SetaliaPanelSection from "@/components/SetaliaPanelSection";
import EnquiryModal from "@/components/EnquiryModal";

// Import images
import heroBackground from "@/assets/hero-background.png";
import heroForeground from "@/assets/hero-foreground.png";
import panel2Background from "@/assets/panel2-background.png";
import panel3Background from "@/assets/panel3-background.png";
import panel4Background from "@/assets/panel4-background.png";

const Index = () => {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  return (
    <main className="relative">
      {/* SEO Hidden H1 */}
      <h1 className="sr-only">Setalia — Luxury Italian Fabric</h1>
      
      {/* Hero Section */}
      <SetaliaPanelSection
        title="SETALIA"
        subtitle="LUXURY ITALIAN FABRIC"
        backgroundImage={heroBackground}
        foregroundImage={heroForeground}
        altText="Black silk background with luxury fabric textures"
        onEnquiryClick={() => setIsEnquiryModalOpen(true)}
      />

      {/* Panel 2 - Crafting Excellence */}
      <SetaliaPanelSection
        title="CRAFTING EXCELLENCE"
        subtitle="MADE FOR THE ELITE"
        backgroundImage={panel2Background}
        altText="Gold silk fabric with intricate weaving patterns"
        onEnquiryClick={() => setIsEnquiryModalOpen(true)}
      />

      {/* Panel 3 - Evolving Clientcare */}
      <SetaliaPanelSection
        title="EVOLVING CLIENTCARE"
        subtitle="TAILORED FOR YOU"
        backgroundImage={panel3Background}
        altText="Italian couture teal dress showcasing premium craftsmanship"
        onEnquiryClick={() => setIsEnquiryModalOpen(true)}
      />

      {/* Panel 4 - Italian Textile Heritage */}
      <SetaliaPanelSection
        title="ITALIAN TEXTILE HERITAGE"
        subtitle="TAILORED FOR YOU"
        backgroundImage={panel4Background}
        altText="Italian textile studio with traditional weaving equipment"
        onEnquiryClick={() => setIsEnquiryModalOpen(true)}
      />

      {/* Panel 5 - Coming Soon */}
      <SetaliaPanelSection
        title="COMING SOON"
        subtitle="MADE FOR THE ELITE"
        backgroundImage={heroBackground}
        altText="Black silk background with anticipation of luxury launch"
        onEnquiryClick={() => setIsEnquiryModalOpen(true)}
      />

      {/* Enquiry Modal */}
      <EnquiryModal 
        isOpen={isEnquiryModalOpen} 
        onClose={() => setIsEnquiryModalOpen(false)} 
      />
    </main>
  );
};

export default Index;
