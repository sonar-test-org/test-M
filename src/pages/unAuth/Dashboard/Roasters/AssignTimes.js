import { Box, Grid, Typography } from '@mui/material'
import React, { } from 'react'
import { Popover } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { dateConverter, dateConverterWithoutYear } from '../../../../utils/commonService';

import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';

import { useState } from 'react';
import moment from 'moment';

import { updateState } from '../../../../redux/commonSlice';
import { CustomTextField } from '../../../../components/TextField';



const AssignTimes = () => {
    const classes=useStyles();
    const commonReducer = useSelector((state) => state.commonReducer);
    const dispatch = new useDispatch();
    const [startDateForText, setStartDateForText] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDateForText, setEndDateForText] = useState("");
    const [endDate, setEndDate] = useState(new Date());
    const [anchorEl, setAnchorEl] = React.useState(null);


    const dateWidgetOptionArr = [
      { id: 1, label: "Weekly", value: "1", type: "weeks" },
      { id: 2, label: "Bi-Weekly", value: "2", type: "weeks" },
      // { id: 2, label: "Three-Weekly", value: "2", type: "weeks" },
      { id: 3, label: "Monthly", value: "1", type: "months" },
      // { id: 4, label: "6 Month", value: "6", type: "months" }
  ]
  const [dateWidgetSelectedOption, setDateWidgetSelectedOption] = useState(dateWidgetOptionArr[0]);


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = (event) => { setAnchorEl(event.currentTarget); };

    const handleClose = () => { setAnchorEl(null); };

    const getFormattedDate = (currentDate) => { return moment(currentDate).format("DD-MM-YYYY") }
    const commonLogic = (type, e) => {
      var a = dateWidgetSelectedOption.type != "months" ? moment(new Date(e)) : moment(new Date(e)).startOf('month');
      var b = a.add(dateWidgetSelectedOption.value, dateWidgetSelectedOption.type);

      var localDiff = dateWidgetSelectedOption.type != "months" ? (((moment(new Date(e))).diff(moment(b), 'days')) + 1) * -1 : (((moment(new Date(e)).startOf('month')).diff(moment(b), 'days')) + 1) * -1;

      var localDayArr = [];
      for (var i = 0; i <= localDiff; i++) {
          localDayArr.push(type == "diff" ? moment(e).add(i, 'days').format("DD") : moment().add(i, 'days').format("DD"));
      }

      var localStartDay = type == "diff" ? moment(e) : moment();
      const lastDay = localStartDay.add(localDiff, 'days').format("DD-MM-YYYY");
      dispatch(updateState({
          oriDate: type == "diff" ? moment(e).format() : startDate,
          startDate: type == "diff" ? dateWidgetSelectedOption.type != "months" ? moment(e).format("DD-MM-YYYY") : moment(e).startOf('month').format("DD-MM-YYYY") : moment().format("DD-MM-YYYY"),
          endDate: lastDay,
          dayArr: localDayArr
      }))
  }
    
    const handleChange = (e) => {
        var localDate = dateWidgetSelectedOption.type != "months" ? new Date(moment(e).startOf('week').format()) : new Date(moment(e).startOf('month').format());
        setStartDateForText((e.getMonth() + 1) + '-' + e.getDate() + '-' + e.getFullYear());
        setStartDate(dateConverter);

        setEndDateForText((e.getMonth() + 1) + '-' + e.getDate() + '-' + e.getFullYear());
        setEndDate(dateConverter);
        setAnchorEl(null);
        
        commonLogic("diff", localDate)
    };
    const handleChange1 = (e) => {
      var localDate = dateWidgetSelectedOption.type != "months" ? new Date(moment(e).startOf('week').format()) : new Date(moment(e).startOf('month').format());
      // setStartDateForText((e.getMonth() + 1) + '-' + e.getDate() + '-' + e.getFullYear());
      // setStartDate(dateConverter);

      setEndDateForText((e.getMonth() + 1) + '-' + e.getDate() + '-' + e.getFullYear());
      setEndDate(dateConverter);
      setAnchorEl(null);
      
      commonLogic("diff", localDate)
  };

  return (
    <Grid container>
      {/* <Grid item xs="12">
       {/* <Box className={classes.headerBox}>
      <Typography className={classes.headerText}>Times</Typography>
       </Box> */}
       {/* </Grid>  */}
       <Grid className={classes.dateBoxGrid}>
             
              <Box className={classes.dateBox} style={{marginLeft:"10px"}}>
                   <Typography style={{display:"flex",alignItems:"center",fontSize:"14px",fontWeight:"bold",fontFamily:"Inter"}}>*From Date</Typography>
        
                      <Box style={{marginLeft:"20px"}}>
                         <Box className='calender-widget-wrap' onClick={handleClick}>
                             <Typography component='span' className={classes.calenderdropdown}>
                                 {startDateForText == "" ? dateConverter(getFormattedDate(startDate)) : dateConverter(getFormattedDate(startDateForText))}
                                    <CalendarMonthIcon className={classes.calendericon} />
                              </Typography>
                            </Box>
                              <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}                        >
                                  <DatePicker selected={startDateForText == "" ? startDate : new Date(startDateForText)} onChange={handleChange} inline />
                                </Popover>
                              </Box>
                </Box>
                
              <Box className={classes.dateBox} style={{marginLeft:"28px"}}>
                   <Typography style={{display:"flex",alignItems:"center",fontSize:"14px",fontWeight:"bold",fontFamily:"Inter"}}>*To Date</Typography>
        
                      <Box style={{marginLeft:"20px"}}>
                         <Box className='calender-widget-wrap' onClick={handleClick}>
                             <Typography component='span' className={classes.calenderdropdown}>
                                 {endDateForText == "" ? dateConverter(getFormattedDate(endDate)) : dateConverter(getFormattedDate(endDateForText))}
                                    <CalendarMonthIcon className={classes.calendericon} />
                              </Typography>
                            </Box>
                              <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}                        >
                                  <DatePicker selected={endDateForText == "" ? endDate : new Date(endDateForText)} onChange={handleChange1} inline />
                                </Popover>
                              </Box>
                </Box>
        
        <Box className={classes.dateBox} style={{marginLeft:"10px"}}>
          <Typography  style={{display:"flex",alignItems:"center",fontSize:"14px",fontWeight:"bold",fontFamily:"Inter"}}>Comments</Typography>
          <CustomTextField 
          style={{marginLeft:"22px"}}
          />
        </Box>
       
            
       </Grid>
       
    </Grid>
  )
}

export default AssignTimes

const useStyles=makeStyles(theme=>({
   headerBox:{
     margin:"5px 0px 0px 10px"
   },
    headerText:{
        fontSize:"14px",
        fontFamily:"Inter",
        fontWeight:"bold",
        color:"#4594D7"
      
    },
    dateBox:{
      display:"flex",
      flexDirection:"row",
      padding:"10px",
     
    },
    dateText:{
      fontSize:"8px",
      fontFamily:"Inter",
      color:"red"
    },
    calendericon: {
      color: '#124590',
      cursor: "pointer",
      alignItems: "center !important",
      marginLeft:"10px",
      
  },
  calenderdropdown: {
    fontSize: "14px !important",
    display: "flex !important",
    alignItems: "center !important",
},
dateBoxGrid:{
  display:"flex",
  flexDirection:"column !important"
}
}))