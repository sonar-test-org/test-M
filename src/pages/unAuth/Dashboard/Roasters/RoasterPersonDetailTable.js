import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux';
import { getallemployeedata, DeleteRosterProfile } from '../../../../services/api'
import { useMutation } from 'react-query'
import { dateConverter } from '../../../../utils/commonService'
import CustomCheckBox from '../../../../components/CustomCheckBox';

import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteRoster from './DeleteRoster';
import UpdateRoster from './UpdateRoster';
import AssignRoster from './AssignRoster'
import { Link } from 'react-router-dom';



const RoasterPersonDetailTable = (props) => {
    const classes = useStyles()
    const { setOriPagedata, oriPagedata, viewBy } = props
    const [result, setResult] = useState([]);
    //    const[shiftIntoArr,setShiftIntoArr]=useState([]);

    const [eachDayCountArr, setEachDayCountArr] = useState();
    const [personRosterId, setPersonRosterId] = useState("");
    const [personRosterPivoteId, setPersonPivoteId] = useState("");
    const [personIdRoster, setPersonIdRoster] = useState("");
    const [jobTitleIdRoster, setJobTitleIdRoster] = useState("");
    const [departmentIdRoster, setDepartmentIdRoster] = useState("");
    const [Assign, setAssign] = useState(false)
    const selectAssign = () => {
        setAssign(true)
    }

    //    const[pagedata,setPageData]=useState([]);

    // const[openUpdatePoppup,setOpenUpdatePopup]=useState(false);
    const [status, setStatus] = React.useState(0);

    const btnClick = (e, index, value, data) => {
        setPersonPivoteId(data.personRosterPivoteId);
        setPersonRosterId(value.personRosterId)

        setPersonIdRoster(data.personId)
        setDepartmentIdRoster(data.departmentId)
        setJobTitleIdRoster(data.jobTitleId)
        // personId
        // departmentId
        // jobTitleId



        setStatus(e);
    };

    // console.log(personRosterPivoteId);


    const [dataRoster, setDataRoster] = useState([]);




    const filter = (viewBy?.value)

    useEffect(() => {
        var localArr1 = []
        if (filter == 'Employee') {

            localArr1?.push(oriPagedata?.eachDayShiftCount)

        }
        setEachDayCountArr(localArr1)

    }, [])






    const data = (oriPagedata?.personRosterData?.[filter])



    useEffect(() => {
        let localArr = [];
        for (let x in (oriPagedata?.personRosterData)) {
            let data1 = {
                "label": x,
                "value": (oriPagedata?.personRosterData)[x]
            }
            localArr.push(data1)

        }

        setResult(localArr)

    }, [oriPagedata])



    const empData = result.map((option) => ({
        ...option,
        value: option.value.map((valueOption) => ({
            valueOption
        }))
    }))


    const localArr = result.map((option) => ({
        ...option,
        value: option.value.map((valueOption) => ({
            ...valueOption,
            shiftInformationArr: Object.keys(valueOption.shiftInformation).map((key) => (valueOption.shiftInformation[key]?.shiftInfoList[0]))
        }))

    }))


    // console.log("array",localArr);


    useEffect(() => {
        result.map(option => setDataRoster(option.value))


    }, [])
    // console.log(dataRoster)




    const commonReducer = useSelector((state) => state.commonReducer);

    const { mutate: employeeListMutate } = useMutation(getallemployeedata, {
        onSuccess: (data, context, variables) => onSuccessProfileList(data, context, variables),
        onError: (data, context, variables) => onErrorProfileList(data, context, variables)
    })


    const onSuccessProfileList = (data) => {
        setOriPagedata(data.data.data)
    }

    const onErrorProfileList = (data) => {

    }

    useEffect(() => {
        Object.keys(commonReducer.selectedProjectObj)?.length > 0 && employeeListMutate({
            userId: "300000006565312",
            startDate: dateConverter(commonReducer.startDate),
            endDate: dateConverter(commonReducer.endDate),
            // startDate:"11-Dec-2022",
            // endDate:"17-Dec-2022",
            profileId: commonReducer.selectedProjectObj.profileId,
            apprvStatus: "",
            asc: true,
            viewBy: filter,
            pageSize: "15",
            pageNo: "0"


        })

    }, [commonReducer.startDate, commonReducer.endDate, commonReducer.apprvStatus, commonReducer.selectedProjectObj.profileId, filter])


    const [filterData, setFilterData] = useState([])
    const onChangeCheck = (value, currentIndex) => {

        var finalarr = filterData


        if (!finalarr.includes(empData[currentIndex])) {
            finalarr.push(empData[currentIndex])
        }

        setFilterData(finalarr)


    }


    const eachDayShiftCount =

        oriPagedata?.eachDayShiftCount

    console.log("hello", eachDayShiftCount);

    // Object.keys(eachDayShiftCount).map(data => {
    //     Object.keys(eachDayShiftCount[data]).map(value => console.log(eachDayShiftCount[data][value]))
    // })


    return (<>
        <Box className={classes.mainbox}>
            <Box className={classes.innermainbox}>
                <Box className={classes.innerboxemployee}>
                    <Box className={classes.employeeboxparent}>
                        <Typography className={classes.employeetext}>{filter}</Typography>
                    </Box>
                    <Box className={classes.jobtitleboxparent}>
                        <Typography className={classes.jobtitletext}>Job Title</Typography>
                    </Box>
                    <Box className={classes.shifttypeboxparent}>
                        <Typography className={classes.header_text}>Shift Type</Typography>
                    </Box>
                    <Box className={classes.bandboxparent}>
                        <Typography className={classes.header_text}>Band</Typography>
                    </Box>
                    <Box >
                        <Typography className={classes.header_text}></Typography>
                    </Box>
                    {
                        filter === 'Employee' ? null :
                            <Box >
                                <Typography className={classes.header_text}>Total Sch Hrs</Typography>
                            </Box>
                    }
                </Box>
                {
                    result.length > 0 &&
                    result?.map((item, index) => {


                        return <>
                            {item.label == 'Employee' ? null :
                                <Box className={classes.pagedatamainbox} style={{}}>
                                    <Typography className={classes.itemfullname} style={{ fontWeight: "bolder", textAlign: "center" }}>{item.label}</Typography>
                                </Box>
                            }
                            <Box >
                                {
                                    item?.value?.length > 0 &&
                                    item?.value?.map((option) => {

                                        return <Box className={classes.pagedatamainbox}>


                                            <Box className={classes.checkboxparent}>
                                                <CustomCheckBox

                                                    checked={
                                                        item.checked}
                                                    onChangeCheck={onChangeCheck}
                                                    currentIndex={index}

                                                />



                                                <Typography title={option?.fullName} className={classes.itemfullname}>{option?.fullName}</Typography>

                                            </Box>
                                            <Box className={classes.itemjobtitleparent}>
                                                <Typography title={option?.jobTitle} className={classes.body_text}>{option.jobTitle}</Typography>
                                            </Box>
                                            <Box className={classes.itemshifttypeparent}>
                                                <Typography className={classes.body_text}>{option?.shiftType}</Typography>
                                            </Box>
                                            <Box className={classes.itembandparent}>
                                                <Typography className={classes.body_text}>{option?.band}</Typography>
                                            </Box>
                                            <Box className={classes.iconparent}>
                                                <FileCopyIcon className={classes.FileCopyIcon} />
                                                <DeleteIcon className={classes.deleteCopyIcon} />

                                            </Box>

                                        </Box>
                                    })
                                }
                            </Box>
                        </>

                    })
                }
                {
                    filter === 'Employee' ?

                        <Box style={{ display: "flex", justifyContent: "flex-end", flexDirection: "column", borderBottom: "1px solid black !important"}}>
                            {
                                oriPagedata?.header?.dynamicColoums?.length > 0 &&
                                oriPagedata?.header?.dynamicColoums?.map(item => {

                                    return <Box style={{borderBottom: "1px solid black !important"}}>
                                        <Box style={{ display: "flex", justifyContent: "flex-end", width: "100%",minHeight:40.7,  }} >
                                            <Typography style={{ fontSize: "14px", fontFamily: "Inter", backgroundColor: "#BAFFC9", width: "100%", fontWeight: "bold",textAlign:"center"  }}>{item}</Typography>
                                        </Box>
                                    </Box>
                                })
                            }

                        </Box>



                        : null
                }
            </Box>
            <Box className={classes.dayArrmainbox}>
                <Box>
                    {
                        commonReducer?.dayArr?.length > 0 &&
                        <Box
                            style={{
                                minWidth: ((oriPagedata?.header?.days?.length * 50) + (Object.keys(commonReducer.selectedProjectObj)?.length > 0 &&
                                    commonReducer.selectedProjectObj.profileName != "" ? 530 : 0)),
                                overflow: "auto"
                            }}
                        >
                            <Box className={classes.dayarrboxparent}>
                                {
                                    oriPagedata?.header?.days?.length > 0 &&
                                    oriPagedata?.header?.days?.map(item => {
                                        return <>
                                            <Box className={classes.optionboxparent}>
                                                <Typography className={classes.optiontext}>{item}</Typography>
                                            </Box>
                                        </>
                                    })
                                }



                                {
                                    oriPagedata?.header?.dynamicColoums?.length > 0 &&
                                    oriPagedata?.header?.dynamicColoums?.map(item => {

                                        return <>

                                            <Box className={classes.optionboxparent1}>
                                                <Typography className={classes.optiontext}>{item}</Typography>
                                            </Box>
                                        </>
                                    })
                                }

                            </Box>

                        </Box>

                    }
                </Box>
                {
                    localArr?.map(option => {


                        return <>


                            {
                                (option.value).map(data => {
                                    console.log(data)

                                    return <Box className={classes.pagedatamainbox}>
                                        {
                                            data.shiftInformationArr.map((value, index) => {

                                                return <Box className={classes.pagedataarraymainbox}>

                                                    <Box className={classes.pagedataoptionmainbox} onClick={value === undefined && selectAssign} style={{ cursor: "pointer" }}>
                                                        <Typography style={{ fontSize: "14px", fontWeight: "bold", fontFamily: "Inter", textAlign: "center", backgroundColor: "#124590", color: "#fff", width: "100%" }}>{value?.shiftHours}</Typography>
                                                        <Link className={classes.body_text} style={{ fontSize: "14px", fontWeight: "bold", fontFamily: "Inter", textAlign: "center" }} onClick={() => btnClick(1, index, value, data)}>{value === undefined ? "" : value.workDurationCode}</Link>

                                                    </Box>

                                                </Box>
                                            })
                                        }
                                    </Box>
                                }
                                )}


                        </>
                    })
                }
                {/* {
                    oriPagedata?.eachDayShiftCount?.length === null ?

                    'hello'
                  :  
                  <Box style={{display:"flex",flexDirection:"row",}}>
                    {
                  Object.keys(oriPagedata?.eachDayShiftCount).map(data => {
                    return    <Box  style={{display:"flex",flexDirection:"column",  borderBottom: "1px solid #E9E9E9 !important",backgroundColor: "#fff !important"}}>{
                        Object.keys(eachDayShiftCount[data]).map(value => {
                            return <Box className={classes.pagedataarraymainbox}>
                                <Box className={classes.pagedataoptionmainbox1} >
                                    <Typography>{eachDayShiftCount[data][value]}</Typography>
                                </Box>
                                 
                            </Box>
                        })
                    }
                    
                    </Box>
                    
                    
                })
            }
            </Box>
                    } */}
            </Box>


            {/* {
                filter === 'Employee' ?
                  
                        <Box style={{ display: "flex", justifyContent: "flex-end", flexDirection: "column", marginBottom: "20px" }} className={classes.pagedatamainbox}>
                            {
                                oriPagedata?.header?.dynamicColoums?.length > 0 &&
                                oriPagedata?.header?.dynamicColoums?.map(item => {

                                    return <>
                                        <Box display={{ display: "flex", justifyContent: "flex-end", width: "32%", }} className={classes.pagedatamainbox} >
                                            <Typography style={{ fontSize: "14px", fontFamily: "Inter", backgroundColor: "#BAFFC9", width: "100%", fontWeight: "bold", textAlign: "center" }}>{item}</Typography>
                                        </Box>
                                    </>
                                })
                            }

                        </Box>
        
                      
                    
                    : null
            } */}

            {

            }
            {
                data?.length == 0 && <Box width={1} textAlign="center" my={2}>No Data Found</Box>
            }

        </Box>
        {status === 1 && <UpdateRoster setStatus1={setStatus} personRosterId={personRosterId} personRosterPivoteId={personRosterPivoteId} personIdRoster={personIdRoster} departmentIdRoster={departmentIdRoster} jobTitleIdRoster={jobTitleIdRoster} />}
        {Assign &&
            <AssignRoster togglehandler={setAssign} />}
    </>
    )
}





export default RoasterPersonDetailTable



const useStyles = makeStyles(theme => ({
    floating_cell: {
        display: 'flex',
        alignItems: "center",
        padding: "0 8px"
    },
    header_text: {
        fontSize: "14px !important"
    },
    body_text: {
        fontSize: "14px !important",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap", width: "100%"
    },
    mainbox: {
        border: "1px solid #E9E9E9 !important",

    },
    innermainbox: {
        display: "inline-block",
        width: "600px",
        verticalAlign: "top",

    },
    innerboxemployee: {
        display: "flex !important",
        padding: "15px 0px",
        borderBottom: "1px solid #E9E9E9",
        backgroundColor: "#F1F1F1"
    },
    employeeboxparent: {
        display: 'flex',
        alignItems: "center",
        padding: "0 8px",
        width: 200
    },
    employeetext: {
        fontSize: "14px !important"
    },
    jobtitleboxparent: {
        width: 150,
        justifyContent: "left",
        display: 'flex',
        alignItems: "center",
        padding: "0 8px",
    },
    jobtitletext: {
        textAlign: "center",
        display: 'flex',
        alignItems: "center",
        padding: "0 8px",
        fontSize: "14px !important"
    },
    shifttypeboxparent: {
        width: 80,
        textAlign: "left",
        display: 'flex',
        alignItems: "center",
        padding: "0 8px"
    },
    bandboxparent: {
        width: 50,
        textAlign: "left",
        display: 'flex',
        alignItems: "center",
        padding: "0 8px"
    },
    pagedatamainbox: {
        display: "flex !important",
        borderBottom: "1px solid #E9E9E9 !important",
        backgroundColor: "#fff !important"
    },
    pagedatamainbox1: {
        display: "flex !important",
        flexDirection:"column",
        borderBottom: "1px solid #E9E9E9 !important",
        backgroundColor: "#fff !important"
    },
    checkboxparent: {

        padding: "0 8px",
        width: 200,
        display: "flex !important",
        alignItems: "center !important",

    },
    itemfullname: {
        fontSize: "14px !important",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "calc(100% - 60px) !important",

    },
    checkboxicon: {
        color: "#124590 !important",
        fontSize: "small !important",
        marginLeft: "15px !important",
        cursor: "pointer !important",
        // marginRight: "10px !important"
    },
    itemjobtitleparent: {
        width: 150,
        justifyContent: "flex-start !important",
        textAlign: "left !important",
        display: 'flex',
        alignItems: "center",
        padding: "0 8px"
    },
    itemshifttypeparent: {
        width: 80,
        justifyContent: "left !important",
        display: 'flex',
        alignItems: "center",
        padding: "0 8px"
    },
    itembandparent: {
        width: 50,
        justifyContent: "left !important",
        alignItems: "center !important",
        paddingLeft: 10,
        display: "flex !important"
    },
    iconparent: {
        width: 80,
        justifyContent: "lef !important",
        display: 'flex',
        alignItems: "center",
        padding: "0 8px"
    },
    FileCopyIcon: {
        color: "#124590 !important",
        fontSize: "small !important",
        marginLeft: "15px !important"
    },
    deleteCopyIcon: {
        color: "#D90000 !important",
        fontSize: "small !important",
        marginLeft: "15px !important",
        cursor: "pointer"
    },
    dayArrmainbox: {
        width: "calc(100% - 600px) !important",
        overflow: "auto !important",
        display: "inline-block !important"
    },
    dayarrboxparent: {
        display: "inline-flex !important",
        padding: "1px 0 !important",
        borderBottom: "1px solid #E9E9E9 !important",
        backgroundColor: "#F1F1F1 !important",
        minHeight: 73,

        textAlign: "right"
    },
    optionboxparent: {
        width: 70,
        justifyContent: "flex-end !important",
        display: 'flex',
        alignItems: "center",
        padding: "0 8px"
    },
    optionboxparent1: {
        width: 100,
        justifyContent: "flex-end !important",
        display: 'flex',
        alignItems: "center",
        padding: "0 8px"
    },
    optiontext: {
        color: "black !important",
        fontWeight: "bold !important",
        fontSize: "12px !important",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap"
    },
    wrkhrsbox: {
        width: 65,
        justifyContent: "flex-end !important",
        display: 'flex',
        alignItems: "center",
        padding: "0 8px"
    },
    floating_celltext: {
        color: "black !important",
        fontWeight: "bold !important",
        fontSize: "14px !important",
    },
    floating_cellbox: {
        width: 80,
        justifyContent: "flex-end !important",
        display: 'flex',
        alignItems: "center",
        padding: "0 8px"
    },
    pagedataarraymainbox: {
        display: "inline-flex !important",
        borderBottom: "1px solid #E9E9E9 !important",
        backgroundColor: "#fff !important"
    },
    pagedataoptionmainbox: {
        width: 70,
        justifyContent: "flex-end !important",
        borderLeft: "1px solid rgb(233, 233, 233) !important",
        minHeight: 40.7,
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        padding: "0 8px",
        // overflow:"hidden",
        // whiteSpace:"nowrap",
        // width:"100%",
    },
    pagedataoptionmainbox1: {
        width: 70,
        justifyContent: "flex-end !important",
        borderLeft: "1px solid rgb(233, 233, 233) !important",
        minHeight: 40.7,
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        padding: "0 8px",
        // overflow:"hidden",
        // whiteSpace:"nowrap",
        // width:"100%",
    },
    pagedataarraymainbox1: {
        display: "flex !important",
        flexDirection:"row",
        borderBottom: "1px solid #E9E9E9 !important",
        backgroundColor: "#fff !important"
    },

    itemparent: {
        width: 65,
        justifyContent: "flex-end",
        borderLeft: "1px solid rgb(233, 233, 233)",
        minHeight: 42,
        display: 'flex',
        alignItems: "center",
        padding: "0 8px"
    },
    itemprojecthrsparent: {
        width: 78,
        justifyContent: "flex-end",
        borderLeft: "1px solid rgb(233, 233, 233)",
        minHeight: 42,
        display: 'flex',
        alignItems: "center",
        padding: "0 8px"
    },
    commonitemparent: {
        width: 80,
        justifyContent: "flex-end",
        borderLeft: "1px solid rgb(233, 233, 233)",
        minHeight: 42,
        display: 'flex',
        alignItems: "center",
        padding: "0 8px"
    },
}))
