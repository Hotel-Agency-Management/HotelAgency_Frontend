import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import { Link2, Pencil, Trash2 } from "lucide-react";
import {
  createDataGridColumnsFactory,
  type DataGridColumnRegistry,
} from "@/core/utils/dataGridColumns";
import {
  ROOM_AMENITY_STATUS,
  type RoomAmenity,
  type RoomAmenityPhoto,
} from "../types/roomAmenity";

type RoomAmenityColumnKey =
  | "photo"
  | "label"
  | "category"
  | "status"
  | "description"
  | "actions";

interface RoomAmenityColumnContext {
  onEdit: (amenity: RoomAmenity) => void;
  onDelete: (amenity: RoomAmenity) => void;
  onAssign: (amenity: RoomAmenity) => void;
}

const DEFAULT_COLUMN_ORDER: RoomAmenityColumnKey[] = [
  "label",
  "category",
  "status",
  "description",
  "actions",
];

function getPrimaryPhoto(photos: RoomAmenityPhoto[]) {
  return photos.find((photo) => photo.isPrimary) ?? photos[0] ?? null;
}

const COLUMN_STRATEGIES = {
  photo: {
    field: "photo",
    headerName: "Photo",
    minWidth: 96,
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      const photo = getPrimaryPhoto(params.row.photos);

      return (
        <Box
          sx={{
            width: 56,
            height: 40,
            borderRadius: 1,
            overflow: "hidden",
            bgcolor: "action.hover",
          }}
        >
          {photo ? (
            <Box
              component="img"
              src={photo.url}
              alt={params.row.label}
              sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          ) : (
            <Stack alignItems="center" justifyContent="center" height="100%">
              <Typography variant="caption" color="text.secondary">
                No photo
              </Typography>
            </Stack>
          )}
        </Box>
      );
    },
  },
  label: {
    field: "label",
    headerName: "Amenity",
    flex: 0.9,
    minWidth: 170,
    renderCell: (params) => (
      <Stack spacing={0.2} justifyContent="center" height="100%">
        <Typography variant="body2" fontWeight={700}>
          {params.row.label}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {params.row.key}
        </Typography>
      </Stack>
    ),
  },
  category: {
    field: "category",
    headerName: "Category",
    flex: 0.7,
    minWidth: 130,
  },
  status: {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => {
      const active = params.row.status === ROOM_AMENITY_STATUS.ACTIVE;

      return (
        <Chip
          label={active ? "Active" : "Inactive"}
          color={active ? "success" : "default"}
          size="small"
        />
      );
    },
  },
  description: {
    field: "description",
    headerName: "Description",
    flex: 1.6,
    minWidth: 280,
    renderCell: (params) => (
      <Typography
        variant="body2"
        color={params.row.description ? "text.primary" : "text.secondary"}
        noWrap
        title={params.row.description || "No description"}
      >
        {params.row.description || "No description"}
      </Typography>
    ),
  },
  actions: ({ onEdit, onDelete, onAssign }) => ({
    field: "actions",
    headerName: "",
    width: 132,
    minWidth: 132,
    maxWidth: 132,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <Stack
        direction="row"
        spacing={0.25}
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <Tooltip title="Assign to rooms">
          <IconButton
            size="small"
            aria-label="Assign to rooms"
            onClick={() => onAssign(params.row)}
            sx={{ width: 32, height: 32 }}
          >
            <Link2 size={16} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit amenity">
          <IconButton
            size="small"
            aria-label="Edit amenity"
            onClick={() => onEdit(params.row)}
            sx={{ width: 32, height: 32 }}
          >
            <Pencil size={16} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete amenity">
          <IconButton
            size="small"
            color="error"
            aria-label="Delete amenity"
            onClick={() => onDelete(params.row)}
            sx={{ width: 32, height: 32 }}
          >
            <Trash2 size={16} />
          </IconButton>
        </Tooltip>
      </Stack>
    ),
  }),
} satisfies DataGridColumnRegistry<
  RoomAmenityColumnKey,
  RoomAmenity,
  RoomAmenityColumnContext
>;

const buildRoomAmenityColumns = createDataGridColumnsFactory(COLUMN_STRATEGIES);

export function getRoomAmenityGridColumns(
  context: RoomAmenityColumnContext,
  columnOrder: readonly RoomAmenityColumnKey[] = DEFAULT_COLUMN_ORDER
): GridColDef<RoomAmenity>[] {
  return buildRoomAmenityColumns(context, columnOrder);
}
