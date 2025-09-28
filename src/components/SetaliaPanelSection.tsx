import React, { useEffect, useRef, useState } from "react";
import { EnquiryButton } from "@/components/ui/enquiry-button";

interface SetaliaPanelSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  foregroundImage?: string;
  altText: string;
  className?: string;
  onEnquiryClick?: () => void;
}

const SetaliaPanelSection: React.FC<SetaliaPanelSectionProps> = ({
  title,
  subtitle,
  backgroundImage,
  foregroundImage,
  altText,
  className = "",
  onEnquiryClick,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate how much the section has moved through the viewport
            // When section is entering from bottom: rect.top = windowHeight, progress = 0
            // When section is centered: rect.top = 0, progress = 0.5
            // When section is exiting from top: rect.top = -windowHeight, progress = 1
            const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
            
            // Only apply parallax when section is in or near viewport
            if (progress >= -0.1 && progress <= 1.1) {
              // Convert progress to parallax offset (more subtle movement)
              const offset = (progress - 0.5) * 100; // Range: -50px to +50px
              setParallaxOffset(offset);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Initial calculation
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative h-screen w-full overflow-hidden ${className}`}
    >
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 parallax-bg"
        style={{
          transform: `translate3d(0, ${parallaxOffset}px, 0)`,
        }}
      >
        <img
          src={backgroundImage}
          alt={altText}
          className="w-full min-h-full object-cover object-center"
          loading="lazy"
          onError={(e) => {
            console.error("Failed to load background image:", backgroundImage);
            e.currentTarget.style.backgroundColor = "hsl(var(--black-silk))";
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-black/35 to-transparent"
        style={{ background: "var(--gradient-overlay)" }}
      />

      {/* Foreground Decorative Image (Hero only) - Repositioned to Left */}
      {foregroundImage && (
        <div 
          className="absolute left-0 w-1/3 z-10 hidden md:block"
          style={{
            top: "50%",
            transform: `translate3d(0, calc(-50% + ${parallaxOffset * 0.3}px), 0)`,
          }}
        >
          <img
            src={foregroundImage}
            alt="Decorative silk fabric"
            className="w-full h-auto object-contain opacity-95"
            loading="lazy"
            onError={(e) => {
              console.error("Failed to load foreground image:", foregroundImage);
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      )}

      {/* Content Block - Repositioned for Hero Layout */}
      <div className={`absolute inset-0 flex items-center z-20 ${
        foregroundImage ? 'justify-end pr-20' : 'justify-center'
      }`}>
        <div 
          className={`px-6 max-w-4xl ${
            foregroundImage ? 'text-left' : 'text-center'
          } ${isVisible ? "swipe-in-left" : "opacity-0"}`}
        >
          {/* Main Title with Gradient Effect for SETALIA */}
          <h1 className={`font-display text-7xl md:text-9xl lg:text-[12rem] mb-6 leading-none ${
            title === 'SETALIA' 
              ? 'gradient-setalia' 
              : 'text-pure-white text-shadow-strong'
          }`}>
            {title}
          </h1>
          
          {/* Subtitle */}
          <p className="font-secondary text-xl md:text-2xl lg:text-3xl text-champagne-gold-bright text-shadow-strong mb-12 max-w-2xl">
            {subtitle}
          </p>
          
          {/* CTA Button */}
          <EnquiryButton onClick={onEnquiryClick} />
        </div>
      </div>
    </section>
  );
};

export default SetaliaPanelSection;