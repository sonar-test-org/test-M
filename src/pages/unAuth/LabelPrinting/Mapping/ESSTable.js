import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IconButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import { zpl_Ess_CustomTableHeadings } from "../labelPrintingUtils";
import { ConfirmDeletePopup } from "../../../../components/UI/ConfirmationPopup";

export const ESSTable = ({ tableData, onDeleteRow, onEditRow }) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            {zpl_Ess_CustomTableHeadings.map(heading => (
              <TableCell sx={styles.tableHead} key={heading.label}>
                {heading.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map(row => {
            return (
              <TableRow key={row.id} sx={styles.tableRow}>
                <TableCell>{row.mappingId}</TableCell>
                <TableCell>{row.constantName}</TableCell>
                <TableCell>{row.printMasterTableFieldName}</TableCell>
                <TableCell>{row.transactionType}</TableCell>
                <TableCell>{row.enable}</TableCell>
                <TableCell>{row.labelLength}</TableCell>
                <TableCell>{row.dataType}</TableCell>
                <TableCell>{row.fromDateFormat}</TableCell>
                <TableCell>
                  <ConfirmDeletePopup
                    recordTitle={row.constantName}
                    onClick={() => {
                      onDeleteRow(row);
                    }}
                  />
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
