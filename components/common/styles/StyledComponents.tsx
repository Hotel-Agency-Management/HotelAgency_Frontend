import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const ClearSignatureButton = styled(Button)(({ theme }) => ({
  alignSelf: 'flex-start',
  [theme.breakpoints.up('sm')]: {
    alignSelf: 'center',
  },
}))
