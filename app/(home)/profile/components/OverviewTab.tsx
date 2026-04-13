import { useEffect, useState } from 'react'
import {
  Grid,
  Typography,
  IconButton,
  Tooltip,
  Fade,
  Divider,
  Stack,
} from '@mui/material'
import {
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@mui/icons-material'
import { SpotlightCard } from '@/components/animation'
import { useTheme } from '@mui/material'
import { ProfileFields } from '../types/profile'
import { fieldsMeta, GENDER_OPTIONS } from '../constants/profileFields'
import { ProfileFieldEditor } from './ProfileFieldEditor'
import { ProfileFieldDisplay } from './ProfileFieldDisplay'
import { useUpdateUserProfile } from '../hooks/mutations/useUpdateUserProfile'
import { getProfileFields, buildUpdatePayload } from '../util/profileMappers'

interface OverviewTabProps {
  data: ProfileFields
}
export function OverviewTab({ data }: OverviewTabProps) {
  const theme = useTheme()
  const updateUserProfile = useUpdateUserProfile()

  const [isEditing, setIsEditing] = useState(false)

  const [fields, setFields] = useState<ProfileFields>(() => getProfileFields(data))

  const [draft, setDraft] = useState<ProfileFields>(fields)

  useEffect(() => {
    if (isEditing) return

    const nextFields = getProfileFields(data)
    setFields(nextFields)
    setDraft(nextFields)
  }, [data, isEditing])

  const handleEdit = () => {
    setDraft(fields)
    setIsEditing(true)
  }

  const handleSave = async () => {
    try {
      await updateUserProfile.mutateAsync(buildUpdatePayload(draft))
      setIsEditing(false)
    } catch {
      // Error toast is handled by useUpdateUserProfile.
    }
  }

  const handleCancel = () => {
    setDraft(fields)
    setIsEditing(false)
  }

  const handleChange = (key: keyof ProfileFields, value: string) => {
    setDraft((prev) => ({ ...prev, [key]: value }))
  }

  const displayValue = (key: keyof ProfileFields) => {
    const val = fields[key]

    if (!val) return '—'

    if (key === 'gender') {
      return GENDER_OPTIONS.find((option) => option.value === val)?.label ?? val
    }

    if (key === 'birthDate') {
      return new Date(val).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }

    return val
  }

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <SpotlightCard
          spotlightSize={240}
          style={{
            height: '100%',
            borderRadius: Number(theme.shape.borderRadius) * 2,
            border: `1px solid ${theme.palette.divider}`,
            background: theme.palette.background.paper,
          }}
        >
          <Stack spacing={3} sx={{ p: { xs: 2, sm: 3 } }}>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant='h6' fontWeight={700}>
                Personal Information
              </Typography>

              {!isEditing ? (
                <Fade in>
                  <Tooltip title='Edit' arrow>
                    <IconButton
                      size='small'
                      onClick={handleEdit}
                    >
                      <EditOutlined fontSize='small' />
                    </IconButton>
                  </Tooltip>
                </Fade>
              ) : (
                <Fade in>
                  <Stack direction='row' spacing={0.5}>
                    <Tooltip title='Save' arrow>
                      <IconButton
                        size='small'
                        onClick={handleSave}
                        disabled={updateUserProfile.isPending}
                        sx={{
                          color: theme.palette.success.main,
                          '&:hover': {
                            backgroundColor: theme.palette.action.hover,
                          },
                        }}
                      >
                        <CheckOutlined fontSize='small' />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title='Cancel' arrow>
                      <IconButton
                        size='small'
                        onClick={handleCancel}
                        disabled={updateUserProfile.isPending}
                        sx={{
                          color: theme.palette.error.main,
                          '&:hover': {
                            backgroundColor: theme.palette.action.hover,
                          },
                        }}
                      >
                        <CloseOutlined fontSize='small' />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Fade>
              )}
            </Stack>

            <Divider />

            <Grid container spacing={2.5}>
              {fieldsMeta.map(({ key, label, icon, variant, editable, options }) => {
                const canEdit = isEditing && editable

                return (
                  <Grid key={key} size={{ xs: 12, md: 6 }}>
                    {canEdit ? (
                      <ProfileFieldEditor
                        variant={variant}
                        fieldKey={key}
                        label={label}
                        value={draft[key]}
                        icon={icon}
                        options={options}
                        onChange={handleChange}
                      />
                    ) : (
                      <ProfileFieldDisplay
                        label={label}
                        value={displayValue(key)}
                        icon={icon}
                        editable={editable}
                        iconColor={
                          editable
                            ? theme.palette.primary.main
                            : theme.palette.text.disabled
                        }
                      />
                    )}
                  </Grid>
                )
              })}
            </Grid>
          </Stack>
        </SpotlightCard>
      </Grid>
    </Grid>
  )
}
