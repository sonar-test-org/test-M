import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ListSubheader } from "@mui/material";

export const SelectDropdown = ({
  label,
  value,
  onChange,
  name,
  options,
  error,
  sx,
  disabled,
  required,
  onBlur,
}) => {
  return (
    <Box sx={{ ...styles.container, ...sx }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          {label} {required ? "*" : ""}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          error={error}
          disabled={disabled}
          required={required}
        >
          {options.map((option) => {
            if (option.category) {
              return <ListSubheader>{option.label}</ListSubheader>
            }
            if (typeof option === "string" || typeof option === "number") {
              return <MenuItem value={option}>{option}</MenuItem>;
            } else {
              return <MenuItem value={option.value}>{option.label}</MenuItem>;
            }
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

const styles = {
  container: {
    width: "100%",
    "& .MuiListSubheader-root": {
      color: 'red !important'
    },
    "& .uiListSubheader-sticky": {
      color: 'red !important'
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: "5px !important",
    },
    "& .MuiOutlinedInput-root": {
      height: "50px",
    },
    "& .MuiFormLabel-root": {
      fontWeight: "400",
      fontSize: "14px !important",
      lineHeight: "20px",
      marginTop: "0px !important",
    },
    "& .MuiInputLabel-shrink": {
      fontWeight: "400",
      fontSize: "14px !important",
      lineHeight: "20px",
      marginTop: "0",
    },
    "& .MuiSelect-select": {
      background: "#fff !important",
      fontSize: "14px !important",
    },
  },
};

//  MuiListSubheader-gutters MuiListSubheader-sticky css-15vc56k-MuiListSubheader-root