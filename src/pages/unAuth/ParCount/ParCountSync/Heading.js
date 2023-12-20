import React from "react";
import { Button, Grid } from "@mui/material";
import { PageHeading } from "../../../../components/TextUI/PageHeading";

export const Heading = ({ onCancel, onSave, isUpdate }) => {
  return (
    <Grid sx={styles.container}>
      <PageHeading text={"Par Sync Page"} />
      <Grid sx={styles.inputBox} spacing={2}>
        {/* <Grid sx={styles.buttonContainer}>
          <Button variant="contained" sx={styles.button} onClick={onSave}>
            {isUpdate ? "Update" : "Save"}
          </Button>
          <Button
            variant="contained"
            sx={{ ...styles.button, ...styles.resetBtn }}
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Grid> */}
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
  //   buttonContainer: {
  //     display: "flex",
  //     gap: "22px",
  //   },
  //   button: {
  //     minWidth: "100px",
  //     background: "#4994EC",
  //     borderRadius: "5px !important",
  //     color: "#FFFFFF",
  //     height: "50px",
  //     gap: "20px",
  //   },
  //   resetBtn: {
  //     background: "#E7E7E7",
  //     color: "#000000",
  //     "&:hover": {
  //       color: "white",
  //     },
  //   },
};
