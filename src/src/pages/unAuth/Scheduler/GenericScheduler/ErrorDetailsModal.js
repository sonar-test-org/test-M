import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid, Typography } from "@mui/material";

export const ErrorDetailsModal = ({ open, handleClose, data }) => {
  return (
    <Dialog open={open} onClose={handleClose} sx={styles.con}>
      <DialogTitle sx={styles.title}>Exception Message</DialogTitle>
      <DialogContent>
        <Box>
          <Grid sx={styles.wrp}>
            <Typography sx={styles.bold1}>Exception Id</Typography>
            <Typography sx={styles.bold}>
              {data.exceptionId || "N/A"}
            </Typography>
          </Grid>
          <Grid sx={styles.wrp}>
            <Typography sx={styles.bold1}>Class Name</Typography>
            <Typography sx={styles.bold}>{data.beanName || "N/A"}</Typography>
          </Grid>
          <Grid sx={styles.wrp}>
            <Typography sx={styles.bold1}>Method Name</Typography>
            <Typography sx={styles.bold}>{data.methodName || "N/A"}</Typography>
          </Grid>
          <Grid sx={styles.wrp}>
            <Typography sx={styles.bold1}>Error Message</Typography>
            <Typography sx={styles.bold}>
              {data.errorMessage || "N/A"}
            </Typography>
          </Grid>
          <Grid sx={styles.wrp}>
            <Typography sx={styles.bold1}>Created On</Typography>
            <Typography sx={styles.bold}>
              {data.createdDateTime || "N/A"}
            </Typography>
          </Grid>
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
  input: {
    color: "#30363C",
    backgroundColor: "#FFFFFF !important",
  },
  bold: {
    fontWeight: 400,
    fontSize: "18px !important",
    width: "600px",
    lineHeight: "31px",
    // alignItems: "flex-start",
  },
  bold1: {
    fontWeight: 600,
    fontSize: "18px !important",
    width: "200px",
  },
  wrp: {
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
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
