import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { RED } from "../../../../utils/variables";

export const InvalidFieldsModal = ({ open, handleClose, invalidFields }) => {
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} sx={styles.myWidth}>
        <Grid sx={styles.bx}>
          <Typography sx={styles.title}>Error</Typography>
          <Typography sx={styles.title2}>
            Required fields are missing!
          </Typography>
        </Grid>
        <DialogContent>
          <Box>
            <Divider component="hr" />
            <Grid sx={styles.overflowBox}>
              {invalidFields.map((el) => {
                return (
                  <Grid sx={styles.headings}>
                    <Typography sx={styles.text1}>{el.label}</Typography>
                    <Typography sx={styles.text2}>{el.description}</Typography>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={styles.btnContainer}>
          <Button variant="contained" sx={styles.button2} onClick={handleClose}>
            Ok
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
  bx: {
    display: "flex",
    padding: "0px 40px 0 40px",
    margin: "24px 0 14px 0",
    gap: "20px",
    alignItems: "baseline",
  },
  button2: {
    width: "100px",
    borderRadius: "5px !important",
    background: "#4994EC",
    color: "#FFFFFF",
    height: "40px",
  },
  title: {
    padding: "0 !important",
    fontSize: "24px",
    fontWeight: "600",
    // margin: "14px 0 20px 0",
  },
  title2: {
    padding: "0 !important",
    fontSize: "16px !important",
    fontWeight: "500",
    color: RED,
  },
  text1: {
    fontSize: "16px !important",
    padding: "0 !important",
    fontWeight: 600,
  },
  text2: {
    fontSize: "16px !important",
    padding: "0 !important",
  },
  headings: {
    display: "flex",
    marginTop: "20px",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnContainer: {
    marginTop: "28px",
    marginBottom: "20px",
    padding: "0px 40px 0 40px !important",
    height: "48px",
  },
};
