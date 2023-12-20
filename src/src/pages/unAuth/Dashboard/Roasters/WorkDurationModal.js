

import { FormControl, Grid, Typography,FormControlLabel,RadioGroup,Radio,Box } from '@mui/material';

import React,{useState,useEffect} from 'react'
import { CustomButton } from '../../../../components/Button';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { CustomDialog } from '../../../../components/CustomDialog'
import { CustomTextField } from '../../../../components/TextField';
import { makeStyles } from '@material-ui/styles';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({

}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
  expandIcon={<ArrowRightIcon  sx={{ fontSize: '2rem' }} />}
    {...props}
  />
))(({ theme }) => ({
 
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  // borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


const WorkDurationModal = (props,) => {
  const{toggleHandler, workDurationArr,selectedValue,handleChange1,state,setState, setSelectedValue,selectWorkDuration}=props;
  const classes=useStyles();
 

const[stateValue,setStateValue]=React.useState(selectedValue)
console.log(stateValue);

  const handleClose=()=>{
    toggleHandler(false)
  }
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  
  return (
    <CustomDialog maxWidth="sm" dialogTitle="Search & Select : Work Duration" open="true"  handleClose={handleClose}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography style={{fontSize:"14px",fontFamily:"Inter",marginLeft:"5px",fontWeight:"bolder"}}>Search</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Grid  style={{marginTop:"10px"}}>
         <Grid   className={classes.maincontainer}>
            <Box  className={classes.maincontentBox} style={{marginLeft:"30px"}}>
                <Box>
                <Typography  style={{fontSize:"12px",fontFamily:"Inter",fontWeight:"bolder"}}>
                    Work Duration
                </Typography>
                </Box>
                <Box style={{marginLeft:"10px"}}>
                <CustomTextField  
                type="text"
               
                />
                </Box>
            </Box>
          
         </Grid>
         </Grid>
         <Grid container style={{marginTop:"10px"}}>
         <Grid  item xs="12" className={classes.maincontainer}>
         <Box  className={classes.maincontentBox} style={{marginLeft:"70px"}}>
                <Box marginLeft="10px">
                <Typography  style={{fontSize:"12px",fontFamily:"Inter",fontWeight:"bolder"}}>
                    Time
                </Typography>
                </Box>
                <Box style={{marginLeft:"12px"}}>
                <CustomTextField  
                type="text"
                style={{width:"70%"}}
                />
                </Box>
            </Box>
           
         </Grid>
         </Grid>
         <Grid container className={classes.selectbutton}>
                <Grid item padding={"2px"}>
                <CustomButton
                        btnText='Search'
                        variant='contained'
                        btnClass={{ backgroundColor: "#124590", color: "#fff" }}
                       />
                </Grid>
                <Grid item padding={"2px"}>
                <CustomButton
                        btnText='Reset'
                        variant='contained'
                        btnClass={{ backgroundColor: "#124590", color: "#fff" }}
                       />
                </Grid>
            </Grid>
        </AccordionDetails>
      </Accordion>
     <Grid container >
       <Grid item xs="12" style={{display:"flex",flexDirection:"row", backgroundColor: "#f1f4f9",}}>
          
              <Grid xs="5">
                <Typography style={{fontSize:"14px",  fontFamily:"Inter",fontWeight:"bold",}}>Work Duration</Typography>
              </Grid>
              <Grid xs="5">
                 <Typography style={{fontSize:"14px",  fontFamily:"Inter",fontWeight:"bold",}}>Time</Typography>
              </Grid>
       </Grid>
     
     <Grid container style={{height:"50vh",overflowY:"scroll"}}>
      {
           workDurationArr?.length > 0 &&
           workDurationArr?.map((option,index)=>{
            {
              var item=option?.timeStart;
              var startTime=item?.split("T");
              
              var item1=option?.timeEnd;
              var endTime=item1?.split("T");
              
            }
            
            return <Grid item xs="12" onClick={() => handleChange1(index,option)} style={{display:"flex",flexDirection:"row", background: state === index ? 'lightblue' : 'white',cursor:"pointer"}}>
               
              <Grid xs="5" style={{marginTop:"10px",}}>
                  <Typography style={{fontSize:"14px",  fontFamily:"Inter",fontWeight:"bold",}}>{option.workDurationCode}</Typography>
                </Grid>
                <Grid xs="5" style={{marginTop:"10px"}}>
                  <Typography style={{fontSize:"14px",  fontFamily:"Inter",fontWeight:"bold",}}>{startTime?.[1]}  -   {endTime?.[1]}</Typography>
                </Grid>
            </Grid>
           })
      }
     </Grid>
     <Grid container style={{display: "flex !important", justifyContent: "flex-end !important",marginTop:"10px"}}>
      <Grid item>
      <CustomButton
      btnText="Select"
      variant="contained"
      onClick={selectWorkDuration}
      btnClass={{backgroundColor:"#124590",color:"#fff"}}
      />
      </Grid>
     </Grid>
     </Grid>
    </CustomDialog>
  )
}

export default WorkDurationModal
const useStyles=makeStyles(theme=>({
  maincontainer:{
      
      display:"flex",
      alignItems:"center",
      flexDirection:"row",
     
  },
  maincontentBox:{
      display:"flex",
      flexDirection:"row",
      alignItems:"center"

  },
  selectbutton: {
      display: "flex !important",
      justifyContent: "flex-end !important",
      // margin: "100px 0px 0px 0px !important"
  },
  headermanage: {
      borderBottom: "1px solid #E9E9E9",
      backgroundColor: "#D6DFE6",
      alignItems: "center"
  },}))