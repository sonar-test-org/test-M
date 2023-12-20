import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const Loader = ({ loading, children }) => {
  const stylesL = loading
    ? { ...styles.con, ...styles.loadongColors }
    : { ...styles.con };

  const blurStyles = loading ? styles.blur : {};

  return (
    <>
      {loading ? (
        <Box sx={stylesL}>
          <CircularProgress />
        </Box>
      ) : null}
      <Box sx={blurStyles}>{children}</Box>
    </>
  );
};

const styles = {
  con: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: "-1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loadongColors: {
    zIndex: "10000",
    background: "#216ba55e",
  },
  blur: {
    filter: "blur(4px)",
    "-webkit-filter": "blur(4px)",
  },
};
