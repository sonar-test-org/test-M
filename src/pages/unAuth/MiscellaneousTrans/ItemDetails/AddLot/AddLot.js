import { Box, Grid } from "@mui/material";
import { InputGroup } from "../../../../../components/InputGroup/Index";
import { TableAddLot } from "./TableAddLot";
import Button from "../../../../../components/UI/Button";
import { IconLink } from "../../../../../components/IconLink";
import AddIcon from "@mui/icons-material/Add";
import AcUnitIcon from '@mui/icons-material/AcUnit';

export const AddLot = ({
  inputs,
  onChange,
  generateLot,
  addLotToTable,
  lotRows,
  deleteLotRow,
  cancelAddLot,
  onClickDoneAddLot,
  isEditingLotPage,
}) => {
  return (
    <Box>
      {!isEditingLotPage ? (
        <>
          <InputGroup inputs={inputs} onChange={onChange} />
          <Box sx={styles.mainCon}>
            <Grid sx={styles.buttonContainer}>
              <IconLink
                src={<AcUnitIcon sx={{ width: "23px" }} />}
                label="Generate Lot"
                onClick={generateLot}
              />
              <IconLink
                src={<AddIcon sx={{ width: "23px" }} />}
                label="Add Lot"
                onClick={addLotToTable}
              />
            </Grid>
            <Grid sx={styles.buttonContainer}>
              <Button onClick={onClickDoneAddLot}>Done</Button>
            </Grid>
          </Box>
        </>
      ) : (
        <Box sx={styles.cancelCon}>
          <Button onClick={cancelAddLot} variant="secondary">
            Back
          </Button>
        </Box>
      )}
      {lotRows.length ? (
        <TableAddLot
          tableData={lotRows}
          deleteLotRow={deleteLotRow}
          isEditingLotPage={isEditingLotPage}
        />
      ) : null}
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
  cancelCon: {
    marginTop: "40px",
    display: "flex",
    marginBottom: "62px",
    justifyContent: "end",
  },
  buttonContainer: {
    display: "flex",
    gap: "22px",
    justifyContent: "flex-end",
  },
};
