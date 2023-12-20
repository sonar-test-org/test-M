import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton } from "@mui/material";
import Button from "../Button";
// import Button from "../Button";

export const ConfirmDeletePopupButton = ({
  recordTitle,
  btnText,
  onClick = () => {},
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    console.log("my delete", event);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick}>
        {/* <ClearIcon sx={{ ...styles.icon, color: "red" }} /> */}
        <Button variant="delete">{btnText}</Button>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={styles.body}>
          <Typography sx={styles.title}>
            Are you sure you want to remove{" "}
            {recordTitle ? (
              <span style={styles.bold}>{recordTitle}</span>
            ) : (
              "this Record"
            )}
            ?
          </Typography>
          <Box sx={styles.btnContainer}>
            <Button
              onClick={handleClose}
              //   sx={styles.buttons}
              variant="secondary"
            >
              No
            </Button>
            <Button
              //   sx={styles.buttons}
              onClick={() => {
                onClick();
                handleClose();
              }}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Popover>
    </div>
  );
};

const styles = {
  icon: {
    width: "18px",
    height: "18px",
  },
  body: {
    width: "400px",
    minHeight: "60px",
    padding: "20px",
  },
  title: {
    fontWeight: 500,
    fontSize: "18px !important",
    lineHeight: "30px",
    textAlign: "center",
    color: "#000000",
    textAlign: "left",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  buttons: {
    height: "40px",
  },
  bold: {
    fontWeight: "bold",
  },
};
