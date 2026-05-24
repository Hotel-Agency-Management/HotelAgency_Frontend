import { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useTranslation } from 'react-i18next'

interface Props {
  agencyId: number
  onSettingsClick: (id: number) => void
}

export default function AgencyActionsCell({ agencyId, onSettingsClick }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { t } = useTranslation()

  return (
    <>
      <IconButton
        size='small'
        onClick={(e) => { e.stopPropagation(); setAnchorEl(e.currentTarget) }}
      >
        <MoreVertIcon fontSize='small' />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => { onSettingsClick(agencyId); setAnchorEl(null) }}>
          {t('agencies.actions.settings', 'Agency Settings')}
        </MenuItem>
      </Menu>
    </>
  )
}
