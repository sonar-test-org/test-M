import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";

import { TextFieldCustom } from "../../../../components/TextFieldCustom/TextFieldCustom";
import { PageHeading } from "../../../../components/TextUI/PageHeading";
import { SearchInputCustom } from "../../../../components/SearchInputCustom";

export const Search = ({
  onChangeSearchInputMain,
  searchFields,
  onChangeCheckboxModal,
  onClickOk,
}) => {
  return (
    <Grid sx={styles.container}>
      <PageHeading text="Physical Count Search" />
      <Grid sx={styles.inputBox} spacing={2}>
        {Object.keys(searchFields).map((el, i) => {
          return (
            <SearchInputCustom
              inputFields={searchFields[el].fields}
              resultOptions={searchFields[el].resultOptions}
              sx={styles.input}
              label={searchFields[el].label}
              value={searchFields[el].value}
              name={searchFields[el].name}
              required={searchFields[el].required}
              error={searchFields[el].error}
              onChange={onChangeSearchInputMain}
              onChangeCheckbox={onChangeCheckboxModal}
              onClickOk={onClickOk}
            />
          );
        })}
        <Box sx={styles.input} />
        <Box sx={styles.input} />
      </Grid>
    </Grid>
  );
};

const styles = {
  inputBox: {
    display: "flex",
    gap: "30px",
    // justifyContent: "space-between",
    alignItems: "end",
    flexWrap: "wrap",
  },
  buttonContainer: {
    display: "flex",
    gap: "22px",
  },
  button: {
    height: "50px",
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
  input: {
    maxWidth: "390px",
    flex: "1 0 calc(33.33% - 30px)",
  },
};
