import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";

export function TaskFilters() {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} gap={1.5} flexWrap="wrap">
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel>Status</InputLabel>
        <Select value="" label="Status">
          <MenuItem value="">All Statuses</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 170 }} >
        <InputLabel>Employee</InputLabel>
        <Select value="" label="Employee">
          <MenuItem value="">All Employees</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 130 }} >
        <InputLabel>Floor</InputLabel>
        <Select value="" label="Floor">
          <MenuItem value="">All Floors</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
