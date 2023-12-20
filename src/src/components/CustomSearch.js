import React from "react";
import { Button, Grid, Typography } from "@mui/material";

import { TextFieldCustom } from "./TextFieldCustom/TextFieldCustom";
import { PageHeading } from "./TextUI/PageHeading";
import AddIcon from "@mui/icons-material/Add";

export const CustomSearch = ({
  searchInputs,
  onChange,
  onClickSearch,
  onClickResetFilter,
  disabledSearchBtn,
  master,
  addNew,
  onClickAddNew,
  onClickMaster,
}) => {
  return (
    <Grid sx={styles.container}>
      <PageHeading text="User Management" />
      <Grid sx={styles.inputBox} spacing={2}>
        {searchInputs.map((input) => {
          return (
            <TextFieldCustom
              label={input.label}
              name={input.name}
              value={input.value}
              onChange={onChange}
              sx={{ maxWidth: "360px", flexGrow: 1 }}
              characterLimit={30}
            />
          );
        })}
        <Grid sx={styles.buttonContainer}>
          <Button
            variant="contained"
            sx={styles.button}
            onClick={onClickSearch}
            disabled={disabledSearchBtn}
          >
            Search
          </Button>
          <Button
            variant="contained"
            sx={{ ...styles.button, ...styles.resetBtn }}
            onClick={onClickResetFilter}
          >
            Reset
          </Button>
          {master ? (
            <Button
              variant="contained"
              sx={{ ...styles.button, ...styles.resetBtn }}
              onClick={onClickMaster}
            >
              Master
            </Button>
          ) : null}
          {addNew ? (
            <Button
              variant="contained"
              sx={{ ...styles.button }}
              onClick={onClickAddNew}
            >
              Add New
              <AddIcon></AddIcon>
            </Button>
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  );
};

const styles = {
  // container: { paddingTop: "30px" },
  inputBox: { display: "flex", gap: "30px", justifyContent: "space-between" },
  buttonContainer: {
    display: "flex",
    gap: "22px",
  },
  button: {
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
};
