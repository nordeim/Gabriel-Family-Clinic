"use client";

import React, { useEffect, useRef } from "react";

interface FloatingOrbsProps {
  className?: string;
}

export const FloatingOrbs: React.FC<FloatingOrbsProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Set CSS custom properties for magnetic effect
      container.style.setProperty("--mouse-x", `${(x - rect.width / 2) / 10}px`);
      container.style.setProperty("--mouse-y", `${(y - rect.height / 2) / 10}px`);
    };

    const handleMouseLeave = () => {
      container.style.setProperty("--mouse-x", "0px");
      container.style.setProperty("--mouse-y", "0px");
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Primary Floating Orb */}
      <div className="floating-orb floating-orb-primary" />
      
      {/* Secondary Floating Orb */}
      <div className="floating-orb floating-orb-secondary" />
      
      {/* Tertiary Floating Orb */}
      <div className="floating-orb floating-orb-tertiary" />
    </div>
  );
};

export default FloatingOrbs;