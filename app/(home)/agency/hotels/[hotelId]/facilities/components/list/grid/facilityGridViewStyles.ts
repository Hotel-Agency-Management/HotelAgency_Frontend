import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

export const FacilityCardImageArea = styled(Box)({
  position: "relative",
  aspectRatio: "16 / 9",
  overflow: "hidden",
  flexShrink: 0,
  borderRadius: "8px 8px 0 0",
});

export const FacilityCardImg = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const FacilityCardPlaceholder = styled(Stack)(({ theme }) => ({
  width: "100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.action.hover,
}));

export const FacilityGridLoading = styled(Stack)({
  alignItems: "center",
  justifyContent: "center",
  minHeight: 240,
});

export const FacilityDescription = styled("p")(({ theme }) => ({
  margin: 0,
  color: theme.palette.text.secondary,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
}));
