import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, IconButton } from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import { transCustomTableHeadings } from "../labelPrintingUtils";
import { ConfirmDeletePopup } from "../../../../components/UI/ConfirmationPopup";

export const TransCustomTable = ({ tableData, onDeleteRow, onEditRow }) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {transCustomTableHeadings.map((heading) => (
              <TableCell sx={styles.tableHead} key={heading}>
                {heading.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => {
            return (
              <TableRow key={row.id} sx={styles.tableRow}>
                <TableCell>{row.mappingId}</TableCell>
                <TableCell>{row.printLineKeyName}</TableCell>
                <TableCell>{row.keyFromWebservice}</TableCell>
                <TableCell>{row.transactionType}</TableCell>
                <TableCell>
                  <ConfirmDeletePopup
                    recordTitle={row.printLineKeyName}
                    onClick={() => {
                      onDeleteRow(row);
                    }}
                  />
                  {/* <IconButton onClick={() => onDeleteRow(row)}>
                    <ClearIcon sx={{ ...styles.icon, color: "red" }} />
                  </IconButton> */}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => onEditRow(row)}>
                    <EditIcon style={styles.icon} />
                  </IconButton>
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
    // ":hover": {
    //   background: "#d8e9ff7a",
    // },
  },
  tableHead: {
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "20px",
    color: "#30363C",
  },
  // selectedRow: {
  // background: "#87bafa7a",
  // ":hover": {
  //   background: "#87bafa7a",
  // },
  // },
};
