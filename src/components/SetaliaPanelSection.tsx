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
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
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

  const parallaxOffset = scrollY * 0.5;

  return (
    <section
      ref={sectionRef}
      className={`relative h-screen w-full overflow-hidden ${className}`}
    >
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 parallax-bg"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
        }}
      >
        <img
          src={backgroundImage}
          alt={altText}
          className="w-full h-[120%] object-cover"
          loading="lazy"
        />
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-black/35 to-transparent"
        style={{ background: "var(--gradient-overlay)" }}
      />

      {/* Foreground Decorative Image (Hero only) */}
      {foregroundImage && (
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 w-2/5 z-10 hidden md:block"
          style={{
            transform: `translateY(${-50 + parallaxOffset * 0.3}%)`,
          }}
        >
          <img
            src={foregroundImage}
            alt="Decorative silk fabric"
            className="w-full h-auto object-contain opacity-90"
            loading="lazy"
          />
        </div>
      )}

      {/* Content Block */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div 
          className={`text-center px-6 max-w-4xl ${
            isVisible ? "swipe-in-left" : "opacity-0"
          }`}
        >
          {/* Main Title */}
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-pure-white text-shadow mb-4">
            {title}
          </h1>
          
          {/* Subtitle */}
          <p className="font-secondary text-lg md:text-xl text-champagne-gold text-shadow mb-8">
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