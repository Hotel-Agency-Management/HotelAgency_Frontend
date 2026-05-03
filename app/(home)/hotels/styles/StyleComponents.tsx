import { Button, InputLabel, Paper } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";

export const SortFormControl = styled(FormControl)({ minWidth: 180 });

export const HotelSortInputLabel = styled(InputLabel)({
  backgroundColor: 'transparent',
  paddingLeft: 0,
  paddingRight: 0,
  '&.MuiInputLabel-shrink': {
    backgroundColor: 'transparent',
  },
})

export const CustomerRoomBookingCardPaper = styled(Paper)({
  width: '100%',
  height: '100%',
  display: 'flex',
})

export const ContractPanel = styled(Paper)({ width: '100%', maxWidth: 560 });

export const WideButton = styled(Button)({ minWidth: 220 });
