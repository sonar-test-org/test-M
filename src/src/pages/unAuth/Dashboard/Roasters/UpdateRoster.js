import { Typography, Grid, Box, Autocomplete } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CustomButton } from '../../../../components/Button'
import { CustomDialog } from '../../../../components/CustomDialog'
import { CustomTextField } from '../../../../components/TextField'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AssignTable from './AssignTable'
import { GetSingleShift, workDuration, getallStaffData } from '../../../../services/api'
import SearchIcon from '@material-ui/icons/Search';
import StaffModal from './StaffModal';
import DepatmentPopup from './DepatmentPopup';
import JobTitleModal from './JobTitleModal';
import DutyManagerModal from './DutyManagerModal';
import { useQuery } from 'react-query'
import DeleteRoster from './DeleteRoster'
import { useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import { workLocation, onCall, Emergency } from '../../../../services/api';
import { DutyManager, Department, JobTitle } from '../../../../services/api';


// import Autocomplete from '@mui/material/Autocomplete';


const UpdateRoster = (props) => {
    const classes = useStyles()
    const commonReducer = useSelector((state) => state.commonReducer);
    const [getSingleShift, setGetSingleShift] = React.useState([]);
    const { setStatus1, personRosterId, personRosterPivoteId,personIdRoster,jobTitleIdRoster,departmentIdRoster } = props;
    const [openDelete, setOpenDelete] = useState(false);
    const [workDurationArr, setWorkDurationArr] = React.useState([]);
    const [index, setIndex] = React.useState({});
    const [status, setStatus] = React.useState(0);
    const [workLocationArr, setWorkLocationArr] = useState();
    const [emergency, setEmergency] = useState([]);

    const [departmentArr, setDepartmentArr] = useState([]);
    const [jobTitleArray, setJobTitleArray] = useState([]);
    const [dutyManagerArr, setDutyManagerArr] = useState([]);
    const [selectedValue, setSelectedValue] = React.useState([]);
    const [location, setLocation] = useState([]);


    const [onCallArr, setOnCallArr] = useState([]);
    const [emergencyArr, setEmergencyArr] = useState();
    const [changeTextValue, setChangeTextValue] = React.useState();
    const [selectDutyManager, setSelectDutyManager] = React.useState();
    const [selectDepartment, setSelectDepartment] = React.useState({});
    const [selectJobTitle, setSelectJobTitle] = React.useState();
    const [tabledata, setTabledata] = useState()

    console.log(tabledata);

    const [state, setState] = useState(-1);
    const [state1, setState1] = useState(-1);
    const [state2, setState2] = useState(-1);
    const [state3, setState3] = useState(-1);
    // console.log(selectDutyManager.staffName)
    console.log(changeTextValue?.value)
    const handleChange1 = (index, item) => {

        setChangeTextValue(item)
        setState(index)

    };

    const handleChangeDutyManager = (index, item) => {
        setState1(index)
        setSelectDutyManager(item)
    }


    const handleChangeDepartment = (index, item) => {
        setState2(index)
        setSelectDepartment(item)
    }

    const handleChangeJobTitle = (index, item) => {
        setState3(index)
        setSelectJobTitle(item)
    }


    const btnClick = (e) => {
        setStatus(e);
    };




    console.log(index);



    const openDeleteModal = () => {
        setOpenDelete(true)
    }

    // const [openDelete]
    const handleClose = () => {
        setStatus1(0)
    }

    const { data: getSingleShiftRoster } = useQuery(
        ['getSingleShift'], () => GetSingleShift({ loginUserId: "300000006565312", personRosterPivoteId: personRosterPivoteId, personRosterId: personRosterId, }), { enabled: true, retry: false }
    )
    useEffect(() => {
        if (getSingleShiftRoster) {
            setGetSingleShift(getSingleShiftRoster?.data?.data)
        }
    }, [getSingleShiftRoster])

    // console.log(getSingleShift?.workDurationDto)
    //

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

    const arr = getSingleShift?.workDurationDto?.timeStart;
    var startTime = arr?.split("T")
    // console.log(startTime[1]);
    const arr1 = getSingleShift?.workDurationDto?.timeEnd;
    var EndTime = arr1?.split("T")

    const array = index.timeStart;
    var startTime1 = array?.split("T")

    const array1 = index.timeEnd;
    var EndTime1 = array1?.split("T")




    const UpdateRosterProfile = (e) => {
           setStatus1(0)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "effectiveDate": "05-jan-2023",
            "staffDto": {
                "departmentId": departmentIdRoster,
                "dutyManager": "Annette Breyer",
                "emergency": "Overtime",
                "jobTitleId": jobTitleIdRoster,
                "onCall": "Telephone",
                "personId": personIdRoster,
                "personRosterId": personRosterId,
                "workLocationId": 300000038683722
            },
            "userId": "300000006565312",
            "workDurationDto": {
                "workDurationId": index.workDurationId,
                "workDurationCode": index.workDurationCode,
                "timeStart": index.timeStart,
                "timeEnd": index.timeEnd,
                "shiftHours": index.shiftHours,
                "sun": "Y",
                "mon": "Y",
                "tue": "Y",
                "wed": "Y",
                "thu": "Y",
                "fri": "Y",
                "sat": "Y"
            }
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://182.72.11.106:9091/ews/roster/personRosterData\n", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
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


    //api inetgartion for dutymanager,depatment,jobtitle
    const { data: getAllDepartment } = useQuery(
        ['getDepartment'], () => Department(), { enabled: true, retry: false }
    )

    useEffect(() => {
        if (getAllDepartment) {
            setDepartmentArr(getAllDepartment?.data?.data)
        }
    }, [getAllDepartment])

    //jobTitle

    const { data: getAllJobTitle } = useQuery(
        ['getJobTitle'], () => JobTitle(), { enabled: true, retry: false }
    )

    useEffect(() => {
        if (getAllJobTitle) {
            setJobTitleArray(getAllJobTitle?.data?.data)
        }
    }, [getAllJobTitle])


    //dutymanager
    const { data: getAllDutyManager } = useQuery(
        ['getDutyManager'], () => DutyManager(), { enabled: true, retry: false }
    )

    useEffect(() => {
        if (getAllDutyManager) {
            setDutyManagerArr(getAllDutyManager?.data?.data)
        }
    }, [getAllDutyManager])



    return (<>
        <CustomDialog maxWidth="xl" dialogTitle="Assign" open="true" handleClose={handleClose}>
            <Grid xs="12" style={{ display: "flex", justifyContent: "flex-end" }}>
                <Typography style={{ color: "red", fontSize: "10px" }}>*Overlapped shifts will be replaced.</Typography>
            </Grid>
            <Grid container style={{ border: "1px solid  #dbdbdb " }}>
                <Grid item xs="12">
                    <Box style={{ display: "flex", flexDirection: "row", marginTop: "10px", marginLeft: "10px" }}>
                        <Typography style={{ fontSize: "18px", fontWeight: "bold", fontFamily: "Inter", color: "#124590" }}>
                            Times
                        </Typography>



                    </Box>
                    <Grid item xs="10" style={{ display: "flex", flexDirection: "row", marginLeft: "10px", marginTop: "10px" }}>
                        <Grid xs="4">
                            <Grid>
                                <Box style={{ display: "flex", flexDirection: "row" }}>
                                    <Typography style={{ fontSize: "14px", fontWeight: "bold", fontFamily: "Inter" }}>Effective Date</Typography>
                                    <Typography style={{ fontSize: "14px", fontFamily: "Inter", marginLeft: "10px" }}>{getSingleShift?.effectiveDate}</Typography>
                                </Box>
                            </Grid>
                            <Grid style={{ marginTop: "20px" }}>
                                <Box>
                                    <Typography style={{ fontSize: "14px", fontWeight: "bold", fontFamily: "Inter" }}>Comments</Typography>
                                </Box>
                                <Box>
                                    <CustomTextField

                                        style={{ height: "40%" }} />
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid xs="12" style={{ marginLeft: "50px", marginBottom: "10px" }}>
                            <Box style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}>
                                <Grid xs="1">

                                    <Typography style={{ fontSize: "14px", fontWeight: "bold", fontFamily: "Inter", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>Work Duration</Typography>


                                </Grid>
                                <Grid xs="4" style={{ marginLeft: "40px" }}>
                                    <Autocomplete
                                        id="free-solo-demo"
                                        disableClearable
                                        defaultValue={getSingleShift?.workDurationDto?.workDurationCode}
                                        options={
                                            workDurationArr?.length > 0 &&
                                            workDurationArr?.map((option) =>

                                                option?.workDurationCode
                                            )

                                        }
                                        ListboxProps={{ style: { padding: "10px", fontSize: "14px", fontFamily: "Inter", } }}
                                        style={{ width: 300, border: "1px solid black", paddingLeft: "10px" }}


                                        onChange={onCountryChange}
                                        renderInput={(params) => <TextField {...params}></TextField>}
                                    />
                                </Grid>
                            </Box>

                            <Grid >
                                <Box style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}>
                                    <Typography style={{ fontSize: "14px", fontWeight: "bold", fontFamily: "Inter", whiteSpace: "nowrap", textOverflow: "ellipsis" }}> Start Time</Typography>
                                    <CustomTextField

                                        value={getSingleShift?.workDurationDto?.workDurationCode == true ? startTime?.[1] : startTime1?.[1]}
                                        style={{ width: 300, marginLeft: "45px" }}
                                    />
                                </Box>
                            </Grid>
                            <Grid >
                                <Box style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}>
                                    <Typography style={{ fontSize: "14px", fontWeight: "bold", fontFamily: "Inter", whiteSpace: "nowrap", textOverflow: "ellipsis", textAlign: "center" }}>End Time</Typography>
                                    <CustomTextField
                                        value={getSingleShift?.workDurationDto?.workDurationCode == true ? EndTime?.[1] : EndTime1?.[1]}
                                        style={{ width: 300, marginLeft: "52px" }}
                                    />
                                </Box>

                            </Grid>
                            <Grid >
                                <Box style={{ display: "flex", flexDirection: "row", marginTop: "10px", }}>
                                    <Typography style={{ fontSize: "14px", fontWeight: "bold", fontFamily: "Inter", textAlign: "center" }}>Shift Hrs</Typography>
                                    <Typography style={{ fontSize: "14px", fontWeight: "bold", fontFamily: "Inter", marginLeft: "80px" }}>{getSingleShift?.workDurationDto?.shiftHours?.length > 0 && getSingleShift?.workDurationDto?.shiftHours + "hrs"}</Typography>

                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>


            </Grid>
            <Grid container style={{ border: "1px solid  #dbdbdb ", marginTop: "20px" }}>
                {/* <Box>
                    <Typography style={{ fontSize: "18px", fontWeight: "bold", fontFamily: "Inter", color: "#124590" }}>
                        Add Staff With Preferences
                    </Typography>
                </Box> */}
                <Grid item xs="12" style={{ display: "flex", flexDirection: "row", border: "1px solid  black ", marginTop: "10px", marginRight: "10px", marginLeft: "10px" }}>

                    <Grid xs="2" style={{ alignItems: "center" }}>
                        <Box>
                            <Typography style={{ fontSize: "14px", fontFamily: "Inter", fontWeight: "bold", whiteSpace: "nowrap", marginLeft: "5px", textAlign: "center" }}>Staff</Typography>
                        </Box>
                    </Grid >
                    <Grid xs="1 " style={{ alignItems: "center" }}>
                        <Box>
                            <Typography style={{ fontSize: "14px", fontFamily: "Inter", fontWeight: "bold", whiteSpace: "nowrap", textOverflow: "ellipsis", textAlign: "center", marginLeft: "5px" }}>Employee Number</Typography>
                        </Box>
                    </Grid>
                    <Grid xs="2" style={{ alignItems: "center" }}>
                        <Box>
                            <Typography style={{ fontSize: "14px", fontFamily: "Inter", fontWeight: "bold", whiteSpace: "nowrap", textOverflow: "ellipsis", marginLeft: "5px", textAlign: "center" }}>Department</Typography>
                        </Box>
                    </Grid>
                    <Grid xs="2" style={{ alignItems: "center" }}>
                        <Box>
                            <Typography style={{ fontSize: "14px", fontFamily: "Inter", fontWeight: "bold", whiteSpace: "nowrap", textOverflow: "ellipsis", marginLeft: "5px", textAlign: "center" }}>JobTitle</Typography>
                        </Box>
                    </Grid>
                    <Grid xs="2" style={{ alignItems: "center" }}>
                        <Box>
                            <Typography style={{ fontSize: "14px", fontFamily: "Inter", fontWeight: "bold", whiteSpace: "nowrap", textOverflow: "ellipsis", marginLeft: "5px", textAlign: "center" }}>Work Location</Typography>
                        </Box>
                    </Grid>
                    <Grid xs="2" style={{ alignItems: "center" }}>
                        <Box>
                            <Typography style={{ fontSize: "14px", fontFamily: "Inter", fontWeight: "bold", whiteSpace: "nowrap", textOverflow: "ellipsis", marginLeft: "5px", textAlign: "center" }}>DutyManager</Typography>
                        </Box>
                    </Grid>
                    <Grid xs="1 " style={{ alignItems: "center" }}>
                        <Box>
                            <Typography style={{ fontSize: "14px", fontFamily: "Inter", fontWeight: "bold", whiteSpace: "nowrap", textOverflow: "ellipsis", marginLeft: "5px", textAlign: "center" }}>On Call</Typography>
                        </Box>
                    </Grid>
                    <Grid xs="1 " style={{ alignItems: "center" }}>
                        <Box>
                            <Typography style={{ fontSize: "14px", fontFamily: "Inter", fontWeight: "bold", whiteSpace: "nowrap", textOverflow: "ellipsis", marginLeft: "5px", textAlign: "center" }}>Emergency</Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs="12" style={{ display: "flex", flexDirection: "row", marginBottom: "10px", marginRight: "10px", marginLeft: "10px", border: "1px solid black" }}>

                    <Grid xs="2">
                        <Box>
                            <CustomTextField
                                value={getSingleShift?.staffRosterDto?.staffName}
                                endIcon={<SearchIcon style={{ marginLeft: "2px", fontSize: "18px", cursor: "pointer", fontWeight: "bold" }} />}
                                onClick={() => btnClick(1)}
                            />
                        </Box>
                    </Grid>
                    <Grid xs="1">
                        <Box >
                            <Typography style={{ fontSize: "14px", fontFamily: "Inter", fontWeight: "bold", whiteSpace: "nowrap", textOverflow: "ellipsis", textAlign: "center", marginTop: "10px" }}>{getSingleShift?.staffRosterDto?.employeeNumber}</Typography>
                        </Box>
                    </Grid>
                    <Grid xs="2">
                        <Box>
                            <CustomTextField
                                value={getSingleShift?.staffRosterDto?.department}
                                endIcon={<SearchIcon style={{ marginLeft: "2px", fontSize: "18px", cursor: "pointer", fontWeight: "bold" }} />}
                                onClick={() => btnClick(2)}
                            />
                        </Box>
                    </Grid>
                    <Grid xs="2">
                        <Box>
                            <CustomTextField
                                value={getSingleShift?.staffRosterDto?.jobTitle}
                                endIcon={<SearchIcon style={{ marginLeft: "2px", fontSize: "18px", cursor: "pointer", fontWeight: "bold" }} />}
                                onClick={() => btnClick(3)}
                            />
                        </Box>
                    </Grid>
                    <Grid xs="2">
                        <Box>
                            <CustomTextField
                                value={getSingleShift?.staffRosterDto?.workLocation}
                                endIcon={<SearchIcon style={{ marginLeft: "2px", fontSize: "18px", cursor: "pointer", fontWeight: "bold" }} />}
                                onClick={() => btnClick(4)}
                            />
                        </Box>
                    </Grid>
                    <Grid xs="2">
                        <Box>
                            <CustomTextField />
                        </Box>
                    </Grid>
                    <Grid xs="1 ">
                        <Box>
                            <CustomTextField />
                        </Box>
                    </Grid>
                    <Grid xs="1 ">
                        <Box>
                            <CustomTextField />
                        </Box>
                    </Grid>
                </Grid>

            </Grid>
            <Grid style={{ marginTop: "10px" }}>
                <Grid style={{ display: "Flex", flexDirection: "row" }}>
                    <Box>
                        <CustomButton
                            btnText="Save"
                            btnClass={{ backgroundColor: "#124590", color: "#fff", marginLeft: "10px" }}
                            variant="contained"
                            onClick={UpdateRosterProfile}

                        />
                    </Box>
                    <Box>
                        <CustomButton
                            btnText="Delete"
                            btnClass={{ backgroundColor: "#124590", color: "#fff", marginLeft: "10px" }}
                            variant="contained"
                            onClick={openDeleteModal}
                        />

                    </Box>
                    <Box>
                        <CustomButton
                            btnText="Cancel"
                            btnClass={{ backgroundColor: "#124590", color: "#fff", marginLeft: "10px" }}
                            variant="contained"
                            onClick={handleClose}
                        />
                    </Box>
                </Grid>
            </Grid>
        </CustomDialog >
        {openDelete && <DeleteRoster toggleHandler={setOpenDelete} personRosterId={personRosterId}

        />}
        {status === 1 && <StaffModal toggleHandler={setStatus} staffData={staffData}
            selectedValue={selectedValue}
            handleChange1={handleChange1}
            state={state}
            setState={setState}
        />}
        {status === 2 && <DepatmentPopup toggleHandler={setStatus} departmentArr={departmentArr}
            handleChangeDepartment={handleChangeDepartment}
            state2={state2} />}
        {status === 3 && <JobTitleModal toggleHandler={setStatus} jobTitleArr={jobTitleArray}
            selectJobTitle={selectJobTitle}
            setSelectJobTitle={setSelectJobTitle}
            handleChangeJobTitle={handleChangeJobTitle}
            state3={state3}
        />}
        {status === 4 && <DutyManagerModal toggleHandler={setStatus} dutyManagerArr={dutyManagerArr}
            selectDutyManager={selectDutyManager}
            setSelectDutyManager={setSelectDutyManager}
            handleChangeDutyManager={handleChangeDutyManager}
            state1={state1}
        />}
    </>
    )
}

export default UpdateRoster

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
    },
    text: {
        fontSize: "14px",
        fontFamily: "Inter",
        fontWeight: "bold"
    }
}))