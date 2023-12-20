import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import { TextFieldCustom } from "../../../../components/TextFieldCustom/TextFieldCustom";
import { ChooseFiles } from "../../../../components/ChooseFiles";
import { SearchInputCustom } from "../../../../components/SearchInputCustom";

export const AddOrEditTemplateMaster = ({
  open,
  handleClose,
  onClickOk,
  inputs,
  onChange,
  onChangeCheckbox,
  onClickSave
}) => {
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} sx={styles.myWidth}>
        <DialogTitle sx={styles.title}>Add Record</DialogTitle>
        {open ? (
          <Box sx={styles.body}>
            <TextFieldCustom
              label={inputs.templateName.label}
              name={inputs.templateName.name}
              value={inputs.templateName.value}
              onChange={onChange}
              sx={styles.inputs}
              characterLimit={30}
              required
            />
            <TextFieldCustom
              label={inputs.createdDate.label}
              name={inputs.createdDate.name}
              value={inputs.createdDate.value}
              disabled
              sx={styles.inputs}
              characterLimit={30}
            />
            <SearchInputCustom
              name={inputs.transactionType.name}
              sx={styles.inputs}
              label={inputs.transactionType.label}
              value={inputs.transactionType.value}
              required
              inputFields={inputs.transactionType.fields}
              resultOptions={inputs.transactionType.resultOptions}
              onChange={onChange}
              onChangeCheckbox={onChangeCheckbox}
              onClickOk={onClickOk}
            />
            <Box sx={{ ...styles.inputs, ...styles.chooseFiles }}>
              <ChooseFiles
                uploadHandler={(e) => onChange(e, "file")}
                name={inputs.fileName.name}
                accept='.txt'
              />
              <TextFieldCustom
                label={inputs.fileName.label}
                name={inputs.fileName.name}
                value={inputs.fileName.value}
                disabled
                sx={styles.inputs}
                characterLimit={30}
                required
              />
            </Box>
          </Box>
        ) : null}

        <DialogActions sx={styles.btnContainer}>
          <Button
            variant="contained"
            sx={styles.button}
            onClick={onClickSave}
            // disabled={disableOkBtn}
          >
            Save
          </Button>
          <Button
            variant="contained"
            sx={{ ...styles.button, ...styles.closeBtn }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

const styles = {
  body: {
    padding: "0 40px",
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  myWidth: {
    "& .MuiPaper-root": {
      width: "674px",
      maxWidth: "674px",
      background: "#FFFFFF",
      boxShadow: "0px 0px 50px rgb(0 0 0 / 15%)",
      borderRadius: "20px",
    },
    "& .MuiTypography-root": {
      fontSize: "32px",
      padding: "40px 40px 0 40px",
    },
    ".MuiDialogContent-root": {
      padding: "0px 40px 0 40px",
    },
  },
  button: {
    background: "#4994EC",
    borderRadius: "5px !important",
    color: "#FFFFFF",
    height: "40px",
  },
  closeBtn: {
    background: "#E7E7E7",
    color: "#000000",
  },
  btnContainer: {
    marginTop: "24px",
    marginBottom: "24px",
    padding: "0px 40px 0 40px !important",
    height: "48px",
  },
  title: {
    marginBottom: "20px",
  },
  dialogContent: {
    minHeight: "144px",
  },
  inputs: { maxWidth: "360px", flexGrow: 1, flexBasis: "45%" },
  chooseFiles: { display: "flex", gap: "20px", alignItems: "center" },
};
