import React from "react";
import { Box, Typography } from "@mui/material";
import packagejson from "../../../package.json";

export const AppVersion = () => {
  return (
    <Box
      style={{
        padding: 0,
      }}
    >
      <Typography style={{ margin: "2px", color: "grey", fontSize: "12px" }}>
        {"Version " + packagejson.version}
      </Typography>
    </Box>
  );
};
