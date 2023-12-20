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
import Input from "../../../../components/UI/Input";

export const AddOrEditMapping = ({
  open,
  handleClose,
  inputs,
  onChange,
  onClickSave,
  isEditing,
}) => {
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} sx={styles.myWidth}>
        <DialogTitle sx={styles.title}>
          {isEditing ? "Update" : "Add"} Record
        </DialogTitle>
        {open ? (
          <Box sx={styles.body}>
            {inputs.map((input, i) => {
              return (
                <Input
                  {...input}
                  onChange={(e) => onChange(e, i)}
                  sx={styles.inputs}
                  characterLimit={30}
                />
              );
            })}
            {/* {Object.keys(inputs).map((key, i) => {
              const input = inputs[key];
              return (
                <TextFieldCustom
                  label={input.label}
                  name={key}
                  value={input.value}
                  onChange={onChange}
                  sx={styles.inputs}
                  characterLimit={30}
                />
              );
            })} */}
          </Box>
        ) : null}

        <DialogActions sx={styles.btnContainer}>
          <Button
            variant="contained"
            sx={styles.button}
            onClick={onClickSave}
            // disabled={disableOkBtn}
          >
            {isEditing ? "Update" : "Save"}
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
