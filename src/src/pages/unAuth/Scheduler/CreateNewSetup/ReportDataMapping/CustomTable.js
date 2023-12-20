import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { reportParameterHeaders } from "../../../../../utils/schedulerUtils";
import { IconLink } from "../../../../../components/IconLink";
import CancelIcon from "@mui/icons-material/Cancel";
import { TextFieldCustom } from "../../../../../components/TextFieldCustom/TextFieldCustom";
import { SelectDropdown } from "../../../../../components/SelectDropdown";
import { SearchInputCustom } from "../../../../../components/SearchInputCustom";

export const CustomTable = ({
  tableData,
  onClickRemoveDataMapping,
  onChangeDataMappings,
}) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ ...styles.tableHead, width: 160 }}></TableCell>
            <TableCell sx={styles.tableHead}>Report Column Name</TableCell>
            <TableCell sx={styles.tableHead}>Table Column Name</TableCell>
            <TableCell sx={styles.tableHead}>Is Sequence</TableCell>
            <TableCell sx={{ ...styles.tableHead, ...styles.input }}>
              Default Value
            </TableCell>
            <TableCell sx={{ ...styles.tableHead }}>Primary Flag</TableCell>
            <TableCell sx={{ ...styles.tableHead }}>Date Format</TableCell>
            <TableCell sx={{ ...styles.tableHead }}>ColumnData Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, i) => {
            return (
              <TableRow key={row.id} sx={{ ...styles.tableRow }}>
                <TableCell>
                  <IconLink
                    src={<CancelIcon sx={{ color: "red" }} />}
                    label={"Remove"}
                    onClick={() => onClickRemoveDataMapping(i)}
                  />
                </TableCell>
                <TableCell>
                  <TextFieldCustom
                    label="Report Column Name"
                    name={"reportColumnName"}
                    value={row.reportColumnName.value}
                    onChange={(e) => onChangeDataMappings(e, i)}
                    // disabled={updateUser}
                    // error={false}
                  />
                </TableCell>
                <TableCell>
                  <TextFieldCustom
                    label="Table Column Name"
                    name={"tableColumnName"}
                    value={row.tableColumnName.value}
                    onChange={(e) => onChangeDataMappings(e, i)}
                    // disabled={updateUser}
                    // error={false}
                  />
                </TableCell>
                <TableCell>
                  <SelectDropdown
                    label="Is Sequence"
                    value={row.isSeq.value}
                    onChange={(e) => onChangeDataMappings(e, i)}
                    name="isSeq"
                    options={[
                      { label: "Yes", value: "Y" },
                      { label: "No", value: "N" },
                    ]}
                    sx={{ minWidth: "100px" }}
                    // sx={styles.input}
                  />
                </TableCell>
                <TableCell>
                  {row.isSeq.value === "Y" ? (
                    <SearchInputCustom
                      sx={styles.input}
                      inputFields={row.defaultValue?.fields || []}
                      name={row.defaultValue.name}
                      resultOptions={row.defaultValue?.resultOptions}
                      label={row.defaultValue.label}
                      value={row.defaultValue.value}
                      onChange={(e) => onChangeDataMappings(e, i)}
                    />
                  ) : (
                    <TextFieldCustom
                      label="Default Value"
                      name={"defaultValue"}
                      value={row.defaultValue.value}
                      onChange={(e) => onChangeDataMappings(e, i)}
                      // disabled={updateUser}
                      // error={false}
                      sx={styles.input}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <SelectDropdown
                    label="Primary Flag"
                    value={row.primaryFlag.value}
                    onChange={(e) => onChangeDataMappings(e, i)}
                    name={"primaryFlag"}
                    options={[
                      { label: "Yes", value: "Y" },
                      { label: "No", value: "N" },
                    ]}
                    sx={{ minWidth: "100px" }}
                  />
                </TableCell>
                <TableCell>
                  <TextFieldCustom
                    label="Date Format"
                    name={"dateFormat"}
                    value={row.dateFormat.value}
                    onChange={(e) => onChangeDataMappings(e, i)}
                    // disabled={updateUser}
                    // error={false}
                  />
                </TableCell>
                <TableCell>
                  <TextFieldCustom
                    label="ColumnData Type"
                    name={"columnDataType"}
                    value={row.columnDataType.value}
                    onChange={(e) => onChangeDataMappings(e, i)}
                    // disabled={updateUser}
                    // error={false}
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
  input: {
    width: "180px",
    minWidth: "180px",
  },
  tableRow: {
    "&:last-child td, &:last-child th": { border: 0 },
    transition: "0.3s",
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
  },
};
