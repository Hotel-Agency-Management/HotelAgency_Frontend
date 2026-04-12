import { Stack, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material'
import { UserRound, Building2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { MouseEvent } from 'react'
import { SIGNUP_UI_ACCOUNT_TYPE, type SignupUiAccountType } from '../types/signup'
import SignupStepper from './SignupStepper'

interface AccountTypeToggleProps {
  accountType: SignupUiAccountType
  activeStep: number
  stepLabels: string[]
  onChange: (event: MouseEvent<HTMLElement>, nextValue: SignupUiAccountType | null) => void
}

const AccountTypeToggle: React.FC<AccountTypeToggleProps> = ({
  accountType,
  activeStep,
  stepLabels,
  onChange
}) => {
  const { t } = useTranslation()

  return (
    <Stack spacing={3}>
      <Typography variant='body2' textAlign='center'>
        {t('signup.chooseType', 'Choose account type')}
      </Typography>

      <ToggleButtonGroup
        value={accountType}
        exclusive
        onChange={onChange}
        fullWidth
        color='primary'
      >
        <ToggleButton value={SIGNUP_UI_ACCOUNT_TYPE.CUSTOMER}>
          <UserRound size={16} />
          {t('signup.customer', 'Customer')}
        </ToggleButton>

        <ToggleButton value={SIGNUP_UI_ACCOUNT_TYPE.AGENCY_OWNER}>
          <Building2 size={16} />
          {t('signup.agencyOwner', 'Agency Owner')}
        </ToggleButton>
      </ToggleButtonGroup>

      <Typography variant='caption' textAlign='center'>
        {accountType === SIGNUP_UI_ACCOUNT_TYPE.AGENCY_OWNER
          ? t('signup.agencyOwnerHint', 'Register your agency in three quick steps.')
          : t('signup.customerHint', 'Create a customer account and start right away.')}
      </Typography>

      {accountType === SIGNUP_UI_ACCOUNT_TYPE.AGENCY_OWNER && (
        <SignupStepper activeStep={activeStep} labels={stepLabels} animate />
      )}
    </Stack>
  )
}

export default AccountTypeToggle
