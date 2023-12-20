import React from "react";
import { Typography } from "@mui/material";

export const PageHeading = ({ text }) => {
  return <Typography sx={styles.heading}>{text}</Typography>;
};

const styles = {
  heading: {
    fontWeight: "600 !important",
    marginBottom: "30px !important",
    marginTop: "30px !important",
    fontSize: "30px !important",
  },
};
