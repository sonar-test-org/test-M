import React, { useState, useEffect } from 'react'
import { Grid, Typography } from '@mui/material'
import { makeStyles } from '@material-ui/styles'
import AssignTimes from './AssignTimes'
import AddStaffAssign from './AddStaffAssign'
import WorkDuration from './WorkDuration'
import CheckIcon from '@mui/icons-material/Check';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { CustomButton } from '../../../../components/Button'
import { Option1 } from '../../../../services/api'
import { useMutation } from 'react-query'
import { workDuration } from '../../../../services/api';
import { workLocation, onCall, Emergency } from '../../../../services/api';
import { useQuery } from 'react-query';
import { getallStaffData } from '../../../../services/api';

// import { dateConverter } from '../../../utils/commonService';

import { useSelector } from 'react-redux';
import { responsiveProperty } from '@mui/material/styles/cssUtils'
const useStyles = makeStyles(theme => (
  {
    popupContent: {
      backgroundColor: "#fff",
      border: "1px solid  rgb(233, 233, 233)",
      width: "100%",
      margin: "10px 0px 0px 0px"
    },
    iconStyle: {
      color: "#5BB75B"
    },
    cancelIconStyle: {
      color: "#f51414"
    },
  }
))

const OptionRoaster = (props) => {
  const commonReducer = useSelector((state) => state.commonReducer);
  const { status, togglehandler } = props;
  const [save, setSave] = useState("");
  const [workDurationArr, setWorkDurationArr] = React.useState([]);
  const [workLocationArr, setWorkLocationArr] = useState();

  const [location, setLocation] = useState([]);


  const [onCallArr, setOnCallArr] = useState([]);
  const [emergencyArr, setEmergencyArr] = useState();
  const [emergency, setEmergency] = useState([]);

  const [index, setIndex] = React.useState({})
  const [state, setState] = React.useState(-1);
  const [selectedValue, setSelectedValue] = React.useState([]);

  const [staffTableArr, setStaffTableArr] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [jobTitleArr, setJobTitleArr] = useState("");
  const [emergencyTableArr, setEmergencyTableArr] = React.useState("");
  const [onCallTableArr, setOnCallTableArr] = React.useState("");
  const [dutyManagerTableArr, setDutyManagerTableArr] = React.useState("");
  const [val, setVal] = useState([]);
  const [apiData, setApiData] = useState({})

// var value=val?.map(item=>console.log(item))


console.log(val)
  // console.log(dutyManagerTableArr)




  const handleChange1 = (index, option) => {

    setSelectedValue(option)
    setState(index)

  };
  const selectWorkDuration = () => {

    // console.log(selectedValue.workDurationCode)

  }

  const classes = useStyles();

  // const fetchApi=()=>
  // const {mutate:optionListMutate}=useMutation(Option1,{
  //     onSuccess:(data,context,variables)=>onSuccessProfileList(data,context,variables),
  //     onError:(data,context,variables)=>onErrorProfileList(data,context,variables)
  //    })


  // const onSuccessProfileList=(data)=>{
  //   setSave(data?.data?.data)
  // }

  // const onErrorProfileList=(data)=>{

  // }
  // useEffect(() => {
  //   Object.keys(commonReducer.selectedProjectObj)?.length > 0 && 
  //   optionListMutate({


  //         "fromDate": "01-jan-2023",
  //         "staffDtoList": [
  //           {

  //             "departmentId": 300000003155158,
  //             "dutyManager": "Annette Breyer",
  //             "emergency": emergency?.valueMeaning,
  //             "jobTitleId": 300000003085854,
  //             "onCall": "Telephone",
  //             "personId":val.personId,
  //             "personRosterId": "300000006565312",
  //             "workLocationId": location.workLocationId
  //           }
  //         ],
  //         "toDate": "01-jan-2023",
  //         "userId": "300000006565312",
  //         "workDurationDto": {
  //           "fri": index.fri,
  //           "mon": index.mon,
  //           "sat": index.sat,
  //           "shiftHours": index.shiftHours,

  //           "sun": index.sun,
  //           "thu":index.thu,
  //           "timeEnd": index.timeEnd,
  //           "timeStart": index.timeStart,              
  //           "tue": index.tue,
  //           "wed":index.wed,
  //           "workDurationCode": index.workDurationCode,
  //           "workDurationId": index.workDurationId
  //         }


  //   })
  // },[])

  const saveBtnClick = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "fromDate": "25-Dec-2022",
      "staffDtoList": val,
      "toDate": "25-Dec-2022",
              "userId": "300000006565312",
              "workDurationDto": {
              "fri": index.fri,
                "mon": index.mon,
                "sat": index.sat,
                "shiftHours": index.shiftHours,
    
                "sun": index.sun,
               "thu":index.thu,
               "timeEnd": index.timeEnd,
                "timeStart": index.timeStart,              
              "tue": index.tue,
               "wed":index.wed,
           "workDurationCode": index.workDurationCode,
              "workDurationId": index.workDurationId
              }
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://182.72.11.106:9091/ews/roster/assignSpotRosterOption1", requestOptions)
      .then(response => response)
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }


  //workDuration api integration



  const { data: getAllWorkDuration, error, isLoading } = useQuery(
    ['getworkDuration'], () => workDuration(), { enabled: true, retry: false }
  )

  useEffect(() => {
    if (getAllWorkDuration) {
      setWorkDurationArr(getAllWorkDuration?.data?.data)
    }
  }, [getAllWorkDuration])





  const onCountryChange = (object, value) => {


    for (let i in workDurationArr) {

      if (workDurationArr[i].workDurationCode == value) {
        console.log(workDurationArr[i])
        setIndex(workDurationArr[i])
      }
    }

  };
  //api integration for oncall,workLocation and emergency
  const { data: getAllWorkLocation, } = useQuery(
    ['getworkLocation'], () => workLocation(), { enabled: true, retry: false }
  )

  useEffect(() => {
    if (getAllWorkLocation) {
      setWorkLocationArr(getAllWorkLocation?.data?.data)
    }
  }, [getAllWorkLocation])


  useEffect(() => {
    if (workLocationArr?.length > 0) {
      workLocationArr?.map(option => {
        setLocation(option)
      })
    }
  },)


  //

  const { data: getAllEmergency } = useQuery(
    ['getemergency'], () => Emergency(), { enabled: true, retry: false }
  )

  useEffect(() => {
    if (getAllEmergency) {
      setEmergencyArr(getAllEmergency?.data?.data)
    }
  }, [getAllEmergency])

  useEffect(() => {
    if (emergencyArr?.length > 0) {
      emergencyArr?.map(option => {
        setEmergency(option)
      })
    }
  },)


  //
  const { data: getOnCall } = useQuery(
    ['getoncall'], () => onCall(), { enabled: true, retry: false }
  )
  useEffect(() => {
    if (getOnCall) {
      setOnCallArr(getOnCall?.data?.data)
    }
  }, [getOnCall])




  const [open, setOpen] = useState(false);



  const [addStaffArr, setAddStaffArr] = useState([]);
  const [filterData, setFilterData] = React.useState([]);




  const onChangeCheck = (value, currentIndex) => {

    var finalarr = filterData


    if (!finalarr.includes(staffData[currentIndex])) {
      finalarr.push(staffData[currentIndex])
    }

    setFilterData(finalarr)


  }


  const handleAdd = (currentIndex) => {
    

    const abc = [...val, ...filterData]

    console.log(abc)
    
    console.log(abc.length)
    var unique = [];
    abc.forEach(element => {
      if (!unique.includes(element)) {
        unique.push(element)
      }
      setVal(unique)
    })

    setOpen(false)
   
  }

  const openAddStaff = () => {
    setOpen(true)

  }
  const [staffData, setStaffData] = useState([])


  const { mutate: staffListMutate } = useMutation(getallStaffData, {
    onSuccess: (data, context, variables) => onSuccessProfileList1(data, context, variables),
    onError: (data, context, variables) => onErrorProfileList1(data, context, variables)
  })


  const onSuccessProfileList1 = (data) => {
    setStaffData(data?.data?.data)
  }

  const onErrorProfileList1 = (data) => {

  }
  useEffect(() => {
    Object.keys(commonReducer.selectedProjectObj)?.length > 0 && staffListMutate({

      "asc": true,
      "pageNo": "0",
      "pageSize": "15",
      "sortingField": "fullName",
      "userId": "300000006565312"

    })
  }, [])


  return (


    <Grid container style={{ marginTop: "10px" }}>
      <Grid item xs="12" className={classes.popupContent} style={{ display: "flex", flexDirection: "row" }}>
        <Grid item xs="5">
          <AssignTimes />
        </Grid>
        <Grid item xs="4" style={{ marginTop: "30px" }}>
          <WorkDuration
            workDurationArr={workDurationArr}
            index={index}
            onCountryChange={onCountryChange}
            selectedValue={selectedValue.workDurationCode}
            handleChange1={handleChange1}
            state={state}
            setState={setState}
            selectWorkDuration={selectWorkDuration}

          />
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: "10px" }}>
        <Grid item xs="12" className={classes.popupContent} >
          <AddStaffAssign
            workLocationArr={workLocationArr}
            onCallArr={onCallArr}
            emergencyArr={emergencyArr}
            val={val}
            onChangeCheck={onChangeCheck}
            setVal={setVal}
            filterData={filterData}
            staffData={staffData}
            setOpen={setOpen}
            handleAdd={handleAdd}
            addStaff={addStaffArr}
            open={open}
            openAddStaff={openAddStaff}
            setStaffTableArr={setStaffTableArr}
            setDepartmentName={setDepartmentName}
            setDutyManagerTableArr={setDutyManagerTableArr}
            setJobTitleArr={setJobTitleArr}
            setEmergencyTableArr={setEmergencyTableArr}
            setOnCallTableArr={setOnCallTableArr}


          />
        </Grid>
      </Grid>
      <Grid container style={{ margin: "10px 0px 0px 0px" }}>
        <Grid item >
          <CustomButton
            btnText="Save"
            onClick={saveBtnClick}
            startIcon={<CheckIcon className={classes.iconStyle} />}
            variant="contained"
            btnClass={{ backgroundColor: "#124590", color: "#fff" }}
          />
          <CustomButton
            btnText="Cancel"
            startIcon={<NotInterestedIcon className={classes.cancelIconStyle} />}
            variant="contained"

            btnClass={{ backgroundColor: "#124590", color: "#fff", marginLeft: "10px" }}
          />
        </Grid>
      </Grid>

    </Grid>
  )
}

export default OptionRoaster
