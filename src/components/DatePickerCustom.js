import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export const DatePickerCustom = ({
  value,
  label,
  handleChangeDate,
  sx,
  error,
  name,
  disabled,
  required,
  disableFutureDates = () => {},
}) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3} sx={{ ...styles, ...sx }}>
        <DesktopDatePicker
          sx={{ ...sx, ...styles.main }}
          label={`${label}${required ? "*" : ""}` || ""}
          inputFormat="MM/DD/YYYY"
          value={value || null}
          onChange={handleChangeDate}
          renderInput={(params) => <TextField {...params} />}
          error={error}
          emptyLabel="Date"
          name={name}
          disabled={disabled}
          required={required}
          shouldDisableDate={disableFutureDates}
        />
      </Stack>
    </LocalizationProvider>
  );
};

const styles = {
  width: "100%",
  // maxWidth: "350.5px",
  "& .MuiFormLabel-root": {
    fontSize: "14px",
  },
  // MuiInputLabel-outlined
  "& .MuiOutlinedInput-input": {
    color: "#30363C !important",
    backgroundColor: "#FFFFFF !important",
  },
  "& .MuiInputBase-root": {
    backgroundColor: "#FFFFFF !important",
    borderRadius: "5px !important",
    height: "50px !important",
  },
  "& .MuiPickersArrowSwitcher-spacer": {
    width: "4px !important",
  },
  main: {
    "& .MuiPickersArrowSwitcher-spacer": {
      width: "4px !important",
    },
  },
  "& .MuiInputBase-input": {
    fontSize: "14px !important",
  },
};
