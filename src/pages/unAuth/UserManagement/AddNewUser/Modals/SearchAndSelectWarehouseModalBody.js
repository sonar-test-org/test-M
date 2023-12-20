import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import { TextFieldCustom } from "../../../../../components/TextFieldCustom/TextFieldCustom";

export const SearchAndSelectWarehouseModalBody = ({
  handleChangeSelectWarehouse,
  warehouseList,
  onClickSearchWarehouse,
  inputsWarehouse,
  onChangeSearchWarehouseInputs,
  onClickReset,
  onChangeCheckAll,
  allWarehousesChecked,
}) => {
  return (
    <Box>
      <Grid sx={styles.inputContainer}>
        {inputsWarehouse.map((el) => (
          <TextFieldCustom
            label={el.label}
            name={el.name}
            value={el.value}
            onChange={onChangeSearchWarehouseInputs}
            characterLimit={30}
          />
        ))}
      </Grid>
      <Grid sx={styles.buttonContainer}>
        <Button
          variant="contained"
          sx={styles.button}
          onClick={onClickSearchWarehouse}
        >
          Search
        </Button>
        <Button
          variant="contained"
          sx={{ ...styles.button, ...styles.resetBtn }}
          onClick={onClickReset}
        >
          Reset
        </Button>
      </Grid>
      <Divider component="hr" />
      <Grid sx={styles.warehouseHeaders}>
        <Checkbox
          checked={allWarehousesChecked}
          onChange={onChangeCheckAll}
          inputProps={{ "aria-label": "controlled" }}
        />
        <Typography sx={styles.headerWarehouse}>Warehouse</Typography>
        <Typography sx={styles.headerWarehouse}>Warehouse Code</Typography>
      </Grid>
      <Divider component="hr" />
      <Grid sx={styles.overflowBox}>
        {warehouseList.map((el) => {
          const searchedStyles = el.searched ? styles.searched : {};
          return (
            <Grid
              sx={{ ...styles.warehouseListContainer1, ...searchedStyles }}
              key={el.warehouseCode}
            >
              <Grid sx={styles.warehouseListContainer2}>
                <Checkbox
                  checked={el.checked}
                  onChange={handleChangeSelectWarehouse}
                  inputProps={{ "aria-label": "controlled" }}
                  name={el.warehouseCode}
                />
                <Typography sx={styles.list1}>{el.warehouse}</Typography>
                <Typography sx={styles.list2}>{el.warehouseCode}</Typography>
              </Grid>
              <Divider component="hr" />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

const styles = {
  headings: {
    display: "flex",
    marginTop: "40px",
    // marginBottom: "29px",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchText: {
    fontWeight: 500,
    fontSize: "20px !important",
    color: "#000000",
    padding: "0 !important",
  },
  advancedText: {
    fontWeight: 600,
    fontSize: "14px !important",
    textDecorationLine: "underline",
    color: "#124590",
    padding: "0 !important",
    cursor: "pointer",
  },
  inputContainer: {
    display: "flex",
    gap: "30px",
    marginBottom: "20px",
    marginTop: "29px",
  },
  buttonContainer: {
    display: "flex",
    gap: "22px",
    justifyContent: "end",
    marginBottom: "30px",
    height: "40px",
  },
  button: {
    width: "100px",
    background: "#4994EC",
    borderRadius: "5px !important",
    color: "#FFFFFF",
  },
  resetBtn: {
    background: "#E7E7E7",
    color: "#000000",
  },
  warehouseHeaders: {
    margin: "20px 0",
    display: "flex",
    alignItems: "center",
  },
  headerWarehouse: {
    fontWeight: "700",
    fontSize: "16px !important",
    lineHeight: "20px",
    color: "#30363C",
    width: "200px",
    padding: "0 !important",
  },
  warehouseListContainer1: {
    height: "60px",
  },
  warehouseListContainer2: {
    height: "60px",
    display: "flex",
    alignItems: "center",
  },
  list1: {
    fontweight: 400,
    fontSize: "16px !important",
    lineHeight: "20px",
    color: "#30363C",
    width: "200px",
    padding: "0 !important",
  },
  list2: {
    fontWeight: 400,
    fontSize: "16px !important",
    lineHeight: "20px",
    color: "#000000",
    padding: "0 !important",
  },
  overflowBox: {
    overflow: "auto",
    height: "30vh",
  },
  searched: {
    background: "#d8e9ff7a",
  },
};
