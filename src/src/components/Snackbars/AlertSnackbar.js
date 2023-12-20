import { Alert, Snackbar } from "@mui/material";
import React, { useState } from "react";

export const AlertSnackbar = ({ open, flag, sx, message }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
    >
      <Alert severity={flag} sx={{ ...styles.main, ...sx }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

const styles = {
  main: { width: "100%" },
};
