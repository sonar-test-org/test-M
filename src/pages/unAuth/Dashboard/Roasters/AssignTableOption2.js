import React,{useEffect,useState} from 'react'
import {   Grid, Typography,Box, Autocomplete,TextField } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';
import { CustomTextField } from '../../../../components/TextField';
import { useQuery } from 'react-query';
import  {workLocation,onCall,Emergency } from '../../../../services/api';
import { workDuration } from '../../../../services/api';
import CustomCheckBox from '../../../../components/CustomCheckBox'

const AssignTableOption2 = (props) => {
    const{value,setValue,data,staffData}=props
    // const[data,setData]= useState()
         
    const deleteRow=(i)=>{
        const deleteval=[...value]
        deleteval?.splice(i,1)
        setValue(deleteval)
        // console.log(value)
    }
    


// const classes=useStyles();
const [workDurationArr,setWorkDurationArr]=React.useState([])
const[startTime,setStartTime]=React.useState("")
// const[endTime,setEndTime]=React.useState("")
// const[shiftHrs,setShiftHrs]=React.useState("")
const[index,setIndex]=React.useState({})

var startTimeArr=index.timeStart?.split("T");
var StartTime=startTimeArr?.[1]

var endTimeArr=index.timeEnd?.split("T");
var EndTime=endTimeArr?.[1]

const {data:getAllWorkDuration,error,isLoading}=useQuery(
    ['getworkDuration'], () => workDuration(), { enabled: true, retry: false }
)

useEffect(() => {
    if (getAllWorkDuration) {
        setWorkDurationArr(getAllWorkDuration?.data?.data)
    }
}, [getAllWorkDuration])

const onCountryChange = (object, value) => {
    for(let i in workDurationArr)
    {
        // console.log(workDurationArr[i])
        if(workDurationArr[i].workDurationCode==value)
        {
            setIndex(workDurationArr[i])
        }
    }
    
  };
  const[workLocationArr,setWorkLocationArr]=useState([]);
  const[onCallArr,setOnCallArr]=useState([]);
  const[emergencyArr,setEmergencyArr]=useState([]);

  const {data:getAllWorkLocation,}=useQuery(
    ['getworkLocation'], () => workLocation(), { enabled: true, retry: false }
)

useEffect(() => {
    if (getAllWorkLocation) {
        setWorkLocationArr(getAllWorkLocation?.data?.data)
    }
}, [getAllWorkLocation])





const {data:getAllEmergency}=useQuery(
    ['getemergency'], () => Emergency(), { enabled: true, retry: false }
)

useEffect(() => {
    if (getAllEmergency) {
        setEmergencyArr(getAllEmergency?.data?.data)
    }
}, [getAllEmergency])

console.log(emergencyArr)
const {data:getOnCall}=useQuery(
       ['getoncall'], () => onCall(), { enabled: true, retry: false }
     )
     useEffect(() => {
             if (getOnCall) {
         setOnCallArr(getOnCall?.data?.data)
            }
     }, [getOnCall])



  return (
    <Grid item xs="12"  style={{margin:"10px",overflowX:"scroll",}}>
    <Grid >
         <table style={{border:"1px solid  #dbdbdb",width:"100%",borderCollapse:"collapse",overflowX:"scroll",}}>
                  <thead>
                <td style={{border:"1px solid  #dbdbdb",borderCollapse:"collapse",width:"4%"}}>
                    <tr style={{fontSize:"14px",fontWeight:"bold",fontFamily:"Inter",}}>
                        Remove
                    </tr>
                </td>
                <td style={{border:"1px solid  #dbdbdb",borderCollapse:"collapse",width:"12%"}}>
                    <tr style={{fontSize:"14px",fontWeight:"bold",fontFamily:"Inter"}}>
                        *Staff
                    </tr>
                </td>
                <td style={{border:"1px solid  #dbdbdb",borderCollapse:"collapse",width:"12%"}}>
                    <tr style={{fontSize:"14px",fontWeight:"bold",fontFamily:"Inter"}}>
                        Work Duration
                    </tr>
                </td>
                <td style={{border:"1px solid  #dbdbdb",borderCollapse:"collapse",width:"5%"}}>
                    <tr style={{fontSize:"14px",fontWeight:"bold",fontFamily:"Inter"}}>
                        Start Time
                    </tr>
                </td>
                <td style={{border:"1px solid  #dbdbdb",borderCollapse:"collapse",width:"5%",}}>
                    <tr style={{fontSize:"14px",fontWeight:"bold",fontFamily:"Inter",}}>
                        End Time
                    </tr>
                </td>
                <td style={{border:"1px solid  #dbdbdb",borderCollapse:"collapse",width:"12%",}}>
                    <tr style={{fontSize:"14px",fontWeight:"bold",fontFamily:"Inter"}}>
                        Working Days
                    </tr>
                </td>
                <td style={{border:"1px solid  #dbdbdb",borderCollapse:"collapse",width:"12%"}}>
                    <tr style={{fontSize:"14px",fontWeight:"bold",fontFamily:"Inter"}}>
                        *Department
                    </tr>
                </td>
                <td style={{border:"1px solid  #dbdbdb",borderCollapse:"collapse",width:"12%"}}>
                    <tr style={{fontSize:"14px",fontWeight:"bold",fontFamily:"Inter"}}>
                        Job Title
                    </tr>
                </td>
                <td style={{border:"1px solid  #dbdbdb",borderCollapse:"collapse",width:"10%"}}>
                    <tr style={{fontSize:"14px",fontWeight:"bold",fontFamily:"Inter"}}>
                        Work Location
                    </tr>
                </td>
                <td style={{border:"1px solid  #dbdbdb",borderCollapse:"collapse",width:"10%"}}>
                    <tr style={{fontSize:"14px",fontWeight:"bold",fontFamily:"Inter"}}>
                        Duty Manager
                    </tr>
                </td>
                <td style={{border:"1px solid  #dbdbdb",borderCollapse:"collapse",width:"10%"}}>
                    <tr style={{fontSize:"14px",fontWeight:"bold",fontFamily:"Inter"}}>
                        On Call
                    </tr>
                </td>
                <td style={{border:"1px solid  #dbdbdb",borderCollapse:"collapse",width:"12%"}}>
                    <tr style={{fontSize:"14px",fontWeight:"bold",fontFamily:"Inter"}}>
                        Emergency
                    </tr>
                </td>
            </thead>
            {
            value?.length > 0 ?
            value?.map((item,i)=>{
{/* <CancelIcon onClick={deleteRow} style={{fontSize:"22px",color:"red",marginLeft:"15px",marginTop:"5px",cursor:"pointer"}}/> */}
            return  <tbody style={{backgroundColor:"#e8f3fc",border:"1px solid  #dbdbdb",borderCollapse:"collapse",overflowX:"scroll",width:"100%"}}>
                <tr>
                    <td>
                    <CancelIcon onClick={deleteRow} style={{fontSize:"22px",color:"red",marginLeft:"15px",marginTop:"5px",cursor:"pointer"}}/>
                    </td>
                    <td>
                        <CustomTextField
                        value={
                             item.staffName
                        }
                        style={{fontSize:"14px",fontWeight:"bold",fontFamily:"Inter"}}
                        />
                    </td>
                    <td>
                    <Autocomplete
        id="free-solo-demo"
        disableClearable
        options={
            workDurationArr.length > 0 &&
            workDurationArr.map((option)=>
                 option.workDurationCode
            ) 

        }
        onChange={onCountryChange}
        renderInput={(params) => <TextField {...params}></TextField>}
      />
                    </td>
                    <td>
                     
                   <Typography style={{fontSize:"14px",fontWeight:"bold",fontFamily:"Inter"}}> {StartTime}</Typography>
                    </td>
                    <td>
                   
                   <Typography style={{fontSize:"14px",fontWeight:"bold",fontFamily:"Inter"}}>{EndTime}</Typography>
                    </td>
                    <td>
                    <Grid style={{display:"flex",flexDirection:"row",}}>
                <Box style={{display:"flex",flexDirection:"row"}}>
                    <CustomCheckBox/>
                    <Typography  style={{fontSize:"14px",  fontFamily:"Inter",fontWeight:"bold",marginTop:"10px"}}>Sun</Typography>
                </Box>
                <Box style={{display:"flex",flexDirection:"row",marginLeft:"5px"}}>
                    <CustomCheckBox/>
                    <Typography  style={{fontSize:"14px",  fontFamily:"Inter",fontWeight:"bold",marginTop:"10px"}}>Mon</Typography>
                </Box>
                <Box style={{display:"flex",flexDirection:"row",marginLeft:"5px"}}>
                    <CustomCheckBox/>
                    <Typography  style={{fontSize:"14px",  fontFamily:"Inter",fontWeight:"bold",marginTop:"10px"}}>Tue</Typography>
                </Box>
                <Box style={{display:"flex",flexDirection:"row",marginLeft:"5px"}}>
                    <CustomCheckBox/>
                    <Typography  style={{fontSize:"14px",  fontFamily:"Inter",fontWeight:"bold",marginTop:"10px"}}>Wed</Typography>
                </Box>
                <Box style={{display:"flex",flexDirection:"row",marginLeft:"5px"}}>
                    <CustomCheckBox/>
                    <Typography  style={{fontSize:"14px",  fontFamily:"Inter",fontWeight:"bold",marginTop:"10px"}}>Thu</Typography>
                </Box>
                <Box style={{display:"flex",flexDirection:"row",marginLeft:"5px"}}>
                    <CustomCheckBox/>
                    <Typography  style={{fontSize:"14px",  fontFamily:"Inter",fontWeight:"bold",marginTop:"10px"}}>Fri</Typography>
                </Box>
                <Box style={{display:"flex",flexDirection:"row",marginLeft:"5px"}}>
                    <CustomCheckBox/>
                    <Typography  style={{fontSize:"14px",  fontFamily:"Inter",fontWeight:"bold",marginTop:"10px"}}>Sat</Typography>
                </Box>
                </Grid>
                    </td>
                    <td>
                        <CustomTextField
                        value={
                            item?.department

                        }
                        style={{fontSize:"14px",fontWeight:"bold",fontFamily:"Inter"}}
                        />
                    </td>
                    <td>
                        <CustomTextField
                        value={
                            item?.jobTitle

                        }
                        style={{fontSize:"14px",fontWeight:"bold",fontFamily:"Inter"}}
                        />
                    </td>
                    <td>
                    <Autocomplete
        id="free-solo-demo"
        disableClearable
        options={
            workLocationArr.length > 0 &&
            workLocationArr.map((option)=>
                 option?.locationName
            )

        }
        renderInput={(params) => <TextField {...params}></TextField>}
      />
                       
                    </td>
                    <td>
                        <CustomTextField/>
                    </td>
                  
                    <td>
                    <Autocomplete
        id="free-solo-demo"
        disableClearable
        options={
            onCallArr.length > 0 &&
           onCallArr.map((option)=>
                 option?.valueMeaning
            )

        }
        renderInput={(params) => <TextField {...params}></TextField>}
      />
                    
                    </td>
                    <td>
                    <Autocomplete
        id="free-solo-demo"
        disableClearable
        options={
            emergencyArr.length > 0 &&
           emergencyArr.map((option)=>
           option?.valueMeaning
            )

        }
        renderInput={(params) => <TextField {...params}></TextField>}
      />
                      
                    </td>
                </tr>
            </tbody>
                     }
                     )
                    
                 : 
                  <Typography style={{whiteSpace: "nowrap", overflow: "hidden",textOverflow: "clip",fontSize:"14px",fontWeight:"bold",fontFamily:"Inter"}}>No data to display</Typography> 
                  
                    }
        </table>

    </Grid>
  </Grid>
  )
}

export default AssignTableOption2
