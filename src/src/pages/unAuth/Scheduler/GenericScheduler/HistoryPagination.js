import React from "react";
import { Box, Pagination, Typography } from "@mui/material";
import { SelectDropdown } from "../../../../components/SelectDropdown";

export const HistoryPagination = ({
  page,
  handleChangePagination,
  rowsPerPage,
  handleChangeRowsPerPage,
  rowsPerPageOptions,
  pagesCount,
}) => {
  return (
    <Box sx={styles.container}>
      <Typography sx={styles.text}>Rows per page: </Typography>
      <Box sx={styles.boxCon}>
        <SelectDropdown
          label="Rows"
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
          name={"rowsPerPage"}
          options={rowsPerPageOptions || []}
        />
      </Box>
      <Pagination
        count={pagesCount}
        page={page}
        onChange={handleChangePagination}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
    margin: "30px 0px",
    gap: "40px",
  },
  boxCon: {
    width: "100px",
    display: "flex",
  },
  text: {
    fontSize: "14px !important",
  },
};
