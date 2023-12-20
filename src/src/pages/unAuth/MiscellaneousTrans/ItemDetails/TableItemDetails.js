import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Input from "../../../../components/UI/Input";
import { itemDetailInputsMock } from "../Main/miscUtils";
import { ConfirmDeletePopup } from "../../../../components/UI/ConfirmationPopup";
import EditIcon from "@mui/icons-material/Edit";
import { ERROR, SUCCESS } from "../../../../utils/variables";
import { SuccessCell } from "./SuccessCell";
import { ErrorCell } from "./ErrorCell";

export const TableItemDetails = ({
  tableData,
  onDeleteRow,
  editLotFormIDPage,
  submited,
}) => {
  const generateStatusCell = (response) => {
    switch (response?.status) {
      case SUCCESS:
        return <SuccessCell response={response} />;
      case ERROR:
        return <ErrorCell response={response} />;

      default:
        return;
    }
  };
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {itemDetailInputsMock.map((el) => (
              <TableCell sx={styles.tableHead}>{el.label}</TableCell>
            ))}
            <TableCell sx={styles.tableHead}>View Lot</TableCell>
            <TableCell sx={styles.tableHead}>Status</TableCell>
            <TableCell sx={styles.tableHead}>Delete</TableCell>
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
                <TableCell>
                  {row.lotRows?.length ? (
                    <EditIcon
                      sx={styles.editLotIcon}
                      onClick={() => editLotFormIDPage(row)}
                    />
                  ) : (
                    ""
                  )}
                </TableCell>
                <TableCell>{generateStatusCell(row.response)}</TableCell>
                <TableCell>
                  {submited ? null : (
                    <ConfirmDeletePopup
                      onClick={() => {
                        onDeleteRow(i);
                      }}
                    />
                  )}
                </TableCell>
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
  editLotIcon: { width: "23px", cursor: " pointer" },
};
