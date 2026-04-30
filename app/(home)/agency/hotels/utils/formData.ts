type FieldHandler = (formData: FormData, key: string, value: unknown) => void

const dataUrlToFile = (dataUrl: string, fieldName: string): File | null => {
  try {
    const [header, base64] = dataUrl.split(',')
    const mimeMatch = header.match(/data:([^;]+)/)
    const mime = mimeMatch?.[1] ?? 'application/octet-stream'
    const ext = mime.split('/')[1] ?? 'bin'
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
    return new File([bytes], `${fieldName}.${ext}`, { type: mime })
  } catch {
    return null
  }
}

const fileHandler: FieldHandler = (formData, key, value) => {
  if (value instanceof File) {
    formData.append(key, value)
  } else if (typeof value === 'string' && value.startsWith('data:')) {
    const file = dataUrlToFile(value, key)
    if (file) formData.append(key, file)
  }
}

const primitiveHandler: FieldHandler = (formData, key, value) => {
  const isDataUrl = typeof value === 'string' && value.startsWith('data:')
  if (value != null && !(value instanceof File) && !isDataUrl) {
    formData.append(key, String(value))
  }
}

export const defaultHandlers: FieldHandler[] = [fileHandler, primitiveHandler]

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
