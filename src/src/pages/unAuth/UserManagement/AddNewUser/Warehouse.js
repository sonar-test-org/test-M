import React from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { IconLink } from "../../../../components/IconLink";
// import AddIcon from "../../../../assets/images/add_box.png";
import CloseCircle from "../../../../assets/images/close_circle.png";

export const Warehouse = ({
  onClick,
  onClickRemoveWarehouse,
  warehouseList,
}) => {
  return (
    <Box>
      <Grid sx={styles.container}>
        <Typography sx={styles.heading}>Warehouse</Typography>
        <IconLink src={<AddIcon />} label={"Add"} onClick={onClick} />
      </Grid>

      <Grid sx={styles.containerHead}>
        <Typography sx={{ ...styles.containerHeadText, width: "194px" }}>
          Warehouse
        </Typography>
        <Typography sx={styles.containerHeadText}>Action</Typography>
      </Grid>
      {warehouseList.map((el) => {
        return (
          <Grid sx={styles.containerRes}>
            <Typography sx={{ ...styles.containerResText, width: "194px" }}>
              {el.warehouse}
            </Typography>
            <IconButton aria-label="delete">
              <img
                src={CloseCircle}
                // x
                style={styles.closeCircle}
                onClick={() => onClickRemoveWarehouse(el)}
              />
            </IconButton>
          </Grid>
        );
      })}
    </Box>
  );
};

const styles = {
  container: {
    // borderBottom: "1px solid #A3ACB9",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
    justifyContent: "space-between",
    display: "flex",
    paddingBottom: "30px",
  },
  heading: {
    fontWeight: "500",
    fontSize: "24px !important",
  },
  containerHead: {
    // borderBottom: "1px solid #A3ACB9",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
    display: "flex",
    padding: "20px 00px",
  },
  containerHeadText: {
    fontWeight: "700",
    fontSize: "16px !important",
    // marginRight: "109px",
    width: "194px",
  },
  containerRes: {
    display: "flex",
    padding: "20px 00px",
  },
  containerResText: {
    fontWeight: "400",
    fontSize: "16px !important",
    // marginRight: "160px",
    color: "#30363C",
  },
  closeCircle: {
    width: "24px",
    height: "24px",
  },
};
