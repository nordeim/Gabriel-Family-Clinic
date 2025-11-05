"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ServiceCardEnhancedProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
  magnetic?: boolean;
  variant?: "primary" | "accent" | "glass" | "default";
  className?: string;
  onClick?: () => void;
  "aria-label"?: string;
}

export const ServiceCardEnhanced: React.FC<ServiceCardEnhancedProps> = ({
  title,
  description,
  icon,
  delay = 0,
  magnetic = true,
  variant = "primary",
  className = "",
  onClick,
  "aria-label": ariaLabel,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  // Magnetic effect
  useEffect(() => {
    if (!magnetic) return;

    const card = cardRef.current;
    const container = containerRef.current;
    
    if (!card || !container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const moveX = (x - centerX) / 20;
      const moveY = (y - centerY) / 20;
      
      container.style.setProperty("--mouse-x", `${moveX}px`);
      container.style.setProperty("--mouse-y", `${moveY}px`);
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
  }, [magnetic]);

  // Scroll reveal effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsRevealed(true), delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const cardClasses = cn(
    "service-card-enhanced",
    `card-variant-${variant}`,
    magnetic && "card-magnetic-enhanced",
    className
  );

  return (
    <motion.div
      ref={cardRef}
      className={cn("card-reveal", isRevealed && "revealed")}
      initial={{ opacity: 0, y: 50 }}
      animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.8,
        delay: delay / 1000,
        ease: "easeOut"
      }}
    >
      <div
        ref={containerRef}
        className={cardClasses}
        onClick={onClick}
        role="article"
        aria-label={ariaLabel || `${title} - ${description}`}
        style={{ transitionDelay: `${delay}ms` }}
        tabIndex={0}
        {...props}
      >
        {/* Card Icon */}
        <div className="card-icon-enhanced" aria-hidden="true">
          {icon}
        </div>

        {/* Card Content with Progressive Reveal */}
        <div className="card-content-enhanced">
          <h3 className="card-title-enhanced">{title}</h3>
          <p className="card-description-enhanced">{description}</p>
        </div>

        {/* Card Action */}
        <div className="card-action-enhanced">
          <button
            className="btn-enhanced-secondary btn-enhanced-press"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
            aria-label={`Learn more about ${title}`}
          >
            Learn More
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Service Grid Component
interface ServiceGridEnhancedProps {
  children: React.ReactNode;
  className?: string;
}

export const ServiceGridEnhanced: React.FC<ServiceGridEnhancedProps> = ({
  children,
  className = ""
}) => {
  return (
    <div className={cn("service-grid-enhanced", className)}>
      {children}
    </div>
  );
};

export default ServiceCardEnhanced;