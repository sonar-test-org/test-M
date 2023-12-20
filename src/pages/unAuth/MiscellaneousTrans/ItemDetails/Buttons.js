import { Box, Grid } from "@mui/material";
import Button from "../../../../components/UI/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { IconLink } from "../../../../components/IconLink";

export const Buttons = ({
  onClickSubmit,
  onClickAdd,
  onClickCancel,
  canAddLot,
  goToAddLotPage,
  isEditableLot,
  submited,
}) => {
  return (
    <Box sx={styles.mainCon}>
      <Grid sx={styles.buttonContainer}>
        {submited ? null : (
          <>
            <IconLink
              src={<AddIcon sx={{ width: "23px" }} />}
              label="Add Item"
              onClick={onClickAdd}
            />
            {canAddLot ? (
              <IconLink
                src={
                  isEditableLot ? (
                    <EditIcon sx={{ width: "23px" }} />
                  ) : (
                    <AddIcon sx={{ width: "23px" }} />
                  )
                }
                label={isEditableLot ? "Edit Lot" : "Add Lot"}
                onClick={goToAddLotPage}
              />
            ) : null}
          </>
        )}
      </Grid>
      <Grid sx={styles.buttonContainer}>
        <Button onClick={onClickSubmit} disabled={submited}>
          Submit
        </Button>
        <Button onClick={onClickCancel} variant="secondary">
          Back
        </Button>
      </Grid>
    </Box>
  );
};

const styles = {
  mainCon: {
    display: "flex",
    marginBottom: "62px",
    marginTop: "40px",
    justifyContent: "space-between",
  },
  buttonContainer: {
    display: "flex",
    gap: "22px",
    justifyContent: "flex-end",
  },
};
