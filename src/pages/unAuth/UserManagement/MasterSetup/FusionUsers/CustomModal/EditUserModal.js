import { Box } from "@mui/material";
import React from "react";
import { TextFieldCustom } from "../../../../../../components/TextFieldCustom/TextFieldCustom";

export const EditUserModal = ({
  onChange,
  editFusionUserInputs,
  onClickInput,
}) => {
  return (
    <Box sx={styles.container}>
      {editFusionUserInputs.map((el) => {
        return (
          <TextFieldCustom
            label={el.label}
            name={el.name}
            sx={styles.input}
            value={el.value}
            onChange={onChange}
            InputProps={{
              readOnly: true,
            }}
            onClick={onClickInput}
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
