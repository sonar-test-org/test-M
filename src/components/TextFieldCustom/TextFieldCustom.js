import React from "react";
import { Button, TextField, IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const TextFieldCustom = ({
  label,
  name,
  value,
  onChange,
  error,
  required,
  disabled,
  onClick,
  onBlur,
  sx,
  search,
  onClickSearch,
  characterLimit,
  type,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const createAdorment = () => {
    if (search) {
      return (
        <InputAdornment position="end" sx={{ marginLeft: "0px !important" }}>
          <Button
            sx={{ padding: "0 !important", width: "100%", height: "50px" }}
          >
            <SearchIcon onClick={onClickSearch} />
          </Button>
        </InputAdornment>
      );
    } else if (type === "password") {
      return (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      );
    } else return;
  };

  return (
    <TextField
      disabled={disabled}
      required={required}
      variant="outlined"
      id="outlined-read-only-input"
      label={label}
      sx={{ ...styles, ...sx }}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      value={value}
      size="small"
      error={error}
      onClick={onClick}
      onBlur={onBlur}
      inputProps={{
        maxlength: characterLimit || null,
      }}
      InputProps={{
        endAdornment: createAdorment(),
      }}
      type={type == "password" ? (showPassword ? "text" : "password") : type}
    />
  );
};

const styles = {
  "& .MuiInputLabel-formControl": {
    color: "rgba(0, 0, 0, 0.6) !important",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "5px !important",
  },
  "& .MuiInputBase-input": {
    height: "50px !important",
    fontSize: "14px !important",
  },
  "& .MuiInputBase-root": {
    height: "50px !important",
    paddingLeft: "0px",
  },
  "& .MuiFormLabel-root": {
    fontWeight: "400 !important",
    fontSize: "14px !important",
    lineHeight: "20px !important",
    marginTop: "5px !important",
  },
  "& .MuiInputLabel-shrink": {
    fontWeight: "400 !important",
    fontSize: "14px !important",
    lineHeight: "20px !important",
    marginTop: "0 !important",
  },
  input: {
    color: "#30363C !important",
    backgroundColor: "#FFFFFF !important",
  },
};
