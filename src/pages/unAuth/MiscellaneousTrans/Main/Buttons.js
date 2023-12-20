import { Grid } from "@mui/material";
import Button from "../../../../components/UI/Button";

export const Buttons = ({ onClickNext }) => {
  return (
    <Grid sx={styles.buttonContainer}>
      <Button onClick={() => onClickNext(true)}>Next</Button>
    </Grid>
  );
};

const styles = {
  buttonContainer: {
    display: "flex",
    gap: "22px",
    justifyContent: "flex-end",
    marginBottom: "62px",
    marginTop: "40px",
  },
};
