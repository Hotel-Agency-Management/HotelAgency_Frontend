import Paper from "@mui/material/Paper";
import { alpha, styled } from "@mui/material/styles";

export const HeaderPaper = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.12)} 0%, ${alpha(
    theme.palette.background.paper,
    0.98
  )} 55%)`,
}))
