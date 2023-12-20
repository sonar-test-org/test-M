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
import { physicalCountSearchHeadings } from "./SearchPcUtils";

export const CustomTable = ({
  tableData,
  handleChangeSelectRow,
  onChangeSearchInput,
  onCheckAssignUser,
  onClickOkTableRow,
  onchangeStatus,
  selectAll,
  onChangeSelectAll,
  isSubmitedForApproval,
}) => {
  return (
    <TableContainer sx={styles.con}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {physicalCountSearchHeadings.map((heading) => {
              return (
                <TableCell sx={{ ...styles.tableHead, width: heading.width }}>
                  {heading.type === "selectAll" ? (
                    <Checkbox
                      checked={selectAll.checked}
                      onChange={onChangeSelectAll}
                      inputProps={{ "aria-label": "controlled" }}
                      name={""}
                    />
                  ) : (
                    heading.label
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, i) => {
            return (
              <TableRow key={row.id} sx={styles.tableRow}>
                <TableCell>
                  <Checkbox
                    checked={row.selected}
                    onChange={(e) => handleChangeSelectRow(e, i)}
                    inputProps={{ "aria-label": "controlled" }}
                    name={""}
                  />
                </TableCell>
                <TableCell>{row.tagNumber}</TableCell>
                <TableCell>{row.subInventory}</TableCell>
                <TableCell>{row.locator}</TableCell>
                <TableCell>{row.itemNumber}</TableCell>
                <TableCell>{row.itemDescription}</TableCell>
                <TableCell>{row.categoryName}</TableCell>
                <TableCell>{row.lotNumber}</TableCell>
                <TableCell>{row.serialNumber}</TableCell>
                <TableCell>{row.tagUOM}</TableCell>
                <TableCell>{row.tagTypeCode}</TableCell>
                <TableCell>{row.snapshotQty}</TableCell>
                <TableCell>{row.mobileQuantity}</TableCell>
                <TableCell>{row.varienceQty}</TableCell>
                <TableCell>{row.unitCostFd}</TableCell>
                <TableCell>
                  <SearchInputCustom
                    inputFields={row.pcAssignedUserName.fields}
                    name={row.pcAssignedUserName.name}
                    resultOptions={row.pcAssignedUserName.resultOptions}
                    sx={styles.input}
                    required
                    label={row.pcAssignedUserName.label}
                    value={row.pcAssignedUserName.value}
                    onChange={(e, il, name, optionsArr) =>
                      onChangeSearchInput(e, i, optionsArr)
                    }
                    onChangeCheckbox={(a, b, c, d) =>
                      onCheckAssignUser(a, b, c, i, d)
                    }
                    onClickOk={(a) => onClickOkTableRow(a, i)}
                    disabled={isSubmitedForApproval}
                  />
                </TableCell>
                <TableCell>
                  <SelectDropdown
                    label={row.statusLocal.label}
                    value={row.statusLocal.value}
                    onChange={(e) => {
                      onchangeStatus(e, i, row);
                    }}
                    name={row.statusLocal.name}
                    options={row.statusLocal.options}
                    sx={{ minWidth: "160px" }}
                    disabled={isSubmitedForApproval || row.statusLocal.disabled}
                  />
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
