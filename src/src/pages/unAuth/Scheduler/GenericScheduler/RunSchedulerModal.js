import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid, Typography } from "@mui/material";
import { SelectDropdown } from "../../../../components/SelectDropdown";
import { TimePickerCustom } from "../../../../components/TimePickerCustom";

export const RunSchedulerModal = ({
  open,
  handleClose,
  handleOk,
  scheduleInputs,
  onChange,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} sx={styles.con}>
      <DialogTitle sx={styles.title}>Schedule</DialogTitle>
      <DialogContent>
        <Box sx={styles.boxy}>
          <SelectDropdown
            label={scheduleInputs.schedulerType.label}
            value={scheduleInputs.schedulerType.value}
            onChange={onChange}
            name={scheduleInputs.schedulerType.name}
            options={scheduleInputs.schedulerType.options}
            disabled={scheduleInputs.schedulerType.disabled}
            error={scheduleInputs.schedulerType.error}
          />

          <TimePickerCustom
            onChange={onChange}
            hourValue={scheduleInputs.hour.value}
            minuteValue={scheduleInputs.minute.value}
            secondsValue={scheduleInputs.seconds.value}
            hourError={scheduleInputs.hour.error}
            minuteError={scheduleInputs.minute.error}
            secondsError={scheduleInputs.seconds.error}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={styles.btnContainer}>
        <Button variant="contained" sx={styles.button} onClick={handleOk}>
          Ok
        </Button>
        <Button
          variant="contained"
          sx={{ ...styles.button, ...styles.resetBtn }}
          onClick={handleClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const styles = {
  con: {
    "& .MuiPaper-root": {
      width: "600px",
      maxWidth: "1000px",
    },
  },
  title: {
    fontWeight: 600,
    marginBottom: "8px",
    fontSize: "24px !important",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "5px",
  },
  "& .MuiInputBase-input": {
    height: "50px !important",
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
  button: {
    minWidth: "100px",
    background: "#4994EC",
    borderRadius: "5px !important",
    color: "#FFFFFF",
    height: "50px",
    gap: "20px",
    marginRight: "20px",
    marginBottom: "20px",
  },
  resetBtn: {
    background: "#E7E7E7",
    color: "#000000",
    "&:hover": {
      color: "white",
    },
  },
  boxy: {
    padding: "8px 0",
    gap: "20px",
    display: "flex",
    flexDirection: "column",
  },
};
