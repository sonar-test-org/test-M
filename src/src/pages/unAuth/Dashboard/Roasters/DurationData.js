import { Typography, Box, Grid, TextField, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CustomTextField } from '../../../../components/TextField'
import Autocomplete from '@mui/material/Autocomplete';
// import { workDuration } from '../../../../services/api';
import { makeStyles } from '@material-ui/styles'
// import { useQuery } from 'react-query';
import WorkDurationModal from './WorkDurationModal';
import SearchIcon from '@mui/icons-material/Search';
import CustomCheckBox from '../../../../components/CustomCheckBox';
// import { set } from 'date-fns';
const useStyles = makeStyles(theme => ({
    contentBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    text1: {
        fontSize: "8px",
        fontFamily: "Inter",

    },
    textField: {
        backgroundColor: "red"
    }
}))

const DurationData = (props) => {
    const classes = useStyles()
    const { workDurationArr, onCountryChange, index, selectedValue, handleChange1, state, setState, setSelectedValue, selectWorkDuration } = props

    // console.log(selectedValue)
    // console.log("Index", index)

    const [stateValue, setStateValue] = React.useState(selectedValue)
    // console.log(stateValue);

    const arr = index.timeStart;
    var startTime = arr?.split("T")

    const arr1 = index.timeEnd;
    var EndTime = arr1?.split("T")


    const [open, setOpen] = useState(false)

    const openWorkDurationPopup = () => {
        setOpen(true)

    }










    return (
        <>
            <Grid xs="12" style={{ marginTop: "10px" }}>
                <Box className={classes.contentBox}>
                    <Grid xs="3">
                        <Typography style={{ fontSize: "14px", fontFamily: "Inter", fontWeight: "bold" }}>Work Duration</Typography>
                    </Grid>
                    <Grid xs="7">
                        <Autocomplete
                            id="free-solo-demo"
                            disableClearable
                            // value={!selectedValue ? stateValue : selectedValue}
                            options={
                                workDurationArr.length > 0 &&
                                workDurationArr.map((option) =>

                                    option.workDurationCode
                                )

                            }


                            onChange={onCountryChange}
                            renderInput={(params) => <TextField {...params}></TextField>}
                        />
                    </Grid>
                    <Grid>
                        <Button onClick={openWorkDurationPopup}>{<SearchIcon />}</Button>

                    </Grid>
                </Box>
                <Box className={classes.contentBox} style={{ marginTop: "5px" }}>
                    <Grid xs="3" >
                        <Typography style={{ fontSize: "14px", fontFamily: "Inter", fontWeight: "bold" }}>Start Time</Typography>
                    </Grid>
                    <Grid xs="7">
                        <CustomTextField
                            readOnlyValue="readonly"
                            className={classes.textField}
                            value={startTime?.[1]}

                        />
                    </Grid>
                </Box>
                <Box className={classes.contentBox} style={{ marginTop: "5px" }}>
                    <Grid xs="3">
                        <Typography style={{ fontSize: "14px", fontFamily: "Inter", fontWeight: "bold" }}>End Time</Typography>
                    </Grid>
                    <Grid xs="7">
                        <CustomTextField
                            readOnlyValue="readonly"
                            value={
                                EndTime?.[1]
                            }
                        />
                    </Grid>
                </Box>
                <Box className={classes.contentBox} style={{ marginTop: "5px", marginBottom: "10px" }}>
                    <Grid xs="3">
                        <Typography style={{ fontSize: "14px", fontFamily: "Inter", fontWeight: "bold" }}>Shift Hrs</Typography>
                    </Grid>

                    <Typography style={{ fontSize: "14px", fontFamily: "Inter", fontWeight: "bold", marginLeft: "20px" }}>{

                        index.shiftHours?.length > 0 &&
                        index.shiftHours + " hrs"
                    }   </Typography>


                </Box>
                <Box className={classes.contentBox} style={{ marginTop: "5px", marginBottom: "10px" }}>
                    <Grid xs="3">
                        <Typography style={{ fontSize: "14px", fontFamily: "Inter", fontWeight: "bold" }}>Working Days</Typography>
                    </Grid>
                    <Grid style={{ display: "flex", flexDirection: "row", marginLeft: "0px" }}>
                        <Box style={{ display: "flex", flexDirection: "row" }}>
                            <CustomCheckBox />
                            <Typography style={{ fontSize: "14px", fontFamily: "Inter", fontWeight: "bold", marginTop: "10px" }}>Sun</Typography>
                        </Box>
                        <Box style={{ display: "flex", flexDirection: "row", marginLeft: "5px" }}>
                            <CustomCheckBox />
                            <Typography style={{ fontSize: "14px", fontFamily: "Inter", fontWeight: "bold", marginTop: "10px" }}>Mon</Typography>
                        </Box>
                        <Box style={{ display: "flex", flexDirection: "row", marginLeft: "5px" }}>
                            <CustomCheckBox />
                            <Typography style={{ fontSize: "14px", fontFamily: "Inter", fontWeight: "bold", marginTop: "10px" }}>Tue</Typography>
                        </Box>
                        <Box style={{ display: "flex", flexDirection: "row", marginLeft: "5px" }}>
                            <CustomCheckBox />
                            <Typography style={{ fontSize: "14px", fontFamily: "Inter", fontWeight: "bold", marginTop: "10px" }}>Wed</Typography>
                        </Box>
                        <Box style={{ display: "flex", flexDirection: "row", marginLeft: "5px" }}>
                            <CustomCheckBox />
                            <Typography style={{ fontSize: "14px", fontFamily: "Inter", fontWeight: "bold", marginTop: "10px" }}>Thu</Typography>
                        </Box>
                        <Box style={{ display: "flex", flexDirection: "row", marginLeft: "5px" }}>
                            <CustomCheckBox />
                            <Typography style={{ fontSize: "14px", fontFamily: "Inter", fontWeight: "bold", marginTop: "10px" }}>Fri</Typography>
                        </Box>
                        <Box style={{ display: "flex", flexDirection: "row", marginLeft: "5px" }}>
                            <CustomCheckBox />
                            <Typography style={{ fontSize: "14px", fontFamily: "Inter", fontWeight: "bold", marginTop: "10px" }}>Sat</Typography>
                        </Box>

                    </Grid>
                </Box>
            </Grid>
            {open && <WorkDurationModal toggleHandler={setOpen} workDurationArr={workDurationArr} selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
                handleChange1={handleChange1}
                state={state}
                setState={setState}
                selectWorkDuration={selectWorkDuration} />}
        </>
    )
}

export default DurationData
