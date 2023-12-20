import { Box, Typography } from "@mui/material";
import { DatePickerCustom } from "../../../../components/DatePickerCustom";
import { SelectDropdown } from "../../../../components/SelectDropdown";
import { TextFieldCustom } from "../../../../components/TextFieldCustom/TextFieldCustom";
import { ButtonWrapper } from "./ButtonWrapper";

export const Search = ({ searchInputs, onChange, handleChangeDate }) => {
  return (
    <Box sx={styles.container1}>
      <Typography sx={styles.heading}>Search</Typography>
      <Box sx={styles.container2}>
        <TextFieldCustom
          label={searchInputs.itemNumber.label}
          name="itemNumber"
          value={searchInputs.itemNumber.value}
          onChange={onChange}
          error={searchInputs.error}
          disabled={searchInputs.disabled}
          sx={styles.input}
          characterLimit={30}
        />

        <DatePickerCustom
          label={searchInputs.fromSyncDate.label}
          value={searchInputs.fromSyncDate.value}
          handleChangeDate={(value) => {
            handleChangeDate(value, "fromSyncDate");
          }}
          // error={searchInputs.fromSyncDate.error}
          sx={styles.input}
        />
        <DatePickerCustom
          label={searchInputs.toSyncDate.label}
          value={searchInputs.toSyncDate.value}
          handleChangeDate={(value) => {
            handleChangeDate(value, "toSyncDate");
          }}
          // error={searchInputs.toSyncDate.error}
          sx={styles.input}
        />
        <SelectDropdown
          label={searchInputs.organizationCode.label}
          value={searchInputs.organizationCode.value}
          onChange={onChange}
          name={searchInputs.organizationCode.name}
          options={searchInputs.organizationCode.options}
          required={searchInputs.organizationCode.required}
          sx={styles.input}
        />
        <SelectDropdown
          label={searchInputs.status.label}
          value={searchInputs.status.value}
          onChange={onChange}
          name={searchInputs.status.name}
          options={searchInputs.status.options}
          sx={styles.input}
        />
        <SelectDropdown
          label={searchInputs.subInventory.label}
          value={searchInputs.subInventory.value}
          onChange={onChange}
          name={searchInputs.subInventory.name}
          options={searchInputs.subInventory.options}
          required={searchInputs.subInventory.required}
          sx={styles.input}
        />

        <TextFieldCustom
          label={searchInputs.fusionResponse.label}
          name={searchInputs.fusionResponse.name}
          value={searchInputs.fusionResponse.value}
          onChange={onChange}
          error={searchInputs.error}
          disabled={searchInputs.disabled}
          sx={styles.input}
        />
        <SelectDropdown
          label={searchInputs.syncBy.label}
          value={searchInputs.syncBy.value}
          onChange={onChange}
          name={searchInputs.syncBy.name}
          options={searchInputs.syncBy.options}
          sx={styles.input}
        />
      </Box>
    </Box>
  );
};

const styles = {
  container1: {
    // border: "1px solid rgba(224, 224, 224, 1)",
    // padding: "20px",
    marginBottom: "60px",
  },
  container2: {
    display: "flex",
    gap: "30px",
    alignItems: "end",
    flexWrap: "wrap",
  },
  input: {
    maxWidth: "calc(33.33% - 20px)",
    flex: "1 0 calc(33.33% - 30px)",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "20px",
    fontWeight: 600,
  },
};
