import { styled } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";

export const AddTeamDrawerRoot = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 440,
    },
  },
}));

export const DrawerForm = styled("form")({
  display: "flex",
  minHeight: "100%",
  flexDirection: "column",
});

export const DrawerContentStack = styled(Stack)({
  flex: 1,
});

export const DrawerContent = styled(CardContent)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
});

export const DrawerContentBody = styled(Stack)({
  flex: 1,
  justifyContent: "space-between",
});

export const DrawerActions = styled(Stack)({
  justifyContent: "flex-end",
});
