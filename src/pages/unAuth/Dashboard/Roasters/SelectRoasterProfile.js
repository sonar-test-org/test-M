import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'

import { Box, Grid, TextField } from '@material-ui/core'
import { CustomButton } from '../../../../components/Button';
import RoasterDetailModal from './RoasterDetailModal';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { DateWidget } from '../../shared/datewidget';
import { CustomAutoComplete } from '../../../../components/CustomAutoComplete';
import AssignRoster from './AssignRoster';







const SelectRoasterProfile = (props) => {
    const classes = useStyles();
    const { oriPagedata, filterByViewBy, viewBy, setViewBy, setOriPagedata } = props;
    const commonReducer = useSelector((state) => state.commonReducer);

    const [profile, setProfile] = useState(false)

    






    const SelectProfileClickHandler = () => {
        setProfile(true)
    }

    



    const ViewByFilterValue = (newData) => {


        setViewBy(newData)






    }

    return (<>
        <Grid container className={classes.maincontainer1}>
            <Box container className={classes.paper}>
                <Grid container className={classes.container}>
                    <Grid >
                        <Typography style={{ fontWeight: "bold", fontSize: "20px", fontFamily: "Inter", }}>
                            Rosters
                        </Typography>

                    </Grid>
                    <Grid item xs={12} style={{ marginTop: "10px", marginLeft: "5px" }}>
                        <CustomButton
                            btnText='select Profile'
                            variant='contained'
                            onClick={SelectProfileClickHandler}
                            btnClass={{ backgroundColor: "#124590", color: "#fff", fontSize: "12px" }}
                        />

                        {
                            Object.keys(commonReducer.selectedProjectObj).length > 0 &&
                            <Typography className={classes.projectname}> {commonReducer.selectedProjectObj.profileName} </Typography>
                        }

                    </Grid>
                    {Object.keys(commonReducer.selectedProjectObj).length > 0 && <>



                        < Grid item xs='12' className={classes.startdate}>
                            <DateWidget {...props} />
                        </Grid>

                        <Grid item xs='12' className={classes.Wrap}>
                            <Box px={3} className={classes.totalpersonbox}>
                                <Typography className={classes.totalpersonboxtext1}>{oriPagedata?.summaryNumbers?.totalSchHours}</Typography>
                                <Typography variant='h7'>Total Sch Hrs </Typography>
                            </Box>
                            <Box px={3} className={classes.totalpersonbox}>
                                <Typography className={classes.totalpersonboxtext2}>{oriPagedata?.summaryNumbers?.draft}</Typography>
                                <Typography variant='h7' style={{ marginLeft: "10px" }}>Draft </Typography>
                            </Box>
                            <Box px={3} className={classes.totalpersonbox}>
                                <Typography className={classes.totalpersonboxtext3}>{oriPagedata?.summaryNumbers?.pendingApproval}</Typography>
                                <Typography variant='h7'>Pending Approval</Typography>
                            </Box>
                            <Box px={3} className={classes.totalpersonbox}>
                                <Typography className={classes.totalpersonboxtext3}>{oriPagedata?.summaryNumbers?.correction}</Typography>
                                <Typography variant='h7'>Correction</Typography>
                            </Box>
                            <Box px={3} className={classes.totalpersonbox}>
                                <Typography className={classes.totalpersonboxtext3}>{oriPagedata?.summaryNumbers?.underPublish}</Typography>
                                <Typography variant='h7'>Un Published</Typography>
                            </Box>
                            <Box px={3} className={classes.totalpersonbox}>
                                <Typography className={classes.totalpersonboxtext3}>{oriPagedata?.summaryNumbers?.publish}</Typography>
                                <Typography variant='h7'>Published</Typography>
                            </Box>
                            <Box px={3} className={classes.totalpersonbox}>
                                <Typography className={classes.totalpersonboxtext3}>{oriPagedata?.summaryNumbers?.onCall}</Typography>
                                <Typography variant='h7'>On Call</Typography>
                            </Box>

                            <CustomAutoComplete
                                id="Duration"
                                required
                                options={filterByViewBy}
                                getoptionlabelkey="label"
                                selectedvalue={viewBy}


                                className={classes.filterData}
                                renderInput={params => (
                                    <TextField {...params} label="View By " />
                                )}
                                onChange={(_event, newData) => {

                                    ViewByFilterValue(newData)
                                }}

                            />
                           

                        </Grid>

                    </>}

                </Grid>
            </Box>
        </Grid>
        {
            profile &&
            <RoasterDetailModal togglehandler={setProfile}

            />
        }
        
    </>
    )
}



export default SelectRoasterProfile



const useStyles = makeStyles(theme => ({
    maincontainer1: {
        backgroundColor: "#f5f5f5",


    },
    paper: {
        margin: "15px 0px 15px 0px",
        borderRadius: "0px !important",
        border: "1px solid rgb(233, 233, 233)",
        backgroundColor: "white !important",
        width: "100%",

    },
    container: {
        padding: "20px",
    },
    body_text: {
        fontSize: "14px !important",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap"
    },
    projectname: {
        color: "#6F6F6F !important",
        display: "inline-block !important",
        marginLeft: "20px !important",
        marginTop: "10px !important",
        textOverflow: "ellipsis !important",
        overflow: "hidden !important",
        width: "calc(100% - 190px)",
        whiteSpace: "nowrap !important",
        fontSize: "14px !important",
        verticalAlign: "sub !important",
    },
    startdate: {
        display: "flex",
        alignItems: "center !important",
        marginTop: "10px !important",
        fontSize: "14px !important",
        borderRadius: "0px !important"
    },
    totalpersonbox: {
        borderRight: "1px solid rgb(233, 233, 233)",
        cursor: "pointer"
    },
    Wrap: {
        display: "flex",
        marginTop: "20px !important",
        // borderBottom: "1px solid rgb(233, 233, 233)",
        '& p': {
            fontWeight: "bold",
            marginLeft: "10px",
            textAlign: "center",
            fontSize: "14px !important",
        }
    },
    totalpersonboxtext1: {
        color: "#3CAF85 !important"
    },
    totalpersonboxtext2: {
        color: "#47BDEF !important",
        textAlign: "center"
    },
    totalpersonboxtext3: {
        color: "#4a85c5 !important"
    },
    totalpersonboxtext4: {
        color: "#af3c66 !important"
    },
    totalpersonboxtext5: {
        color: "#ed6647 !important"
    },
    totalpersonboxtext6: {
        color: "#A0A0A0 !important"
    },
    tablebox: {
        marginTop: "10px"
    },
    filterData: {
        width: "170px !important",
        marginLeft: "10px !important",
    },

}));
