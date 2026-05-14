type FieldHandler = (
  formData: FormData,
  key: string,
  value: unknown
) => void

const toPascalCase = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1)

const dataUrlToFile = (dataUrl: string, fieldName: string): File | null => {
  try {
    const [header, base64] = dataUrl.split(',')
    const mimeMatch = header.match(/data:([^;]+)/)
    const mime = mimeMatch?.[1] ?? 'application/octet-stream'
    const ext = mime.split('/')[1] ?? 'bin'

    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)

    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }

    return new File([bytes], `${fieldName}.${ext}`, { type: mime })
  } catch {
    return null
  }
}

const arrayHandler: FieldHandler = (formData, key, value) => {
  if (!Array.isArray(value)) return

  const formattedKey = toPascalCase(key)

  value.forEach((item, index) => {
    formData.append(`${formattedKey}[${index}]`, String(item))
  })
}

const fileHandler: FieldHandler = (formData, key, value) => {
  const formattedKey = toPascalCase(key)

  if (value instanceof File) {
    formData.append(formattedKey, value)
    return
  }

  if (typeof value === 'string' && value.startsWith('data:')) {
    const file = dataUrlToFile(value, formattedKey)

    if (file) {
      formData.append(formattedKey, file)
    }
  }
}

const primitiveHandler: FieldHandler = (formData, key, value) => {
  const isDataUrl = typeof value === 'string' && value.startsWith('data:')

  if (
    value != null &&
    !(value instanceof File) &&
    !Array.isArray(value) &&
    typeof value !== 'object' &&
    !isDataUrl
  ) {
    formData.append(toPascalCase(key), String(value))
  }
}

export const defaultHandlers: FieldHandler[] = [
  arrayHandler,
  fileHandler,
  primitiveHandler,
]

export const buildFormData = (
  data: object,
  handlers: FieldHandler[] = defaultHandlers
): FormData => {
  const formData = new FormData()

  Object.entries(data).forEach(([key, value]) => {
    handlers.forEach(handler => handler(formData, key, value))
  })

  return formData
}
