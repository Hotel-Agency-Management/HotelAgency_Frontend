"use client";

import { useMemo } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { Plus } from "lucide-react";
import themeConfig from "@/core/configs/themeConfig";
import { TaskFilters } from "./TaskFilters";
import { CreateTaskDialog } from "./CreateTaskDialog";
import { DeleteTaskDialog } from "./DeleteTaskDialog";
import { TaskSummaryCard } from "./TaskSummaryCard";
import { useHousekeepingTasksPage } from "../hooks/useHousekeepingTasks";
import { getHousekeepingTaskColumns } from "./taskColumns";

export function HousekeepingTasksPage() {
  const {
    theme,
    hotelName,
    primaryColor,
    summary,
    tasks,
    editingTask,
    deletingTask,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    handleSave,
    handleOpenEdit,
    handleOpenDelete,
    handleCloseDialog,
    handleCloseDelete,
    deleteTask
  } = useHousekeepingTasksPage();

  const columns = useMemo(
    () =>
      getHousekeepingTaskColumns({
        primaryColor,
        theme,
        onEdit: handleOpenEdit,
        onDelete: handleOpenDelete
      }),
    [primaryColor, theme, handleOpenEdit, handleOpenDelete]
  );

  return (
    <Container maxWidth="xl">
      <Stack gap={themeConfig.common.commonSpacing}>
        <Stack gap={0.75}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems={{ xs: "flex-start", md: "center" }}
            justifyContent="space-between"
            gap={2}
          >
            <Stack gap={0.75}>
              <Typography variant="h5" fontWeight={700}>
                Housekeeping Task Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {hotelName}
              </Typography>
            </Stack>

            <Button
              variant="contained"
              disableElevation
              startIcon={<Plus size={16} />}
              onClick={() => setIsCreateDialogOpen(true)}
              sx={{
                bgcolor: primaryColor,
                color: theme.palette.getContrastText(primaryColor),
                "&:hover": { bgcolor: primaryColor }
              }}
            >
              Create Task
            </Button>
          </Stack>
        </Stack>

        <Grid container spacing={themeConfig.common.commonSpacing}>
          <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
            <TaskSummaryCard title="Total Tasks" value={summary.total} subtitle="all housekeeping assignments" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
            <TaskSummaryCard title="Pending Tasks" value={summary.pending} subtitle="waiting to be started" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
            <TaskSummaryCard title="In Progress" value={summary.inProgress} subtitle="currently assigned to staff" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
            <TaskSummaryCard title="Completed" value={summary.completed} subtitle="finished for today" />
          </Grid>
        </Grid>

        <Paper
          variant="outlined"
          sx={{ borderRadius: themeConfig.common.commonBorderRadius, overflow: "hidden" }}
        >
          <Stack gap={themeConfig.common.commonSpacing} sx={{ p: themeConfig.common.commonPadding }}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              alignItems={{ xs: "stretch", md: "center" }}
              justifyContent="space-between"
              gap={2}
            >
              <Stack gap={0.5}>
                <Typography variant="subtitle1" fontWeight={700}>
                  Room Cleaning Tasks
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  View, assign, and update housekeeping work across all floors.
                </Typography>
              </Stack>

              <TaskFilters />
            </Stack>

            <DataGrid
              autoHeight
              rows={tasks}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10, page: 0 } }
              }}
              rowHeight={64}
            />
          </Stack>
        </Paper>

        <CreateTaskDialog
          open={isCreateDialogOpen}
          employees={[]}
          initialValues={editingTask}
          onClose={handleCloseDialog}
          onCreate={handleSave}
        />

        <DeleteTaskDialog
          open={!!deletingTask}
          task={deletingTask}
          onClose={handleCloseDelete}
          onConfirm={deleteTask}
        />
      </Stack>
    </Container>
  );
}
