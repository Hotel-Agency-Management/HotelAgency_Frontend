import styled from "@emotion/styled";
import Paper from "@mui/material/Paper";

export const SignaturePaper = styled(Paper)<{ bgColor: string }>(({ bgColor }) => ({
  backgroundColor: bgColor,
  position: 'relative',
  overflow: 'hidden',
}))
