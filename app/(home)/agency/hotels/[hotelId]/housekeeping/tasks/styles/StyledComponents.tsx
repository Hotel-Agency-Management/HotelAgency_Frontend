import IconButton from "@mui/material/IconButton";
import { alpha, styled } from "@mui/material/styles";

export const StyledWarningIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.warning.main,
  backgroundColor: alpha(theme.palette.warning.main, 0.1),
  '&:hover': { backgroundColor: alpha(theme.palette.warning.main, 0.18) },
}))
