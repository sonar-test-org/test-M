import React from "react";
import { Grid, Typography } from "@mui/material";
import { TextFieldCustom } from "../../../../components/TextFieldCustom/TextFieldCustom";
import { DatePickerCustom } from "../../../../components/DatePickerCustom";
import { SelectDropdown } from "../../../../components/SelectDropdown";

export const Search = ({ inputs, onChange }) => {
  const onChangeDate = (value, name) => {
    const e = { target: { value, name } };
    onChange(e);
  };

  return (
    <Grid sx={styles.container}>
      {/* <Typography sx={styles.heading}>Search</Typography> */}
      <Grid sx={styles.gridBox}>
        <TextFieldCustom
          label={inputs.item.label}
          name={"item"}
          value={inputs.item.value}
          onChange={onChange}
          sx={{ flexGrow: 1 }}
        />
        <DatePickerCustom
          label={inputs.fromTransactionDate.label}
          value={inputs.fromTransactionDate.value}
          handleChangeDate={(value) => {
            onChangeDate(value, "fromTransactionDate");
          }}
          sx={{ flexGrow: 1 }}
          required
        />
        <DatePickerCustom
          label={inputs.toTransactionDate.label}
          value={inputs.toTransactionDate.value}
          handleChangeDate={(value) => {
            onChangeDate(value, "toTransactionDate");
          }}
          sx={{ flexGrow: 1 }}
        />
        <TextFieldCustom
          label={inputs.itemDescription.label}
          name={"itemDescription"}
          value={inputs.itemDescription.value}
          onChange={onChange}
          sx={{ flexGrow: 1 }}
        />
        <TextFieldCustom
          label={inputs.documentNumber.label}
          name={"documentNumber"}
          value={inputs.documentNumber.value}
          onChange={onChange}
          sx={{ flexGrow: 1 }}
        />
        <SelectDropdown
          label={inputs.transactionType.label}
          value={inputs.transactionType.value}
          onChange={onChange}
          name={"transactionType"}
          options={inputs.transactionType.options || []}
          sx={{ flexGrow: 1 }}
        />
        <SelectDropdown
          label={inputs.documentType.label}
          value={inputs.documentType.value}
          onChange={onChange}
          name={"documentType"}
          options={inputs.documentType.options || []}
          sx={{ flexGrow: 1 }}
        />
      </Grid>
    </Grid>
  );
};

const styles = {
  container: {
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
    marginBottom: "40px",
  },
  // heading: {
  //   fontWeight: 500,
  //   fontSize: "24px",
  //   lineHeight: "110%",
  //   color: "#000000",
  //   marginBottom: "28px",
  //   marginBottom: "30px !important",
  //   fontSize: "24px !important",
  // },
  gridBox: {
    display: "flex",
    gap: "37px",
    marginBottom: "38px",
    flexWrap: 'wrap',

    ">div": {
      width: "25% !important",
      maxWidth: "25% !important",
    },
  },
};
