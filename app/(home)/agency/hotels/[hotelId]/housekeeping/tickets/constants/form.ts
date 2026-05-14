import {
  HousekeepingLocationType,
  HousekeepingTicketPriority,
  HousekeepingTicketType,
} from "../types/ticket";
import { HOUSEKEEPING_TICKET_TYPE, HOUSEKEEPING_LOCATION_TYPE, HOUSEKEEPING_TICKET_PRIORITY } from "./ticket";

export const INITIAL_FORM = {
  ticketType: HOUSEKEEPING_TICKET_TYPE.TASK as HousekeepingTicketType,
  locationType: HOUSEKEEPING_LOCATION_TYPE.ROOM as HousekeepingLocationType,
  priority: HOUSEKEEPING_TICKET_PRIORITY.MEDIUM as HousekeepingTicketPriority,
  title: "",
  description: "",
  roomId: "",
  facilityId: "",
  assignedTo: "",
};
