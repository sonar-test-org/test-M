import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { SearchInputCustom } from "../../../../components/SearchInputCustom";
import { SelectDropdown } from "../../../../components/SelectDropdown";
import { tableHeadingsHistory } from "../labelPrintingUtils";
import { TextFieldCustom } from "../../../../components/TextFieldCustom/TextFieldCustom";
import { generateDateFromArray } from "../../../../utils/commonUtils";

export const CustomTable = ({ tableData, onChange, isAllSelected }) => {
  return (
    <TableContainer sx={styles.con}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeadingsHistory.map((heading) =>
              heading.type === "selectAll" ? (
                <TableCell>
                  <Checkbox
                    checked={isAllSelected}
                    onChange={onChange}
                    inputProps={{ "aria-label": "controlled" }}
                    name={"selectAll"}
                  />
                </TableCell>
              ) : (
                <TableCell sx={{ ...styles.tableHead, width: heading.width }}>
                  {heading.label}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, i) => {
            return (
              <TableRow key={`${row.item}-${i}`} sx={styles.tableRow}>
                <TableCell>
                  <Checkbox
                    checked={row.selected || false}
                    onChange={(e) => onChange(e, i)}
                    // inputProps={{ "aria-label": "controlled" }}
                    name={""}
                  />
                </TableCell>

                <TableCell>{row.printLineId}</TableCell>
                <TableCell>
                  <TextFieldCustom
                    label={"Total Print"}
                    name={"totalPrint"}
                    value={row.totalPrint}
                    // onChange={onChange}
                    sx={{ flexGrow: 1 }}
                  />
                </TableCell>
                <TableCell>{row.printStatus}</TableCell>
                <TableCell>{row.zplData}</TableCell>
                <TableCell>{row.transactionType}</TableCell>
                <TableCell>{row.organizationName}</TableCell>
                <TableCell>{row.item}</TableCell>
                <TableCell>{row.itemDescription}</TableCell>
                <TableCell>{row.lot}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.documentNumber}</TableCell>
                <TableCell>
                  {/* {generateDateFromArray(row.transactionDate.join())} */}
                  {row.transactionDate}
                </TableCell>
                <TableCell>{row.userName}</TableCell>
                <TableCell>{row.templateName}</TableCell>
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
