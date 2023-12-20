import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { approveTableHeadingsMock } from "../PhysicalCountUtils";

export const CustomTable = ({ tableData }) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {approveTableHeadingsMock.map((heading) => (
              <TableCell sx={styles.tableHead}>{heading}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => {
            return (
              <TableRow key={row.id} sx={styles.tableRow}>
                <TableCell>{row.tagNumber}</TableCell>
                <TableCell>{row.subInventory}</TableCell>
                <TableCell>{row.itemNumber}</TableCell>
                <TableCell>{row.itemDescription}</TableCell>
                <TableCell>{row.crossReference}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.lotNumber}</TableCell>
                <TableCell>{row.serialNumber}</TableCell>
                <TableCell>{row.itemUom}</TableCell>
                <TableCell>{row.tagUom}</TableCell>
                <TableCell>{row.tagTypeCount}</TableCell>
                <TableCell>{row.mobileQuantity}</TableCell>
                <TableCell>{row.pcAssignedUserName}</TableCell>
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
