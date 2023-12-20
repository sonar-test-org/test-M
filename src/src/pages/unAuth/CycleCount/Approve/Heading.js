import React from "react";
import { Box, Button, Typography } from "@mui/material";

export const Heading = ({ text, onClickApprove, onClickReject, disabled }) => {
  return (
    <Box sx={styles.con}>
      <Typography sx={styles.heading}>{text}</Typography>
      <Box sx={styles.flex}>
        <Button variant="contained" sx={styles.button} onClick={onClickApprove} disabled={disabled}>
          Approve
        </Button>
        <Button variant="contained" sx={styles.button} onClick={onClickReject} disabled={disabled}>
          Reject
        </Button>
      </Box>
    </Box>
  );
};

const styles = {
  con: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontWeight: "600 !important",
    marginBottom: "30px !important",
    marginTop: "30px !important",
    fontSize: "30px !important",
  },
  button: {
    minWidth: "100px",
    background: "#4994EC",
    borderRadius: "5px !important",
    color: "#FFFFFF",
    gap: "6px",
    height: "50px",
  },
  flex: {
    display: "flex",
    gap: "22px",
  },
};
