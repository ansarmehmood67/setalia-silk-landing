import React, { useState } from "react";
import SetaliaPanelSection from "@/components/SetaliaPanelSection";
import EnquiryModal from "@/components/EnquiryModal";
import decorativeSun from "@/assets/decorative-sun.png";

// Cloudinary image URLs
const heroBackground = "https://res.cloudinary.com/dc1zzgsjw/image/upload/v1758928444/card_one_background_flp9ud.png";
const heroForeground = "https://res.cloudinary.com/dc1zzgsjw/image/upload/v1759087816/card_1_image_upper_1_jklm6a.png";
const panel2Background = "https://res.cloudinary.com/dc1zzgsjw/image/upload/v1758928441/card_2_backgroun_uarjfj.png";
const panel3Background = "https://res.cloudinary.com/dc1zzgsjw/image/upload/v1758928438/card_3_background_lxx14a.png";
const panel4Background = "https://res.cloudinary.com/dc1zzgsjw/image/upload/v1758928435/card_4_background_hujztq.png";

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
        decorativeImage={decorativeSun}
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
