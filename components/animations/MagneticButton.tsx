"use client";

import React, { useRef, useEffect } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = "",
  disabled = false,
  onClick,
  type = "button",
  "aria-label": ariaLabel,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const container = containerRef.current;
    
    if (!button || !container || disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const moveX = (x - centerX) / 10;
      const moveY = (y - centerY) / 10;
      
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
  }, [disabled]);

  return (
    <div
      ref={containerRef}
      className="btn-magnetic-container btn-magnetic-bounds"
    >
      <button
        ref={buttonRef}
        type={type}
        className={`btn-ripple btn-enhanced-press ${className}`}
        disabled={disabled}
        onClick={onClick}
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </button>
    </div>
  );
};

export default MagneticButton;