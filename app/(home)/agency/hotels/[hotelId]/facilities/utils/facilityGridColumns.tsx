import type { GridColDef } from "@mui/x-data-grid";
import {
  createDataGridColumnsFactory,
  type DataGridColumnRegistry,
} from "@/core/utils/dataGridColumns";
import { FacilityStatusChip } from "../components/list/FacilityStatusChip";
import { FacilityQuickActions } from "../components/list/FacilityQuickActions";
import type { HotelFacility } from "../types/facility";

type FacilityColumnKey =
  | "name"
  | "facilityType"
  | "status"
  | "hours"
  | "actions";

interface FacilityColumnContext {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const DEFAULT_COLUMN_ORDER: FacilityColumnKey[] = [
  "name",
  "facilityType",
  "status",
  "hours",
  "actions",
];

const COLUMN_STRATEGIES = {
  name: {
    field: "name",
    headerName: "Name",
    flex: 1,
    minWidth: 160,
  },
  facilityType: {
    field: "facilityType",
    headerName: "Type",
    flex: 0.9,
    minWidth: 140,
  },
  status: {
    field: "status",
    headerName: "Status",
    flex: 0.8,
    minWidth: 130,
    renderCell: (params) => <FacilityStatusChip status={params.row.status} />,
  },
  hours: {
    field: "hours",
    headerName: "Hours",
    flex: 0.9,
    minWidth: 150,
    sortable: false,
    valueGetter: (_value, row) => `${row.openAt.slice(0, 5)} - ${row.closeAt.slice(0, 5)}`,
  },
  actions: ({ onEdit, onDelete }) => ({
    field: "actions",
    headerName: "Actions",
    flex: 0.6,
    minWidth: 110,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <FacilityQuickActions
        id={params.row.id}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ),
  }),
} satisfies DataGridColumnRegistry<
  FacilityColumnKey,
  HotelFacility,
  FacilityColumnContext
>;

const buildFacilityColumns = createDataGridColumnsFactory(COLUMN_STRATEGIES);

export function getFacilityGridColumns(
  context: FacilityColumnContext,
  columnOrder: readonly FacilityColumnKey[] = DEFAULT_COLUMN_ORDER
): GridColDef<HotelFacility>[] {
  return buildFacilityColumns(context, columnOrder);
}
