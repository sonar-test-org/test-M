import { Box, Typography } from "@mui/material";
import React from "react";

import { Popover } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { CustomAutoComplete } from "../../../../components/CustomAutoComplete";
import {
  dateConverter,
  dateConverterWithoutYear,
} from "../../../../utils/commonService";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { EmployeeFilterDetail } from "../../Dashboard/employeeFilterDetail";
import { useState } from "react";
import moment from "moment";
import { useEffect } from "react";
import { updateState } from "../../../../redux/commonSlice";

export const DateWidget = (props) => {
  const classes = useStyles();

  const { setAppStatus } = props;
  const commonReducer = useSelector((state) => state.commonReducer);
  const dispatch = new useDispatch();
  const dateWidgetOptionArr = [
    { id: 1, label: "Weekly", value: "1", type: "weeks" },
    { id: 2, label: "Bi-Weekly", value: "2", type: "weeks" },
    // { id: 2, label: "Three-Weekly", value: "2", type: "weeks" },
    { id: 3, label: "Monthly", value: "1", type: "months" },
    // { id: 4, label: "6 Month", value: "6", type: "months" }
  ];

  const FilterArray = [
    { id: 1, label: "No Filter", value: "" },
    { id: 2, label: "Not Submitted", value: "NS" },
    { id: 3, label: "Pending Approval", value: "PA" },
    { id: 4, label: "Approved", value: "A" },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [startDateForText, setStartDateForText] = useState("");
  const [dateWidgetSelectedOption, setDateWidgetSelectedOption] = useState(
    dateWidgetOptionArr[0]
  );
  const [dayDiff, setDayDiff] = useState(6);
  const [employeeFilter, setEmployeeFilter] = useState(false);
  const [filter, setFilter] = useState(FilterArray[0]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    commonReducer.oriDate
      ? commonLogic("diff", commonReducer.oriDate)
      : commonLogic("", moment());
  }, [dayDiff]);

  useEffect(() => {
    if (Object.keys(dateWidgetSelectedOption).length > 0) {
      var a = moment(new Date(startDate));
      var b = a.add(
        dateWidgetSelectedOption.value,
        dateWidgetSelectedOption.type
      );
      //
      setDayDiff(
        (moment(new Date(startDate)).diff(moment(b), "days") + 1) * -1
      );
    }
  }, [dateWidgetSelectedOption]);

  const commonLogic = (type, e) => {
    var a =
      dateWidgetSelectedOption.type != "months"
        ? moment(new Date(e))
        : moment(new Date(e)).startOf("month");
    var b = a.add(
      dateWidgetSelectedOption.value,
      dateWidgetSelectedOption.type
    );

    var localDiff =
      dateWidgetSelectedOption.type != "months"
        ? (moment(new Date(e)).diff(moment(b), "days") + 1) * -1
        : (moment(new Date(e)).startOf("month").diff(moment(b), "days") + 1) *
          -1;

    var localDayArr = [];
    for (var i = 0; i <= localDiff; i++) {
      localDayArr.push(
        type == "diff"
          ? moment(e).add(i, "days").format("DD")
          : moment().add(i, "days").format("DD")
      );
    }

    var localStartDay = type == "diff" ? moment(e) : moment();
    const lastDay = localStartDay.add(localDiff, "days").format("DD-MM-YYYY");
    dispatch(
      updateState({
        oriDate: type == "diff" ? moment(e).format() : startDate,
        startDate:
          type == "diff"
            ? dateWidgetSelectedOption.type != "months"
              ? moment(e).format("DD-MM-YYYY")
              : moment(e).startOf("month").format("DD-MM-YYYY")
            : moment().format("DD-MM-YYYY"),
        endDate: lastDay,
        dayArr: localDayArr,
      })
    );
  };

  const handleChange = (e) => {
    var localDate =
      dateWidgetSelectedOption.type != "months"
        ? new Date(moment(e).startOf("week").format())
        : new Date(moment(e).startOf("month").format());
    setStartDateForText(
      e.getMonth() + 1 + "-" + e.getDate() + "-" + e.getFullYear()
    );
    setStartDate(dateConverter);
    setAnchorEl(null);
    setAppStatus("");
    commonLogic("diff", localDate);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getFormattedDate = (currentDate) => {
    return moment(currentDate).format("DD-MM-YYYY");
  };

  const prevDate = () => {
    commonLogic(
      "diff",
      moment(commonReducer.oriDate ? commonReducer.oriDate : null)
        .add(-dateWidgetSelectedOption.value, dateWidgetSelectedOption.type)
        .format()
    );
    // setStartDate(new Date(startDate.setDate(startDate.getDate() - startDate.getDay() - 7)))
  };
  const nextDate = () => {
    commonLogic(
      "diff",
      moment(commonReducer.oriDate ? commonReducer.oriDate : null)
        .add(dateWidgetSelectedOption.value, dateWidgetSelectedOption.type)
        .format()
    );
    // setStartDate(new Date(startDate.setDate(startDate.getDate() - startDate.getDay() + 7)))
  };

  const employeeclickhandler = () => {
    setEmployeeFilter(true);
  };

  return (
    <>
      <ChevronLeftIcon className={classes.enddate} onClick={prevDate} />
      <Box>{`${dateConverterWithoutYear(
        commonReducer.startDate
      )} to ${dateConverterWithoutYear(commonReducer.endDate)}`}</Box>
      <ChevronRightIcon className={classes.nextdate} onClick={nextDate} />
      <Box>
        <Box className="calender-widget-wrap" onClick={handleClick}>
          <Typography component="span" className={classes.calenderdropdown}>
            {startDateForText == ""
              ? dateConverter(getFormattedDate(startDate))
              : dateConverter(getFormattedDate(startDateForText))}
            <CalendarMonthIcon className={classes.calendericon} />
          </Typography>
        </Box>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <DatePicker
            selected={
              startDateForText == "" ? startDate : new Date(startDateForText)
            }
            onChange={handleChange}
            inline
          />
        </Popover>
      </Box>
      <CustomAutoComplete
        id="Duration"
        required
        options={dateWidgetOptionArr}
        getoptionlabelkey="label"
        selectedvalue={dateWidgetSelectedOption}
        onChange={(_event, newData) => {
          // setAppStatus("");
          setDateWidgetSelectedOption(newData);
        }}
        className={classes.duration}
      />
      {/* <CustomAutoComplete
            id="filter"
            required
            options={FilterArray}
            getoptionlabelkey="label"
            selectedvalue={filter}
            onChange={(_event, newData) => {
                setAppStatus(newData.value);
                setFilter(newData)
            }}
            className={classes.filterData} /> */}
      {/* <Box ml={2} onClick={employeeclickhandler}>
            <Typography variant='h7' className={classes.employee}>{!employeeFilter ? <FilterAltIcon className={classes.FilterAltIcon} /> : <FilterAltOffIcon className={classes.FilterAltIcon} />}Employee</Typography>
        </Box> */}
      {/* {
            employeeFilter &&
            <EmployeeFilterDetail
                togglerhandler={setEmployeeFilter}
                {...props}
            />
        } */}
    </>
  );
};
const useStyles = makeStyles((theme) => ({
  enddate: {
    color: "#124590",
    cursor: "pointer",
  },
  calendericon: {
    color: "#124590",
    cursor: "pointer",
    alignItems: "center !important",
    marginLeft: "10px",
  },
  duration: {
    width: "140px !important",
    marginLeft: "10px !important",
  },
  filterData: {
    width: "170px !important",
    marginLeft: "10px !important",
  },
  calenderdropdown: {
    fontSize: "14px !important",
    display: "flex !important",
    alignItems: "center !important",
  },
  nextdate: {
    verticalAlign: "bottom",
    cursor: "pointer",
    color: "#124590",
  },
  employee: {
    backgroundColor: "#124590",
    width: "130px",
    padding: "9.1px",
    cursor: "pointer",
    alignItems: "center",
    display: "flex",
    color: "#fff",
    justifyContent: "center",
  },
  FilterAltIcon: {
    color: "white !important",
    fontSize: "large !important",
    marginRight: "10px",
  },
}));
