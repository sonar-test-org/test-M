import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { infoTableHeadings } from "../parCountUtils";

export const CustomTableInfo = ({ tableData }) => {
  return (
    <TableContainer sx={styles.con}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {infoTableHeadings.map((heading) => (
              <TableCell sx={{ ...styles.tableHead }}>{heading}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, i) => {
            const year = row.creationDate[0];
            const month = row.creationDate[1];
            const day = row.creationDate[2];
            const dateStr = `${year}-${month}-${day}`;
            return (
              <TableRow key={row.id} sx={styles.tableRow}>
                <TableCell>{row.fusionId}</TableCell>
                <TableCell>{row.response}</TableCell>
                <TableCell>{row.request}</TableCell>
                <TableCell>{dateStr}</TableCell>
                {/* <TableCell>{row.creationDate}</TableCell> */}
                <TableCell>{row.failedRecordsCount}</TableCell>
                <TableCell>{row.groupId}</TableCell>
                <TableCell>{row.returnMessageCode}</TableCell>
                <TableCell>{row.returnMessageText}</TableCell>
                <TableCell>{row.returnStatus}</TableCell>
                <TableCell>{row.successRecordsCount}</TableCell>
                <TableCell>{row.totalRecordsCount}</TableCell>
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
    minWidth: "100px",
  },
  con: {
    marginTop: "20px",
  },
  input: {
    minWidth: "220px",
  },
};
