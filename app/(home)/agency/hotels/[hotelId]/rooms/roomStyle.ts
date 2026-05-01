import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CachedIcon from "@mui/icons-material/Cached";
import DeleteIcon from "@mui/icons-material/Delete";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { StaggerGroup } from "@/components/animation/StaggerGroup";

export const AddPhotoTileRoot = styled(Paper)(({ theme }) => ({
  width: 120,
  height: 90,
  borderStyle: "dashed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
}));

export const AddPhotoTileIcon = styled(AddPhotoAlternateIcon)(({ theme }) => ({
  color: theme.palette.text.disabled,
}));

export const EmptyPhotoIcon = styled(AddPhotoAlternateIcon)(({ theme }) => ({
  fontSize: 40,
  color: theme.palette.text.disabled,
}));

export const PhotoDropSurfaceRoot = styled(Paper)(({ theme }) => ({
  borderStyle: "dashed",
  padding: theme.spacing(4),
  textAlign: "center",
  cursor: "pointer",
  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
}));

export const PhotoThumbRoot = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "primaryPhoto",
})<{ primaryPhoto?: boolean }>(({ theme, primaryPhoto }) => ({
  position: "relative",
  width: 120,
  height: 90,
  overflow: "hidden",
  borderWidth: primaryPhoto ? 2 : 1,
  borderColor: primaryPhoto ? theme.palette.primary.main : theme.palette.divider,
  borderStyle: "solid",
}));

export const PhotoThumbImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const PhotoThumbActions = styled(Stack)({
  position: "absolute",
  top: 2,
  right: 2,
});

export const PhotoThumbActionButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "primaryPhoto",
})<{ primaryPhoto?: boolean }>(({ theme, primaryPhoto }) => ({
  backgroundColor: theme.palette.action.active,
  color: primaryPhoto ? theme.palette.warning.light : theme.palette.common.white,
  padding: theme.spacing(0.3),
  "&:hover": {
    backgroundColor: theme.palette.action.focus,
  },
}));

export const PhotoThumbDeleteButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.action.active,
  color: theme.palette.common.white,
  padding: theme.spacing(0.3),
  "&.Mui-disabled": {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
  "&:hover": {
    backgroundColor: theme.palette.error.main,
  },
}));

export const PhotoThumbReplaceButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.action.active,
  color: theme.palette.common.white,
  padding: theme.spacing(0.3),
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
}));

export const TinyStarIcon = styled(StarIcon)({
  fontSize: 14,
});

export const TinyStarBorderIcon = styled(StarBorderIcon)({
  fontSize: 14,
});

export const TinyDeleteIcon = styled(DeleteIcon)({
  fontSize: 14,
});

export const TinyReplaceIcon = styled(CachedIcon)({
  fontSize: 14,
});

export const PrimaryPhotoLabel = styled(Paper)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: theme.palette.primary.main,
  paddingTop: theme.spacing(0.3),
  paddingBottom: theme.spacing(0.3),
  textAlign: "center",
  borderRadius: 0,
}));

export const CreatePhotoPreview = styled(Box)(({ theme }) => ({
  width: 132,
  height: 104,
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  position: "relative",
  border: `1px solid ${theme.palette.divider}`,
}));

export const EditPhotoPreview = styled(Box)(({ theme }) => ({
  width: 120,
  height: 90,
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  position: "relative",
  border: `1px solid ${theme.palette.divider}`,
}));

export const PreviewImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

export const CoverChip = styled(Chip)({
  position: "absolute",
  left: 6,
  top: 6,
});

export const NewChip = styled(Chip)({
  position: "absolute",
  left: 4,
  bottom: 4,
});

export const PreviewDeleteButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: 4,
  top: 4,
  backgroundColor: theme.palette.background.paper,
}));

export const DialogActionsRoot = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2, 3),
}));

export const DialogStepper = styled(Stepper)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const RoomRowsGrid = styled(DataGrid)({
  cursor: "pointer",
});

export const RoomCardRoot = styled(Card, {
  shouldForwardProp: (prop) => prop !== "clickable",
})<{ clickable?: boolean }>(({ clickable }) => ({
  cursor: clickable ? "pointer" : undefined,
}));

export const RoomCardContent = styled(Stack)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

export const ToolbarSearchField = styled(TextField)({
  width: 400,
});

export const ToolbarStatusField = styled(TextField)({
  width: 150,
});

export const ToolbarPlaceholder = styled("span")({
  opacity: 0.7,
});

export const ProfileHeaderRoot = styled(Stack)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const ProfileHeaderTitleGroup = styled(Stack)({
  minWidth: 0,
  flex: 1,
});

export const ProfileBackButton = styled(IconButton)({
  flexShrink: 0,
});

export const ProfileTitleSkeleton = styled(Skeleton)({
  flex: 1,
  maxWidth: 320,
});

export const ProfileShell = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "disabledState",
})<{ disabledState?: boolean }>(({ disabledState }) => ({
  width: "100%",
  maxWidth: 1120,
  marginLeft: "auto",
  marginRight: "auto",
  opacity: disabledState ? 0.6 : 1,
  pointerEvents: disabledState ? "none" : "auto",
}));

export const ProfileErrorShell = styled(Stack)({
  maxWidth: 1120,
  marginLeft: "auto",
  marginRight: "auto",
  width: "100%",
});

export const GalleryEmpty = styled(Box)(({ theme }) => ({
  minHeight: 240,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.up("md")]: {
    minHeight: 320,
  },
}));

export const GalleryStack = styled(Stack)({
  width: "100%",
});

export const GalleryMainImage = styled("img")(({ theme }) => ({
  display: "block",
  width: "100%",
  height: 240,
  objectFit: "cover",
  borderRadius: theme.spacing(1.5),
  [theme.breakpoints.up("md")]: {
    height: 380,
  },
}));

export const InfoCardRoot = styled(Paper)({
  height: "100%",
  width: "100%",
});

export const CardFullWidth = styled(Paper)({
  width: "100%",
});

export const SkeletonActions = styled(Stack)(({ theme }) => ({
  paddingTop: theme.spacing(0.5),
}));

export const FlexSkeleton = styled(Skeleton)({
  flex: 1,
});

export const AmenitiesSkeletonTitle = styled(Skeleton)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const GallerySkeletonRoot = styled(Box)({
  width: "100%",
});

export const GallerySkeletonMain = styled(Skeleton)(({ theme }) => ({
  height: 240,
  borderRadius: theme.spacing(1.5),
  boxShadow: theme.shadows[4],
  [theme.breakpoints.up("md")]: {
    height: 380,
  },
}));

export const GallerySkeletonGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
}));

export const GallerySkeletonThumb = styled(Skeleton)(({ theme }) => ({
  height: 64,
  borderRadius: theme.spacing(1),
  [theme.breakpoints.up("sm")]: {
    height: 72,
  },
}));

export const UploadSummary = styled(Typography)({
  margin: 0,
});

export const RoomGridStaggerGroup = styled(StaggerGroup)({
  width: "100%",
});
