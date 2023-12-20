import React, { useEffect, useState } from 'react'
import { Grid, Typography, Box, Autocomplete, TextField } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@material-ui/icons/Search';
import { CustomTextField } from '../../../../components/TextField';
import StaffModal from './StaffModal';
import DepatmentPopup from './DepatmentPopup';
import JobTitleModal from './JobTitleModal';
import DutyManagerModal from './DutyManagerModal';
import { DutyManager, Department, JobTitle } from '../../../../services/api';
import { useQuery } from 'react-query';
import { SettingsRemote } from '@material-ui/icons';
import { internal_processStyles } from '@mui/styled-engine';
const AssignTable = (props) => {
    const { value, setValue, data, workLocationArr, onCallArr, emergencyArr, staffData, setDutyManagerTableArr, setJobTitleArr, setOnCallTableArr, setStaffTableArr, setEmergencyTableArr, setDepartmentName, } = props
    // console.log("hello",staffData)
    console.log("hello", value.department)
    const [item, setItem] = useState();
    
    const[tableArr,setTableArr]=useState(value)

    const [dataArr, setDataArr] = useState();
    const [status, setStatus] = React.useState(0);
    const [departmentArr, setDepartmentArr] = useState([]);
    const [jobTitleArray, setJobTitleArray] = useState([]);
    const [dutyManagerArr, setDutyManagerArr] = useState([]);
    const [selectedValue, setSelectedValue] = React.useState([]);
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



    const handleChange = (name, e) => {
        const change = {};
        change[name] = e.target.value;
        setDataArr(change)
    }


    const deleteRow = (i) => {
        const deleteval = [...value]
        deleteval?.splice(i, 1)
        setValue(deleteval)
    }



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




    const getInputValue = (event) => {
        const UserValue = event.target.value;
        console.log(UserValue)
    }


    return (

        <Grid item xs="12" style={{ margin: "10px" }}>
            <Grid style={{ overflowX: "scroll" }}>
                <table style={{ border: "1px solid  #dbdbdb", width: "100%", borderCollapse: "collapse", overflowX: "scroll" }}>
                    <thead>
                        <td style={{ border: "1px solid  #dbdbdb", borderCollapse: "collapse", width: "5%" }}>
                            <tr style={{ fontSize: "14px", fontWeight: "bold", fontFamily: "Inter", }}>
                                Remove
                            </tr>
                        </td>
                        <td style={{ border: "1px solid  #dbdbdb", borderCollapse: "collapse", width: "15%" }}>
                            <tr style={{ fontSize: "14px", fontWeight: "bold", fontFamily: "Inter" }}>
                                *Staff
                            </tr>
                        </td>
                        <td style={{ border: "1px solid  #dbdbdb", borderCollapse: "collapse", width: "10%", }}>
                            <tr style={{ fontSize: "14px", fontWeight: "bold", fontFamily: "Inter", }}>
                                Employee Number
                            </tr>
                        </td>
                        <td style={{ border: "1px solid  #dbdbdb", borderCollapse: "collapse", width: "13%" }}>
                            <tr style={{ fontSize: "14px", fontWeight: "bold", fontFamily: "Inter" }}>
                                *Department
                            </tr>
                        </td>
                        <td style={{ border: "1px solid  #dbdbdb", borderCollapse: "collapse", width: "12%" }}>
                            <tr style={{ fontSize: "14px", fontWeight: "bold", fontFamily: "Inter" }}>
                                Job Title
                            </tr>
                        </td>
                        <td style={{ border: "1px solid  #dbdbdb", borderCollapse: "collapse", width: "12%" }}>
                            <tr style={{ fontSize: "14px", fontWeight: "bold", fontFamily: "Inter" }}>
                                Work Location
                            </tr>
                        </td>
                        <td style={{ border: "1px solid  #dbdbdb", borderCollapse: "collapse", width: "12%" }}>
                            <tr style={{ fontSize: "14px", fontWeight: "bold", fontFamily: "Inter" }}>
                                Duty Manager
                            </tr>
                        </td>
                        <td style={{ border: "1px solid  #dbdbdb", borderCollapse: "collapse", width: "12%" }}>
                            <tr style={{ fontSize: "14px", fontWeight: "bold", fontFamily: "Inter" }}>
                                On Call
                            </tr>
                        </td>
                        <td style={{ border: "1px solid  #dbdbdb", borderCollapse: "collapse", width: "14%" }}>
                            <tr style={{ fontSize: "14px", fontWeight: "bold", fontFamily: "Inter" }}>
                                Emergency
                            </tr>
                        </td>
                    </thead>
                    {

                        value?.length > 0 ?
                            value?.map((item, i) => {


                                return <tbody style={{ backgroundColor: "#e8f3fc", border: "1px solid  #dbdbdb", borderCollapse: "collapse" }}>
                                    <tr>
                                        <td>
                                            <CancelIcon onClick={deleteRow} style={{ fontSize: "22px", color: "red", marginLeft: "15px", marginTop: "5px", cursor: "pointer" }} />
                                        </td>
                                        <td>
                                            <CustomTextField
                                                value={
                                                    item?.staffName
                                                }

                                            
                                                style={{ fontSize: "14px", fontWeight: "bold", fontFamily: "Inter" }}
                                                endIcon={<SearchIcon style={{ marginLeft: "2px", fontSize: "18px", cursor: "pointer", fontWeight: "bold" }}
                                                    onClick={() => btnClick(1)} />}
                                            />
                                        </td>
                                        <td>
                                            <Typography style={{ fontSize: "14px", fontWeight: "bold", fontFamily: "Inter" }}>{item?.employeeNumber}</Typography>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                value={
                                                    item?.department


                                                }
                                                style={{ fontSize: "14px", fontWeight: "bold", fontFamily: "Inter" }}
                                                endIcon={<SearchIcon style={{ marginLeft: "2px", fontSize: "18px", cursor: "pointer", fontWeight: "bold" }}
                                                    onClick={() => btnClick(2)} />}
                                            />
                                        </td>
                                        <td>
                                            <CustomTextField
                                                value={
                                                    item?.jobTitle

                                                }
                                                style={{ fontSize: "14px", fontWeight: "bold", fontFamily: "Inter" }}
                                                endIcon={<SearchIcon style={{ marginLeft: "2px", fontSize: "18px", cursor: "pointer", fontWeight: "bold" }}
                                                    onClick={() => btnClick(3)} />}
                                            />
                                        </td>
                                        <td>
                                            <Autocomplete
                                                id="free-solo-demo"
                                                disableClearable
                                                options={
                                                    workLocationArr?.length > 0 &&
                                                    workLocationArr?.map((option) =>
                                                        option?.locationName
                                                    )

                                                }
                                                renderInput={(params) => <TextField {...params}></TextField>}
                                            />

                                        </td>
                                        <td>
                                            <CustomTextField
                                                endIcon={<SearchIcon style={{ marginLeft: "2px", fontSize: "18px", cursor: "pointer", fontWeight: "bold" }}
                                                    onClick={() => btnClick(4)} />}
                                            />
                                        </td>
                                        <td>
                                            <Autocomplete
                                                id="free-solo-demo"
                                                disableClearable
                                                options={
                                                    onCallArr?.length > 0 &&
                                                    onCallArr?.map((option) =>
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
                                                    emergencyArr?.length > 0 &&
                                                    emergencyArr?.map((option) =>
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
                            <Typography style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip", fontSize: "14px", fontWeight: "bold", fontFamily: "Inter" }}>No data to display</Typography>

                    }
                </table>
                {status === 1 && <StaffModal toggleHandler={setStatus} staffData={staffData}
                    selectedValue={selectedValue}
                    handleChange1={handleChange1}
                    state={state}
                    setState={setState}
                />}
                {status === 2 && <DepatmentPopup toggleHandler={setStatus} departmentArr={departmentArr}
                    handleChangeDepartment={handleChangeDepartment}
                    state2={state2}
                />}
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

            </Grid>
        </Grid>
    )
}

export default AssignTable
