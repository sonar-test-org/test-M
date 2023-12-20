import React, { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";

import { Resources } from "./Resources/Resources";
import { FusionUsers } from "./FusionUsers/FusionUsers";
import { PageHeading } from "../../../../components/TextUI/PageHeading";

export const MasterSetup = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  return (
    <Box sx={styles.wrapper}>
      {/* <Typography sx={styles.heading}>Master Setup</Typography> */}
      <PageHeading text="Master Setup" />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={styles.tabHeaderBox}
          >
            <Tab label="Fusion User" {...a11yProps(0)} />
            <Tab label="Resources" {...a11yProps(1)} />
            <Tab label="App Update" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <FusionUsers />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Resources />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Not Developed
        </TabPanel>
      </Box>
    </Box>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    padding: "0px 100px 100px 100px",
  },
  tabHeaderBox: {
    "& .MuiTabs-flexContainer": {
      justifyContent: "left",
    },
  },
};
