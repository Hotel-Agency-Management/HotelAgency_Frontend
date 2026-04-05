import { useRef, useState } from "react";
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddIcon from "@mui/icons-material/Add";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { BUTTON_GROUP_COMPACT_SPLIT_CLASS } from "@/core/theme/overrides/buttonGroup";
import { useImportRooms } from "../../hooks/useRoomStore";

type Props = {
  onOpenAddDialog: () => void;
};

export function RoomsPageHeader({ onOpenAddDialog }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: importRooms, isPending: isImporting } = useImportRooms();

  const closeMenu = () => setMenuOpen(false);

  const handleAdd = () => {
    closeMenu();
    onOpenAddDialog();
  };

  const handleImportPick = () => {
    closeMenu();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    importRooms(file);
    e.target.value = "";
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
    >
      <Typography variant="h5" fontWeight={700} component="h2">
        Rooms Management
      </Typography>

      <Stack direction="row" alignItems="center">
        <ButtonGroup
          variant="contained"
          ref={anchorRef}
          className={BUTTON_GROUP_COMPACT_SPLIT_CLASS}
        >
          <Button startIcon={<AddIcon />} onClick={handleAdd}>
            Add Room
          </Button>
          <Button
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            aria-label="More room actions"
          >
            <ArrowDropDownIcon fontSize="small" />
          </Button>
        </ButtonGroup>

        <Popper
          open={menuOpen}
          anchorEl={anchorRef.current}
          placement="bottom-end"
          transition
          disablePortal
          sx={(theme) => ({ zIndex: theme.zIndex.modal })}
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <Paper elevation={3}>
                <ClickAwayListener onClickAway={closeMenu}>
                  <MenuList dense autoFocusItem={menuOpen}>
                    <MenuItem onClick={handleAdd}>
                      <ListItemIcon>
                        <AddIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Add Single Room</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleImportPick} disabled={isImporting}>
                      <ListItemIcon>
                        <UploadFileIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>
                        {isImporting ? "Importing..." : "Import from Excel"}
                      </ListItemText>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Stack>

      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        hidden
        onChange={handleFileChange}
      />
    </Stack>
  );
}
