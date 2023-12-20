import { Button, Grid } from "@mui/material";

export const ButtonWrapper = ({ onClickSearch, onClickResetMain }) => {
  return (
    <Grid sx={styles.buttonContainer}>
      {/* <Grid sx={styles.btnCon2}></Grid> */}
      <Grid sx={styles.btnCon2}>
        <Button variant="contained" sx={styles.button} onClick={onClickSearch}>
          Search
        </Button>
        <Button
          variant="contained"
          sx={{ ...styles.button, ...styles.resetBtn }}
          onClick={onClickResetMain}
        >
          Reset
        </Button>
      </Grid>
    </Grid>
  );
};

const styles = {
  buttonContainer: {
    display: "flex",
    gap: "22px",
    marginTop: "40px",
    justifyContent: "space-between",
  },
  button: {
    height: "40px",
    minWidth: "100px",
    background: "#4994EC",
    borderRadius: "5px !important",
    color: "#FFFFFF",
    gap: "6px",
  },
  resetBtn: {
    background: "#E7E7E7",
    color: "#000000",
    "&:hover": {
      color: "white",
    },
  },
  btnCon2: {
    display: "flex",
    gap: "22px",
  },
};
