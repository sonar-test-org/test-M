import { Box, Grid, Typography } from "@mui/material";

export const StatusContainer = ({ status }) => {
  return (
    <Box sx={styles.container}>
      <Grid sx={styles.side}>
        <Typography sx={styles.bold}>Cycle Count Name</Typography>
        <Typography sx={styles.normal}>{status.name}</Typography>
      </Grid>
      <Grid sx={styles.side}>
        <Typography sx={styles.bold}>Status</Typography>
        <Typography sx={styles.normal}>{status.status}</Typography>
      </Grid>
    </Box>
  );
};

const styles = {
  container: {
    marginBottom: "30px",
    marginTop: "22px",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
    padding: "10px",
  },
  side: {
    display: "flex",
    marginBottom: "4px",
  },
  bold: {
    width: "350px",
    fontWeight: "600",
    fontSize: "22px !important",
  },
  normal: {
    fontSize: "22px !important",
  },
};
