import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IconButton } from "@mui/material";
import { userHistoryHeadings } from "../../../../utils/userManagementUtils";

export const CustomTable = ({ tableData, user = "" }) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {userHistoryHeadings.map((heading) => (
              <TableCell sx={styles.tableHead}>{heading}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{user}</TableCell>
              <TableCell>{row.comments}</TableCell>
              <TableCell>{row.enteredBy}</TableCell>
              <TableCell>{row.enteredDate}</TableCell>
            </TableRow>
          ))}
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
  tableHead: {
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "20px",
    color: "#30363C",
  },
};
