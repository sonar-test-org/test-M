import { Box, Typography } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

export const ErrorCapsule = ({ message }) => {
  return (
    <Box sx={styles.con}>
      <TaskAltIcon sx={styles.icon} />
      <Typography sx={styles.message}>{message}</Typography>
    </Box>
  );
};

const styles = {
  con: {
    height: "48px",
    borderRadius: "4px",
    backgroundColor: "rgb(237, 247, 237)",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "6px 16px",
  },
  message: {
    color: "rgb(95, 33, 32)",
    fontSize: "14px !important",
    fontFamily: "Inter,Arial,sans-serif",
    fontWeight: 400,
    lineHeight: 1.43,
    maxHeight: '100%',
    'overflow-y': 'auto',
  },
  icon: {
    width: "22px",
    height: "22px",
    color: "#d32f2f",
  },
};
