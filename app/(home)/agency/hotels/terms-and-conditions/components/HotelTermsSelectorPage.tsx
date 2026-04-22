"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Can from "@/components/ability/Can";
import { useAuth } from "@/core/context/AuthContext";
import { USER_ROLES } from "@/lib/abilities";
import { useGetHotels } from "../../hooks/queries/useHotelQueries";
import { getHotelTermsRoute } from "../utils/routes";

export function HotelTermsSelectorPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { data: hotels = [], isLoading, error } = useGetHotels(user?.agencyId);
  const [selectedHotelId, setSelectedHotelId] = useState("");
  const assignedHotelId =
    typeof user?.hotelId === "string" && user.hotelId.length > 0
      ? user.hotelId
      : null;
  const shouldRedirectToAssignedHotel =
    user?.role === USER_ROLES.PROPERTY_MANAGER &&
    assignedHotelId != null;

  useEffect(() => {
    if (shouldRedirectToAssignedHotel && assignedHotelId) {
      router.replace(getHotelTermsRoute(assignedHotelId));
    }
  }, [assignedHotelId, router, shouldRedirectToAssignedHotel]);

  const selectionDisabled = useMemo(
    () => isLoading || hotels.length === 0,
    [hotels.length, isLoading]
  );

  if (shouldRedirectToAssignedHotel) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Alert severity="info">Redirecting to your assigned hotel.</Alert>
      </Container>
    );
  }

  return (
    <>
      <Can do="manage" this="HotelTerms">
        <Container maxWidth="sm" >
          <Paper variant="card">
            <Stack spacing={3}>
              <Stack spacing={1}>
                <Typography variant="h5">Terms & Conditions</Typography>
                <Typography variant="body2" color="text.secondary">
                  Select a hotel before opening its Terms & Conditions settings.
                </Typography>
              </Stack>

              {error ? (
                <Alert severity="error">Failed to load hotels for this agency.</Alert>
              ) : null}

              {!error && !isLoading && hotels.length === 0 ? (
                <Alert severity="info">
                  No hotels are available yet. Add a hotel first to manage its Terms
                  & Conditions.
                </Alert>
              ) : null}

              <TextField
                select
                label="Hotel"
                value={selectedHotelId}
                onChange={event => setSelectedHotelId(event.target.value)}
                disabled={selectionDisabled}
                helperText="Agency owners can manage Terms & Conditions for any hotel under the agency."
              >
                <MenuItem value="" disabled>
                  Select a hotel
                </MenuItem>
                {hotels.map(hotel => (
                  <MenuItem key={hotel.id} value={hotel.id}>
                    {hotel.basicInfo.name}
                  </MenuItem>
                ))}
              </TextField>

              <Stack direction="row" justifyContent="flex-end">
                <Button
                  variant="contained"
                  size="small"
                  disabled={!selectedHotelId || selectionDisabled}
                  onClick={() => router.push(getHotelTermsRoute(selectedHotelId))}
                  startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : null}
                >
                  Open settings
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Container>
      </Can>

      <Can do="manage" this="HotelTerms" not>
        <Container maxWidth="sm" >
          <Alert severity="error">
            You do not have permission to manage hotel Terms & Conditions.
          </Alert>
        </Container>
      </Can>
    </>
  );
}
