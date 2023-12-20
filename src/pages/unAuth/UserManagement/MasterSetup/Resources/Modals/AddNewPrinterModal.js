import React from "react";
import { Box } from "@mui/material";
import { TextFieldCustom } from "../../../../../../components/TextFieldCustom/TextFieldCustom";

export const AddNewPrinterModal = ({ onChange, addPrinterInputs }) => {
  return (
    <Box sx={styles.container}>
      {addPrinterInputs.map((el) => {
        return (
          <TextFieldCustom
            label={el.label}
            name={el.name}
            sx={styles.input}
            value={el.value}
            onChange={onChange}
            characterLimit={20}
          />
        );
      })}
    </Box>
  );
};

const styles = {
  container: {
    display: "flex",
    gap: "20px",
    "& .MuiFormControl-root": {
      margin: "10px 0 !important",
    },
  },
};
