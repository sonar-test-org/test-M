import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Input from "../../../../../components/UI/Input";
import { addLotInputsMock } from "../../Main/miscUtils";
import { ConfirmDeletePopup } from "../../../../../components/UI/ConfirmationPopup";

export const TableAddLot = ({ tableData, deleteLotRow, isEditingLotPage }) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {addLotInputsMock.map((el) => (
              <TableCell sx={styles.tableHead}>{el.label}</TableCell>
            ))}
            {isEditingLotPage ? null : (
              <TableCell sx={styles.tableHead}>Delete</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, i) => {
            return (
              <TableRow key={row.id} sx={styles.tableRow}>
                {row.inputs.map((input) => {
                  return (
                    <TableCell>
                      <Input {...input} disabled />
                    </TableCell>
                  );
                })}
                {isEditingLotPage ? null : (
                  <TableCell>
                    <ConfirmDeletePopup
                      onClick={() => {
                        deleteLotRow(i);
                      }}
                    />
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const styles = {
  icon: {
    width: "18px",
    height: "18px",
  },
  tableRow: {
    "&:last-child td, &:last-child th": { border: 0 },
  },
  tableHead: {
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "20px",
    color: "#30363C",
  },
};
