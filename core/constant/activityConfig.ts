import {
  CheckCircle2,
  Hourglass,
  CircleX,
  RefreshCw,
  SquarePlus,
  Ban,
} from "lucide-react"
import { ActivityType } from "@/core/types/dashboardTypes";


type ActivityConfig = {
  icon: React.ElementType;
  color: "success" | "warning" | "error" | "info" | "primary";
};

export const ACTIVITY_CONFIG: Record<ActivityType, ActivityConfig> = {
  approval_submitted: { icon: Hourglass, color: "warning" },
  agency_approved: { icon: CheckCircle2, color: "success" },
  agency_rejected: { icon: CircleX, color: "error" },
  subscription_updated: { icon: RefreshCw, color: "info" },
  plan_created: { icon: SquarePlus, color: "primary" },
  agency_suspended: { icon: Ban, color: "error" },
};
