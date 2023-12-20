import React from "react";
import { Box, Grid } from "@mui/material";

import { TextFieldCustom } from "../../../../../components/TextFieldCustom/TextFieldCustom";
import { SelectDropdown } from "../../../../../components/SelectDropdown";
import { TimePickerCustom } from "../../../../../components/TimePickerCustom";
import { SearchInputCustom } from "../../../../../components/SearchInputCustom";

export const SetupDetail = ({
  inputs,
  onChange,
  onBlur,
  onClickOk,
  onChangeCheckbox,
}) => {
  return (
    <Box sx={styles.container}>
      <Grid sx={styles.inputContainer}>
        <TextFieldCustom
          label={inputs.serviceName.label}
          name={inputs.serviceName.name}
          value={inputs.serviceName.value}
          onChange={onChange}
          disabled={inputs.serviceName.disabled}
          error={inputs.serviceName.error}
          onBlur={onBlur}
        />
        <TextFieldCustom
          label={inputs.serviceType.label}
          name={inputs.serviceType.name}
          value={inputs.serviceType.value}
          onChange={onChange}
          disabled={inputs.serviceType.disabled}
          error={inputs.serviceType.error}
        />
        <SearchInputCustom
          label={inputs.tableName.label}
          name={inputs.tableName.name}
          value={inputs.tableName.value}
          error={inputs.tableName.error}
          inputFields={inputs.tableName.fields}
          resultOptions={inputs.tableName.resultOptions}
          onChange={onChange}
          onClickOk={onClickOk}
          onChangeCheckbox={onChangeCheckbox}
          // sx={styles.input}
          // required
        />
        <SelectDropdown
          label={inputs.schedulerType.label}
          value={inputs.schedulerType.value}
          onChange={onChange}
          name={inputs.schedulerType.name}
          options={inputs.schedulerType.options}
          disabled={inputs.schedulerType.disabled}
          error={inputs.schedulerType.error}
        />

        <TimePickerCustom
          onChange={onChange}
          hourValue={inputs.hour.value}
          minuteValue={inputs.minute.value}
          secondsValue={inputs.seconds.value}
          hourError={inputs.hour.error}
          minuteError={inputs.minute.error}
          secondsError={inputs.seconds.error}
        />

        <SelectDropdown
          label={inputs.dataLocale.label}
          value={inputs.dataLocale.value}
          onChange={onChange}
          name={inputs.dataLocale.name}
          options={inputs.dataLocale.options}
          disabled={inputs.dataLocale.disabled}
          error={inputs.dataLocale.error}
        />
        <SelectDropdown
          label={inputs.parameterized.label}
          value={inputs.parameterized.value}
          onChange={onChange}
          name={inputs.parameterized.name}
          options={inputs.parameterized.options}
          disabled={inputs.parameterized.disabled}
          error={inputs.parameterized.error}
        />
        <SelectDropdown
          label={inputs.dataFormat.label}
          value={inputs.dataFormat.value}
          onChange={onChange}
          name={inputs.dataFormat.name}
          options={inputs.dataFormat.options}
          disabled={inputs.dataFormat.disabled}
          error={inputs.dataFormat.error}
        />
        <SelectDropdown
          label={inputs.isRefresh.label}
          value={inputs.isRefresh.value}
          onChange={onChange}
          name={inputs.isRefresh.name}
          disabled={inputs.isRefresh.disabled}
          options={inputs.isRefresh.options}
          error={inputs.isRefresh.error}
        />
        <TextFieldCustom
          label={inputs.reportPath.label}
          name={inputs.reportPath.name}
          value={inputs.reportPath.value}
          onChange={onChange}
          disabled={inputs.reportPath.disabled}
          error={inputs.reportPath.error}
        />
        <TextFieldCustom
          label={inputs.rootNode.label}
          name={inputs.rootNode.name}
          value={inputs.rootNode.value}
          onChange={onChange}
          disabled={inputs.rootNode.disabled}
          error={inputs.rootNode.error}
        />
        <div />
      </Grid>
    </Box>
  );
};

const styles = {
  container: {
    border: "1px solid rgba(224, 224, 224, 1)",
    padding: "20px",
    marginBottom: "60px",
  },
  customStylesHeading: {
    paddingTop: "20px",
  },
  inputContainer: {
    display: "flex",
    marginBottom: "20px",
    gap: "20px",
    flexWrap: "wrap",

    ">div": {
      flexBasis: "31%",
      flexGrow: "1",
      maxWidth: "33%",
    },
  },
  endWrapper: {
    gap: "52px",
    justifyContent: "start",
  },
  schedulerTypeWrapper: {
    display: "flex",
    gap: "6px",
  },
};
