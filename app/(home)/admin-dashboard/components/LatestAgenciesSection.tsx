"use client";
import {
  Stack, Box, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, useTheme,
} from "@mui/material";
import { fromNow } from "@/core/utils/dateUtils";
import { SxProps, Theme } from '@mui/material'
import { LATEST_AGENCIES } from "../data/dashboardMock";
import { AgencyStatus, LatestAgency } from "../types/dashboardTypes";

const STATUS_COLOR: Record<AgencyStatus, "success" | "warning" | "error"> = {
  Active: "success",
  Pending: "warning",
  Rejected: "error",
};

const TABLE_HEADERS = ["Agency", "Status", "Plan", "Registered"];

function AgencyRow({ agency }: { agency: LatestAgency }) {
  return (
    <TableRow hover>
      <TableCell>
        <Stack>
          <Typography variant="body2" fontWeight={500} color="text.primary">
            {agency.name}
          </Typography>
          {agency.country && (
            <Typography variant="caption" color="text.disabled">
              {agency.country}
            </Typography>
          )}
        </Stack>
      </TableCell>
      <TableCell>
        <Chip
          label={agency.status}
          color={STATUS_COLOR[agency.status]}
          size="small"
          variant="outlined"
          sx={{ fontWeight: 600, fontSize: 11 }}
        />
      </TableCell>
      <TableCell>
        <Chip label={agency.plan} size="small" sx={{ fontWeight: 600, fontSize: 11 }} />
      </TableCell>
      <TableCell>
        <Typography variant="caption" color="text.secondary">
          {fromNow(agency.createdAt)}
        </Typography>
      </TableCell>
    </TableRow>
  );
}

interface LatestAgenciesSectionProps {
  agencies?: LatestAgency[];
  sx?: SxProps<Theme>
}

export function LatestAgenciesSection({ agencies = LATEST_AGENCIES }: LatestAgenciesSectionProps) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Stack sx={{ px: 2.5, py: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="subtitle2" fontWeight={600} color="text.primary">
          Latest Agencies
        </Typography>
        <Typography variant="caption" color="text.disabled">
          Most recently registered agencies
        </Typography>
      </Stack>

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {TABLE_HEADERS.map(header => (
                <TableCell key={header}>
                  <Typography
                    variant="caption"
                    color="text.disabled"
                    fontWeight={600}
                    textTransform="uppercase"
                    letterSpacing={0.5}
                  >
                    {header}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ "& tr:last-of-type td": { border: 0 } }}>
            {agencies.map(agency => (
              <AgencyRow key={agency.id} agency={agency} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
