import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { parCountSearchHeadings } from "../parCountUtils";

export const CustomTable = ({ tableData, onClick }) => {
  return (
    <TableContainer sx={styles.con}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {parCountSearchHeadings.map((heading) => (
              <TableCell sx={{ ...styles.tableHead }}>{heading}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, i) => {
            const year = row.countDate[0];
            const month = row.countDate[1];
            const day = row.countDate[2];
            const dateStr = `${year}-${month}-${day}`;

            return (
              <TableRow key={row.id} sx={styles.tableRow}>
                <TableCell>{row.itemNumber}</TableCell>
                <TableCell>{row.itemDesc}</TableCell>
                <TableCell>{row.uomcode}</TableCell>
                <TableCell>{row.orgcode}</TableCell>
                <TableCell>{row.subInventory}</TableCell>
                <TableCell>{row.locator}</TableCell>
                <TableCell>{row.countedQty}</TableCell>
                <TableCell>{row.syncBy}</TableCell>
                <TableCell>{dateStr || ""}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <Button onClick={()=>onClick(row?.fusionResponse)}>{row.fusionResponse}</Button>
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
    minWidth: "100px",
  },
  con: {
    marginTop: "20px",
  },
  input: {
    minWidth: "220px",
  },
};
