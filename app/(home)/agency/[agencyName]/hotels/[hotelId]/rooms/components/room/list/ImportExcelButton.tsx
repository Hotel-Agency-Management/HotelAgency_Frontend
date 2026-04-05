import { useRef } from "react";
import { Button, CircularProgress } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useImportRooms } from "../../../hooks/useRoomStore";


export const ImportExcelButton = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useImportRooms();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    mutate(file);
    e.target.value = "";
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls"
        hidden
        onChange={handleFileChange}
      />
      <Button
        variant="outlined"
        startIcon={isPending ? <CircularProgress size={16} /> : <UploadFileIcon />}
        onClick={() => inputRef.current?.click()}
        disabled={isPending}
      >
        Import Excel
      </Button>
    </>
  );
};
