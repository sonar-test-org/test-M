import { Grid } from "@mui/material";
import Button from "../Button";
import { TextFieldCustom } from "../../TextFieldCustom/TextFieldCustom";

export const FilterLookup = ({
  inputs,
  onChangeInputs,
  onSearch,
  onResetModal,
}) => {
  return (
    <Grid
      sx={{
        ...styles.inputContainer,
        display: inputs.length ? "flex" : "none",
      }}
    >
      {inputs.map((el, i) => (
        <TextFieldCustom
          label={el.label}
          name={el.name}
          value={el.value}
          onChange={(e) => onChangeInputs(e, i)}
        />
      ))}
      <Grid sx={styles.buttonContainer}>
        <Button onClick={onSearch}>Search</Button>
        <Button variant="reset" onClick={onResetModal}>
          Reset
        </Button>
      </Grid>
    </Grid>
  );
};

const styles = {
  inputContainer: {
    display: "flex",
    gap: "30px",
    marginTop: "29px",
  },
  buttonContainer: {
    display: "flex",
    gap: "22px",
    justifyContent: "end",
    marginBottom: "30px",
    height: "40px",
  },
};
