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
  dimBackground?: boolean;
}

/* ===== Parallax tuning knobs ===== */
const MAX_SHIFT_PX = 200;        // total movement clamp (40–100)
const SMOOTH = 0.12;            // lerp factor (0.08–0.18)
const BG_SPEED = 0.35;          // background depth
const FG_SPEED_MOBILE = 0.24;   // foreground depth on mobile (hero)
const FG_SPEED_DESK = 0.12;     // foreground depth on desktop (non-hero)
const TEXT_SPEED = -0.06;       // subtle counter-move for text on desktop

const SetaliaPanelSection: React.FC<SetaliaPanelSectionProps> = ({
  title,
  subtitle,
  backgroundImage,
  foregroundImage,
  decorativeImage,
  altText,
  className = "",
  onEnquiryClick,
  dimBackground = false,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // smoothed parallax value
  const [parallaxY, setParallaxY] = useState(0);
  const targetRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // premium parallax: clamp + lerp + respects reduced motion
  useEffect(() => {
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (vh - rect.top) / (vh + rect.height); // ~[-0.1..1.1]
      const raw = (progress - 0.5) * 2; // [-1..+1]
      const clamped = Math.max(-1, Math.min(1, raw));
      targetRef.current = prefersReduced ? 0 : clamped * MAX_SHIFT_PX;
    };

    const tick = () => {
      setParallaxY(prev => {
        const next = prev + (targetRef.current - prev) * SMOOTH;
        return Math.abs(next - prev) < 0.1 ? targetRef.current : next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // entrance
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.3 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative h-[100dvh] w-full overflow-hidden panel-gradient ${className}`}
      style={{
        minHeight: isMobile
          ? "calc(100vh - env(safe-area-inset-bottom, 0px))"
          : "100vh",
      }}
    >
      {/* Background with smoothed parallax */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate3d(0, ${parallaxY * BG_SPEED}px, 0)`,
          willChange: "transform",
        }}
      >
        <img
          src={backgroundImage}
          alt={altText}
          className="w-full min-h-full object-cover object-center"
          loading="lazy"
          onError={(e) => {
            console.error("Failed to load background:", backgroundImage);
            (e.currentTarget as HTMLImageElement).style.backgroundColor = "#000";
          }}
        />
      </div>

      {/* Optional dim overlay for bright sections */}
      {dimBackground && (
        <div className="absolute inset-0 z-[5] pointer-events-none bg-gradient-to-t from-black/55 via-black/35 to-black/20" />
      )}

      {/* Foreground (model) */}
      {foregroundImage && (
        <img
          src={foregroundImage}
          alt="Decorative foreground"
          className={
            `pointer-events-none select-none z-10 absolute ` +
            (title === "SETALIA" && isMobile
              ? "inset-0 w-full h-full object-cover object-center"
              : title === "SETALIA" && !isMobile
              // hero desktop anchored to bottom; horizontal offset with vw
              ? "left-[20vw] bottom-0 translate-y-0 w-[38%] max-w-[620px]"
              : isMobile
              ? "bottom-0 left-1/2 -translate-x-1/2 w-[95%] max-w-[550px]"
              : "left-12 top-1/2 -translate-y-1/2 w-[38%] max-w-[620px]")
          }
          style={{
            transform:
              title === "SETALIA" && isMobile
                ? `translateY(${parallaxY * FG_SPEED_MOBILE}px)` // hero mobile
                : title === "SETALIA" && !isMobile
                ? "translateY(0)" // hero desktop fixed to bottom
                : isMobile
                ? "translateX(-50%)"
                : `translateY(calc(-50% + ${parallaxY * FG_SPEED_DESK}px))`, // other sections desktop
            opacity: title === "SETALIA" && isMobile ? 0.8 : isMobile ? 0.9 : 1,
            // Mobile-only crop nudge for hero
            objectPosition:
              title === "SETALIA" && isMobile ? "45% center" : undefined,
            willChange: "transform",
          }}
          loading="lazy"
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
        />
      )}

      {/* Existing hero text readability overlay */}
      {title === "SETALIA" && (
        <div className="absolute inset-0 z-15 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      )}

      {/* Content */}
      <div
        className={`absolute inset-0 z-20
          ${
            isMobile
              ? "flex items-center justify-center"
              : title === "SETALIA"
              ? "grid justify-items-center items-end pb-16"
              : "grid place-items-center"
          }
        `}
        style={
          isMobile
            ? {
                position: "absolute",
                top: "62vh",
                transform: "translateY(-50%)",
                left: 0,
                right: 0,
              }
            : undefined
        }
      >
        {/* Inner wrapper: apply subtle counter parallax to text on desktop only */}
        <div
          className={`text-center px-6 max-w-4xl ${
            isVisible ? "swipe-in-left" : "opacity-0"
          }`}
          style={{
            transform: !isMobile ? `translateY(${parallaxY * TEXT_SPEED}px)` : undefined,
            willChange: !isMobile ? "transform" : undefined,
          }}
        >
          {decorativeImage && (
            <div className="mb-8 flex justify-center">
              <img
                src={decorativeImage}
                alt=""
                className="max-h-16 md:max-h-20 opacity-80"
              />
            </div>
          )}

          <h1
            className={`font-display ${
              title === "SETALIA" ? "text-fixed-title" : "text-fixed-title-secondary"
            } ${
              title === "SETALIA" ? "ts-red-shadow-strong" : "ts-strong"
            } text-pure-white mb-4 tracking-[0.18em]`}
          >
            {title}
          </h1>

          <p
            className={`font-secondary text-fixed-subtitle ${
              title === "SETALIA" ? "ts-red-shadow-soft" : "ts-soft"
            } text-pure-white mb-8 tracking-[0.08em] uppercase`}
          >
            {subtitle}
          </p>

          {onEnquiryClick && <EnquiryButton onClick={onEnquiryClick} />}
        </div>
      </div>
    </section>
  );
};

export default SetaliaPanelSection;
