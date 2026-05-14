import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { alpha, styled, Theme } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";

interface ColoredChipProps {
  chipColor: string;
  opacity?: number;
  alignSelf?: string;
}

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(1.5),

  "&:last-child": {
    paddingBottom: theme.spacing(1.5),
  },
}));

export const TicketsPageHeader = styled(Stack)(({ theme }) => (
  {
  paddingBlock: theme.spacing(3),
}));

export const TicketsBoardSection = styled(Stack)(({ theme }) => ({
  flex: 1,
  minHeight: 0,
  overflow: "hidden",
  padding: theme.spacing(0, 3, 3),
  gap: theme.spacing(1.5),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0, 2, 2),
  },
}));

const hoverScrollbar = (theme: Theme, size: number) => ({
  scrollbarWidth: "thin" as const,
  scrollbarColor: `transparent transparent`,
  [`&::-webkit-scrollbar`]: { width: size, height: size },
  "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "transparent",
    borderRadius: theme.shape.borderRadius,
  },
  "&:hover, &:focus-within": {
    scrollbarColor: `${alpha(theme.palette.text.primary, 0.2)} transparent`,
  },
  "&:hover::-webkit-scrollbar-thumb, &:focus-within::-webkit-scrollbar-thumb": {
    backgroundColor: alpha(theme.palette.text.primary, 0.18),
  },
});

const chipBase = (theme: Theme) => ({
  height: theme.spacing(2.5),
  borderRadius: theme.shape.borderRadius,
  ...theme.typography.caption,
  "& .MuiChip-label": {
    paddingInline: theme.spacing(0.875),
  },
});

export const BoardScrollContainer = styled(Stack)(({ theme }) => ({
  overflowX: "auto",
  overflowY: "hidden",
  paddingBottom: theme.spacing(1),
  alignItems: "stretch",
  ...hoverScrollbar(theme, 6),
}));

export const ColumnBody = styled(Stack)(({ theme }) => ({
  flex: 1,
  overflowY: "auto",
  gap: theme.spacing(1),
  maxHeight: `calc(100vh - ${theme.spacing(39.375)})`,
  padding: theme.spacing(0.5),
  ...hoverScrollbar(theme, 4),
}));
export const ColumnShell = styled(Stack)(({ theme }) => ({
  height: "100%",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.text.primary, 0.055),
}));

export const ColumnStatusDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$accentColor",
})<{ $accentColor: string }>(({ theme, $accentColor }) => ({
  width: theme.spacing(1),
  height: theme.spacing(1),
  borderRadius: "50%",
  backgroundColor: $accentColor,
  flexShrink: 0,
}));

export const ColumnCountBadge = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "$accentColor",
})<{ $accentColor: string }>(({ theme, $accentColor }) => ({
  minWidth: theme.spacing(2.75),
  height: theme.spacing(2.75),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha($accentColor, 0.16),
  alignItems: "center",
  justifyContent: "center",
  color: $accentColor,
}));

export const ColumnDropZone = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "isOver",
})<{ isOver?: boolean }>(({ theme, isOver }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  borderRadius: theme.shape.borderRadius,
  border: `2px solid ${isOver ? theme.palette.primary.main : "transparent"}`,
  backgroundColor: isOver ? alpha(theme.palette.primary.main, 0.08) : "transparent",
  transition: theme.transitions.create(["border-color", "background-color"], {
    duration: theme.transitions.duration.shorter,
  }),
  minHeight: theme.spacing(12),
  padding: theme.spacing(0, 1, 1),
}));

export const DropIndicator = styled(Box)(({ theme }) => ({
  height: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.main,
  boxShadow: `0 0 0 ${theme.spacing(0.375)} ${alpha(
    theme.palette.primary.main,
    0.14
  )}`,
  flexShrink: 0,
}));

export const EmptyColumnState = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "isOver",
})<{ isOver?: boolean }>(({ theme, isOver }) => ({
  minHeight: theme.spacing(9),
  border: `1px dashed ${alpha(
    theme.palette.text.secondary,
    isOver ? 0.42 : 0.18
  )}`,
  borderRadius: theme.shape.borderRadius,
  alignItems: "center",
  justifyContent: "center",
  color: isOver ? theme.palette.text.secondary : theme.palette.text.disabled,
  backgroundColor: isOver
    ? alpha(theme.palette.background.paper, 0.7)
    : "transparent",
  transition: theme.transitions.create(["border-color", "background-color"], {
    duration: theme.transitions.duration.shorter,
  }),
}));

export const TicketCardRoot = styled(Card, {
  shouldForwardProp: (prop) => prop !== "isDragging" && prop !== "isOverlay",
})<{ isDragging?: boolean; isOverlay?: boolean }>(
  ({ theme, isDragging, isOverlay }) => ({
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    boxShadow: isOverlay ? theme.shadows[8] : theme.shadows[1],
    opacity: isDragging ? 0.35 : 1,
    cursor: isDragging ? "grabbing" : "pointer",
    transform: isOverlay ? "rotate(1deg)" : undefined,
    transition: theme.transitions.create(["box-shadow", "border-color"], {
      duration: theme.transitions.duration.shorter,
    }),
    touchAction: "none",
    willChange: "transform",
    "&:hover": {
      boxShadow: theme.shadows[3],
      borderColor: alpha(theme.palette.primary.main, 0.35),
    },
  })
);

export const DragHandle = styled(Stack)(({ theme }) => ({
  cursor: "grab",
  alignItems: "center",
  justifyContent: "center",
  color: alpha(theme.palette.text.secondary, 0.25),
  transition: theme.transitions.create("color", {
    duration: theme.transitions.duration.shorter,
  }),
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.25),
  "&:hover": { color: theme.palette.text.secondary },
  "&:active": { cursor: "grabbing" },
}));

export const TicketCardMenuButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.25),
  color: alpha(theme.palette.text.secondary, 0.62),
  flexShrink: 0,
  "&:hover": {
    backgroundColor: alpha(theme.palette.text.primary, 0.06),
    color: theme.palette.text.secondary,
  },
}));

export const TicketCardAssigneeAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(3),
  height: theme.spacing(3),
  ...theme.typography.caption,
  fontWeight: theme.typography.fontWeightBold,
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  color: theme.palette.primary.main,
}));

export const PriorityChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "priorityColor",
})<{ priorityColor: string }>(({ theme, priorityColor }) => ({
  ...chipBase(theme),
  backgroundColor: alpha(priorityColor, 0.12),
  color: priorityColor,
  fontWeight: theme.typography.fontWeightBold,
}));

export const TicketTypeChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "ticketColor",
})<{ ticketColor: string }>(({ theme, ticketColor }) => ({
  ...chipBase(theme),
  backgroundColor: alpha(ticketColor, 0.1),
  color: ticketColor,
  fontWeight: theme.typography.fontWeightMedium,
}));

export const ColoredChip = styled(Chip, {
  shouldForwardProp: (prop) =>
    prop !== "chipColor" && prop !== "opacity" && prop !== "alignSelf",
})<ColoredChipProps>(({ chipColor, opacity = 0.1, alignSelf }) => ({
  backgroundColor: alpha(chipColor, opacity),
  color: chipColor,
  fontWeight: 600,
  alignSelf,
}));
