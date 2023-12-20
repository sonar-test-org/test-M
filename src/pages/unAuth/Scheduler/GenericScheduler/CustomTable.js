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
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import { genericSchedulerTableHeadings } from "../../../../utils/schedulerUtils";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export const CustomTable = ({
  tableData,
  selectedRowId,
  setSelectedRowId,
  runSchedule,
  runAdhoc,
  getHistory,
  cancelSchedule,
}) => {
  const onClick = (schedulerId) => {
    setSelectedRowId(schedulerId);
    getHistory(schedulerId);
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {genericSchedulerTableHeadings.map((heading) => (
              <TableCell sx={styles.tableHead}>{heading}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => {
            const blueBackground =
              row.schedulerId === selectedRowId ? styles.selectedRow : {};
            return (
              <TableRow
                key={row.schedulerId}
                sx={{ ...styles.tableRow, ...blueBackground }}
              >
                <TableCell onClick={() => onClick(row.schedulerId)}>
                  {row.serviceName}
                </TableCell>
                <TableCell
                  onClick={() => onClick(row.schedulerId)}
                  sx={{ minWidth: "190px" }}
                >
                  {row.lastRunDate}
                </TableCell>
                <TableCell onClick={() => onClick(row.schedulerId)}>
                  {row.hour}
                </TableCell>
                <TableCell onClick={() => onClick(row.schedulerId)}>
                  {row.minute}
                </TableCell>
                <TableCell onClick={() => onClick(row.schedulerId)}>
                  {row.second}
                </TableCell>
                <TableCell onClick={() => onClick(row.schedulerId)}>
                  {row.schedulerType}
                </TableCell>
                <TableCell onClick={() => onClick(row.schedulerId)}>
                  {row.status}
                </TableCell>
                <TableCell>
                  <Button onClick={() => runAdhoc(row.schedulerId)}>
                    <PlayCircleFilledWhiteIcon />
                  </Button>
                </TableCell>
                <TableCell>
                  {row.scheduleFlag === "N" ? (
                    <Button onClick={() => runSchedule(row.schedulerId)}>
                      <CalendarMonthIcon />
                    </Button>
                  ) : (
                    <Button onClick={() => cancelSchedule(row.schedulerId)}>
                      <HighlightOffIcon sx={styles.deleteIcon} filled />
                      <CalendarMonthIcon sx={{ color: "gray" }} />
                    </Button>
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
  deleteIcon: {
    color: "red",
    position: "absolute",
    width: "16px",
    right: "14px",
    top: "-4px",
  },
};
