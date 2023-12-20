import { Alert, Box, Snackbar } from "@mui/material";
import { ErrorCapsule, SuccessCapsule } from "./Capsules";
import { Fragment, useEffect, useState } from "react";
import { ERROR, SUCCESS } from "../../../utils/variables";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export const MultiAlerts = ({ alerts, open }) => {
  const [openPrivate, setOpenPrivate] = useState(false);

  useEffect(() => {
    if (alerts.length) {
      setOpenPrivate(true);
    }
  }, [alerts]);

  const onClose = () => {
    setOpenPrivate(false);
  };

  const generateAlerts = (alert) => {
    switch (alert.flag) {
      case SUCCESS:
        return <SuccessCapsule message={alert.message} />;

      case ERROR:
        return <ErrorCapsule message={alert.message} />;
      default:
        return;
    }
  };
  return (
    <>
      {open && openPrivate ? (
        <Box sx={styles.con}>
          <HighlightOffIcon sx={styles.closeIcon} onClick={onClose} />
          {alerts.map(generateAlerts)}
        </Box>
      ) : null}
    </>
  );
};

const styles = {
  con: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    zIndex: "100",
    padding: "20px",
  },
  closeIcon: {
    position: "absolute",
    cursor: "pointer",
    top: '6px',
    right: '8px'
  },
};
