'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
  asyncValidator?: (value: string) => Promise<string | null>;
}

interface FieldValidation {
  isValid: boolean;
  message: string | null;
  isValidating?: boolean;
}

interface FormValidationProps {
  fields: Record<string, string>;
  rules: Record<string, ValidationRule>;
  onValidationChange?: (isValid: boolean, errors: Record<string, string>) => void;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  debounceMs?: number;
  className?: string;
}

const validationMessages = {
  required: 'This field is required',
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be no more than ${max} characters`,
  pattern: 'Please enter a valid format',
  custom: 'Please enter a valid value',
  async: 'Validating...',
  success: 'Looks good!'
};

export const useFormValidation = (
  initialValues: Record<string, string>,
  rules: Record<string, ValidationRule>
) => {
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [validations, setValidations] = useState<Record<string, FieldValidation>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const validateField = useCallback(async (fieldName: string, value: string): Promise<string | null> => {
    const rule = rules[fieldName];
    if (!rule) return null;

    // Required validation
    if (rule.required && !value.trim()) {
      return validationMessages.required;
    }

    // Skip other validations if field is empty and not required
    if (!value.trim() && !rule.required) {
      return null;
    }

    // Length validations
    if (rule.minLength && value.length < rule.minLength) {
      return validationMessages.minLength(rule.minLength);
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      return validationMessages.maxLength(rule.maxLength);
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      return validationMessages.pattern;
    }

    // Custom validation
    if (rule.custom) {
      return rule.custom(value);
    }

    // Async validation
    if (rule.asyncValidator) {
      try {
        return await rule.asyncValidator(value);
      } catch (error) {
        return 'Validation failed. Please try again.';
      }
    }

    return null;
  }, [rules]);

  const validateAllFields = useCallback(async () => {
    const newValidations: Record<string, FieldValidation> = {};
    let allValid = true;

    for (const [fieldName, value] of Object.entries(values)) {
      const error = await validateField(fieldName, value);
      newValidations[fieldName] = {
        isValid: !error,
        message: error,
        isValidating: false
      };
      
      if (error) {
        allValid = false;
      }
    }

    setValidations(newValidations);
    setIsValid(allValid);
    
    return { isValid: allValid, errors: newValidations };
  }, [values, validateField]);

  const setFieldValue = (fieldName: string, value: string) => {
    setValues(prev => ({ ...prev, [fieldName]: value }));
    
    // Mark field as touched
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  };

  const setFieldTouched = (fieldName: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  };

  const reset = () => {
    setValues(initialValues);
    setTouched({});
    setValidations({});
    setIsValid(false);
    setIsSubmitting(false);
  };

  // Auto-validate on change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Object.keys(values).length > 0) {
        validateAllFields();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [values, validateAllFields]);

  return {
    values,
    touched,
    validations,
    isValid,
    isSubmitting,
    setFieldValue,
    setFieldTouched,
    setIsSubmitting,
    validateAllFields,
    reset
  };
};

interface FormValidationMessagesProps {
  fieldName: string;
  validation: FieldValidation;
  className?: string;
}

export const FormValidationMessages: React.FC<FormValidationMessagesProps> = ({
  fieldName,
  validation,
  className = ''
}) => {
  const showMessage = validation.message || validation.isValidating || validation.isValid;

  if (!showMessage) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={fieldName}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className={`mt-2 text-sm font-medium ${className}`}
        role="status"
        aria-live="polite"
      >
        {validation.isValidating && (
          <div className="flex items-center gap-2 text-blue-600">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{validationMessages.async}</span>
          </div>
        )}
        
        {validation.message && !validation.isValidating && (
          <div className="flex items-center gap-2 text-red-500">
            <AlertCircle className="w-4 h-4" />
            <span>{validation.message}</span>
          </div>
        )}
        
        {validation.isValid && !validation.message && (
          <div className="flex items-center gap-2 text-green-500">
            <CheckCircle2 className="w-4 h-4" />
            <span>{validationMessages.success}</span>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default useFormValidation;