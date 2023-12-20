import React from "react";
import { Grid, Typography } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";

export const MuiIconLink = ({ icon, label, onClick }) => {
  return (
    <IconButton aria-label="delete" sx={styles.container} onClick={onClick}>
      <Typography style={styles.text}>{label}</Typography>
      {/* <img src={src} style={styles.icon} /> */}
      {icon}
    </IconButton>
  );
};

const styles = {
  container: { gap: "10px" },
  text: {
    color: "#30363C",
  },
  icon: { width: "20px", height: "20px" },
};
