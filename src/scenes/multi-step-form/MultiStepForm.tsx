import React, { ReactNode, useState } from 'react';
import { Form } from 'formik';
import { Box, Button } from '@mui/material';

interface MultiStepFormProps {
  children: ReactNode[];
  currentStep?: number;
  onStepChange?: (step: number, isGoingBack?: boolean) => boolean;
}

interface StepContextType {
  setStep: (step: number, isGoingBack?: boolean) => void;
}

interface FormStepProps {
  isSubmitStep?: boolean;
  children: ReactNode;
}

export const StepContext = React.createContext<StepContextType>({
  setStep: () => {}
});

export const MultiStepForm: React.FC<MultiStepFormProps> = ({ 
  children,
  currentStep = 0,
  onStepChange
}) => {
  const [step, setStep] = useState(currentStep);
  const steps = React.Children.toArray(children);
  const isLastStep = step === steps.length - 1;
  const currentChild = steps[step] as React.ReactElement<FormStepProps>;
  const isSubmitStep = currentChild.props.isSubmitStep;

  const handleSetStep = (newStep: number, isGoingBack?: boolean) => {
    setStep(Math.min(Math.max(newStep, 0), steps.length - 1));
    if (onStepChange) {
      onStepChange(newStep, isGoingBack);
    }
  };

  const next = () => {
    if (onStepChange) {
      const isValid = onStepChange(step + 1);
      if (!isValid) return;
    }
    setStep(Math.min(step + 1, steps.length - 1));
  };

  const previous = () => {
    handleSetStep(step - 1, true);
  };

  return (
    <StepContext.Provider value={{ setStep: handleSetStep }}>
      <Form>
        {steps[step]}
        
        {!isSubmitStep && (
          <Box display='flex' justifyContent='center' mt='2rem' p='1rem'>
            {step > 0 && (
              <Button
                type="button"
                onClick={previous}
                color='secondary'
                variant='contained'
                sx={{ mr: 2 }}
              >
                Back
              </Button>
            )}
            
            {!isLastStep && (
              <Button
                type="button"
                onClick={next}
                color='secondary'
                variant='contained'
              >
                Next
              </Button>
            )}
          </Box>
        )}
      </Form>
    </StepContext.Provider>
  );
};