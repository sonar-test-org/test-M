import Snackbar from "@mui/material/Snackbar";
import React from "react";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const CustomSnackbar = (props) => {
  const { snackbarFlag, msz, type, setSnakeBarProps } = props;
  const [open, setOpen] = React.useState(snackbarFlag);

  const handleClose = (event, reason) => {
    setSnakeBarProps && setSnakeBarProps({});
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        sx={{ width: "100%", alignItems: "center" }}
      >
        {msz}
      </Alert>
    </Snackbar>
  );
};
