import React, { useRef, useState } from "react";
import { Button, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Modal } from "./Modal";

export const SearchInputCustom = ({
  inputFields,
  resultOptions,
  onChange,
  onClickOk,
  onChangeCheckbox,
  label,
  name,
  value,
  error,
  required,
  disabled,
  onBlur,
  sx,
}) => {
  const [showModal, setShowModal] = useState(false);
  const ref = useRef();

  const onFocus = () => {
    setShowModal(true);
  };

  return (
    <>
      <TextField
        ref={ref}
        disabled={disabled}
        required={required}
        variant="outlined"
        id="outlined-read-only-input"
        label={label}
        sx={{ ...styles, ...sx }}
        name={name}
        value={value}
        size="small"
        error={error}
        // onClick={onFocus}
        onChange={onChange}
        onBlur={onBlur}
        onKeyUp={(event) => {
          if (event.key == "Enter") {
            onFocus();
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              sx={{
                marginRight: "0px !important",
                paddingLeft: "6px !important",
              }}
            >
              <Button
                onClick={disabled ? () => {} : onFocus}
                sx={{
                  width: "100%",
                  height: "50px",
                }}
              >
                {disabled ? null : <SearchIcon />}
              </Button>
            </InputAdornment>
          ),
        }}
      />
      {showModal ? (
        <Modal
          titleModal={label}
          inputFields={inputFields}
          resultOptions={resultOptions}
          open={showModal}
          handleClose={() => {
            ref.current.blur();
            setShowModal(false);
          }}
          onClickOk={() => {
            onClickOk(name);
            setTimeout(() => {
              setShowModal();
            }, 0);
          }}
          onChangeCheckbox={(e, i, optionsArr) =>
            onChangeCheckbox(e, i, name, optionsArr)
          }
        />
      ) : null}
    </>
  );
};

const styles = {
  // maxWidth: "350.5px",
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "5px",
  },
  "& .MuiInputBase-input": {
    height: "50px !important",
    fontSize: "14px !important",
  },
  "& .MuiInputBase-root": {
    height: "50px !important",
    paddingLeft: "0px",
    paddingRight: "0px",
  },
  "& .MuiFormLabel-root": {
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "20px",
    marginTop: "5px",
  },
  "& .MuiInputLabel-shrink": {
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "20px",
    marginTop: "0",
  },
  input: {
    color: "#30363C",
    backgroundColor: "#FFFFFF !important",
  },
};
