import React from "react";
import { Grid } from "@mui/material";
import Input from "../UI/Input";

export const InputGroup = ({ inputs, onChange, asyncMethod }) => {
  return (
    <Grid sx={styles.container}>
      <Grid sx={styles.inputBox} spacing={2}>
        {inputs.map((el) => {
          return (
            <Input
              {...el}
              onChange={onChange}
              sx={styles.input}
              asyncMethod={asyncMethod}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

const styles = {
  inputBox: {
    display: "flex",
    gap: "30px",
    alignItems: "end",
    flexWrap: "wrap",
  },
  input: {
    flexBasis: "calc(33.33% - 30px)",
    maxWidth: "calc(33.33% - 20px)",
  },
};
