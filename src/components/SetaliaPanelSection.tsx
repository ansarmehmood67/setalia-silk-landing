import React, { useEffect, useRef, useState } from "react";
import { EnquiryButton } from "@/components/ui/enquiry-button";

interface SetaliaPanelSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  foregroundImage?: string;
  decorativeImage?: string;
  altText: string;
  className?: string;
  onEnquiryClick?: () => void;
}

const SetaliaPanelSection: React.FC<SetaliaPanelSectionProps> = ({
  title,
  subtitle,
  backgroundImage,
  foregroundImage,
  decorativeImage,
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

      {/* Text Background - Only for Hero Section */}
      {title === "SETALIA" && (
        <div className="absolute inset-0 flex items-center justify-center z-15">
          <div className="absolute w-full max-w-4xl h-96 bg-black/20 backdrop-blur-sm rounded-lg" />
        </div>
      )}

      {/* Foreground Decorative Image (Hero only) */}
      {foregroundImage && (
        <div 
          className="absolute left-4 w-3/5 md:left-12 md:w-2/5 z-10"
          style={{
            top: "50%",
            transform: `translate3d(0, calc(-50% + ${parallaxOffset * 0.3}px), 0)`,
          }}
        >
          <img
            src={foregroundImage}
            alt="Decorative silk fabric"
            className="w-full h-auto object-contain"
            loading="lazy"
            onError={(e) => {
              console.error("Failed to load foreground image:", foregroundImage);
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      )}

      {/* Content Block - Centered Editorial/Magazine Style */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div 
          className={`text-center px-6 max-w-4xl ${
            isVisible ? "swipe-in-left" : "opacity-0"
          }`}
        >
          {/* Decorative Image */}
          {decorativeImage && (
            <div className="mb-8 flex justify-center">
              <img
                src={decorativeImage}
                alt="Decorative element"
                className="decorative-fixed object-contain opacity-70"
                loading="lazy"
              />
            </div>
          )}
          
          {/* Main Title */}
          <h1 className={`font-display ${title === "SETALIA" ? "text-fixed-title" : "text-fixed-title-secondary"} text-shadow mb-6 text-pure-white`}>
            {title}
          </h1>
          
          {/* Subtitle */}
          <p className="font-secondary text-fixed-subtitle text-pure-white text-shadow mb-12 text-luxury-subtitle">
            {subtitle}
          </p>
          
          {/* CTA Button */}
          {onEnquiryClick && <EnquiryButton onClick={onEnquiryClick} />}
        </div>
      </div>
    </section>
  );
};

export default SetaliaPanelSection;