type FieldHandler = (formData: FormData, key: string, value: unknown) => void

const fileHandler: FieldHandler = (formData, key, value) => {
  if (value instanceof File) {
    formData.append(key, value)
  }
}

const primitiveHandler: FieldHandler = (formData, key, value) => {
  if (value != null && !(value instanceof File)) {
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
