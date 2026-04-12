export function useChangePassword() {
  const mutateAsync = async (data: {
    current_password: string
    new_password: string
  }) => {
    await new Promise((res) => setTimeout(res, 1000))

    return { success: true }
  }

  return {
    mutateAsync,
    isPending: false
  }
}
