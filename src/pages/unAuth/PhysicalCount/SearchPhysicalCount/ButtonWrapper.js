import { Button, Grid } from "@mui/material";

export const ButtonWrapper = ({
  onClickSearch,
  onClickResetMain,
  submitForApproval,
  submitForMobileCount,
  assignUser,
  showMainButtons,
  exportHandler,
  importHandler,
  isSubmitedForApproval,
}) => {
  return (
    <Grid sx={styles.buttonContainer}>
      <Grid sx={styles.btnCon2}>
        {showMainButtons ? (
          <>
            {" "}
            <Button
              variant="contained"
              sx={styles.button}
              onClick={submitForApproval}
              disabled={isSubmitedForApproval}
            >
              Submit for Approval
            </Button>
            <Button
              variant="contained"
              sx={styles.button}
              onClick={submitForMobileCount}
              disabled={isSubmitedForApproval}
            >
              Submit for Mobile Count
            </Button>
            <Button
              variant="contained"
              sx={styles.button}
              onClick={assignUser}
              disabled={isSubmitedForApproval}
            >
              Assign User
            </Button>
            <Grid sx={styles.exportImportBox}>
              <Button
                variant="contained"
                sx={styles.button}
                onClick={exportHandler}
              >
                Export
              </Button>
              <Button
                variant="contained"
                sx={styles.button}
                onClick={importHandler}
                disabled={isSubmitedForApproval}
              >
                Import
              </Button>
            </Grid>
          </>
        ) : null}
      </Grid>
      <Grid sx={{ ...styles.btnCon2, flexWrap: "nowrap" }}>
        <Button variant="contained" sx={styles.button} onClick={onClickSearch}>
          Search
        </Button>
        <Button
          variant="contained"
          sx={{ ...styles.button, ...styles.resetBtn }}
          onClick={onClickResetMain}
        >
          Reset
        </Button>
      </Grid>
    </Grid>
  );
};

const styles = {
  buttonContainer: {
    display: "flex",
    gap: "22px",
    marginTop: "40px",
    justifyContent: "space-between",
  },
  exportImportBox: {
    display: "flex",
    gap: "22px",
  },
  button: {
    height: "40px",
    minWidth: "100px",
    background: "#4994EC",
    borderRadius: "5px !important",
    color: "#FFFFFF",
    gap: "6px",
  },
  resetBtn: {
    background: "#E7E7E7",
    color: "#000000",
    "&:hover": {
      color: "white",
    },
  },
  btnCon2: {
    display: "flex",
    gap: "22px",
    flexWrap: "wrap",
  },
};
