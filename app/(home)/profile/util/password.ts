import { TFunction } from 'i18next'

export const getPasswordStrength = (password: string, t: TFunction) => {
  let strength = 0

  if (password.length >= 6) strength++
  if (password.length >= 10) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++

  const strengthLabel = [
    t('changePassword.strength.veryWeak'),
    t('changePassword.strength.weak'),
    t('changePassword.strength.okay'),
    t('changePassword.strength.good'),
    t('changePassword.strength.strong'),
    t('changePassword.strength.veryStrong'),
  ][strength]

  const strengthColor = ['#d32f2f', '#f57c00', '#fbc02d', '#7cb342', '#388e3c', '#2e7d32'][strength]

  return { strength, strengthLabel, strengthColor }
}
