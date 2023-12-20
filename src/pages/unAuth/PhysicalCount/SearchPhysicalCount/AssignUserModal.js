import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { SearchInputCustom } from "../../../../components/SearchInputCustom";
import { Box } from "@mui/material";

export const AssignUserModal = ({
  open,
  handleClose,
  onClickOk,
  onChange,
  onCheckAssignUser,
  onClickOkChild,
  input = {},
  disableOkBtn,
}) => {
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} sx={styles.myWidth}>
        <DialogTitle sx={styles.title}>Assign User</DialogTitle>
        <Box sx={styles.body}>
          <SearchInputCustom
            inputFields={input.fields}
            name={input.name}
            resultOptions={input.resultOptions}
            sx={styles.input}
            required
            label={input.label}
            value={input.value}
            onChange={(e, il, name, optionsArr) =>
              onChange(e, null, optionsArr)
            }
            onChangeCheckbox={(a, b, c, d) => onCheckAssignUser(a, b, c, d)}
            onClickOk={(a) => onClickOkChild(a, null)}
          />
        </Box>

        <DialogActions sx={styles.btnContainer}>
          <Button
            variant="contained"
            sx={styles.button}
            onClick={onClickOk}
            disabled={disableOkBtn}
          >
            Ok
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
  body: { paddingLeft: "40px" },
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
};
