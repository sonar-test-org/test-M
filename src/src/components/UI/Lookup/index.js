import React, { useRef, useState } from "react";
import { Button, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { LookupModal } from "./LookupModal";

export const Lookup = ({
  rows,
  onChange,

  label,
  name,
  value,
  valueKey,

  error,
  required,
  disabled,
  onBlur,
  sx,

  // async
  isAsyncMethod = false,
  asyncMethod,
}) => {
  const ref = useRef();

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFocus = () => {
    setShowModal(true);
  };

  const onClickSearch = async (e) => {
    if (isAsyncMethod && value.length < 4) return;
    onFocus(e);

    if (isAsyncMethod) {
      setLoading(true);
      await asyncMethod({ target: { name, value } });
      setLoading(false);
    }
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
        onChange={onChange}
        onBlur={onBlur}
        onKeyUp={(event) => {
          if (event.key == "Enter") {
            onFocus(event);
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
              {disabled ? (
                <SearchIcon sx={{ opacity: 0.5, marginRight: "16px" }} />
              ) : (
                <Button
                  onClick={onClickSearch}
                  sx={{
                    width: "100%",
                    height: "50px",
                  }}
                >
                  <SearchIcon sx={{ color: error ? "#d32f2f" : "inherit" }} />
                </Button>
              )}
            </InputAdornment>
          ),
        }}
      />
      {showModal ? (
        <LookupModal
          titleModal={label}
          rows={rows.map((el, i) => ({ ...el, _id: i + 1 }))}
          open={showModal}
          name={name}
          value={value}
          valueKey={valueKey || name || ""}
          handleClose={() => {
            ref.current.blur();
            setShowModal(false);
          }}
          onClickOk={(e, type, extraData) => {
            onChange(e, type, extraData, isAsyncMethod);
            setTimeout(() => {
              setShowModal();
            }, 0);
          }}
          isAsyncMethod={isAsyncMethod}
          loading={loading}
          setLoading={setLoading}
        />
      ) : null}
    </>
  );
};

const styles = {
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
