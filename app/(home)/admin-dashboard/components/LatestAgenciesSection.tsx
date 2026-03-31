"use client";
import {
  Stack, Box, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, useTheme,
} from "@mui/material";
import { SxProps, Theme } from '@mui/material'
import { LATEST_AGENCIES } from "../data/dashboardMock";
import { LatestAgency } from "../types/dashboardTypes";
import { TABLE_HEADERS } from "../constants/agencyTable";
import { AgencyRow } from "./AgencyRow";

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
