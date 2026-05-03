import { useState } from "react";
import type { StepIndex } from "../constants/hotel";

export function useHotelStepper() {
  const [activeStep, setActiveStep] = useState<StepIndex>(0);

  const goNext = () => setActiveStep((s) => Math.min(s + 1, 2) as StepIndex);
  const goBack = () => setActiveStep((s) => Math.max(s - 1, 0) as StepIndex);
  const isFirst = activeStep === 0;
  const isLast  = activeStep === 2;

  return { activeStep, goNext, goBack, isFirst, isLast };
}
