import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { CustomButton } from '../../../components/Button';
import { Popover } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { updateState } from '../../../redux/commonSlice';
import { CustomAutoComplete } from '../../../components/CustomAutoComplete';
import { dateConverter } from '../../../utils/commonService';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { EmployeeTable } from '../Dashboard/EmployeeTable';
import { ProjectDetailModal } from '../Dashboard/ProjectDetailModal';
import { EmployeeFilterDetail } from '../Dashboard/employeeFilterDetail';
import { DepartmentFilterDetail } from '../Dashboard/departmentFilterDetails';
import { JobTitlesFilterDetail } from '../Dashboard/jobfilterDetails';
import { RequestModel } from './requestModel';
import { EmployeeTeamTable } from './employeTeamTable';





const useStyles = makeStyles(theme => ({
    projectname: {
        color: "#6F6F6F",
        display: "inline-block ",
        margin: "10px 0px 0px 20px !important",
        textOverflow: "ellipsis ",
        overflow: "hidden ",
        width: "calc(100% - 190px)",
        whiteSpace: "nowrap ",
        verticalAlign: "sub ",
    },
    dateWrap: {
        display: "flex",
        alignItems: "center ",
        marginTop: "10px",
    },
    calendericon: {
        color: '#124590',
        cursor: "pointer",
        alignItems: "center "
    },
    duration: {
        width: "140px ",
        marginLeft: "10px ",
    },
    filterData: {
        width: "170px ",
        marginLeft: "10px ",
    },
    calenderdropdown: {
        display: "flex ",
        alignItems: "center ",
        padding: "1.2px",
    },
    Wrap: {
        display: "flex",
        '& p': {
            fontWeight: "bold",
            marginLeft: "10px",
            textAlign: "center",
            fontSize: "14px ",
        }
    },
    daycolor: {
        backgroundColor: "#0572ce",
        color: "#fff",
        border: '1px solid #0572ce'
    },
    dateManage: {
        color: "#6F6F6F"
    },
    employee: {
        backgroundColor: "#124590 ",
        width: "130px",
        padding: "9.1px",
        cursor: "pointer",
        alignItems: "center",
        display: "flex",
        color: "#fff",
        justifyContent: "center"
    },
    FilterAltIcon: {
        color: "white !important",
        fontSize: "large !important",
        marginRight: "10px",

    },
    clearFilter: {
        backgroundColor: "#f0ad4e",
        width: "130px",
        padding: "9.1px",
        cursor: "pointer",
        alignItems: "center",
        display: "flex",
        color: "#fff",
        justifyContent: "center"
    },
}));


export const ProjectCardSelect = (props) => {
    const classes = useStyles();

    const { pagedata, setAppStatus, setPagedata, appStatus, setOriPagedata } = props;
    const commonReducer = useSelector((state) => state.commonReducer);
    const dispatch = new useDispatch();
    const dateWidgetOptionArr = [
        { id: 1, label: "Weekly", value: "1", type: "weeks" },
        { id: 2, label: "Bi-Weekly", value: "2", type: "weeks" },
        // { id: 2, label: "Three-Weekly", value: "2", type: "weeks" },
        { id: 3, label: "Monthly", value: "1", type: "months" },
        // { id: 4, label: "6 Month", value: "6", type: "months" }
    ]


    const FilterArray = [
        { id: 1, label: "Select Filter", value: "" },
        { id: 2, label: "Not Subbmitted", value: "NS" },
        { id: 3, label: "Pending Approval", value: "PA" },
        { id: 4, label: "Approved", value: "A" },
        { id: 5, label: "Employee", value: "E" },
        { id: 6, label: "Clear Filter", value: "" },

    ]

    const [project, setProject] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [startDateForText, setStartDateForText] = useState("");
    const [dateWidgetSelectedOption, setDateWidgetSelectedOption] = useState(dateWidgetOptionArr[0]);
    const [dayDiff, setDayDiff] = useState(6);
    const [notsubmiticon, setnotsubmiticon] = useState(true);
    const [pendinapproveicon, setPendinPpproveicon] = useState(true);
    const [approved, setApproved] = useState(true);
    const [employee, setEmployee] = useState(true);
    const [nulldata, setNulldata] = useState(false);
    const [filter, setFilter] = useState(FilterArray[0]);
    const [activeTime, setActiveTime] = useState("Day");
    const [employeeFilter, setEmployeeFilter] = useState(false);
    const [departmentFilter, setDepaertmentFilter] = useState(false);
    const [jobTypeFilter, setJobTypeFilter] = useState(false);
    const [clearFilter, setClearFilter] = useState(false);
    const [requsetFilter, setRequsetFilter] = useState(false);


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    useEffect(() => {
        commonReducer.oriDate ? commonLogic("diff", commonReducer.oriDate) : commonLogic()
    }, [dayDiff]);

    useEffect(() => {
        if (Object.keys(dateWidgetSelectedOption)?.length > 0) {
            var a = moment(new Date(startDate));
            var b = a.add(dateWidgetSelectedOption.value, dateWidgetSelectedOption.type);
            setDayDiff(((moment(new Date(startDate)).diff(moment(b), 'days')) + 1) * -1)
        }
    }, [dateWidgetSelectedOption])


    const commonLogic = (type, e) => {
        var localDayArr = [];
        for (var i = 0; i <= dayDiff; i++) {
            localDayArr.push(type == "diff" ? moment(e).add(i, 'days').format("DD") : moment().add(i, 'days').format("DD"));
        }

        var localStartDay = type == "diff" ? moment(e) : moment()
        const lastDay = localStartDay.add(dayDiff, 'days').format("DD-MM-YYYY");
        // .startOf('week')
        dispatch(updateState({
            oriDate: type == "diff" ? moment(e).format() : moment().format(),
            startDate: type == "diff" ? moment(e).format("DD-MM-YYYY") : moment().format("DD-MM-YYYY"),
            endDate: lastDay, dayArr: localDayArr
        }))
    }

    const handleChange = (e) => {
        var localDate = new Date(moment(e).startOf('week').format());
        setStartDateForText((e.getMonth() + 1) + '-' + e.getDate() + '-' + e.getFullYear());
        setStartDate(dateConverter);
        setAnchorEl(null);
        setAppStatus("");
        commonLogic("diff", localDate)
    };


    const selectprojectclickhandler = () => { setProject(true) }

    const handleClick = (event) => { setAnchorEl(event.currentTarget); };

    const handleClose = () => { setAnchorEl(null); };

    const getFormattedDate = (currentDate) => { return moment(currentDate).format("DD-MM-YYYY") }

    const prevDate = () => {
        commonLogic("diff", moment(commonReducer.oriDate ? commonReducer.oriDate : null).add(-dateWidgetSelectedOption.value, dateWidgetSelectedOption.type).format())
        // setStartDate(new Date(startDate.setDate(startDate.getDate() - startDate.getDay() - 7)))
    }
    const nextDate = () => {
        commonLogic("diff", moment(commonReducer.oriDate ? commonReducer.oriDate : null).add(dateWidgetSelectedOption.value, dateWidgetSelectedOption.type).format())
        // setStartDate(new Date(startDate.setDate(startDate.getDate() - startDate.getDay() + 7)))
    }



    const setCardValueByType = (type) => {
        return pagedata?.length > 0 ?
            pagedata.reduce((acc, val) => acc + (val?.[type] == null ? 0 : val?.[type]), 0) > 0 ?
                pagedata.reduce((acc, val) => acc + (val?.[type] == null ? 0 : val?.[type]), 0).toFixed(2)
                : 0
            : 0
    }

    const employeeclickhandler = () => {
        setEmployeeFilter(true)
    }

    const departmentclickhandler = () => {
        setDepaertmentFilter(true)
    }

    const jobtypeclickhandler = () => {
        setJobTypeFilter(true)
    }

    const clearfilterclickhandler = () => {
        setJobTypeFilter(false)
        setDepaertmentFilter(false)
        setEmployeeFilter(false)

    }

    const requsetclickhandler = () => {
        setRequsetFilter(true)
    }

    return <Box>
        <Grid container p={2} justifyContent="space-between" borderBottom='1px solid rgb(233, 233, 233)'>
            <Box fontWeight="bold" pb={1}>Team</Box>
            <Grid item xs='12' pb={1}>
                <CustomButton
                    btnText='select Profile'
                    variant='contained'
                    onClick={selectprojectclickhandler}
                    btnClass={{ backgroundColor: "#124590", color: "#fff", fontSize: "12px" }}
                />
                {
                    Object.keys(commonReducer.selectedProjectObj)?.length > 0 &&
                    <Typography variant='h7' className={classes.projectname}>{commonReducer.selectedProjectObj.projectName} </Typography>
                }
            </Grid>
            <Box display='flex' border='1px solid #0572ce' className='cursor-pointer' m='10px 0px 10px 0px'>
                <Box fontWeight='bold' px='10px' py='5px' onClick={() => setActiveTime("Day")} className={activeTime == 'Day' ? classes.daycolor : ""}>Day</Box>
                <Box fontWeight='bold' px='10px' py='5px' onClick={() => setActiveTime("Week")} className={activeTime == 'Week' ? classes.daycolor : ""}>Week</Box>
            </Box>
            <Grid item xs='12' className={classes.dateWrap}>
                <Typography color='#124590' className='cursor-pointer' pt={0.5}>
                    <ChevronLeftIcon onClick={prevDate} />
                </Typography>
                {/* after start date to ${dateConverter(commonReducer.endDate)} */}
                <Typography variant='h7' color='#124590'>{`${dateConverter(commonReducer.startDate)}`}</Typography>
                <Typography color='#124590' className='cursor-pointer' pt={0.5}>
                    <ChevronRightIcon onClick={nextDate} />
                </Typography>
                <Box height='42px'>
                    <Box className='calender-widget-wrap' onClick={handleClick}>
                        <Typography variant='h7' className={classes.calenderdropdown}>
                            {startDateForText == "" ? dateConverter(getFormattedDate(startDate)) : dateConverter(getFormattedDate(startDateForText))}
                            <CalendarMonthIcon className={classes.calendericon} />
                        </Typography>
                    </Box>
                    <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}                        >
                        <DatePicker selected={startDateForText == "" ? startDate : new Date(startDateForText)} onChange={handleChange} inline />
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
                        setDateWidgetSelectedOption(newData)
                    }}
                    className={classes.duration} />
                {/* <CustomAutoComplete
                id="Duration"
                required
                options={FilterArray}
                getoptionlabelkey="label"
                selectedvalue={filter}
                onChange={(_event, newData) => {
                    setAppStatus(newData.value);
                    setFilter(newData)
                }}
                className={classes.filterData} /> */}

                <Box>
                    <Grid container>
                        <Box ml={2} onClick={employeeclickhandler}>
                            <Typography variant='h7' className={classes.employee}>{!employeeFilter ? <FilterAltIcon className={classes.FilterAltIcon} /> : <FilterAltOffIcon className={classes.FilterAltIcon} />}Employee</Typography>
                        </Box>
                        <Box ml={2} onClick={departmentclickhandler}>
                            <Typography variant='h7' className={classes.employee}>{!departmentFilter ? <FilterAltIcon className={classes.FilterAltIcon} /> : <FilterAltOffIcon className={classes.FilterAltIcon} />}Department</Typography>
                        </Box>
                        <Box ml={2} onClick={jobtypeclickhandler}>
                            <Typography variant='h7' className={classes.employee}>{!jobTypeFilter ? <FilterAltIcon className={classes.FilterAltIcon} /> : <FilterAltOffIcon className={classes.FilterAltIcon} />}Job Title</Typography>
                        </Box>
                        <Box ml={2} onClick={clearfilterclickhandler}>
                            <Typography variant='h7' className={classes.clearFilter}>{!clearFilter ? <FilterAltIcon className={classes.FilterAltIcon} /> : <FilterAltOffIcon className={classes.FilterAltIcon} />}Clear Filter</Typography>
                        </Box>
                        <Box ml={2} onClick={requsetclickhandler}>
                            <Typography variant='h7' className={classes.employee}>{!requsetFilter ? <FilterAltIcon className={classes.FilterAltIcon} /> : <FilterAltOffIcon className={classes.FilterAltIcon} />}Request</Typography>
                        </Box>
                    </Grid>
                </Box>

            </Grid>
            <Grid item xs='12' className={classes.Wrap} mt='10px'>
                <Box px={2} borderRight='1px solid rgb(233, 233, 233)'>
                    <Typography color='#3CAF85'>{setCardValueByType('schHrs')}</Typography>
                    <Typography variant='h7'>Total Person</Typography>
                </Box>
                <Box px={2} borderRight='1px solid rgb(233, 233, 233)'>
                    <Typography color='#47BDEF'>{setCardValueByType('schHrs')}</Typography>
                    <Typography variant='h7'>Scheduled Hrs</Typography>
                </Box>
                <Box px={2} borderRight='1px solid rgb(233, 233, 233)'>
                    <Typography color='#4a85c5'>{setCardValueByType('wrkHrs')}</Typography>
                    <Typography variant='h7'>Working Hours</Typography>
                </Box>
                {/* {
                setCardValueByType('regularHrs') === 0 ? "" : <Box px={2} borderRight='1px solid rgb(233, 233, 233)'>
                    <Typography color='#ed6647'>{setCardValueByType('regularHrs')}</Typography>
                    <Typography variant='h7'>Regular Hrs</Typography>
                </Box>
            }
            {
                setCardValueByType('lapsHours') === 0 ? "" : <Box px={2} borderRight='1px solid rgb(233, 233, 233)'>
                    <Typography color='#ed6647'>{setCardValueByType('lapsHours')}</Typography>
                    <Typography variant='h7'>Lapse Hours</Typography>
                </Box>
            } */}
                <Box px={2} borderRight='1px solid rgb(233, 233, 233)'>
                    <Typography color='#ed6647'>{setCardValueByType('paidLeaveHrs')}</Typography>
                    <Typography variant='h7'>No Show No Reason</Typography>
                </Box>
                <Box px={2} borderRight='1px solid rgb(233, 233, 233)'>
                    <Typography color='#A0A0A0'>
                        {setCardValueByType('unpaidLeaveHrs')}</Typography>
                    <Typography variant='h7'>Late</Typography>
                </Box>
                <Box px={2}>
                    <Typography color='#A0A0A0'>
                        {setCardValueByType('holidayHours')}</Typography>
                    <Typography variant='h7'>Left Early</Typography>
                </Box>
            </Grid>
        </Grid>
        {/* <Box mt={2}> */}
        <Grid container alignItems='center'>
            {/* <Box display='flex' alignItems='center' p={1}>
                <Typography>View</Typography>
                <ArrowDropDownIcon cursor='pointer' fontSize='large' color='#333333' />
            </Box>
            <Box display='flex' alignItems='center' p={1}>
                <RequestQuoteIcon cursor='pointer' fontSize='md' color='#333333' />
                <Typography>Export to Excel</Typography>
            </Box> */}
            <EmployeeTeamTable
                setPagedata={setPagedata}
                setOriPagedata={setOriPagedata}
                pagedata={pagedata}
                appStatus={appStatus}
            />
        </Grid>
        {/* </Box> */}

        {
            project &&
            <ProjectDetailModal togglerHandler={setProject} />
        }

        {
            employeeFilter &&
            <EmployeeFilterDetail
                togglerhandler={setEmployeeFilter}
                {...props}
            />
        }

        {
            departmentFilter &&
            <DepartmentFilterDetail
                togglerhandler={setDepaertmentFilter}
                {...props}
            />
        }

        {
            jobTypeFilter &&
            <JobTitlesFilterDetail
                togglerhandler={setJobTypeFilter}
                {...props}
            />
        }

        {
            requsetFilter &&
            <RequestModel
                togglerhandler={setRequsetFilter}
                {...props}
            />
        }

    </Box>
}
