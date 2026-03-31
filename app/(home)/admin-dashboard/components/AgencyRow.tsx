import { fromNow } from "@/core/utils/Dateutils";
import { TableRow, TableCell, Stack, Typography, Chip } from "@mui/material";
import { STATUS_COLOR } from "../constants/agencyTable";
import { LatestAgency } from "../types/dashboardTypes";

export function AgencyRow({ agency }: { agency: LatestAgency }) {
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
