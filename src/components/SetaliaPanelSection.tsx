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
  // Debug: Ensure new code is loaded
  console.log('SetaliaPanelSection: Using parallaxY variable');
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fixed parallax with direct scroll calculation
  useEffect(() => {
    let animationFrameId: number;
    
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Simple, direct calculation: how much of the section is visible
        const elementCenter = rect.top + rect.height / 2;
        const screenCenter = windowHeight / 2;
        const distance = elementCenter - screenCenter;
        
        // Direct parallax: scroll distance affects movement
        // Larger movement ranges for visible effect
        const movement = isMobile ? distance * 0.15 : distance * 0.3;
        
        // Clamp to reasonable bounds
        const clampedMovement = Math.max(-150, Math.min(150, movement));
        
        console.log('Parallax movement:', clampedMovement, 'Element distance:', distance);
        setParallaxY(clampedMovement);
      }
    };
    
    const smoothUpdate = () => {
      handleScroll();
      animationFrameId = requestAnimationFrame(smoothUpdate);
    };
    
    smoothUpdate();
    
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.3 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative h-[100dvh] w-full overflow-hidden panel-gradient ${className}`}
      style={{
        minHeight: isMobile ? "calc(100vh - env(safe-area-inset-bottom, 0px))" : "100vh",
      }}
    >
      {/* Background with professional parallax - slower movement for depth */}
      <div
        className="absolute inset-0"
        style={{ 
          transform: `translate3d(0, ${parallaxY * 0.5}px, 0)`,
          willChange: 'transform'
        }}
      >
        <img
          src={backgroundImage}
          alt={altText}
          className="w-full min-h-full object-cover object-center"
          loading="lazy"
          onError={(e) => {
            console.error("Failed to load background:", backgroundImage);
            e.currentTarget.style.backgroundColor = "#000";
          }}
        />
      </div>

      {/* Foreground (model) — anchored bottom on mobile, center-left on desktop */}
      {foregroundImage && (
        <img
          src={foregroundImage}
          alt="Decorative foreground"
          className={
            // Mobile: bottom-center to eliminate awkward gap
            // Desktop: first section centered, other sections left column
            `pointer-events-none select-none z-10
             absolute ${isMobile
                ? "bottom-0 left-1/2 -translate-x-1/2 w-[68%] max-w-[360px]"
              : title === "SETALIA" 
                  ? "left-[35%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[38%] max-w-[620px]"
                  : "left-12 top-1/2 -translate-y-1/2 w-[38%] max-w-[620px]"}`
          }
          style={{
            transform: isMobile
              ? "translateX(-50%)"
              : title === "SETALIA"
                ? `translate3d(-50%, calc(-50% + ${parallaxY * 1.5}px), 0)`
                : `translate3d(0, calc(-50% + ${parallaxY * 1.5}px), 0)`,
            opacity: isMobile ? 0.9 : 1,
            willChange: 'transform'
          }}
          loading="lazy"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      )}

      {/* Content */}
      <div
        className={`absolute inset-0 z-20
          ${isMobile 
            ? "flex items-center justify-center pb-14" 
            : title === "SETALIA" 
              ? "grid justify-items-center items-end pb-16"
              : "grid place-items-center"}
        `}
      >
        <div
          className={`text-center px-6 max-w-4xl
            ${isVisible ? "swipe-in-left" : "opacity-0"}`}
        >
          {/* Decorative top mark (optional) */}
          {decorativeImage && (
            <div className="mb-8 flex justify-center">
              <img src={decorativeImage} alt="" className="max-h-16 md:max-h-20 opacity-80" />
            </div>
          )}

          {/* Title with strong shadow like Canva */}
          <h1
            className={`font-display ${title === "SETALIA" ? "text-fixed-title" : "text-fixed-title-secondary"}
                        ${title === "SETALIA" ? "ts-red-shadow-strong" : "ts-strong"} text-pure-white mb-4 tracking-[0.18em]`}
          >
            {title}
          </h1>

          {/* Subtitle with softer shadow */}
          <p className={`font-secondary text-fixed-subtitle ${title === "SETALIA" ? "ts-red-shadow-soft" : "ts-soft"} text-pure-white mb-8 tracking-[0.08em] uppercase`}>
            {subtitle}
          </p>

          {/* CTA */}
          {onEnquiryClick && <EnquiryButton onClick={onEnquiryClick} />}
        </div>
      </div>
    </section>
  );
};

export default SetaliaPanelSection;
