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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      className={`relative h-[100dvh] h-screen w-full overflow-hidden ${className}`}
      style={{
        minHeight: isMobile ? 'calc(100vh - env(safe-area-inset-bottom, 0px))' : '100vh'
      }}
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


      {/* Foreground Decorative Image (Hero only) */}
      {foregroundImage && (
        <div 
          className="absolute left-1/2 w-5/6 bottom-0 md:left-12 md:w-2/5 md:bottom-auto z-10"
          style={{
            top: !isMobile ? "50%" : "auto",
            transform: !isMobile 
              ? `translate3d(0, calc(-50% + ${parallaxOffset * 0.2}px), 0)`
              : `translate3d(-50%, 0, 0)`,
          }}
        >
          <img
            src={foregroundImage}
            alt="Decorative silk fabric"
            className="w-full h-auto object-contain opacity-80 md:opacity-100"
            loading="lazy"
            onLoad={() => console.log("Foreground image loaded successfully")}
            onError={(e) => {
              console.error("Failed to load foreground image:", foregroundImage);
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      )}

      {/* Content Block - Centered Editorial/Magazine Style */}
      <div 
        className={`absolute inset-0 flex z-20 ${
          isMobile && foregroundImage 
            ? 'flex-col justify-between items-center py-8' 
            : 'items-center justify-center'
        }`}
        style={{
          paddingBottom: isMobile && foregroundImage 
            ? 'clamp(8vh, calc(100vh - 600px), 15vh)' 
            : undefined
        }}
      >
        <div 
          className={`text-center px-6 max-w-4xl ${
            isVisible ? "swipe-in-left" : "opacity-0"
          } ${isMobile && foregroundImage ? 'flex-shrink-0' : ''}`}
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