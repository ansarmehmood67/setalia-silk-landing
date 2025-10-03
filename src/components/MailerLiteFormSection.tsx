import React, { useRef, useState, useEffect } from "react";
import MailerLiteForm from "./MailerLiteForm";

interface MailerLiteFormSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  decorativeImage?: string;
  altText: string;
}

const MailerLiteFormSection = ({
  title,
  subtitle,
  backgroundImage,
  decorativeImage,
  altText,
}: MailerLiteFormSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Parallax effect
  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = 1 - (rect.top + rect.height / 2) / window.innerHeight;
        const offset = scrollProgress * 100;
        setParallaxOffset(offset);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 w-full h-full parallax-bg"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${parallaxOffset * 0.3}px)`,
        }}
        role="img"
        aria-label={altText}
      />

      {/* Content Container - Split Layout */}
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-4 md:px-10 py-20">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8 lg:gap-12">
          {/* Left Side - Content */}
          <div
            className={`w-full lg:w-2/5 flex flex-col items-center justify-center text-center transition-all duration-1000 ${
              isVisible ? "swipe-in-left opacity-100" : "opacity-0 translate-x-[-50px]"
            }`}
          >
            {/* Decorative Image */}
            {decorativeImage && (
              <div className="mb-8 md:mb-12">
                <img
                  src={decorativeImage}
                  alt="Decorative element"
                  className="decorative-fixed mx-auto animate-pulse"
                  style={{
                    animation: "pulse 3s ease-in-out infinite",
                  }}
                />
              </div>
            )}

            {/* Title */}
            <h2
              className="font-display text-luxury-title mb-4 md:mb-6 text-shadow ts-red-shadow-strong"
              style={{
                transform: `translateY(${parallaxOffset * 0.1}px)`,
              }}
            >
              {title}
            </h2>

            {/* Subtitle */}
            <p
              className="font-secondary text-luxury-subtitle tracking-subtitle text-shadow ts-red-shadow-soft"
              style={{
                transform: `translateY(${parallaxOffset * 0.15}px)`,
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Right Side - Form */}
          <div
            className={`w-full lg:w-3/5 flex items-center justify-center transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[50px]"
            }`}
          >
            <div className="w-full max-w-xl">
              <MailerLiteForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MailerLiteFormSection;
