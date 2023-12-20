import { Box } from "@mui/material";
import React from "react";
import { SubHeader } from "../../../../../components/Headers/SubHeader";
import { CustomTable } from "./CustomTable";

export const ReportDataMapping = ({
  headerLinks,
  onClickHeaderLink,
  reportDataMappings,
  onClickRemoveDataMapping,
  onChangeDataMappings,
}) => {
  return (
    <Box sx={styles.container}>
      <SubHeader
        text="Report Data Mapping"
        headerLinks={headerLinks}
        onClickHeaderLink={onClickHeaderLink}
        sx={styles.customStylesHeading}
        noBorder
      />
      {reportDataMappings.length ? (
        <CustomTable
          tableData={reportDataMappings}
          onClickRemoveDataMapping={onClickRemoveDataMapping}
          onChangeDataMappings={onChangeDataMappings}
        />
      ) : null}
    </Box>
  );
};

const styles = {
  container: {
    border: "1px solid rgba(224, 224, 224, 1)",
    padding: "20px",
  },
  customStylesHeading: {
    paddingTop: "20px",
  },
};
