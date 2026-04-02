"use client";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import { useRef } from "react";
import { FileItem } from "../../types/agencyProfile";
import { FileCardSkeleton } from "./FileCardSkelton";
import { getFileIcon } from "../../util/fileIcon";

interface AgencyFileCardsProps {
  files: FileItem[];
  isLoading?: boolean;
  onFileReplace?: (fileId: string, newFile: File) => void;
}

export function AgencyFileCards({
  files,
  isLoading,
  onFileReplace,
}: AgencyFileCardsProps) {
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleEditClick = (fileId: string) => {
    inputRefs.current[fileId]?.click();
  };

  const handleFileChange = (
    fileId: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFile = event.target.files?.[0];
    if (newFile && onFileReplace) {
      onFileReplace(fileId, newFile);
    }
    // Reset so same file can be re-selected
    event.target.value = "";
  };

  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {[1, 2, 3].map((i) => (
          <Grid key={i} size={{ xs: 6, sm: 4, md: 3 }}>
            <FileCardSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!files || files.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No files uploaded yet.
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      {files.map((file) => (
        <Grid key={file.id} size={{ xs: 6, sm: 4, md: 3 }}>
          <input
            type="file"
            ref={(el) => {
              inputRefs.current[file.id] = el;
            }}
            style={{ display: "none" }}
            onChange={(e) => handleFileChange(file.id, e)}
          />

          <Card
            sx={{
              cursor: "pointer",
              position: "relative",
              "&:hover .edit-btn": { opacity: 1 },
            }}
          >
            <Tooltip title="Replace file">
              <IconButton
                className="edit-btn"
                size="small"
                onClick={() => handleEditClick(file.id)}
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  opacity: 0,
                  transition: "opacity 0.2s",
                  boxShadow: 1,
                  zIndex: 1,
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <CardContent>
              <Stack spacing={1} alignItems="center">
                {getFileIcon(file.type)}
                <Typography
                  variant="caption"
                  color="text.primary"
                  align="center"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    wordBreak: "break-all",
                  }}
                >
                  {file.name}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
