'use client'

import { useTheme } from '@mui/material/styles'
import {
  Button,
  Container,
  Typography,
  Stack,
  Chip,
} from '@mui/material'
import FadeIn from '@/components/animation/FadeIn'
import Icon from '@/components/icon/Icon'
import Can from '@/components/ability/Can'
import {
  DAMAGE_STATUS_LABELS,
  DAMAGE_STATUS_COLOR_KEY,
  DAMAGE_SEVERITY_LABELS,
  DAMAGE_SEVERITY_COLOR_KEY,
} from '../constants/damageReport'
import { DAMAGE_REPORT_STATUS } from '../types/damageReport'
import {
  DamageReportsHeader,
  DamageReportsGrid,
  DamageReportCard,
  DamageCardActions,
  StyledChip,
} from '../styles/StyledComponents'
import DamageStatusChip from './DamageStatusChip'
import EscalateDamageDialog from './EscalateDamageDialog'
import ResolveDamageDialog from './ResolveDamageDialog'
import GenerateDamageInvoiceDialog from './GenerateDamageInvoiceDialog'
import { useTranslation } from 'react-i18next'
import { useDamageReportsPage } from '../hooks/useDamageReportsPage'

export default function DamageReportsPage() {
  const { t } = useTranslation()
  const theme = useTheme()

  const {
    reports,
    visibleReports,
    hotelName,
    hotelLogo,
    hotelPrimaryColor,
    hotelSecondaryColor,
    escalateTarget,
    resolveTarget,
    invoiceTarget,
    setEscalateTarget,
    setResolveTarget,
    setInvoiceTarget,
    escalateReport,
    markAsInsured,
    markAsInvoiced,
  } = useDamageReportsPage()

  return (
    <Container maxWidth="xl">
      <FadeIn>
        <Stack gap={3}>
          <DamageReportsHeader>
            <Stack gap={0.5}>
              <Typography variant="h5" fontWeight={700}>
                {t('damageReports.title', 'Damage Reports')}
              </Typography>
              <Typography variant="body2">
                {t('damageReports.subtitle', 'Track and resolve room damage after checkout')}
              </Typography>
            </Stack>

            <Stack direction="row" gap={1} flexWrap="wrap">
              {Object.values(DAMAGE_REPORT_STATUS).map(status => {
                const count = reports.filter(r => r.status === status).length
                if (!count) return null
                const colorKey = DAMAGE_STATUS_COLOR_KEY[status]
                const color = theme.palette[colorKey].main
                return (
                  <StyledChip
                    key={status}
                    label={`${DAMAGE_STATUS_LABELS[status]}: ${count}`}
                    size="small"
                    chipColor={color}
                  />
                )
              })}
            </Stack>
          </DamageReportsHeader>

          {visibleReports.length === 0 ? (
            <Stack alignItems="center" gap={1}>
              <Icon icon="tabler:circle-check" fontSize={48} />
              <Typography variant="body1" color="text.secondary">
                {t('damageReports.empty', 'No damage reports found.')}
              </Typography>
            </Stack>
          ) : (
            <DamageReportsGrid>
              {visibleReports.map(report => {
                const severityColorKey = DAMAGE_SEVERITY_COLOR_KEY[report.severity]
                const severityColor = theme.palette[severityColorKey].main

                return (
                  <DamageReportCard
                    key={report.id}
                  >
                    <Stack gap={1.5}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="subtitle1" fontWeight={700}>
                          {t('damageReports.room', 'Room')} {report.roomNumber}
                        </Typography>
                        <DamageStatusChip status={report.status} />
                      </Stack>

                      <Stack direction="row" alignItems="center" gap={1}>
                        <Icon icon="tabler:alert-triangle" fontSize={16} />
                        <StyledChip
                          label={DAMAGE_SEVERITY_LABELS[report.severity]}
                          size="small"
                          chipColor={severityColor}
                        />
                      </Stack>

                      <Typography variant="body2" color="text.secondary">
                        {report.description}
                      </Typography>

                      <Stack direction="row" gap={2}>
                        <Typography variant="caption" color="text.secondary">
                          <strong>{t('damageReports.reportedBy', 'By')}:</strong> {report.reportedBy}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          <strong>{t('damageReports.estimated', 'Est.')}:</strong>{' '}
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: report.currency,
                          }).format(report.estimatedCost)}
                        </Typography>
                      </Stack>

                      {report.hasInsurance !== undefined && (
                        <Stack direction="row">
                          <Chip
                            icon={<Icon icon={report.hasInsurance ? 'tabler:shield-check' : 'tabler:shield-off'} />}
                            label={report.hasInsurance
                              ? t('damageReports.insured', 'Insured')
                              : t('damageReports.notInsured', 'No Insurance')}
                            size="small"
                            color={report.hasInsurance ? 'success' : 'default'}
                            variant="outlined"
                          />
                        </Stack>
                      )}

                      <DamageCardActions>
                        <Can do="manage" this="DamageReports">
                          {(report.status === DAMAGE_REPORT_STATUS.REPORTED ||
                            report.status === DAMAGE_REPORT_STATUS.PENDING_REVIEW) && (
                            <Button
                              size="small"
                              variant="outlined"
                              color="warning"
                              startIcon={<Icon icon="tabler:arrow-up-right" />}
                              onClick={() => setEscalateTarget(report)}
                            >
                              {t('damageReports.escalate', 'Escalate')}
                            </Button>
                          )}
                        </Can>

                        <Can do="manage" this="DamageInvoices">
                          {report.status === DAMAGE_REPORT_STATUS.ESCALATED && (
                            <Button
                              size="small"
                              variant="contained"
                              color={report.hasInsurance ? 'success' : 'primary'}
                              startIcon={<Icon icon={report.hasInsurance ? 'tabler:shield-check' : 'tabler:file-invoice'} />}
                              onClick={() => setResolveTarget(report)}
                            >
                              {t('damageReports.resolve', 'Resolve')}
                            </Button>
                          )}
                        </Can>
                      </DamageCardActions>
                    </Stack>
                  </DamageReportCard>
                )
              })}
            </DamageReportsGrid>
          )}
        </Stack>
      </FadeIn>

      <EscalateDamageDialog
        open={!!escalateTarget}
        report={escalateTarget}
        onClose={() => setEscalateTarget(null)}
        onConfirm={escalateReport}
      />

      <ResolveDamageDialog
        open={!!resolveTarget}
        report={resolveTarget}
        onClose={() => setResolveTarget(null)}
        onMarkInsured={markAsInsured}
        onGenerateInvoice={report => setInvoiceTarget(report)}
      />

      <GenerateDamageInvoiceDialog
        open={!!invoiceTarget}
        report={invoiceTarget}
        hotelName={hotelName}
        hotelLogo={hotelLogo}
        hotelPrimaryColor={hotelPrimaryColor}
        hotelSecondaryColor={hotelSecondaryColor}
        onClose={() => setInvoiceTarget(null)}
        onInvoiced={markAsInvoiced}
      />
    </Container>
  )
}
