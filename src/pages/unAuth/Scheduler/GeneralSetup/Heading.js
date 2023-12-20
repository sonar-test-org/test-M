import React from "react";
import { Button, Grid } from "@mui/material";
import { PageHeading } from "../../../../components/TextUI/PageHeading";

export const Heading = ({ onCreateNewSetup }) => {
  return (
    <Grid sx={styles.container}>
      <PageHeading text="General Setup" />
      <Grid sx={styles.buttonContainer}>
        <Button
          variant="contained"
          sx={styles.button}
          onClick={onCreateNewSetup}
        >
          Create New Setup
        </Button>
      </Grid>
    </Grid>
  );
};

const styles = {
  container: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  inputBox: { display: "flex", gap: "30px" },
  buttonContainer: {
    display: "flex",
    gap: "22px",
  },
  button: {
    minWidth: "100px",
    background: "#4994EC",
    borderRadius: "5px !important",
    color: "#FFFFFF",
    height: "50px",
    gap: "20px",
  },
};
