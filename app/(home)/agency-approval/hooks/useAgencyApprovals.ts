'use client'

import { useState, useMemo, useCallback } from 'react'
import { MOCK_REQUESTS } from '@/app/(home)/agency-approval/data/AgencyRequest'
import { AgencyRequest, FilterState } from '../components'
import { filterAndSort } from '../util/agencyRequests'
import { CLOSED_CONFIRM, CLOSED_SNACKBAR } from '@/core/constant/pageStatus'
import { PageStatus, SnackbarState } from '@/core/types/pageStatus'
import { DEFAULT_FILTERS } from '../constants/filter'
import { ConfirmDialogState, ActionType } from '../types/agency'
import { AGENCY_STATUS } from '@/components/auth/types/authType'

export function useAgencyApprovals() {
  const [requests, setRequests] = useState<AgencyRequest[]>(MOCK_REQUESTS)
  const [pageStatus, setPageStatus] = useState<PageStatus>('idle')
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState>(CLOSED_CONFIRM)
  const [actionLoading, setActionLoading] = useState(false)
  const [snackbar, setSnackbar] = useState<SnackbarState>(CLOSED_SNACKBAR)
  const [detailRequest, setDetailRequest] = useState<AgencyRequest | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const filtered = useMemo(() => filterAndSort(requests, filters), [requests, filters])
  const pendingCount = useMemo(() => requests.filter(r => r.status === AGENCY_STATUS.PENDING).length, [requests])
  const hasFilters = filters.search !== '' || filters.status !== 'all'

  const handleFilterChange = useCallback((partial: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...partial }))
  }, [])

  const handleClearFilters = useCallback(() => setFilters(DEFAULT_FILTERS), [])

  const handleViewDetails = useCallback((request: AgencyRequest) => {
    setDetailRequest(request)
    setDrawerOpen(true)
  }, [])

  const handleAction = useCallback((request: AgencyRequest, action: ActionType) => {
    setConfirmDialog({ open: true, action, request })
  }, [])

  const handleConfirm = useCallback(async (action: ActionType) => {
    if (!confirmDialog.request) return
    const { request } = confirmDialog

    setActionLoading(true)

    await new Promise(resolve => setTimeout(resolve, 1200))

    const newStatus = action === 'approve' ? AGENCY_STATUS.APPROVED : AGENCY_STATUS.REJECTED
    setRequests(prev =>
      prev.map(r => r.id === request.id ? { ...r, status: newStatus } : r),
    )

    setSnackbar({
      open: true,
      message: action === 'approve'
        ? `✓ ${request.agencyName} has been approved successfully.`
        : `${request.agencyName} has been rejected.`,
      severity: action === 'approve' ? 'success' : 'error',
    })

    setActionLoading(false)
    setConfirmDialog(CLOSED_CONFIRM)
  }, [confirmDialog])

  const handleRetry = useCallback(() => {
    setPageStatus('loading')
    setTimeout(() => {
      setRequests(MOCK_REQUESTS)
      setPageStatus('idle')
    }, 1000)
  }, [])

  const closeSnackbar = useCallback(() => setSnackbar(CLOSED_SNACKBAR), [])
  const closeConfirmDialog = useCallback(() => {
    if (!actionLoading) setConfirmDialog(CLOSED_CONFIRM)
  }, [actionLoading])
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  return {
    requests,
    pageStatus,
    filters,
    confirmDialog,
    actionLoading,
    snackbar,
    detailRequest,
    drawerOpen,
    filtered,
    pendingCount,
    hasFilters,
    setSnackbar,
    setConfirmDialog,
    setDrawerOpen,
    handleFilterChange,
    handleClearFilters,
    handleViewDetails,
    handleAction,
    handleConfirm,
    handleRetry,
    closeSnackbar,
    closeConfirmDialog,
    closeDrawer,
  }
}
