'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Heart, 
  Star, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Info,
  ChevronRight,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface MicroInteractionProps {
  type: 'pulse' | 'bounce' | 'shake' | 'wiggle' | 'glow' | 'magnetic' | 'ripple';
  children: React.ReactNode;
  trigger?: 'hover' | 'click' | 'focus' | 'always';
  duration?: number;
  intensity?: 'subtle' | 'medium' | 'strong';
  className?: string;
  onTrigger?: () => void;
}

interface RippleEffectProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  color?: string;
  className?: string;
}

interface HoverScaleProps {
  children: React.ReactNode;
  scale?: number;
  rotate?: number;
  translateX?: number;
  translateY?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

interface MagneticAreaProps {
  children: React.ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
}

interface AnimatedIconProps {
  icon: React.ReactNode;
  type?: 'spin' | 'bounce' | 'pulse' | 'float' | 'rotate' | 'beat';
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

interface LoadingDotsProps {
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

// Micro Interaction Components
export const MicroInteraction: React.FC<MicroInteractionProps> = ({
  type,
  children,
  trigger = 'hover',
  duration = 0.6,
  intensity = 'medium',
  className = '',
  onTrigger
}) => {
  const [isActive, setIsActive] = useState(false);

  const getIntensityValue = () => {
    switch (intensity) {
      case 'subtle': return 1.05;
      case 'strong': return 1.2;
      default: return 1.1;
    }
  };

  const getDuration = () => duration / 1000;

  const variants = {
    pulse: {
      scale: [1, getIntensityValue(), 1],
      transition: { duration: getDuration(), repeat: Infinity }
    },
    bounce: {
      y: [0, -10, 0],
      transition: { duration: getDuration(), repeat: Infinity }
    },
    shake: {
      x: [-2, 2, -2, 2, 0],
      transition: { duration: getDuration() }
    },
    wiggle: {
      rotate: [-2, 2, -2, 2, 0],
      transition: { duration: getDuration() }
    },
    glow: {
      boxShadow: [
        '0 0 0px rgba(8, 145, 178, 0)',
        `0 0 ${intensity === 'strong' ? '20px' : '10px'} rgba(8, 145, 178, 0.3)`,
        '0 0 0px rgba(8, 145, 178, 0)'
      ],
      transition: { duration: getDuration(), repeat: Infinity }
    },
    magnetic: {
      x: [-2, 2, -2, 2, 0],
      y: [-1, 1, -1, 1, 0],
      transition: { duration: getDuration(), repeat: Infinity }
    },
    ripple: {
      scale: [1, 1.1, 1],
      transition: { duration: getDuration() }
    }
  } as const;

  const handleTrigger = () => {
    setIsActive(true);
    onTrigger?.();
    
    if (trigger === 'click') {
      setTimeout(() => setIsActive(false), duration);
    }
  };

  const getTriggerEvents = () => {
    if (trigger === 'hover') {
      return {
        onMouseEnter: handleTrigger,
        onMouseLeave: () => setIsActive(false)
      };
    }
    if (trigger === 'focus') {
      return {
        onFocus: handleTrigger,
        onBlur: () => setIsActive(false)
      };
    }
    if (trigger === 'click') {
      return { onClick: handleTrigger };
    }
    return {};
  };

  const animationKey = trigger === 'always' || isActive ? type : null;

  return (
    <motion.div
      className={className}
      animate={animationKey ? variants[type] : {}}
      {...getTriggerEvents()}
    >
      {children}
    </motion.div>
  );
};

// Ripple Effect Component
export const RippleEffect: React.FC<RippleEffectProps> = ({
  children,
  onClick,
  disabled = false,
  color = 'rgba(8, 145, 178, 0.3)',
  className = ''
}) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const createRipple = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newRipple = {
      id: Date.now(),
      x,
      y
    };

    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);

    onClick?.();
  };

  return (
    <div className={`relative overflow-hidden ${className}`} onClick={createRipple}>
      {children}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
              backgroundColor: color
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Hover Scale Component
export const HoverScale: React.FC<HoverScaleProps> = ({
  children,
  scale = 1.05,
  rotate = 0,
  translateX = 0,
  translateY = 0,
  className = '',
  as: Component = 'div'
}) => {
  return (
    <motion.div
      as={Component}
      className={className}
      whileHover={{
        scale,
        rotate,
        x: translateX,
        y: translateY,
        transition: { duration: 0.2, ease: 'easeOut' }
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  );
};

// Magnetic Area Component
export const MagneticArea: React.FC<MagneticAreaProps> = ({
  children,
  strength = 0.3,
  radius = 100,
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(springY, [-radius, radius], [5, -5]);
  const rotateY = useTransform(springX, [-radius, radius], [-5, 5]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (event.clientX - centerX) * strength;
    const deltaY = (event.clientY - centerY) * strength;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  );
};

// Animated Icon Component
export const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  icon,
  type = 'pulse',
  size = 'md',
  color = 'currentColor',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const variants = {
    spin: {
      rotate: 360,
      transition: { duration: 1, repeat: Infinity, ease: "linear" }
    },
    bounce: {
      y: [0, -4, 0],
      transition: { duration: 1, repeat: Infinity, ease: "easeInOut" }
    },
    pulse: {
      scale: [1, 1.2, 1],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    },
    float: {
      y: [0, -6, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    },
    rotate: {
      rotate: [0, 10, -10, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    },
    beat: {
      scale: [1, 1.3, 1],
      transition: { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <motion.div
      className={`inline-flex items-center justify-center ${sizeClasses[size]} ${className}`}
      style={{ color }}
      variants={variants}
      animate={type}
    >
      {icon}
    </motion.div>
  );
};

// Loading Dots Component
export const LoadingDots: React.FC<LoadingDotsProps> = ({
  count = 3,
  size = 'md',
  color = 'currentColor',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={`rounded-full ${sizeClasses[size]}`}
          style={{ backgroundColor: color }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Interactive Button Variants
export const InteractiveButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon,
  ...props 
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    secondary: 'bg-neutral-600 text-white hover:bg-neutral-700',
    accent: 'bg-accent-600 text-white hover:bg-accent-700',
    success: 'bg-green-600 text-white hover:bg-green-700',
    warning: 'bg-orange-600 text-white hover:bg-orange-700'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <RippleEffect>
      <motion.button
        className={`
          inline-flex items-center gap-2 rounded-lg font-medium
          focus:outline-none focus:ring-2 focus:ring-offset-2
          transition-all duration-200 ease-out
          ${variantClasses[variant]} ${sizeClasses[size]}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {children}
        {icon && <AnimatedIcon icon={icon} type="float" size="sm" />}
      </motion.button>
    </RippleEffect>
  );
};

// Success/Error Feedback Components
export const SuccessFeedback: React.FC<{ message: string; className?: string }> = ({ 
  message, 
  className = '' 
}) => (
  <motion.div
    className={`flex items-center gap-2 text-green-600 ${className}`}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
  >
    <AnimatedIcon icon={<CheckCircle2 />} type="beat" />
    <span>{message}</span>
  </motion.div>
);

export const ErrorFeedback: React.FC<{ message: string; className?: string }> = ({ 
  message, 
  className = '' 
}) => (
  <motion.div
    className={`flex items-center gap-2 text-red-600 ${className}`}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
  >
    <AnimatedIcon icon={<AlertCircle />} type="pulse" />
    <span>{message}</span>
  </motion.div>
);

export const InfoFeedback: React.FC<{ message: string; className?: string }> = ({ 
  message, 
  className = '' 
}) => (
  <motion.div
    className={`flex items-center gap-2 text-blue-600 ${className}`}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
  >
    <AnimatedIcon icon={<Info />} type="pulse" />
    <span>{message}</span>
  </motion.div>
);

export default MicroInteraction;