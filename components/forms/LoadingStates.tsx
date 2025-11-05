'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface LoadingStatesProps {
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  loadingText?: string;
  successText?: string;
  errorText?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'button' | 'inline' | 'modal' | 'skeleton';
  className?: string;
}

const sizeConfig = {
  sm: {
    icon: 16,
    text: 'sm',
    spacing: 'gap-2'
  },
  md: {
    icon: 20,
    text: 'base',
    spacing: 'gap-2'
  },
  lg: {
    icon: 24,
    text: 'lg',
    spacing: 'gap-3'
  }
};

const variantConfig = {
  button: {
    container: 'flex items-center justify-center',
    background: 'bg-transparent',
    text: 'text-current',
    spinner: 'text-current'
  },
  inline: {
    container: 'flex items-center justify-center',
    background: 'bg-white',
    text: 'text-neutral-700',
    spinner: 'text-primary-600'
  },
  modal: {
    container: 'flex flex-col items-center justify-center p-8',
    background: 'bg-white rounded-lg shadow-xl',
    text: 'text-neutral-900',
    spinner: 'text-primary-600'
  },
  skeleton: {
    container: 'animate-pulse',
    background: 'bg-neutral-200 rounded',
    text: 'text-transparent',
    spinner: 'text-transparent'
  }
};

const loadingVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0.0, 0.2, 1]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
      ease: [0.4, 0.0, 0.2, 1]
    }
  }
};

const spinnerVariants = {
  hidden: { rotate: 0 },
  visible: { 
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const successVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.5,
    rotate: -180
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      duration: 0.6
    }
  }
};

const errorVariants = {
  hidden: { 
    opacity: 0, 
    x: -20
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0.0, 0.2, 1]
    }
  }
};

export const LoadingStates: React.FC<LoadingStatesProps> = ({
  isLoading = false,
  isSuccess = false,
  isError = false,
  loadingText = "Processing...",
  successText = "Success!",
  errorText = "Something went wrong",
  size = 'md',
  variant = 'inline',
  className = ''
}) => {
  const sizeClasses = sizeConfig[size];
  const variantClasses = variantConfig[variant];

  const getTextSize = () => {
    switch (size) {
      case 'sm': return 'text-sm';
      case 'lg': return 'text-lg';
      default: return 'text-base';
    }
  };

  const getContainerSize = () => {
    switch (size) {
      case 'sm': return 'min-h-[32px]';
      case 'lg': return 'min-h-[48px]';
      default: return 'min-h-[40px]';
    }
  };

  if (variant === 'skeleton') {
    return (
      <div className={`${getContainerSize()} ${variantClasses.container} ${className}`}>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-neutral-300 rounded-full animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-neutral-300 rounded animate-pulse" />
            <div className="h-3 bg-neutral-300 rounded w-3/4 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <motion.div
        className={`${getContainerSize()} ${variantClasses.container} ${variantClasses.background} ${className}`}
        variants={loadingVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className="flex items-center space-x-2"
          variants={successVariants}
          initial="hidden"
          animate="visible"
        >
          <CheckCircle2 
            className={`${sizeClasses.icon} ${variantClasses.spinner}`}
            aria-hidden="true"
          />
          {variant !== 'button' && (
            <span className={`${getTextSize()} ${variantClasses.text} font-medium`}>
              {successText}
            </span>
          )}
        </motion.div>
      </motion.div>
    );
  }

  if (isError) {
    return (
      <motion.div
        className={`${getContainerSize()} ${variantClasses.container} ${variantClasses.background} ${className}`}
        variants={loadingVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className="flex items-center space-x-2"
          variants={errorVariants}
          initial="hidden"
          animate="visible"
        >
          <AlertCircle 
            className={`${sizeClasses.icon} text-red-500`}
            aria-hidden="true"
          />
          {variant !== 'button' && (
            <span className={`${getTextSize()} ${variantClasses.text} font-medium text-red-600`}>
              {errorText}
            </span>
          )}
        </motion.div>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <motion.div
        className={`${getContainerSize()} ${variantClasses.container} ${variantClasses.background} ${className}`}
        variants={loadingVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className={`flex items-center ${sizeClasses.spacing}`}
          variants={spinnerVariants}
          initial="hidden"
          animate="visible"
        >
          <Loader2 
            className={`${sizeClasses.icon} ${variantClasses.spinner} animate-spin`}
            aria-hidden="true"
          />
          {variant !== 'button' && (
            <span className={`${getTextSize()} ${variantClasses.text} font-medium`}>
              {loadingText}
            </span>
          )}
        </motion.div>
      </motion.div>
    );
  }

  return null;
};

interface ButtonWithLoadingProps {
  children: React.ReactNode;
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  loadingText?: string;
  successText?: string;
  errorText?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const ButtonWithLoading: React.FC<ButtonWithLoadingProps> = ({
  children,
  isLoading = false,
  isSuccess = false,
  isError = false,
  loadingText = "Processing...",
  successText = "Success!",
  errorText = "Try Again",
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button'
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-neutral-600 text-white hover:bg-neutral-700 focus:ring-neutral-500',
    accent: 'bg-accent-600 text-white hover:bg-accent-700 focus:ring-accent-500',
    ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-100 focus:ring-neutral-500'
  };

  const isButtonDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isButtonDisabled}
      className={`
        inline-flex items-center justify-center font-medium rounded-lg
        focus:outline-none focus:ring-2 focus:ring-offset-2
        transition-all duration-200 ease-out
        min-w-[120px] ${sizeClasses[size]} ${variantClasses[variant]}
        ${isButtonDisabled ? 'opacity-75 cursor-not-allowed' : ''}
        ${className}
      `}
      aria-live="polite"
      aria-describedby={`button-status-${Math.random().toString(36).substr(2, 9)}`}
    >
      <LoadingStates
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        loadingText={loadingText}
        successText={successText}
        errorText={errorText}
        variant="button"
        size={size === 'sm' ? 'sm' : 'md'}
        className="w-full"
      />
      
      {/* Hidden status text for screen readers */}
      <span 
        id={`button-status-${Math.random().toString(36).substr(2, 9)}`}
        className="sr-only"
      >
        {isLoading ? loadingText : isSuccess ? successText : isError ? errorText : ''}
      </span>
      
      {/* Show text when not in loading state */}
      {!isLoading && !isSuccess && !isError && (
        <span className="ml-2">{children}</span>
      )}
    </button>
  );
};

export default LoadingStates;