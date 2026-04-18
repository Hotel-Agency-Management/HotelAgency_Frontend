import { useEffect, useState } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import { authConfig } from '@/core/configs/clientConfig'
import { getErrorMessage } from '@/core/utils/apiError'
import { USER_ROLES } from '@/lib/abilities'
import {
  isAgencyAlreadyExistsError,
  isEmailAlreadyRegisteredError
} from '@/components/auth/utils/authError'
import { buildSignupSchema } from '@/core/schemas/signupSchema'
import type {
  AgencySignupResponse
} from '@/components/auth/configs/authConfig'
import type { AgencyDocumentsFormData } from '@/components/auth/agency/types/documents'
import { useUploadAgencyDocumentMutation } from '@/components/auth/agency/hooks/mutations/useAgencyDocumentsMutations'
import {
  useSignUpAgencyOwnerMutation,
  useSignUpCustomerMutation
} from '../../hooks/mutations/authMutations'
import { SIGNUP_UI_ACCOUNT_TYPE, SignupUiAccountType, SignupFormData } from '../types/signup'
import { AgencyFormData } from '../../agency/types/agency'
import {
  createAgencyOwnerSignupPayload,
  createCustomerSignupPayload
} from '../utils/signupPayload'
import { getAgencyIdFromToken, getNumericAgencyId } from '../utils/agencyToken'

const defaultAgencyValues: AgencyFormData = {
  agencyName: '',
  phone: '',
  city: ''
}

export const useSignupForm = ({ initialStep = 0 } = {}) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { mutateAsync: signUpCustomerMutation, isPending: isCustomerSignupLoading } = useSignUpCustomerMutation()
  const { mutateAsync: signUpAgencyOwnerMutation, isPending: isAgencyOwnerSignupLoading } =
    useSignUpAgencyOwnerMutation()

  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [accountType, setAccountType] = useState<SignupUiAccountType>(
    initialStep > 0 ? SIGNUP_UI_ACCOUNT_TYPE.AGENCY_OWNER : SIGNUP_UI_ACCOUNT_TYPE.CUSTOMER
  )
  const [activeStep, setActiveStep] = useState(initialStep)
  const [agencyValues, setAgencyValues] = useState<AgencyFormData>(defaultAgencyValues)
  const [agencySignupResponse, setAgencySignupResponse] = useState<AgencySignupResponse | null>(null)
  const [loginAccessToken, setLoginAccessToken] = useState<string | undefined>(() => {
    if (typeof window === 'undefined') return undefined

    return localStorage.getItem(authConfig.storageTokenKeyName) ?? undefined
  })
  const agencyAccessToken = agencySignupResponse?.accessToken ?? agencySignupResponse?.token ?? loginAccessToken
  const agencyId = getNumericAgencyId(agencySignupResponse?.agencyId) ?? getAgencyIdFromToken(agencyAccessToken)
  const { mutateAsync: uploadAgencyDocument, isPending: isAgencyDocumentUploadLoading } =
    useUploadAgencyDocumentMutation(agencyId, agencyAccessToken)

  const schema = buildSignupSchema(t)

  const form = useForm<SignupFormData, unknown, SignupFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      role: USER_ROLES.CUSTOMER,
    },
    resolver: yupResolver(schema) as Resolver<SignupFormData>
  })

  useEffect(() => {
    setActiveStep(initialStep)
    if (initialStep > 0) {
      setAccountType(SIGNUP_UI_ACCOUNT_TYPE.AGENCY_OWNER)
    }
  }, [initialStep])

  useEffect(() => {
    if (typeof window === 'undefined') return

    setLoginAccessToken(localStorage.getItem(authConfig.storageTokenKeyName) ?? undefined)
  }, [initialStep])

  const togglePasswordVisibility = () => setShowPassword(prev => !prev)

  const handleAccountTypeChange = (
    _event: React.MouseEvent<HTMLElement>,
    nextValue: SignupUiAccountType | null
  ) => {
    if (!nextValue || nextValue === accountType) return
    setAccountType(nextValue)
    setActiveStep(0)
  }

  const onAccountSubmit = async (data: SignupFormData) => {
    setErrorMessage('')
    form.clearErrors('email')

    if (accountType === SIGNUP_UI_ACCOUNT_TYPE.AGENCY_OWNER) {
      setActiveStep(1)
      return
    }

    const payload = createCustomerSignupPayload(data)

    try {
      const response = await signUpCustomerMutation(payload)
      toast.success(response.message || 'Account created successfully. Please verify your email.')
      router.push(authConfig.loginPageURL)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Customer signup error response:', error.response?.data)
      }
      setErrorMessage(getErrorMessage(error, 'Signup failed'))
    }
  }

  const onAgencyInfoSubmit = async (data: AgencyFormData) => {
    setErrorMessage('')
    form.clearErrors('email')
    setAgencyValues(data)

    const accountValues = form.getValues()
    const payload = createAgencyOwnerSignupPayload(accountValues, data)

    try {
      const response = await signUpAgencyOwnerMutation(payload)
      toast.success('Agency account created successfully.')
      setAgencySignupResponse(response)
      setActiveStep(2)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Agency owner signup error response:', error.response?.data)
      }

      const message = getErrorMessage(error, 'Signup failed')

      if (isEmailAlreadyRegisteredError(error)) {
        setActiveStep(0)
        form.setError('email', {
          type: 'server',
          message
        })
        return
      }

      if (isAgencyAlreadyExistsError(error)) {
        setErrorMessage(message)
        return
      }

      setErrorMessage(message)
    }
  }

  const onAgencyDocumentsSubmit = async (data: AgencyDocumentsFormData) => {
    if (!agencyId) {
      throw new Error('Agency id is missing. Please complete agency registration again.')
    }

    const documents = data.documents.filter(
      (doc): doc is { title: string; file: File } =>
        (doc.title ?? '').trim().length > 0 && doc.file !== null
    )

    await Promise.all(
      documents.map(doc =>
        uploadAgencyDocument({
          file: doc.file,
          documentType: doc.title
        })
      )
    )

    toast.success('Agency documents uploaded successfully. Please verify your email.')
    router.push(authConfig.loginPageURL)
  }
  return {
    showPassword,
    errorMessage,
    accountType,
    activeStep,
    agencyValues,
    isLoading: isCustomerSignupLoading || isAgencyOwnerSignupLoading || isAgencyDocumentUploadLoading,
    form,
    togglePasswordVisibility,
    handleAccountTypeChange,
    onAccountSubmit,
    onAgencyInfoSubmit,
    onAgencyDocumentsSubmit,
    setActiveStep
  }
}
