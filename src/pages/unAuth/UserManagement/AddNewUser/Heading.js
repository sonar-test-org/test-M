import React from "react";
import { Button, Grid, Typography } from "@mui/material";

export const Heading = ({
  onClickCancel,
  onClickAddOrUpdateUser,
  updateUser,
}) => {
  return (
    <Grid sx={styles.container}>
      <Typography sx={styles.heading}>
        {updateUser ? "Update User" : "Add New User"}
      </Typography>
      <Grid sx={styles.buttonContainer}>
        <Button
          variant="contained"
          sx={styles.button}
          onClick={onClickAddOrUpdateUser}
        >
          {updateUser ? "Update User" : "Add User"}
        </Button>
        <Button
          variant="contained"
          sx={{ ...styles.button, ...styles.cancelBtn }}
          onClick={onClickCancel}
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
};

const styles = {
  container: {
    paddingTop: "30px",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "40px",
  },
  buttonContainer: {
    display: "flex",
    gap: "22px",
  },
  heading: {
    fontWeight: "600",
    fontSize: "40px !important",
  },
  button: {
    background: "#4994EC",
    borderRadius: "5px !important",
    color: "#FFFFFF",
    width: "117px",
    height: "48px",
  },
  cancelBtn: {
    background: "#E7E7E7",
    color: "#000000",
    width: "111px",
  },
};
