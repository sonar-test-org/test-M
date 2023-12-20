import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { approveTableHeadingsMock } from "../CycleCountUtils";

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
                <TableCell>{row.itemNumber}</TableCell>
                <TableCell>{row.itemDescription}</TableCell>
                {/* uom */}
                <TableCell>{row.countUnitOfMeasure}</TableCell>
                <TableCell>{row.countQty}</TableCell>
                <TableCell>{row.systemQty}</TableCell>
                <TableCell>{row.unitCost}</TableCell>
                <TableCell>{row.varienceQty}</TableCell>
                <TableCell>
                  {((row.varienceQty / row.countQty) * 100).toFixed(2)}
                </TableCell>
                <TableCell>{row.varienceQty * row.unitCost}</TableCell>
                <TableCell>{row.status}</TableCell>
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
