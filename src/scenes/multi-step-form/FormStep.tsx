import React from 'react';

interface FormStepProps {
  children: React.ReactNode;
  isSubmitStep?: boolean;
}

export const FormStep: React.FC<FormStepProps> = ({ children, isSubmitStep = false }) => {
  return <>{children}</>;
};