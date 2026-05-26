"use client";

import { useCallback, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import { useAuth } from "@/core/context/AuthContext";
import SearchInput from "@/components/common/SearchInput";
import { CreateTicketDialog } from "./CreateTicketDialog";
import { DeleteTicketDialog } from "./DeleteTicketDialog";
import { TicketDetailDrawer } from "./TicketDetailDrawer";
import { TicketBoard } from "./board/TicketBoard";
import {
  TicketsBoardSection,
  TicketsPageHeader,
} from "../styles/StyledComponents";
import { useAssignableEmployees } from "../hooks/useAssignableEmployees";
import { useHousekeepingLocations } from "../hooks/useHousekeepingLocations";
import { useTicketComments } from "../hooks/useTicketComments";
import { useTicketManager } from "../hooks/useTicketManager";
import { useTicketScope } from "../hooks/useTicketScope";
import { useVisibleTickets } from "../hooks/useVisibleTickets";
import {
  useGetTicketBoard,
  useGetAdminTicketBoard,
} from "../hooks/queries/ticketQueries";
import { mapSummaryToTicket } from "../utils/ticketMappers";
import type { HousekeepingTicket } from "../types/ticket";
import ReportDamageDialog from "../../../damage-reports/components/ReportDamageDialog";
import { useDamageReports } from "../../../damage-reports/hooks/useDamageReports";

function getRouteParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function HousekeepingTicketsPage() {
  const params = useParams();
  const { user } = useAuth();
  const { t } = useTranslation();
  const hotelId = getRouteParam(params.hotelId) ?? "";
  const agencyId = getRouteParam(params.agencyId);
  const [ticketSearch, setTicketSearch] = useState("");

  const scope = useTicketScope(hotelId, agencyId);

  // ── Board queries ──────────────────────────────────────────────────────────
  const hotelBoard = useGetTicketBoard(
    scope.type === "hotel" ? scope.hotelId : undefined
  );
  const adminBoard = useGetAdminTicketBoard(
    scope.type === "admin" ? scope.agencyId : undefined,
    scope.type === "admin" ? scope.hotelId : undefined
  );
  const boardData = scope.type === "admin" ? adminBoard.data : hotelBoard.data;
  const tickets: HousekeepingTicket[] = boardData
    ? [
        ...(boardData.todo ?? []),
        ...(boardData.inProgress ?? []),
        ...(boardData.review ?? []),
        ...(boardData.done ?? []),
      ].map(mapSummaryToTicket)
    : [];

  // ── Hooks ──────────────────────────────────────────────────────────────────
  const ticketManager = useTicketManager({ scope, tickets });
  const locations = useHousekeepingLocations(scope);
  const assignableEmployees = useAssignableEmployees({ scope });
  const {
    ticketComments,
    getComments,
    addComment,
    addDamageReportedComment,
    editComment,
    deleteComment,
  } = useTicketComments();

  const assigneeName = [
    user?.name,
    `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim(),
    user?.email,
  ].find(Boolean);

  const normalizedTicketSearch = ticketSearch.trim().toLowerCase();
  const { visibleTickets, roleScopedTicketCount } = useVisibleTickets({
    tickets: ticketManager.tickets,
    locations,
    normalizedSearch: normalizedTicketSearch,
    assigneeName,
    role: user?.role,
  });

  const {
    editingTicket,
    deletingTicket,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    handleSave,
    handleOpenEdit,
    handleOpenDelete,
    handleCloseDialog,
    handleCloseDelete,
    deleteTicket,
    moveTicket,
  } = ticketManager;

  const {
    roomOptions,
    facilityOptions,
    isLoading: locationsLoading,
    getTicketRoom,
    getTicketLocationLabel,
  } = locations;

  const { reportDamage } = useDamageReports(hotelId);
  const [reportingTicket, setReportingTicket] = useState<HousekeepingTicket | null>(null);
  const [detailTicket, setDetailTicket] = useState<HousekeepingTicket | null>(null);
  const reportingRoom = reportingTicket ? getTicketRoom(reportingTicket) : undefined;
  const theme = useTheme();

  const commentCounts = useMemo(
    () =>
      Object.fromEntries(
        ticketManager.tickets.map((ticket) => [ticket.id, (ticketComments[ticket.id] ?? []).length])
      ),
    [ticketManager.tickets, ticketComments]
  );

  const handleOpenReportDamage = useCallback((ticket: HousekeepingTicket) => {
    setReportingTicket(ticket);
  }, []);

  const handleOpenDetail = useCallback((ticket: HousekeepingTicket) => {
    setDetailTicket(ticket);
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        <TicketsPageHeader
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          gap={2}
        >
          <Stack gap={0.5}>
            <Typography variant="h6" fontWeight={700}>
              {t("housekeeping.tickets.boardTitle", "Tickets Board")}
            </Typography>
          </Stack>

          <Button
            variant="contained"
            disableElevation
            size="small"
            startIcon={<Plus size={15} />}
            onClick={() => setIsCreateDialogOpen(true)}
          >
            {t("housekeeping.tickets.createTicket", "Create Ticket")}
          </Button>
        </TicketsPageHeader>
      </Container>

      <TicketsBoardSection>
        <Stack direction="row" alignItems="center" gap={1.5} minHeight={theme.spacing(5)}>
          <SearchInput
            value={ticketSearch}
            onChange={setTicketSearch}
            placeholder={t("housekeeping.tickets.searchBoard", "Search board")}
          />
          <Typography variant="caption">
            {t("housekeeping.tickets.ticketCount", "{{visible}} of {{total}} tickets", { visible: visibleTickets.length, total: roleScopedTicketCount })}
          </Typography>
        </Stack>
        <TicketBoard
          tickets={visibleTickets}
          commentCounts={commentCounts}
          onMoveTicket={moveTicket}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
          onReportDamage={handleOpenReportDamage}
          onOpenDetail={handleOpenDetail}
        />
      </TicketsBoardSection>

      <CreateTicketDialog
        open={isCreateDialogOpen}
        employees={assignableEmployees}
        roomOptions={roomOptions}
        facilityOptions={facilityOptions}
        locationsLoading={locationsLoading}
        initialValues={editingTicket}
        onClose={handleCloseDialog}
        onCreate={handleSave}
      />

      <DeleteTicketDialog
        open={!!deletingTicket}
        ticket={deletingTicket}
        onClose={handleCloseDelete}
        onConfirm={deleteTicket}
      />

      <ReportDamageDialog
        open={!!reportingTicket}
        onClose={() => setReportingTicket(null)}
        onSubmit={(input) => {
          reportDamage(input);
          if (reportingTicket) addDamageReportedComment(reportingTicket.id);
        }}
        prefill={{
          hotelId,
          roomNumber: reportingRoom?.roomNumber ?? "",
          taskId: reportingTicket?.id ?? "",
          reservationId: reportingTicket?.reservationId,
          reportedBy: user?.name ?? user?.email ?? "Staff",
          currency: "USD",
        }}
      />

      <TicketDetailDrawer
        ticket={detailTicket}
        getTicketLocationLabel={getTicketLocationLabel}
        comments={detailTicket ? getComments(detailTicket.id) : []}
        onClose={() => setDetailTicket(null)}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
        onReportDamage={handleOpenReportDamage}
        onAddComment={(values) => {
          if (detailTicket) addComment(detailTicket.id, values);
        }}
        onEditComment={(commentId, newBody) => {
          if (detailTicket) editComment(detailTicket.id, commentId, newBody);
        }}
        onDeleteComment={(commentId) => {
          if (detailTicket) deleteComment(detailTicket.id, commentId);
        }}
      />
    </>
  );
}
