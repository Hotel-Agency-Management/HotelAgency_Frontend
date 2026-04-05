import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Icon from "@/components/icon/Icon";
import IconButton from "@/components/ui/IconButton";

interface AmenityItem {
  key: string;
  label: string;
  icon: string;
}

interface RoomAmenitiesGridProps {
  items: AmenityItem[];
}

export function RoomAmenitiesGrid({ items }: RoomAmenitiesGridProps) {
  return (
    <Grid container spacing={2}>
      {items.map((a) => (
        <Grid key={a.key} size={{ xs: 6, sm: 4, md: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton variant="amenity" disableRipple>
              <Icon icon={a.icon} fontSize="small" />
            </IconButton>
            <Typography variant="body2" color="text.primary">
              {a.label}
            </Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}
