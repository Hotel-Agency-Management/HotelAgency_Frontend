"use client";

import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { getHotelSteps } from "../../constants/hotel";

interface FormStepperProps {
  activeStep: number;
}

export function FormStepper({ activeStep }: FormStepperProps) {
  const { t } = useTranslation();
  const steps = getHotelSteps(t);

  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map(({ label, description }) => (
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
