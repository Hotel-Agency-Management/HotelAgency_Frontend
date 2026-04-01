export function useChangePassword() {
  const mutateAsync = async (data: {
    current_password: string
    new_password: string
  }) => {
    console.log('Mock change password:', data)

    await new Promise((res) => setTimeout(res, 1000))

    return { success: true }
  }

  return {
    mutateAsync,
    isPending: false
  }
}
