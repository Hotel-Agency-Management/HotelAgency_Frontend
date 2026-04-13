export const joinName = (...parts: Array<string | null | undefined>) =>
  parts
    .map(part => part?.trim())
    .filter((part): part is string => Boolean(part))
    .join(' ')


export const splitFullName = (name: string) => {
  const [firstName = '', ...rest] = name.trim().split(/\s+/).filter(Boolean)

  return {
    firstName,
    lastName: rest.join(' '),
  }
}
