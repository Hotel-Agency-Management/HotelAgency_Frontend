import { useState } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/core/context/AuthContext'
import type { AgencyDocumentsFormData } from '@/components/auth/agency/types/documents'
import { buildSignupSchema } from '@/core/schemas/signupSchema'
import { SignupAccountType, SignupFormData } from '../types/signup'
import { AgencyFormData } from '../../agency/types/agency'

const defaultAgencyValues: AgencyFormData = {
  agencyName: '',
  phone: '',
  city: ''
}

export const useSignupForm = () => {
  const { t } = useTranslation()
  const { signup, isLoading } = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [accountType, setAccountType] = useState<SignupAccountType>('customer')
  const [activeStep, setActiveStep] = useState(0)
  const [accountValues, setAccountValues] = useState<SignupFormData | null>(null)
  const [agencyValues, setAgencyValues] = useState<AgencyFormData>(defaultAgencyValues)

  const schema = buildSignupSchema(t)

  const form = useForm<SignupFormData, unknown, SignupFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      role: 'customer' as SignupFormData['role'],
    },
    resolver: yupResolver(schema) as Resolver<SignupFormData>
  })

  const togglePasswordVisibility = () => setShowPassword(prev => !prev)

  const handleAccountTypeChange = (
    _event: React.MouseEvent<HTMLElement>,
    nextValue: SignupAccountType | null
  ) => {
    if (!nextValue || nextValue === accountType) return
    setAccountType(nextValue)
    setActiveStep(0)
  }

  const onAccountSubmit = async (data: SignupFormData) => {
    setErrorMessage('')

    if (accountType === 'agencyOwner') {
      setAccountValues(data)
      setActiveStep(1)
      return
    }

    const { confirmPassword, firstName, lastName, ...rest } = data
    await signup(
      { ...rest, name: `${firstName} ${lastName}` },
      error => setErrorMessage(typeof error === 'string' ? error : 'Signup failed')
    )
  }

  const onAgencyInfoSubmit = async (data: AgencyFormData) => {
    setAgencyValues(data)
    setActiveStep(2)
  }

  const onAgencyDocumentsSubmit = async (data: AgencyDocumentsFormData) => {
    if (!accountValues) return

    const formData = new FormData()
    const { firstName, lastName } = accountValues

    formData.append('name', `${firstName} ${lastName}`)
    formData.append('email', accountValues.email)
    formData.append('password', accountValues.password)
    formData.append('phone', accountValues.phone)
    formData.append('role', 'agencyOwner')
    formData.append('type', 'BUSINESS')
    formData.append('agencyName', agencyValues.agencyName)
    formData.append('agencyPhone', agencyValues.phone)
    formData.append('agencyCity', agencyValues.city)

    data.documents.forEach((doc, index) => {
      formData.append(`documents[${index}][title]`, doc.title)
      if (doc.file) {
        formData.append(`documents[${index}][file]`, doc.file)
      }
    })

    await signup(
      formData as any,
      error => setErrorMessage(typeof error === 'string' ? error : 'Signup failed')
    )
  }

  return {
    // state
    showPassword,
    errorMessage,
    accountType,
    activeStep,
    agencyValues,
    isLoading,
    // form
    form,
    // handlers
    togglePasswordVisibility,
    handleAccountTypeChange,
    onAccountSubmit,
    onAgencyInfoSubmit,
    onAgencyDocumentsSubmit,
    setActiveStep
  }
}
