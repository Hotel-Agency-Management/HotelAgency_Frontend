import { Stepper, Step, StepLabel } from '@mui/material'
import { motion } from 'framer-motion'

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
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {stepper}
    </motion.div>
  )
}

export default SignupStepper
