import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Pagination from "@mui/material/Pagination";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { getRoomAmenityIcon } from "../../constants/roomAmenityIcons";
import type { RoomAmenity } from "../../types/roomAmenity";
import MenuItem from "@/components/ui/Menu";
import { useRoomAmenitiesCards } from "../../hooks/useRoomAmenitiesCards";

interface Props {
  amenities: RoomAmenity[];
  isLoading: boolean;
  onEdit: (amenity: RoomAmenity) => void;
  onDelete: (amenity: RoomAmenity) => void;
}

export function RoomAmenitiesCards({ amenities, isLoading, onEdit, onDelete }: Props) {
  const {
    page,
    setPage,
    pageCount,
    menuState,
    paginatedAmenities,
    isMenuOpen,
    handleOpenMenu,
    handleCloseMenu,
    handleEditAmenity,
    handleDeleteAmenity,
    PAGE_SIZE,
    TITLE_TOOLTIP_LIMIT,
  } = useRoomAmenitiesCards({ amenities, onEdit, onDelete });

  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {Array.from({ length: PAGE_SIZE }).map((_, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
            <Skeleton variant="rounded" height={116} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (amenities.length === 0) {
    return <Typography color="text.secondary">No room amenities match your filters.</Typography>;
  }

  return (
    <Stack spacing={3}>
      <Grid container spacing={2}>
        {paginatedAmenities.map((amenity) => {
          const Icon = getRoomAmenityIcon(amenity.icon);
          const hasLongTitle = amenity.title.length > TITLE_TOOLTIP_LIMIT;

          return (
            <Grid key={amenity.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card variant="roomAmenity">
                <CardContent>
                  <Tooltip title="Amenity actions" placement="top" arrow>
                    <IconButton
                      className="room-amenity-action-trigger"
                      size="small"
                      aria-label={`Actions for ${amenity.title}`}
                      aria-controls={isMenuOpen(amenity.id) ? "room-amenity-actions-menu" : undefined}
                      aria-haspopup="menu"
                      aria-expanded={isMenuOpen(amenity.id) ? "true" : undefined}
                      onClick={(event) => handleOpenMenu(event, amenity)}
                      sx={{ width: 32, height: 32 }}
                    >
                      <MoreVertical size={16} />
                    </IconButton>
                  </Tooltip>

                  <Stack
                    direction="row"
                    spacing={1.25}
                    alignItems="center"
                    minWidth={0}
                    width="100%"
                    sx={{ pr: 4 }}
                  >
                    <Icon size={20} style={{ flexShrink: 0 }} />

                    <Tooltip title={hasLongTitle ? amenity.title : ""} placement="top" arrow>
                      <Typography
                        variant="body2"
                        fontWeight={700}
                        noWrap
                        sx={{ minWidth: 0, flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}
                      >
                        {amenity.title}
                      </Typography>
                    </Tooltip>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Menu
        id="room-amenity-actions-menu"
        anchorEl={menuState.anchorEl}
        open={Boolean(menuState.anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleEditAmenity} variant="default">
          <Pencil size={16} style={{ marginRight: 8 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteAmenity} variant="danger">
          <Trash2 size={16} style={{ marginRight: 8 }} />
          Delete
        </MenuItem>
      </Menu>

      {pageCount > 1 ? (
        <Stack alignItems="center">
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, nextPage) => setPage(nextPage)}
            color="primary"
          />
        </Stack>
      ) : null}
    </Stack>
  );
}
