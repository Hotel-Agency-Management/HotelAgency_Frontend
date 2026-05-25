import type { TicketSummaryResponse, CreateTicketRequest } from "../configs/ticketConfig";
import type {
  HousekeepingTicket,
  HousekeepingTicketValues,
  HousekeepingTicketType,
  HousekeepingLocationType,
  HousekeepingTicketStatus,
  HousekeepingTicketPriority,
} from "../types/ticket";

export function mapSummaryToTicket(item: TicketSummaryResponse): HousekeepingTicket {
  return {
    id: String(item.id),
    ticketKey: `HK-${item.id}`,
    ticketType: item.type as HousekeepingTicketType,
    locationType: item.locationType as HousekeepingLocationType,
    title: item.title,
    description: "",
    locationLabel: item.locationLabel,
    status: item.status as HousekeepingTicketStatus,
    assignedTo: item.assignedToName,
    assignedToId: item.assignedToId,
    priority: item.priority as HousekeepingTicketPriority,
    deadline: item.deadline,
  };
}

export function buildCreatePayload(values: HousekeepingTicketValues): CreateTicketRequest {
  return {
    title: values.title,
    description: values.description,
    priority: values.priority,
    type: values.ticketType,
    locationType: values.locationType,
    ...(values.roomId ? { roomId: Number(values.roomId) } : {}),
    ...(values.facilityId ? { facilityId: Number(values.facilityId) } : {}),
    assignedToId: values.assignedToId!,
    deadline: values.deadline,
  };
}
