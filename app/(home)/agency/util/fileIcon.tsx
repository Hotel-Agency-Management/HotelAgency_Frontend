import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
export function getFileIcon(type: string) {
  if (type.startsWith("image/")) return <ImageOutlinedIcon fontSize="large" color="primary" />;
  if (type === "application/pdf") return <PictureAsPdfOutlinedIcon fontSize="large" color="error" />;
  return <InsertDriveFileOutlinedIcon fontSize="large" color="action" />;
}
