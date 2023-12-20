import React from "react";
import { Button, Grid } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

import AddIcon from "@mui/icons-material/Add";
import { SearchInputCustom } from "../../../../components/SearchInputCustom";
import { PageHeading } from "../../../../components/TextUI/PageHeading";

export const CustomSearch = ({
  searchInput,
  onClickSearch,
  onClickResetFilter,
  disabledSearchBtn,
  onClickAddNew,
  onChangeOrgInputMain,
  onChangeCheckboxOrg,
  onClickOk,
  onClickSave,
  disableSave,
}) => {
  return (
    <Grid sx={styles.container}>
      <PageHeading text="PC Approval Setup EO" />
      <Grid sx={styles.inputBox} spacing={2}>
        {/* <TextFieldCustom
          label={searchInput.label}
          name={searchInput.name}
          value={searchInput.value}
          onChange={onChange}
          sx={{ maxWidth: "360px", flexGrow: 1 }}
        /> */}
        <SearchInputCustom
          inputFields={searchInput.fields}
          resultOptions={searchInput.resultOptions}
          sx={styles.input}
          label={searchInput.label}
          value={searchInput.value}
          name={searchInput.name}
          required
          error={searchInput.error}
          onChange={onChangeOrgInputMain}
          onChangeCheckbox={onChangeCheckboxOrg}
          onClickOk={onClickOk}
        />
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
          <Button
            variant="contained"
            sx={{ ...styles.button }}
            onClick={onClickAddNew}
          >
            Add New
            <AddIcon></AddIcon>
          </Button>
          <Button
            // variant="outlined"
            variant="contained"
            color="success"
            sx={{ ...styles.button }}
            onClick={onClickSave}
            disabled={disableSave}
          >
            Save and Update All
            <DoneIcon style={styles.headerIcon} />
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

const styles = {
  container: { paddingTop: "30px" },
  inputBox: { display: "flex", gap: "30px", justifyContent: "space-between" },
  buttonContainer: {
    display: "flex",
    gap: "22px",
  },
  button: {
    minWidth: "100px",
    height: "45px",
    // background: "#4994EC",
    borderRadius: "5px !important",
    // color: "#FFFFFF",
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
  headerIcon: {
    width: "26px",
  },
};
