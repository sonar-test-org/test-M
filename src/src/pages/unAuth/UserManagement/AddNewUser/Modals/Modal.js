import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export const Modal = ({ title, open, setOpen, modalBody, onClickOk }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} sx={styles.myWidth}>
        <DialogTitle sx={styles.title}>{title}</DialogTitle>
        <DialogContent>{modalBody}</DialogContent>
        <DialogActions sx={styles.btnContainer}>
          <Button variant="contained" sx={styles.button} onClick={onClickOk}>
            Ok
          </Button>
          <Button
            variant="contained"
            sx={{ ...styles.button, ...styles.closeBtn }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

const styles = {
  myWidth: {
    "& .MuiPaper-root": {
      width: "674px",
      maxWidth: "674px",
      background: "#FFFFFF",
      boxShadow: "0px 0px 50px rgb(0 0 0 / 15%)",
      borderRadius: "20px",
    },
    "& .MuiTypography-root": {
      fontSize: "32px",
      padding: "40px 40px 0 40px",
    },
    ".MuiDialogContent-root": {
      padding: "0px 40px 0 40px",
    },
  },
  button: {
    background: "#4994EC",
    borderRadius: "5px !important",
    color: "#FFFFFF",
    height: "40px",
  },
  closeBtn: {
    background: "#E7E7E7",
    color: "#000000",
  },
  btnContainer: {
    marginTop: "24px",
    marginBottom: "24px",
    padding: "0px 40px 0 40px !important",
    height: "48px",
  },
};
