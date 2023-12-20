import React from "react";
import { Box, Grid, Typography } from "@mui/material";

import { TextFieldCustom } from "../../../../components/TextFieldCustom/TextFieldCustom";
import { DatePickerCustom } from "../../../../components/DatePickerCustom";
import { SelectDropdown } from "../../../../components/SelectDropdown";
import {
  createErrorText,
  isValidEmail,
  isValidPassword,
} from "../../../../utils/userManagementUtils";

export const UserDetails = ({
  userDetails,
  onChangeUserDetails,
  handleChangeDate,
  printers,
  fusionUsers,
  updateUser,
  onClickInput,
  onBlur,
  errorFields,
}) => {
  return (
    <Grid sx={styles.container}>
      <Typography sx={styles.heading}>User details</Typography>
      <Grid sx={styles.gridBox}>
        <TextFieldCustom
          label="Username"
          name={"mobileUsername"}
          value={userDetails.mobileUsername}
          onChange={onChangeUserDetails}
          disabled={updateUser}
          sx={{ flexGrow: 1 }}
          required
          error={errorFields.mobileUsername.error}
          onBlur={onBlur}
        />
        <SelectDropdown
          label="Fusion Username"
          value={userDetails.fusionUsername}
          onChange={onChangeUserDetails}
          name={"fusionUsername"}
          options={fusionUsers || []}
          sx={{ flexGrow: 1 }}
          required
          error={errorFields.fusionUsername.error}
          onBlur={onBlur}
        />
        <SelectDropdown
          label="Printer"
          value={userDetails.printer}
          onChange={onChangeUserDetails}
          name={"printer"}
          options={printers || []}
          sx={{ flexGrow: 1 }}
          required
          error={errorFields.printer.error}
          onBlur={onBlur}
        />
        <Box sx={styles.passwordBox}>
          <TextFieldCustom
            label="Password"
            name={"password"}
            value={userDetails.password}
            onChange={onChangeUserDetails}
            onClick={onClickInput}
            onBlur={onBlur}
            sx={{ width: "100%" }}
            required
            error={
              errorFields.password.isTouched &&
              !isValidPassword(userDetails.password)
            }
            type='password'
          />
          {errorFields.password.isTouched ? (
            <Box sx={styles.errorTextBox}>
              {createErrorText(userDetails.password).map((txt) => (
                <Typography sx={styles.errorText}>{txt}</Typography>
              ))}
            </Box>
          ) : null}
        </Box>
      </Grid>
      <Grid sx={styles.gridBox}>
        <Box sx={styles.passwordBox}>
          <TextFieldCustom
            label="Email ID"
            name={"email"}
            value={userDetails.email}
            placeholder={'example@example.com'}
            onChange={onChangeUserDetails}
            disabled={updateUser}
            onBlur={onBlur}
            sx={{ flexGrow: 1, width: "100%" }}
            required
            error={
              errorFields.email.isTouched && !isValidEmail(userDetails.email)
            }
          />
          {errorFields.email.isTouched && !isValidEmail(userDetails.email) ? (
            <Box sx={styles.errorTextBox}>
              <Typography sx={styles.errorText}>
                {"Please enter a valid email "}
              </Typography>
            </Box>
          ) : null}
        </Box>
        <DatePickerCustom
          label="From Date"
          value={userDetails.fromDate}
          handleChangeDate={(value) => {
            handleChangeDate(value, "fromDate");
          }}
          sx={{ flexGrow: 1 }}
          required
        />
        <DatePickerCustom
          label="To Date"
          value={userDetails.toDate}
          handleChangeDate={(value) => {
            handleChangeDate(value, "toDate");
          }}
          sx={{ flexGrow: 1 }}
        />
        <div></div>
      </Grid>
    </Grid>
  );
};

const styles = {
  container: {
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
    marginBottom: "40px",
  },
  heading: {
    fontWeight: 500,
    fontSize: "24px",
    lineHeight: "110%",
    color: "#000000",
    marginBottom: "28px",
    marginBottom: "30px !important",
    fontSize: "24px !important",
  },
  gridBox: {
    display: "flex",
    gap: "37px",
    marginBottom: "38px",

    ">div": {
      width: "25% !important",
      maxWidth: "25% !important",
    },
  },
  passwordBox: {
    position: "relative",
    width: "100%",
    flexGrow: 1,
  },
  errorTextBox: {
    position: "absolute",
    margin: "2px",
  },
  errorText: {
    color: "red",
    fontSize: "12px !important",
  },
};
