import React, { useEffect } from 'react'
import { Grid, Box } from '@mui/material';
import { CustomDialog } from '../../../../components/CustomDialog'
import { styled } from '@mui/material/styles';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { CustomTextField } from '../../../../components/TextField';
import { makeStyles } from '@material-ui/styles';
import { CustomButton } from '../../../../components/Button';
import CustomCheckBox from '../../../../components/CustomCheckBox';
import AddIcon from '@mui/icons-material/Add';
import { CheckBox } from '@mui/icons-material';



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







const AddStaffDetail = (props,) => {
  const { toggleHandler, update, staffData, update1, val } = props
  console.log(val)
  const classes = useStyles();



  const handleClose = () => {
    toggleHandler(false)
  }


  const getChecked = (item) => {

    if (!item.checked) {
      return false
    }
    for (let i in val) {

      // console.log(val[i]?.personId);
      if (val[i]?.personId == item?.personId) {
        // console.log("hello");
        return item.checked;
      }
    }
  }

  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <CustomDialog maxWidth="md" dialogTitle='Add Staff(s)' open='true' handleClose={handleClose}>
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
                    Employee Name
                  </Typography>
                </Box>
                <Box style={{ marginLeft: "10px" }}>
                  <CustomTextField
                    type="text"
                  />
                </Box>
              </Box>
              <Box className={classes.maincontentBox} style={{ marginLeft: "63px" }}>
                <Box>
                  <Typography style={{ fontSize: "12px", fontFamily: "Inter", fontWeight: "bolder" }}>
                    Job
                  </Typography>
                </Box>
                <Box style={{ marginLeft: "10px" }}>
                  <CustomTextField
                    type="text"
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
                    Department
                  </Typography>
                </Box>
                <Box style={{ marginLeft: "25px" }}>
                  <CustomTextField
                    type="text"
                  />
                </Box>
              </Box>
              <Box className={classes.maincontentBox} style={{ marginLeft: "35px" }}>
                <Box>
                  <Typography style={{ fontSize: "12px", fontFamily: "Inter", fontWeight: "bolder" }}>
                    Location
                  </Typography>
                </Box>
                <Box style={{ marginLeft: "10px" }}>
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
        <Grid item xs='1' >
          <CustomCheckBox
          // isChecked={checkAllSelect()}
          // onChangeCheck={onChangeSelectAll}

          />
        </Grid>
        <Grid item xs='3'>
          <Box fontWeight='bold'>
            <Typography fontSize='14px' >Employee </Typography>
          </Box>
        </Grid>
        <Grid item xs='3'>
          <Typography fontSize='14px' >Department</Typography>
        </Grid>
        <Grid item xs='2'>
          <Typography fontSize='14px' >Job</Typography>
        </Grid>
        <Grid item xs='3'>
          <Typography fontSize='14px' >Location</Typography>
        </Grid>
      </Grid>
      <Grid container>
        {
          staffData?.length > 0 &&
          staffData?.map((item, index) => {
            return <Grid container alignItems='center' className={classes.bordermanage}>
              {/* {console.log('item.checked', typeof (item.checked))} */}
              <Grid item xs='1'>
                <CustomCheckBox
                  checked={
                    getChecked(item)
                  }
                  onChangeCheck={update1}
                  currentIndex={index}

                />


              </Grid>
              <Grid item xs='3'>
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
            btnText='Add Staff(s)'

            variant='contained'
            startIcon={<AddIcon style={{ color: "#5BB75B" }} />}
            btnClass={{ backgroundColor: "#124590", color: "#fff", fontSize: "12px" }}
            onClick={() => update(1)}
          />
        </Box>
      </Grid>

    </CustomDialog>
  )
}

export default AddStaffDetail

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
}))
