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

export const CustomTable = ({
  tableData,
  onClickRemoveParameter,
  onChangeParams,
}) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ ...styles.tableHead, width: 200 }}></TableCell>
            <TableCell sx={{ ...styles.tableHead, width: 300 }}>
              Parameter Name
            </TableCell>
            <TableCell sx={{ ...styles.tableHead, width: 300 }}>
              SQL Type
            </TableCell>
            <TableCell sx={{ ...styles.tableHead, width: 300 }}>
              Default Value
            </TableCell>
            <TableCell sx={{ ...styles.tableHead, width: 600 }}>
              Query
            </TableCell>
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
                    onClick={() => onClickRemoveParameter(i)}
                  />
                </TableCell>
                <TableCell>
                  <TextFieldCustom
                    label="Parameter Name"
                    name={"parameterName"}
                    value={row.parameterName}
                    onChange={(e) => onChangeParams(e, i)}
                    // disabled={updateUser}
                    // error={false}
                  />
                </TableCell>
                <TableCell>
                  <TextFieldCustom
                    label="SQL Type"
                    name={"SQLType"}
                    value={row.SQLType}
                    onChange={(e) => onChangeParams(e, i)}
                    // disabled={updateUser}
                    // error={false}
                  />
                </TableCell>
                <TableCell>
                  <TextFieldCustom
                    label="Default Value"
                    name={"defaultValue"}
                    value={row.defaultValue}
                    onChange={(e) => onChangeParams(e, i)}
                    // disabled={updateUser}
                    // error={false}
                  />
                </TableCell>
                <TableCell>
                  <TextFieldCustom
                    label="Query"
                    name={"query"}
                    value={row.query}
                    onChange={(e) => onChangeParams(e, i)}
                    // disabled={updateUser}
                    // error={false}
                    sx={{ maxWidth: "100%", width: "100%" }}
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
    transition: "0.3s",
    // ":hover": {
    //   background: "#d8e9ff7a",
    // },
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
    // ":hover": {
    //   background: "#87bafa7a",
    // },
  },
};
