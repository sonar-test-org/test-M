import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IconButton } from "@mui/material";

import { allUSerHeadings } from "../../../../utils/userManagementUtils";
import DetailsIcon from "../../../../assets/images/details.png";
import HistoryIcon from "../../../../assets/images/history.png";
import moment from "moment";

export const CustomTable = ({ tableData, onClickHistory, onClickDetails }) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {allUSerHeadings.map((heading) => (
              <TableCell sx={styles.tableHead}>{heading}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => {
            return (
              <TableRow key={row.id} sx={styles.tableRow}>
                <TableCell>{row.mobileUsername}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.fusionUsername}</TableCell>
                <TableCell>{row.printer}</TableCell>
                <TableCell
                  sx={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                >
                  {/* {row.fromDate} */}
                  {moment(row.fromDate).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell
                  sx={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                >
                  {/* {row.toDate} */}
                  {moment(row.toDate).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => onClickDetails(row.id)}>
                    <img src={DetailsIcon} style={styles.icon} />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => onClickHistory(row.id)}>
                    <img src={HistoryIcon} style={styles.icon} />
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
  },
  tableHead: {
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "20px",
    color: "#30363C",
  },
};
