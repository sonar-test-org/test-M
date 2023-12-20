import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { tableHeadings } from "../CycleCountUtils";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomTextField } from "../../../../components/TextField";
import { TextFieldCustom } from "../../../../components/TextFieldCustom/TextFieldCustom";
import { Button } from "@mui/material";
import { SearchInputCustom } from "../../../../components/SearchInputCustom";

export const CustomTable = ({
  tableData,
  onChangeSearchFields,
  onClickDeleteRow,
  onChange,
  onChangeCheckboxRow,
  onClickOk,
  onClickSingleRow,
}) => {
  const createButton = (el, i) => {
    if (el.fromDB && el.touched) {
      return (
        <Button
          variant="outlined"
          sx={styles.button}
          onClick={() => onClickSingleRow(el, "update", i)}
        >
          Update
        </Button>
      );
    } else if (!el.fromDB) {
      return (
        <Button
          variant="outlined"
          sx={styles.button}
          onClick={() => onClickSingleRow(el, "create", i)}
          color="success"
        >
          Save
        </Button>
      );
    } else return;
  };
  return (
    <TableContainer sx={styles.con}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeadings.map((heading) => (
              <TableCell sx={styles.tableHead}>{heading}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, i) => {
            return (
              <TableRow key={row.id} sx={styles.tableRow}>
                <TableCell>
                  <SearchInputCustom
                    inputFields={row.organizationCode.fields}
                    name={row.organizationCode.name}
                    resultOptions={row.organizationCode.resultOptions}
                    sx={styles.input}
                    required
                    label={row.organizationCode.label}
                    value={row.organizationCode.value}
                    onChange={(e) => onChange(e, i)}
                    onChangeCheckbox={(a, b, c, d) =>
                      onChangeCheckboxRow(a, b, c, i, d)
                    }
                    onClickOk={(a) => onClickOk(a, i)}
                  />
                </TableCell>
                {/* <TableCell>{row.personId}</TableCell> */}
                <TableCell>
                  <TextFieldCustom
                    value={row.personId?.value}
                    label={row.personId?.label}
                    error={row.personId?.error}
                    name="personId"
                    disabled={row.personId?.disabled}
                    onChange={(e) => onChangeSearchFields(e, i)}
                  />
                </TableCell>
                <TableCell>
                  <SearchInputCustom
                    inputFields={row.personName.fields}
                    name={row.personName.name}
                    resultOptions={row.personName.resultOptions}
                    sx={styles.input}
                    required
                    label={row.personName.label}
                    value={row.personName.value}
                    onChange={(e) => onChange(e, i)}
                    onChangeCheckbox={(a, b, c, d) =>
                      onChangeCheckboxRow(a, b, c, i, d)
                    }
                    onClickOk={(a) => onClickOk(a, i)}
                  />
                </TableCell>
                <TableCell>
                  <TextFieldCustom
                    value={row.approvalLevel.value}
                    label={row.approvalLevel.label}
                    error={row.approvalLevel.error}
                    name="approvalLevel"
                    onChange={(e) => onChangeSearchFields(e, i)}
                  />
                </TableCell>
                <TableCell>
                  <TextFieldCustom
                    value={row.fromAmount?.value}
                    label={row.fromAmount?.label}
                    error={row.fromAmount?.error}
                    name="fromAmount"
                    disabled={row.fromAmount?.disabled}
                    onChange={(e) => onChangeSearchFields(e, i)}
                  />
                </TableCell>
                <TableCell>
                  <TextFieldCustom
                    value={row.toAmount?.value}
                    label={row.toAmount?.label}
                    error={row.toAmount?.error}
                    name="toAmount"
                    disabled={row.toAmount?.disabled}
                    onChange={(e) => onChangeSearchFields(e, i)}
                  />
                </TableCell>
                <TableCell width="180">{createButton(row, i)}</TableCell>
                <TableCell>
                  <Button onClick={() => onClickDeleteRow(i)}>
                    <DeleteIcon sx={{ color: "#d36f6f" }} />
                  </Button>
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
  tableRow: {
    "&:last-child td, &:last-child th": { border: 0 },
  },
  tableHead: {
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "20px",
    color: "#30363C",
  },
  con: {
    marginTop: "40px",
  },
  button: {
    minWidth: "150px",
    height: "50px",
    borderRadius: "5px !important",
    gap: "6px",
  },
};
