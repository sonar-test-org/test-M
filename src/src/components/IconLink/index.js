import React from "react";
import { Grid, Typography } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";

export const IconLink = ({ src, label, onClick }) => {
  return (
    <IconButton aria-label="delete" sx={styles.container} onClick={onClick}>
      <Typography style={styles.text}>{label}</Typography>
      {src}
    </IconButton>
  );
};

const styles = {
  container: { gap: "14px" },
  text: {
    color: "#30363C",
  },
  icon: { width: "20px", height: "20px" },
};
