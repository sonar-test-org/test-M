import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid, Typography } from "@mui/material";
import { CustomTableInfo } from "./CustomTableInfo";

export const InfoModal = ({ open, handleClose, data }) => {
  return (
    <Dialog open={open} onClose={handleClose} sx={styles.con}>
      <DialogTitle sx={styles.title}>Information</DialogTitle>
      <DialogContent>
        <Box>
          <CustomTableInfo tableData={data} />
        </Box>
      </DialogContent>
      <DialogActions sx={styles.btnContainer}>
        <Button variant="contained" sx={styles.button} onClick={handleClose}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const styles = {
  con: {
    "& .MuiPaper-root": {
      width: "900px",
      maxWidth: "1000px",
    },
  },
  title: {
    fontWeight: 600,
    marginBottom: "40px",
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
};
