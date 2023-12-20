import React from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import { generalSetupTableHeadings } from "../../../../utils/schedulerUtils";

export const CustomTable = ({ tableData, onClickRowEdit }) => {
  const generateSchedulerType = (flag) => {
    if (flag === "F") {
      return "Frequency";
    } else if (flag === "T") {
      return "Time";
    } else return "-";
  };
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {generalSetupTableHeadings.map((heading) => (
              <TableCell sx={styles.tableHead}>{heading}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => {
            return (
              <TableRow key={row.schedulerId} sx={{ ...styles.tableRow }}>
                <TableCell
                  onClick={() => {
                    onClickRowEdit(row.schedulerId);
                  }}
                >
                  <Button
                    sx={{ justifyContent: "left", padding: "0 !important" }}
                  >
                    <MoreVertIcon color="primary" sx={{ cursor: "pointer" }} />
                  </Button>
                </TableCell>
                <TableCell>{row.serviceName}</TableCell>
                <TableCell>{row.serviceType}</TableCell>
                <TableCell>
                  {generateSchedulerType(row.schedulerType)}
                </TableCell>
                <TableCell>{row.hour}</TableCell>
                <TableCell>{row.minute}</TableCell>
                <TableCell>{row.second}</TableCell>
                <TableCell>{row.isParameterized}</TableCell>
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
    transition: "0.3s",
    ":hover": {
      background: "#d8e9ff7a",
    },
  },
  tableHead: {
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "20px",
    color: "#30363C",
  },
  selectedRow: {
    background: "#87bafa7a",
    transition: "0.3s",
    ":hover": {
      background: "#87bafa7a",
    },
  },
};
