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

export const useSignupForm = ({ initialStep = 0 } = {}) => {
  const { t } = useTranslation()
  const { signup, isLoading } = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [accountType, setAccountType] = useState<SignupAccountType>('customer')
  const [activeStep, setActiveStep] = useState(initialStep)
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
    if (!accountValues) return
    setAgencyValues(data)

    const { firstName, lastName } = accountValues

    // Log the payload for debugging
    console.log('Agency Signup Payload:', {
    name: `${firstName} ${lastName}`,
    email: accountValues.email,
    password: accountValues.password,
    phone: accountValues.phone,
    role: 'agencyOwner',
    type: 'BUSINESS',
    agencyName: data.agencyName,
    agencyPhone: data.phone,
    agencyCity: data.city,
  })


    const success = await signup(
      {
        name: `${firstName} ${lastName}`,
        email: accountValues.email,
        password: accountValues.password,
        phone: accountValues.phone,
        role: 'agencyOwner',
        type: 'BUSINESS',
        agencyName: data.agencyName,
        agencyPhone: data.phone,
        agencyCity: data.city,
      },
      error => setErrorMessage(typeof error === 'string' ? error : 'Signup failed'),
      false
    )

    if (success) setActiveStep(2)
  }

  const onAgencyDocumentsSubmit = async (data: AgencyDocumentsFormData) => {
    const formData = new FormData()

    data.documents.forEach((doc, index) => {
      formData.append(`documents[${index}][title]`, doc.title)
      if (doc.file) {
        formData.append(`documents[${index}][file]`, doc.file)
      }
    })
  }

  return {
    showPassword,
    errorMessage,
    accountType,
    activeStep,
    agencyValues,
    isLoading,
    form,
    togglePasswordVisibility,
    handleAccountTypeChange,
    onAccountSubmit,
    onAgencyInfoSubmit,
    onAgencyDocumentsSubmit,
    setActiveStep
  }
}
