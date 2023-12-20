import React from "react";
import { Box } from "@mui/material";
import { SubHeader } from "../../../../../components/Headers/SubHeader";
import { CustomTable } from "./CustomTable";

export const ReportParameters = ({
  headerLinks,
  onClickHeaderLink,
  reportParameters,
  onClickRemoveParameter,
  onChangeParams,
}) => {
  return (
    <Box sx={styles.container}>
      <SubHeader
        text="Report Parameters"
        headerLinks={headerLinks}
        onClickHeaderLink={onClickHeaderLink}
        sx={styles.customStylesHeading}
        noBorder
      />
      {reportParameters.length ? (
        <CustomTable
          tableData={reportParameters}
          onClickRemoveParameter={onClickRemoveParameter}
          onChangeParams={onChangeParams}
        />
      ) : null}
    </Box>
  );
};

const styles = {
  container: {
    border: "1px solid rgba(224, 224, 224, 1)",
    padding: "20px",
    marginBottom: "60px",
  },
  customStylesHeading: {
    paddingTop: "20px",
  },
};
