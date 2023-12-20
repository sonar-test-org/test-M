import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import { fusionUsersHeadings } from "../../../../../utils/userManagementUtils";

export const CustomTable = ({
  tableData,
  onClickDeleteUser,
  selectedRowId,
  setSelectedRowId,
}) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {fusionUsersHeadings.map((heading) => (
              <TableCell sx={styles.tableHead}>{heading}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => {
            const blueBackground =
              row.id === selectedRowId ? styles.selectedRow : {};
            return (
              <TableRow
                key={row.id}
                sx={{ ...styles.tableRow, ...blueBackground }}
                onClick={() => {
                  if (row.id === selectedRowId) {
                    setSelectedRowId(null);
                  } else {
                    setSelectedRowId(row.id);
                  }
                }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.password}</TableCell>
                <TableCell>{row.personId}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setTimeout(() => {
                        onClickDeleteUser(row.id);
                      }, 0);
                    }}
                  >
                    <ClearIcon sx={styles.icon} />
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
    // width: "18px",
    // height: "18px",
    color: "red",
  },
  tableHead: {
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "20px",
    color: "#30363C",
  },
  tableRow: {
    "&:last-child td, &:last-child th": { border: 0 },
    ":hover": {
      background: "#d8e9ff7a",
    },
  },
  selectedRow: {
    background: "#87bafa7a",
    ":hover": {
      background: "#87bafa7a",
    },
  },
};
