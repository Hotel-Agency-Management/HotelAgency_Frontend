'use client'

import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { useTranslation } from 'react-i18next'
import type { Hotel } from '@/app/(home)/agency/hotels/types/hotel'
import type { AgencyTeamMember, UpdateTeamMemberRequest } from '../config/teamMemberConfig'

interface EditTeamMemberDialogProps {
  open: boolean
  member: AgencyTeamMember | null
  hotels: Hotel[]
  isLoading: boolean
  onClose: () => void
  onSave: (memberId: string, data: UpdateTeamMemberRequest) => Promise<void>
}

export function EditTeamMemberDialog({
  open,
  member,
  hotels,
  isLoading,
  onClose,
  onSave,
}: EditTeamMemberDialogProps) {
  const { t } = useTranslation()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [hotelId, setHotelId] = useState<number | ''>('')

  useEffect(() => {
    setFirstName(member?.firstName ?? '')
    setLastName(member?.lastName ?? '')
    setHotelId(member?.hotelId ?? '')
  }, [member])

  const hasChanges =
    member !== null &&
    (firstName !== member.firstName ||
      lastName !== member.lastName ||
      (hotelId === '' ? null : Number(hotelId)) !== (member.hotelId ?? null))

  const handleSave = async () => {
    if (!member) return
    await onSave(member.id, {
      firstName,
      lastName,
      hotelId: hotelId === '' ? null : Number(hotelId),
    })
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
      <DialogTitle>{t('users.editMember', { defaultValue: 'Edit team member' })}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            fullWidth
            size='small'
            label={t('users.firstName', { defaultValue: 'First name' })}
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <TextField
            fullWidth
            size='small'
            label={t('users.lastName', { defaultValue: 'Last name' })}
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <TextField
            select
            fullWidth
            size='small'
            label={t('users.assignedHotel', { defaultValue: 'Assigned hotel' })}
            value={hotelId}
            onChange={e => setHotelId(e.target.value === '' ? '' : Number(e.target.value))}
          >
            <MenuItem value=''>
              {t('users.noHotel', { defaultValue: 'None' })}
            </MenuItem>
            {hotels.map(hotel => (
              <MenuItem key={hotel.id} value={Number(hotel.id)}>
                {hotel.basicInfo.name}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color='inherit' onClick={onClose} disabled={isLoading}>
          {t('common.cancel', { defaultValue: 'Cancel' })}
        </Button>
        <Button
          variant='contained'
          disableElevation
          onClick={() => void handleSave()}
          disabled={isLoading || !hasChanges || !firstName.trim() || !lastName.trim()}
        >
          {t('users.save', { defaultValue: 'Save' })}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
