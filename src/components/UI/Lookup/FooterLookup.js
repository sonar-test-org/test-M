import DialogActions from "@mui/material/DialogActions";
import Button from "../Button";

export const FooterLookup = ({ onClickOkLocal, handleClose, showOkButton }) => {
  return (
    <DialogActions sx={styles.btnContainer}>
      {showOkButton ? <Button onClick={onClickOkLocal}>Ok</Button> : null}
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
    </DialogActions>
  );
};

const styles = {
  btnContainer: {
    marginTop: "20px",
    marginBottom: "20px",
    padding: "0px 40px 0 40px !important",
    height: "48px",
  },
};
