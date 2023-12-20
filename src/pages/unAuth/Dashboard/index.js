import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { resetState } from "../../../redux/commonSlice";
import { List, ListItem, ListItemButton, Popover } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ListItemText } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import "react-datepicker/dist/react-datepicker.css";
import { SelectProjectCard } from "./SelectProjectCard";
import { EmployeeTable } from "./EmployeeTable";
import { makeStyles } from "@material-ui/core";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "../Dashboard/Menu";

export const Dashboard = () => {
  const classes = useStyles();
  const [openMenu, setOpenMenu] = useState(true);

  const [projectDetailObj, setprojectDetailObj] = useState({});
  const [startDateRange, setStartDateRange] = useState(new Date());
  const [endDateRange, setEndDateRange] = useState(new Date());
  const [oriPagedata, setOriPagedata] = useState([]);
  const [pagedata, setPagedata] = useState([]);
  const [appStatus, setAppStatus] = useState("");
  const [employeeupdateData, setEmployeeupdateData] = useState([]);

  const commonReducer = useSelector((state) => state.commonReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/user-management/user-list");
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  console.log("employeeupdateData", employeeupdateData);

  useEffect(() => {
    if (employeeupdateData.length > 0) {
      var localArr = oriPagedata?.filter((item) =>
        employeeupdateData.includes(item.employeeNumber)
      );
      setPagedata(localArr);
    } else {
      setPagedata([...oriPagedata]);
    }
  }, [employeeupdateData, oriPagedata]);

  const openMenuClickHandler = () => {
    setOpenMenu(!openMenu);
    console.log(openMenu);
  };

  return (
    <>
      <Grid container className={classes.maincontainer}>
        <Grid item xs="12" className={classes.grid1}>
          <Grid container className={classes.grid2}>
            <Grid item xs="1" className={classes.menugrid}>
              <Box>
                <MenuIcon
                  fontSize="large"
                  onClick={openMenuClickHandler}
                  className={classes.grid4}
                />
              </Box>
            </Grid>
            <Grid item xs="11" className={classes.grid3}>
              <Box width={"auto"} textAlign="right">
                <AccountBoxIcon
                  fontSize="large"
                  onClick={handleClick}
                  className={classes.grid4}
                />
                <Typography variant="span" className={classes.grid5}>
                  {commonReducer.userName}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs="12">
              <Box>
                <SelectProjectCard
                  setprojectDetailObj={setprojectDetailObj}
                  projectDetailObj={projectDetailObj}
                  setStartDateRange={setStartDateRange}
                  startDateRange={startDateRange}
                  setEndDateRange={setEndDateRange}
                  endDateRange={endDateRange}
                  pagedata={pagedata}
                  setAppStatus={setAppStatus}
                  oriPagedata={oriPagedata}
                  employeeupdateData={employeeupdateData}
                  setEmployeeupdateData={setEmployeeupdateData}
                />
                {Object.keys(commonReducer.selectedProjectObj).length > 0 && (
                  <EmployeeTable
                    setPagedata={setPagedata}
                    setOriPagedata={setOriPagedata}
                    pagedata={pagedata}
                    appStatus={appStatus}
                  />
                )}
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <List component="nav" aria-label="main mailbox folders">
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary="Profile" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary="Setting" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary="Messages" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText
                          primary="Logout"
                          onClick={() => {
                            dispatch(resetState());
                            navigate("/", { replace: true });
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Popover>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {openMenu ? null : <Menu toggleHandler={setOpenMenu} />}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  maincontainer: {
    backgroundColor: "#DBDBDB",
  },
  grid1: {
    height: "100vh",
  },
  grid2: {
    backgroundColor: "#F9F9F9",
  },
  grid3: {
    padding: "10px",
    backgroundColor: "#FFF",
  },
  grid4: {
    cursor: "pointer",
    verticalAlign: "middle",
  },
  grid5: {
    color: "#124590",
    verticalAlign: "middle",
  },
  menugrid: {
    display: "flex",
    justifyContent: "flex-start !important",
    backgroundColor: "#FFF",
    alignItems: "center",
    padding: "10px",
  },
}));
