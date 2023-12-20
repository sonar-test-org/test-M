import React, { useState, useEffect } from 'react'
import { CustomDialog } from '../../../../components/CustomDialog'
import { styled } from '@mui/material/styles';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { CustomButton } from '../../../../components/Button';
import { Typography, Grid, Box } from '@mui/material';
import { CustomTextField } from '../../../../components/TextField';
import { makeStyles } from '@material-ui/styles';





const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({

}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowRightIcon sx={{ fontSize: '2rem' }} />}
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



const StaffModal = (props) => {
  const { staffData, toggleHandler, selectedValue, state, handleChange1 } = props;

  const [staffData1, setStaffData1] = React.useState(staffData)
  const [pagedata, setPagedata] = useState({
    projectQuery: "",
    date: ""
  })


  useEffect(() => {
    if (staffData1.length > 0) {
      var localrArr = staffData.map(option=>option?.employeeNumber)
          console.log(localrArr);
      setStaffData1(localrArr);


    }
  

  }, [pagedata.projectQuery])


  const handleClose = () => {
    toggleHandler(0)
  }



  const classes = useStyles();



  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <CustomDialog maxWidth="md" dialogTitle="Search & Select : Staff" open="true" handleClose={handleClose} >
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography style={{ fontSize: "14px", fontFamily: "Inter", marginLeft: "5px", fontWeight: "bolder" }}>Search</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid style={{ marginTop: "10px" }}>
            <Grid className={classes.maincontainer}>
              <Box className={classes.maincontentBox} style={{ marginLeft: "30px" }}>
                <Box>
                  <Typography style={{ fontSize: "12px", fontFamily: "Inter", fontWeight: "bolder" }}>
                    Employee Number
                  </Typography>
                </Box>
                <Box style={{ marginLeft: "10px" }}>
                  <CustomTextField
                    type="text"
                    style={{ width: "70%" }}

                    value={pagedata?.username}
                    onChange={(event) => setPagedata({ ...pagedata, projectQuery: event.target.value })}
                  />
                </Box>
              </Box>

            </Grid>
          </Grid>
          <Grid container style={{ marginTop: "10px" }}>
            <Grid item xs="12" className={classes.maincontainer}>
              <Box className={classes.maincontentBox} style={{ marginLeft: "30px" }}>
                <Box marginLeft="10px">
                  <Typography style={{ fontSize: "12px", fontFamily: "Inter", fontWeight: "bolder" }}>
                    Employee Name
                  </Typography>
                </Box>
                <Box style={{ marginLeft: "12px" }}>
                  <CustomTextField
                    type="text"

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
        <Grid item xs='2' >
          <Box fontWeight='bold'>
            <Typography style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip", fontSize: "14px", fontWeight: "bold", fontFamily: "Inter" }} >Employee Number </Typography>
          </Box>
        </Grid>
        <Grid item xs='2'>
          <Box fontWeight='bold'>
            <Typography style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip", fontSize: "14px", fontWeight: "bold", fontFamily: "Inter" }} >Employee </Typography>
          </Box>
        </Grid>
        <Grid item xs='3'>
          <Typography style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip", fontSize: "14px", fontWeight: "bold", fontFamily: "Inter" }} >Department</Typography>
        </Grid>
        <Grid item xs='2'>
          <Typography style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip", fontSize: "14px", fontWeight: "bold", fontFamily: "Inter" }} >Job</Typography>
        </Grid>
        <Grid item xs='3'>
          <Typography style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip", fontSize: "14px", fontWeight: "bold", fontFamily: "Inter" }} >Location</Typography>
        </Grid>
      </Grid>
      <Grid container>
        {
          staffData?.length > 0 &&
          staffData?.map((item, index) => {
            return <Grid container alignItems='center' onClick={() => handleChange1(index, item)}

              style={{
                background: state === index ? 'lightblue' : 'white'
              }} className={classes.bordermanage}>
              {/* {console.log('item.checked', typeof (item.checked))} */}
              <Grid item xs='2'>
                <Box >
                  <Typography style={{ fontSize: "14px", fontFamily: "Inter" }}>{item?.employeeNumber}</Typography>
                </Box>

              </Grid>
              <Grid item xs='2'>
                <Box>
                  <Typography style={{ fontSize: "14px", fontFamily: "Inter" }}>{item?.staffName}</Typography>
                </Box>
              </Grid>
              <Grid item xs='3'>
                <Box>
                  <Typography style={{ fontSize: "14px", fontFamily: "Inter" }}>{item?.department}</Typography>
                </Box>
              </Grid>
              <Grid item xs='2'>
                <Box>
                  <Typography style={{ fontSize: "14px", fontFamily: "Inter" }}>{item?.jobTitle}</Typography>
                </Box>
              </Grid>
              <Grid item xs='3'>
                <Box>
                  <Typography style={{ fontSize: "14px", fontFamily: "Inter" }}>{item?.workLocation}</Typography>
                </Box>

              </Grid>
            </Grid>
          }
          )
        }

      </Grid>

      <Grid container justifyContent='flex-end'>
        <Box py={2}>
          <CustomButton
            btnText='Select'
            onClick={handleClose}
            variant='contained'

            btnClass={{ backgroundColor: "#124590", color: "#fff", fontSize: "12px" }}
          />
        </Box>
      </Grid>

    </CustomDialog>

  )
}

export default StaffModal

const useStyles = makeStyles(theme => ({
  maincontainer: {

    display: "flex",
    alignItems: "center",
    flexDirection: "row",

  },
  maincontentBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"

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
  bordermanage: {
    borderBottom: "1px solid #E9E9E9",
    cursor: "pointer"
  },
}))

