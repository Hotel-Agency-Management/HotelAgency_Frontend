import { useState, useCallback } from 'react'
import { generateId } from '../util/plans'
import { SubscriptionPlan, SnackbarState, PlanFormValues, PageStatus } from '../types/plans'
import { PAGE_STATUS } from '@/core/types/pageStatus'

interface UsePlansManagerProps {
  initialPlans: SubscriptionPlan[]
}

export function usePlansManager({ initialPlans }: UsePlansManagerProps) {
  const [plans, setPlans] = useState<SubscriptionPlan[]>(initialPlans)
  const [pageStatus, setPageStatus] = useState<PageStatus>(PAGE_STATUS.IDLE)

  const [editPlan, setEditPlan] = useState<SubscriptionPlan | null>(null)
  const [editOpen, setEditOpen] = useState(false)

  const [deletePlan, setDeletePlan] = useState<SubscriptionPlan | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

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
    await new Promise(r => setTimeout(r, 800))

    const newPlan: SubscriptionPlan = {
      ...values,
      id: generateId(),
      createdAt: NOW(),
      updatedAt: NOW(),
    }

    setPlans(prev => [...prev, newPlan])
    showSnackbar(`Plan "${newPlan.name}" created successfully.`, 'success')
  }, [showSnackbar])

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

    await new Promise(r => setTimeout(r, 800))

    setPlans(prev =>
      prev.map(p =>
        p.id === editPlan.id
          ? { ...p, ...values, updatedAt: NOW() }
          : p
      )
    )

    showSnackbar(`Plan "${values.name}" updated successfully.`, 'success')
    closeEdit()
  }, [editPlan, showSnackbar, closeEdit])

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

    setDeleteLoading(true)
    await new Promise(r => setTimeout(r, 700))

    setPlans(prev => prev.filter(p => p.id !== deletePlan.id))
    showSnackbar(`Plan "${deletePlan.name}" deleted.`, 'info')

    setDeleteLoading(false)
    closeDelete()
  }, [deletePlan, showSnackbar, closeDelete])

  const handleRetry = useCallback(() => {
    setPageStatus(PAGE_STATUS.LOADING)

    setTimeout(() => {
      setPlans(initialPlans)
      setPageStatus(PAGE_STATUS.IDLE)
    }, 1000)
  }, [initialPlans])

  return {
    plans,
    pageStatus,
    editPlan,
    editOpen,
    deletePlan,
    deleteOpen,
    deleteLoading,
    snackbar,
    setPageStatus,
    setDeleteOpen,
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
