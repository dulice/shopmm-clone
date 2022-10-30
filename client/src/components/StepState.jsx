import * as React from 'react';
import {Box, Stepper, Step, StepLabel} from '@mui/material';

const steps = [
  'Shipping Address',
  'Checkout',
  'Select Payment Method',
];

export default function StepState({step}) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}