import React from "react";
import { Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";

export const TransactionPriviledge = ({ data, onChangeTransPrv }) => {
  return (
    <Grid sx={styles.container}>
      <Typography sx={styles.heading}>User details</Typography>
      <Grid sx={styles.checkboxContainer}>
        {data.map((item) => {
          return (
            <FormControlLabel
              control={
                <Checkbox
                  checked={item.checked}
                  onChange={onChangeTransPrv}
                  name={item.name}
                />
              }
              label={item.label}
              sx={styles.checkbox}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

const styles = {
  container: {
    // borderBottom: "1px solid #A3ACB9",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
    marginBottom: "40px",
  },
  heading: {
    fontWeight: 500,
    fontSize: "24px",
    lineHeight: "110%",
    color: "#000000",
    marginBottom: "30px",
  },
  gridBox: {
    display: "flex",
    gap: "37px",
    marginBottom: "38px",
  },
  checkboxContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
  checkbox: {
    flexBasis: "25%",
    marginBottom: "28px",
    "& .MuiCheckbox-root": {
      paddingLeft: "9px !important",
      paddingRight: "13px !important",
    },
    "&.MuiFormControlLabel-root": {
      marginRight: 0,
    },
    "& .MuiSvgIcon-root": {
      width: "18px",
      height: "18px",
    },
    "& .MuiTypography-root": {
      fontSize: "16px",
    },
  },
};
