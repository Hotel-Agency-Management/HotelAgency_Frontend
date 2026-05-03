import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";

export const BorderedTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const TabPanelContent = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(3),
}))
