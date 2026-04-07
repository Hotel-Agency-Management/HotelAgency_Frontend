import Box from "@mui/material/Box";

interface RoomGalleryMainImageProps {
  url: string;
}

export function RoomGalleryMainImage({ url }: RoomGalleryMainImageProps) {
  return (
    <Box
      component="img"
      src={url}
      alt=""
      sx={{
        display: "block",
        width: 1,
        height: { xs: 240, md: 380 },
        objectFit: "cover",
        borderRadius: 1.5,
      }}
    />
  );
}
