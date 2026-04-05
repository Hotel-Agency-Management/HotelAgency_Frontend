import { Stack, Skeleton, Fade } from "@mui/material";
import { FieldRowProps } from "../../types/agencyProfile";

export function FieldRow({
  label,
  isEditing,
  isLoading,
  viewContent,
  editContent,
}: FieldRowProps) {
  return (
    <Stack spacing={0.5}>
      <Stack
        direction="row"
        spacing={0.75}
        alignItems="center"
        sx={{ color: "text.secondary", typography: "overline" }}
      >
        {label}
      </Stack>
      {isLoading ? (
        <Skeleton variant="text" width="60%" height={40} />
      ) : (
        <>
          <Fade in={!isEditing} unmountOnExit>
            <div>{viewContent}</div>
          </Fade>
          <Fade in={isEditing} unmountOnExit>
            <div>{editContent}</div>
          </Fade>
        </>
      )}
    </Stack>
  );
}
