import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { notificationTableMock } from "../CycleCountUtils";

export const CustomTable = ({ tableData, onClickAction }) => {
  return (
    <TableContainer sx={styles.con}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {notificationTableMock.map((heading) => (
              <TableCell sx={styles.tableHead}>{heading}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, i) => {
            return (
              <TableRow key={row.id} sx={styles.tableRow}>
                <TableCell>{row.cycleCountHeaderName}</TableCell>
                <TableCell>{row.notifFromName}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={styles.button}
                    onClick={() => onClickAction(row)}
                  >
                    View
                  </Button>
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
  tableRow: {
    "&:last-child td, &:last-child th": { border: 0 },
  },
  tableHead: {
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "20px",
    color: "#30363C",
  },
  con: {
    marginTop: "40px",
  },
  button: {
    minWidth: "100px",
    minHeight: "40px",
    background: "#4994EC",
    borderRadius: "5px !important",
    color: "#FFFFFF",
    gap: "6px",
  },
};
