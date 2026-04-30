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
import { cardSx, cardContentSx, editButtonSx, fileNameSx, hiddenInputStyle } from "./AgencyFileCards.styles";

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

  const handleOpenFile = (url: string) => {
    if (!url) return;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleFileKeyDown = (
    event: React.KeyboardEvent,
    url: string
  ) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    handleOpenFile(url);
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
      {files.map((file) => {
        const canOpenFile = Boolean(file.url);

        return (
          <Grid key={file.id} size={{ xs: 6, sm: 4, md: 3 }}>
            <input
              type="file"
              ref={(el) => {
                inputRefs.current[file.id] = el;
              }}
              style={hiddenInputStyle}
              onChange={(e) => handleFileChange(file.id, e)}
            />

            <Tooltip title={canOpenFile ? "Open file in new tab" : ""}>
              <Card
                role={canOpenFile ? "button" : undefined}
                tabIndex={canOpenFile ? 0 : undefined}
                onClick={() => handleOpenFile(file.url)}
                onKeyDown={(event) => handleFileKeyDown(event, file.url)}
                sx={cardSx(canOpenFile)}
              >
                <Tooltip title={`Replace ${file.documentType}`}>
                  <IconButton
                    className="edit-btn"
                    size="small"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleEditClick(file.id);
                    }}
                    onKeyDown={(event) => event.stopPropagation()}
                    sx={editButtonSx}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

                <CardContent sx={cardContentSx}>
                  <Stack spacing={1} alignItems="center">
                    {getFileIcon(file.type)}
                    <Typography
                      variant="caption"
                      color="text.primary"
                      align="center"
                      sx={fileNameSx}
                    >
                      {file.documentType}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Tooltip>
          </Grid>
        );
      })}
    </Grid>
  );
}
