import React from 'react'
import { CustomDialog} from '../../../../components/CustomDialog'
import { styled } from '@mui/material/styles';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { CustomButton } from '../../../../components/Button';
import { Typography,Grid,Box } from '@mui/material';
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


const DepatmentPopup = (props) => {
  const{toggleHandler,departmentArr,handleChangeDepartment,state2}=props;

  const handleClose=()=>{
    toggleHandler(0)
  }
  const [expanded, setExpanded] = React.useState('panel1');
  const classes=useStyles();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <CustomDialog maxWidth="sm" dialogTitle="Search & Select : Department" open="true" handleClose={handleClose}>
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
                    Department
                </Typography>
                </Box>
                <Box style={{marginLeft:"10px"}}>
                <CustomTextField  
                type="text"
                style={{width:"100%"}}
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
      <Grid container mt='20px' className={classes.headermanage}>
            <Grid item xs='12'  style={{marginLeft:"20px"}}>
            <Box fontWeight='bold'>
                    <Typography style={{whiteSpace: "nowrap", overflow: "hidden",textOverflow: "clip",fontSize:"14px",fontWeight:"bold",fontFamily:"Inter"}} >Department </Typography>
                </Box>
            </Grid>
           
        </Grid>

        <Grid container style={{marginTop:"10px"}}>
          {
            departmentArr?.length>0 &&
            departmentArr?.map((item,index)=>{
              return <Grid container alignItems='center'
              onClick={() => handleChangeDepartment(index,item)}
              style={{
                background: state2 === index ? 'lightblue' : 'white'
              }}  className={classes.bordermanage}>
                    <Grid item xs='5' style={{marginLeft:"20px"}}>
        <Box>
          <Typography style={{fontSize:"14px",fontFamily:"Inter"}}>{item.departmentName}</Typography>
         </Box>      
                            
          </Grid>
              </Grid>
            })
          }

         </Grid>


<Grid container justifyContent='flex-end'>
            <Box py={2}>
                <CustomButton
                    btnText='Select'
                    
                    variant='contained'
                   onClick={handleClose}
                    btnClass={{ backgroundColor: "#124590", color: "#fff", fontSize: "12px" }}
                    />
            </Box>
        </Grid>

  </CustomDialog>
  )
}

export default DepatmentPopup


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
  bordermanage: {
    borderBottom: "1px solid #E9E9E9",
    cursor:"pointer"
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
  },
}))