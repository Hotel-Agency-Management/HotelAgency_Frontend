import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '@/core/context/AuthContext'
import { getErrorMessage } from '@/core/utils/apiError'
import { useLoginMutation, useResendVerificationEmailMutation } from '../../hooks/mutations/authMutations'
import { isUnconfirmedEmailError } from '../../utils/authError'
import { getAuthDisplayName } from '../../utils/authUser'

type LoginCredentials = {
  email: string
  password: string
}

export const useLoginForm = () => {
  const { setAuthData, setLoading, isLoading } = useAuth()
  const { mutateAsync: loginMutation } = useLoginMutation()
  const { mutateAsync: resendVerificationEmailMutation, isPending: isResendPending } =
    useResendVerificationEmailMutation()

  const [errorMessage, setErrorMessage] = useState('')
  const [verificationDialogOpen, setVerificationDialogOpen] = useState(false)
  const [verificationEmail, setVerificationEmail] = useState('')
  const [verificationDialogError, setVerificationDialogError] = useState('')
  const [verificationDialogSuccess, setVerificationDialogSuccess] = useState('')

  useEffect(() => {
    if (!verificationDialogOpen || !verificationDialogSuccess) return

    const timeoutId = window.setTimeout(() => {
      handleCloseVerificationDialog()
    }, 1400)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [verificationDialogOpen, verificationDialogSuccess])

  const login = async (data: LoginCredentials) => {
    setErrorMessage('')
    setVerificationDialogError('')
    setVerificationDialogSuccess('')
    setLoading(true)

    try {
      const response = await loginMutation(data)
      setAuthData(response)
      toast.success(`Welcome back, ${getAuthDisplayName(response)}.`)
    } catch (error) {
      const message = getErrorMessage(error, 'Login failed. Please try again.')

      if (isUnconfirmedEmailError(error)) {
        setVerificationEmail(data.email)
        setVerificationDialogOpen(true)
        return
      }

      setErrorMessage(message)
    } finally {
      setLoading(false)
    }
  }

  const handleCloseVerificationDialog = () => {
    if (isResendPending) return

    setVerificationDialogOpen(false)
    setVerificationDialogError('')
    setVerificationDialogSuccess('')
  }

  const handleResendVerificationEmail = async () => {
    setVerificationDialogError('')
    setVerificationDialogSuccess('')

    try {
      const response = await resendVerificationEmailMutation({ email: verificationEmail })
      setVerificationDialogSuccess(
        response.message || 'A new verification email has been sent successfully.'
      )
      toast.success(response.message || 'Verification email sent successfully.')
    } catch (error) {
      setVerificationDialogError(
        getErrorMessage(error, 'We could not resend the verification email. Please try again.')
      )
    }
  }

  return {
    isLoading,
    isResendPending,
    errorMessage,
    verificationDialogOpen,
    verificationEmail,
    verificationDialogError,
    verificationDialogSuccess,
    login,
    handleCloseVerificationDialog,
    handleResendVerificationEmail
  }
}
