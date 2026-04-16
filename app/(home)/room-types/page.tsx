import Container from "@mui/material/Container";
import { RoomTypesView } from "./components/RoomTypesView";

export default function RoomTypesPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <RoomTypesView />
    </Container>
  );
}
