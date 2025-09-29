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
  const [smoothParallaxOffset, setSmoothParallaxOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Enhanced parallax effect with easing and multiple layers
  useEffect(() => {
    let ticking = false;
    let animationFrameId: number;
    
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;
    
    const handleScroll = () => {
      if (!ticking) {
        animationFrameId = requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const sectionHeight = rect.height;
            
            // Enhanced progress calculation for smoother transitions
            const rawProgress = (windowHeight - rect.top) / (windowHeight + sectionHeight);
            const clampedProgress = Math.max(-0.2, Math.min(1.2, rawProgress));
            
            // Apply easing and increased range for premium feel
            const easedProgress = easeOutCubic(Math.abs(clampedProgress - 0.5) * 2) * Math.sign(clampedProgress - 0.5);
            const enhancedOffset = easedProgress * (isMobile ? 80 : 160); // Increased from ±50 to ±80/160
            
            setParallaxOffset(enhancedOffset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Smooth interpolation for buttery smooth movement
    const smoothingInterval = setInterval(() => {
      setSmoothParallaxOffset(prev => lerp(prev, parallaxOffset, 0.08));
    }, 16); // ~60fps
    
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(smoothingInterval);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [parallaxOffset, isMobile]);

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
      {/* Background with enhanced parallax and performance optimizations */}
      <div
        className="absolute inset-0"
        style={{ 
          transform: `translate3d(0, ${smoothParallaxOffset * 0.6}px, 0) scale(${1 + Math.abs(smoothParallaxOffset) * 0.0002})`,
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
                ? `translate3d(-50%, calc(-50% + ${smoothParallaxOffset * 0.8}px), 0) rotate(${smoothParallaxOffset * 0.02}deg)`
                : `translate3d(0, calc(-50% + ${smoothParallaxOffset * 0.8}px), 0) rotate(${smoothParallaxOffset * 0.015}deg)`,
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
