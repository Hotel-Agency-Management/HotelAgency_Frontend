import { getErrorMessage } from '@/core/utils/apiError'
import { useMemo, useState, useCallback } from 'react'
import {
  useCreateSubscriptionPlan,
  useDeleteSubscriptionPlan,
  useUpdateSubscriptionPlan,
} from './mutations/usePlanMutations'
import { useGetSubscriptionPlans } from './queries/usePlanQueries'
import { PageStatus, SubscriptionPlan, SnackbarState, PlanFormValues } from '../types/plans'

export function usePlansManager() {
  const plansQuery = useGetSubscriptionPlans({ includeInactive: true })
  const createPlanMutation = useCreateSubscriptionPlan()
  const updatePlanMutation = useUpdateSubscriptionPlan()
  const deletePlanMutation = useDeleteSubscriptionPlan()

  const plans = useMemo(() => plansQuery.data ?? [], [plansQuery.data])
  const pageStatus: PageStatus = plansQuery.isLoading
    ? 'loading'
    : plansQuery.isError
      ? 'error'
      : 'idle'

  const [editPlan, setEditPlan] = useState<SubscriptionPlan | null>(null)
  const [editOpen, setEditOpen] = useState(false)

  const [deletePlan, setDeletePlan] = useState<SubscriptionPlan | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'info',
  })

  const closeSnackbar = useCallback(() => {
    setSnackbar(prev => ({ ...prev, open: false }))
  }, [])

  const showSnackbar = useCallback(
    (message: string, severity: SnackbarState['severity']) => {
      setSnackbar({ open: true, message, severity })
    },
    []
  )

  const handleCreate = useCallback(async (values: PlanFormValues) => {
    try {
      const newPlan = await createPlanMutation.mutateAsync(values)
      showSnackbar(`Plan "${newPlan.name}" created successfully.`, 'success')
    } catch (error) {
      showSnackbar(getErrorMessage(error), 'error')
      throw error
    }
  }, [createPlanMutation, showSnackbar])

  const openEdit = useCallback((plan: SubscriptionPlan) => {
    setEditPlan(plan)
    setEditOpen(true)
  }, [])

  const closeEdit = useCallback(() => {
    setEditOpen(false)
    setEditPlan(null)
  }, [])

  const handleEdit = useCallback(async (values: PlanFormValues) => {
    if (!editPlan) return

    try {
      const updatedPlan = await updatePlanMutation.mutateAsync({
        id: editPlan.id,
        data: values,
      })

      showSnackbar(`Plan "${updatedPlan.name}" updated successfully.`, 'success')
      closeEdit()
    } catch (error) {
      showSnackbar(getErrorMessage(error), 'error')
    }
  }, [editPlan, updatePlanMutation, showSnackbar, closeEdit])

  const openDelete = useCallback((plan: SubscriptionPlan) => {
    setDeletePlan(plan)
    setDeleteOpen(true)
  }, [])

  const closeDelete = useCallback(() => {
    setDeleteOpen(false)
    setDeletePlan(null)
  }, [])

  const handleDelete = useCallback(async () => {
    if (!deletePlan) return

    try {
      await deletePlanMutation.mutateAsync(deletePlan.id)
      showSnackbar(`Plan "${deletePlan.name}" deleted.`, 'info')
      closeDelete()
    } catch (error) {
      showSnackbar(getErrorMessage(error), 'error')
    }
  }, [deletePlan, deletePlanMutation, showSnackbar, closeDelete])

  const handleRetry = useCallback(() => {
    void plansQuery.refetch()
  }, [plansQuery])

  return {
    plans,
    pageStatus,
    editPlan,
    editOpen,
    deletePlan,
    deleteOpen,
    deleteLoading: deletePlanMutation.isPending,
    snackbar,
    handleCreate,
    openEdit,
    closeEdit,
    handleEdit,
    openDelete,
    closeDelete,
    handleDelete,
    handleRetry,
    closeSnackbar,
  }
}
