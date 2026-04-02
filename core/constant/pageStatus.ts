import { ConfirmDialogState } from "@/app/(home)/agency-approval/types/agency"
import { SnackbarState } from "../types/pageStatus"

export const CLOSED_CONFIRM: ConfirmDialogState = { open: false, action: null, request: null }
export const CLOSED_SNACKBAR: SnackbarState     = { open: false, message: '', severity: 'info' }
