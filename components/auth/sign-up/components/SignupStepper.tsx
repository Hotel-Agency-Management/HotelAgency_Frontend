import { Stepper, Step, StepLabel } from '@mui/material'
import FadeIn from '@/components/animation/FadeIn'

interface SignupStepperProps {
  activeStep: number
  labels: string[]
  animate?: boolean
}

const SignupStepper: React.FC<SignupStepperProps> = ({ activeStep, labels, animate = false }) => {
  const stepper = (
    <Stepper activeStep={activeStep} alternativeLabel>
      {labels.map(label => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )

  if (!animate) return stepper

  return (
    <FadeIn direction='down' distance={10} transition={{ duration: 0.3 }}>
      {stepper}
    </FadeIn>
  )
}

export default SignupStepper
