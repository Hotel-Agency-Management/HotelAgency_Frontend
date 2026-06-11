import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";

export const BorderedTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const TabPanelContent = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(3),
}))

export const AgencyCardActionArea = styled(CardActionArea)(() => ({
  borderRadius: 'inherit',
}))

export const AgencyCardSettingsButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: 1,
}))
