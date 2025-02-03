import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import {
  Stepper,
  Step as MUIStep,
  StepLabel,
  Button,
  Box,
  Paper
} from '@mui/material';

export interface Step {
  id: string;
  title: string;
  component: React.ComponentType<any>;
  validationSchema?: any;
}

interface MultiStepFormProps {
  steps: Step[];
  initialValues: any;
  onSubmit: (values: any) => void;
  onCancel?: () => void;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  steps,
  initialValues,
  onSubmit,
  onCancel
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const isLastStep = currentStepIndex === steps.length - 1;

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={currentStep.validationSchema}
        onSubmit={(values) => {
          if (isLastStep) {
            onSubmit(values);
          } else {
            handleNext();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stepper activeStep={currentStepIndex} sx={{ mb: 4 }}>
              {steps.map((step) => (
                <MUIStep key={step.id}>
                  <StepLabel>{step.title}</StepLabel>
                </MUIStep>
              ))}
            </Stepper>

            <Box sx={{ mb: 4 }}>
              {React.createElement(currentStep.component)}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                {currentStepIndex > 0 && (
                  <Button
                    variant="outlined"
                    onClick={handlePrevious}
                    sx={{ mr: 1 }}
                  >
                    Previous
                  </Button>
                )}
              </Box>
              
              <Box>
                {onCancel && (
                  <Button
                    variant="outlined"
                    onClick={onCancel}
                    sx={{ mr: 1 }}
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isLastStep ? 'Submit' : 'Next'}
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default MultiStepForm; 