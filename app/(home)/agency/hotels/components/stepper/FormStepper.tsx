"use client";

import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { HOTEL_STEPS } from "../../constants/steps";

interface FormStepperProps {
  activeStep: number;
}

export function FormStepper({ activeStep }: FormStepperProps) {
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {HOTEL_STEPS.map(({ label, description }) => (
        <Step key={label}>
          <StepLabel
            optional={
              <Typography variant="caption" color="text.secondary">
                {description}
              </Typography>
            }
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
