import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { convertToTitleCase } from "../../../utils/commonUtils";

export const TableLookup = ({ headerObj, rows, checked, onChangeCheckbox }) => {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={styles.tableHead}>Select</TableCell>
            {headerObj &&
              Object.keys(headerObj).map((keyObj) => {
                if (keyObj === "_id") return;
                return (
                  <TableCell sx={styles.tableHead}>
                    {convertToTitleCase(keyObj)}
                  </TableCell>
                );
              })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            const columns = Object.keys(row);

            return (
              <TableRow key={row.id} sx={styles.tableRow}>
                <TableCell sx={{ width: "60px" }}>
                  <Checkbox
                    name={row._id}
                    checked={row._id === checked}
                    onChange={(e) => onChangeCheckbox(e, row._id)}
                    inputProps={{ "aria-label": "controlled" }}
                    sx={styles.checkBox}
                  />
                </TableCell>
                {columns.map((col) => {
                  if (col === "_id") return;
                  return <TableCell>{row[col]}</TableCell>;
                })}
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
  checkBox: {
    paddingLeft: "8px !important",
    paddingRight: "8px !important",
  },
};
