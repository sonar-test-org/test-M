import { Box, Grid, Input, makeStyles, TextareaAutosize, Typography } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'
import { CustomButton } from '../../../components/Button'
import { CustomAutoComplete } from '../../../components/CustomAutoComplete'
import { CustomDialog } from '../../../components/CustomDialog'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { CustomTextField } from '../../../components/TextField'
import CustomCheckBox from '../../../components/CustomCheckBox'
import CheckIcon from '@mui/icons-material/Check';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';

const dummyArray = [
    { id: 1, label: "Change Day Off" },
    { id: 2, label: "Official Permission" },
    { id: 3, label: "Personal Permission" },
    { id: 4, label: "Punch Request" },
    { id: 4, label: "Shift Time Change" },
    { id: 4, label: "Swap Shift Request" },
]

const dummyReason = [
    { id: 1, label: "Conference / traning / rounds / learning activity" },
    { id: 2, label: "Faculty Teach Hours" },
    { id: 3, label: "Lactation Hours" },
    { id: 4, label: "Offsite Meetings" },
    { id: 4, label: "Part Time Scholarship" },
    { id: 4, label: "Part Time Working" },
]

const useStyles = makeStyles(theme => ({
    wrap: {
        "& p": {
            padding: "15px 0px 15px 0px"
        }
    },
    headermanage: {
        borderBottom: "1px solid #E9E9E9",
        backgroundColor: "#F2F4F7",
        padding: "3px",
        "& p": {
            fontWeight: "bold",
            paddingLeft: "5px",
        }
    },
}));

export const RequestDetailsModel = (props) => {
    const { togglerhandler } = props;
    const classes = useStyles();

    const [dummy, setDummy] = useState({ request: {}, reason: {} })
    const [value, setValue] = useState(null);
    const [check, setCheck] = useState(false);


    const handleClose = () => {
        togglerhandler(false)
    }

    const onChangeCheck = (value) => {
        setCheck(!check)
    }

    return <CustomDialog maxWidth="lg" dialogTitle='Request Details' open='true' handleClose={handleClose}>
        <Box p={2} display='flex'>
            <Grid container item xs='7' alignItems='center' className={classes.wrap} >
                <Grid item xs='3'>
                    <Typography fontSize='14px'>
                        <Box textAlign='right' mr={2}>Request Type*</Box>
                    </Typography>
                </Grid>
                <Grid item xs='9' >
                    <CustomAutoComplete
                        id="Request Type"
                        required
                        options={dummyArray}
                        getoptionlabelkey="label"
                        selectedvalue={dummy?.request}
                        onChange={(_event, newData) => {
                            setDummy({ ...dummy, request: newData })
                        }}
                    />
                </Grid>
                <Grid item xs='3'>
                    <Typography fontSize='14px'>
                        <Box textAlign='right' mr={2}>Reason</Box>
                    </Typography>
                </Grid>
                <Grid item xs='9' >
                    <CustomAutoComplete
                        id="Request Type"
                        required
                        options={dummyReason}
                        getoptionlabelkey="label"
                        selectedvalue={dummy?.reason}
                        onChange={(_event, newData) => {
                            setDummy({ ...dummy, reason: newData })
                        }}
                    />
                </Grid>
                <Grid item xs='3'>
                    <Typography fontSize='14px'>
                        <Box textAlign='right' mr={2}>Start Date*</Box>
                    </Typography>
                </Grid>
                <Grid item xs='9' >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs='3'>
                    <Typography fontSize='14px'>
                        <Box textAlign='right' mr={2}>End Date*</Box>
                    </Typography>
                </Grid>
                <Grid item xs='9' >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs='3'>
                    <Typography fontSize='14px'>
                        <Box textAlign='right' mr={2}>Time Start</Box>
                    </Typography>
                </Grid>
                <Grid item xs='9' >
                    <CustomTextField
                        type="text"
                    />
                </Grid>
                <Grid item xs='3'>
                    <Typography fontSize='14px'>
                        <Box textAlign='right' mr={2}>Time End</Box>
                    </Typography>
                </Grid>
                <Grid item xs='9' >
                    <CustomTextField
                        type="text"
                    />
                </Grid>
                <Grid item xs='3'>
                    <Typography fontSize='14px'>
                        <Box textAlign='right' mr={2}>Comments</Box>
                    </Typography>
                </Grid>
                <Grid item xs='9' >
                    {/* <CustomTextField
                        type="text"
                    /> */}
                    <TextareaAutosize />
                </Grid>
                <Grid item xs='3'>
                    <Typography fontSize='14px'>
                        <Box textAlign='right' mr={2}>Specific Days</Box>
                    </Typography>
                </Grid>
                <Grid item>
                    <CustomCheckBox
                        value={check}
                        onChangeCheck={onChangeCheck}
                    />
                </Grid>
                <Grid item xs='12'>
                    {
                        check ? <Box ml={20}>
                            <Grid container item xs='12' justifyContent='space-around'>
                                <CustomCheckBox label='Mon' />
                                <CustomCheckBox label='Tue' />
                                <CustomCheckBox label='Wed' />
                                <CustomCheckBox label='Thu' />
                                <CustomCheckBox label='Fri' />
                                <CustomCheckBox label='Sat' />
                                <CustomCheckBox label='Sun' />
                            </Grid>
                        </Box>
                            : ""
                    }
                </Grid>
                <Box p={2}>
                    <Grid container>
                        <Box mr={1}>
                            <CustomButton
                                btnText='Submit'
                                variant='contained'
                                btnClass={{ backgroundColor: "#124590", color: "#fff", fontSize: "12px" }}
                                startIcon={<CheckIcon />}
                            />
                        </Box>
                        <CustomButton
                            btnText='Cancel'
                            variant='contained'
                            btnClass={{ backgroundColor: "#124590", color: "#fff", fontSize: "12px" }}
                            startIcon={<DoDisturbAltIcon />}
                        />
                    </Grid>
                </Box>
            </Grid>
            <Grid item xs='5'>
                <Box p='7px 10px 0px 50px'>
                    <Box border='1px solid #D6DFE6' padding={2} borderRadius='4px'>
                        <Box color='#2a99d1'>
                            <Typography variant='h6'>Attachment(s)</Typography>
                        </Box>
                        <Input type='file' />
                        <Box mt={2} border='1px solid #979991'>
                            <Grid container className={classes.headermanage} alignItems='center'>
                                <Grid item xs='1'>
                                    <Typography fontSize='14px'>#</Typography>
                                </Grid>
                                <Grid item xs='8'>
                                    <Box>
                                        <Typography fontSize='14px'>File Name</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs='3'>
                                    {/* <Typography fontSize='14px'>Delete</Typography> */}
                                    <Box ml={2}>
                                        <CustomButton
                                            btnText='Delete'
                                            variant='contained'
                                            btnClass={{ backgroundColor: "#124590", color: "#fff", fontSize: "12px" }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Box>
    </CustomDialog>
}
