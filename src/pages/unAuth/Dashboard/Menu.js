import { Typography, Grid, Box } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useNavigate } from "react-router-dom";
import { CustomButton } from "../../../components/Button";
import BarChartIcon from "@mui/icons-material/BarChart";

import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import LanIcon from "@mui/icons-material/Lan";

const StaffData = [
  {
    Title: "Staff",

    Team: "",
    ManagerDashboard: "",
    TimesheetSubmission: "",
    ProductivityDashboard: "",
    PayrollAudit: "",
  },
];
const RoasterData = [{ Title: "Roster", ManageTeam: "", Roasters: "/Roaster" }];
const RoasterSettingsData = [
  {
    Title: "Roster Setting",
    ManageworkDuration: "",
    ManageWorkPlan: "",
    ManageWorkRotation: "",
    SplitShift: "",
  },
];
const RoasterRules = [
  { Title: "Roster Rules", DemandTemplate: "/DemandTemplate" },
];
const AccessControl = [
  {
    Title: "Access Control",
    UserControl: "",
    ManageAccessRole: "",
    ManageSchedulerProfile: "",
  },
];
const SelfServices = [
  { Title: "Self Services", UserPrefernces: "", VacationRules: "" },
];
const Reports = [
  {
    Title: "Reports",
    TimesheetReports: "",
    EmployeeTimesheetReports: "",
    RequestStatusReports: "",
    RoasterDetailReport: "",
    RoasterAuditReport: "",
  },
];

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#fff",
    height: "40vh",
    width: "50%",
    position: "absolute",
    top: "2.2rem",
    left: "1rem",
    WebkitBoxShadow: "0px 1px 5px 0px rgba(0,0,0,0.54)",
    MozBoxShadow: " 0px 1px 5px 0px rgba(0,0,0,0.54)",
    boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.54)",
  },
  gridSection1: {
    display: "flex",
    flexDirection: "column !important",
    padding: "5px",
    margin: "10px",
  },
  link: {
    fontSize: "12px",
    color: "#124590",
    textDecoration: "none",
    fontFamily: "Inter",
  },
  Text: {
    fontWeight: "bold",
    fontSize: "14px",
    fontFamily: "Inter",
  },
  icons: {
    fontSize: "14px",
    color: "#124590",
  },
  gridSection2: {},
}));

const Menu = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  // console.log(StaffData[0].data)

  const { toggleHandler } = props;

  const handleClose = () => {
    toggleHandler(true);
  };

  const gotoHome = () => {
    navigate("/dashboard");
    handleClose();
  };

  return (
    <Grid container className={classes.container}>
      <Grid className={classes.gridSection1}>
        <Grid>
          <CustomButton
            startIcon={<HomeIcon />}
            btnText="Home"
            onClick={gotoHome}
          />
        </Grid>
        <Grid style={{ margin: "10px" }}>
          {StaffData.map((value, key) => (
            <Grid>
              <Typography className={classes.Text}>
                <LanIcon
                  className={classes.icons}
                  style={{
                    fontSize: "20px",
                    position: "relative",
                    top: "5px",
                    padding: "2px",
                  }}
                />
                {value.Title}
              </Typography>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "20px",
                }}
              >
                <a href={value.Team} className={classes.link}>
                  Team
                </a>
                <a href={value.ManagerDashboard} className={classes.link}>
                  {" "}
                  Manager Dashboard
                </a>
                <a href={value.TimesheetSubmission} className={classes.link}>
                  {" "}
                  Timesheet Submission
                </a>
                <a href={value.ProductivityDashboard} className={classes.link}>
                  Productivity Dashboard
                </a>
                <a href={value.PayrollAudit} className={classes.link}>
                  {" "}
                  Payroll Audit
                </a>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Grid style={{ margin: "10px" }}>
          {RoasterData.map((value, key) => (
            <Grid>
              <Typography className={classes.Text}>
                <InsertInvitationIcon
                  className={classes.icons}
                  style={{
                    fontSize: "20px",
                    position: "relative",
                    top: "5px",
                    padding: "2px",
                  }}
                />
                {value.Title}
              </Typography>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "20px",
                }}
              >
                <Link to={value.Roasters} className={classes.link}>
                  Roster
                </Link>
                <a href={value.ManageTeam} className={classes.link}>
                  {" "}
                  Manage Team
                </a>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid className={classes.gridSection1}>
        <Grid style={{ margin: "10px" }}>
          {RoasterSettingsData.map((value, key) => (
            <Grid>
              <Typography className={classes.Text}>
                <InsertInvitationIcon
                  className={classes.icons}
                  style={{
                    fontSize: "20px",
                    position: "relative",
                    top: "5px",
                    padding: "2px",
                  }}
                />
                {value.Title}
              </Typography>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "20px",
                }}
              >
                <a href={value.ManageWorkPlan} className={classes.link}>
                  Manage Work Plan
                </a>
                <a href={value.ManageworkDuration} className={classes.link}>
                  {" "}
                  Manage work Duration
                </a>
                <a href={value.ManageWorkRotation} className={classes.link}>
                  Manage Work Rotation
                </a>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Grid style={{ margin: "10px" }}>
          {RoasterRules.map((value, key) => (
            <Grid>
              <Typography className={classes.Text}>
                <InsertInvitationIcon
                  className={classes.icons}
                  style={{
                    fontSize: "20px",
                    position: "relative",
                    top: "5px",
                    padding: "2px",
                  }}
                />
                {value.Title}
              </Typography>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "20px",
                }}
              >
                <a href={value.DemandTemplate} className={classes.link}>
                  Demand Template
                </a>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Grid style={{ margin: "10px" }}>
          {AccessControl.map((value, key) => (
            <Grid>
              <Typography className={classes.Text}>
                <MiscellaneousServicesIcon
                  className={classes.icons}
                  style={{
                    fontSize: "20px",
                    position: "relative",
                    top: "5px",
                    padding: "2px",
                  }}
                />
                {value.Title}
              </Typography>

              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "20px",
                }}
              >
                <a href={value.UserControl} className={classes.link}>
                  User Control
                </a>
                <a href={value.ManageAccessRole} className={classes.link}>
                  Manage Access Role
                </a>
                <a href={value.ManageSchedulerProfile} className={classes.link}>
                  Manage Scheduler Profile
                </a>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid className={classes.gridSection1}>
        <Grid style={{ margin: "10px" }}>
          {SelfServices.map((value, key) => (
            <Grid>
              <Typography className={classes.Text}>
                <NoteAddIcon
                  className={classes.icons}
                  style={{
                    fontSize: "20px",
                    position: "relative",
                    top: "5px",
                    padding: "2px",
                  }}
                />
                {value.Title}
              </Typography>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "20px",
                }}
              >
                <a href={value.UserPrefernces} className={classes.link}>
                  User Preferences
                </a>
                <a href={value.VacationRules} className={classes.link}>
                  Vacation Rules
                </a>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Grid style={{ margin: "10px" }}>
          {Reports.map((value, key) => (
            <Grid>
              <Typography className={classes.Text}>
                <BarChartIcon
                  className={classes.icons}
                  style={{
                    fontSize: "20px",
                    position: "relative",
                    top: "5px",
                    padding: "2px",
                  }}
                />{" "}
                {value.Title}
              </Typography>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "20px",
                }}
              >
                <a href={value.TimesheetReports} className={classes.link}>
                  Timesheet Reports
                </a>
                <a
                  href={value.EmployeeTimesheetReports}
                  className={classes.link}
                >
                  Employee Timesheet Reports
                </a>
                <a href={value.RequestStatusReports} className={classes.link}>
                  Request Status Reports
                </a>
                <a href={value.RoasterDetailReport} className={classes.link}>
                  Roaster Detail Report
                </a>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Menu;
