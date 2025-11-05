"use client";

import React, { useRef, useEffect, useState } from "react";

interface CardTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
  disabled?: boolean;
}

export const CardTilt: React.FC<CardTiltProps> = ({
  children,
  className = "",
  maxTilt = 15,
  scale = 1.02,
  glare = true,
  disabled = false,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glareOpacity, setGlareOpacity] = useState(0);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const rotateX = (mouseY / (rect.height / 2)) * -maxTilt;
      const rotateY = (mouseX / (rect.width / 2)) * maxTilt;
      
      setRotation({ x: rotateX, y: rotateY });
      
      if (glare) {
        const glareX = ((mouseX - rect.left) / rect.width) * 100;
        const glareY = ((mouseY - rect.top) / rect.height) * 100;
        setGlareOpacity(Math.min(Math.sqrt(glareX ** 2 + glareY ** 2) / 100, 1));
      }
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setRotation({ x: 0, y: 0 });
      setGlareOpacity(0);
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHovered, maxTilt, glare, disabled]);

  const transformStyle = {
    transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? scale : 1})`,
    transition: isHovered ? "none" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  const glareStyle = {
    background: `radial-gradient(circle at ${glareOpacity * 100}% ${glareOpacity * 100}%, rgba(255, 255, 255, ${glareOpacity * 0.3}) 0%, transparent 70%)`,
    opacity: glareOpacity,
    transition: "opacity 0.2s ease-out",
  };

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      style={transformStyle}
      {...props}
    >
      {children}
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={glareStyle}
        />
      )}
    </div>
  );
};

export default CardTilt;