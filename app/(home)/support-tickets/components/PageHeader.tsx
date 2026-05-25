import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

export function PageHeader() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        pb: 3,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
      >
        <Stack spacing={0.5}>
            <Typography
              variant="h5"
              fontWeight={700}
              letterSpacing={-0.5}
              color="text.primary"
            >
              {t('supportTickets.title', { defaultValue: 'Support & Ticket Visibility' })}
            </Typography>
          <Typography
            variant="body2"
            sx={{
              maxWidth: 540,
            }}
          >
            {t('supportTickets.subtitle', { defaultValue: 'Monitor and manage all tenant support requests in one place — with real-time SLA tracking, escalation visibility, and agent assignment control.' })}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
