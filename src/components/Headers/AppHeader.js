import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { Box, Grid } from "@mui/material";

import { UserMenu } from "../UserMenu";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Input from "../UI/Input";
import { locationOptions } from "../../utils/commonUtils";

export const AppHeader = () => {
  const classes = useStyles();
  const location = useLocation();

  const commonReducer = useSelector((state) => state.commonReducer);
  // console.log("commonReducer", commonReducer);

  const [page, setPage] = React.useState("");

  useEffect(() => {
    setPage(location.pathname);
  }, [location]);

  const handleChange = (event) => {
    window.open(`/w360${event.target.value}`);
  };

  return (
    <>
      {commonReducer.userName ? (
        <Grid container className={classes.maincontainer}>
          <img
            src="/w360/assets/images/logo_small.png"
            className={classes.logo}
          />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Input
              label="Page"
              type="dropdown"
              value={page}
              onChange={handleChange}
              options={locationOptions}
              sx={{ minWidth: "260px", marginRight: "20px" }}
            />
            <Grid className={classes.borderBox}>
              <UserMenu />
            </Grid>
          </Box>
        </Grid>
      ) : (
        <Grid></Grid>
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  maincontainer: {
    justifyContent: "space-between",
    alignItems: "center",
    // borderBottom: "1px solid #000000",
    // borderBottom: "1px solid #A3ACB9",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
    paddingRight: "40px",
  },
  logo: {
    width: "215px",
  },
  borderBox: {
    border: "1px solid #EEEEEE",
    width: "217px",
    height: "48px",
    borderRadius: "8px",
  },
}));
