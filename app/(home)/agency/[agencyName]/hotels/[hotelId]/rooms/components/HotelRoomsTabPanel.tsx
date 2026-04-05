import { styled } from "@mui/material/styles";

const TabPanelContent = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(3),
}));

type Props = {
  children: React.ReactNode;
  value: number;
  index: number;
};

export function HotelRoomsTabPanel({ children, value, index }: Props) {
  const active = value === index;

  return (
    <div
      role="tabpanel"
      id={`hotel-rooms-tabpanel-${index}`}
      aria-hidden={!active}
      hidden={!active}
    >
      {active ? <TabPanelContent>{children}</TabPanelContent> : null}
    </div>
  );
}
