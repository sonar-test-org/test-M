import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import { CustomButton } from '../../../components/Button';
import { CustomDialog } from '../../../components/CustomDialog'
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useState } from 'react';
import { RequestDetailsModel } from './requestDetailsModel';

const useStyles = makeStyles(theme => ({
    headermanage: {
        borderBottom: "1px solid #E9E9E9",
        backgroundColor: "#F1F1F1",
        padding: "3px",
        "& p": {
            fontWeight: "bold",
            // borderRight: '1px solid #979991',
            paddingLeft: "5px",
            textAlign: "center"
        }
    },

}));


export const RequestModel = (props) => {
    const classes = useStyles();
    const { togglerhandler } = props;
    const [createRequest, setCreateRequest] = useState(false)

    const handleClose = () => {
        togglerhandler(false)
    }

    const createrequesthandler = () => {
        setCreateRequest(true)
    }

    return <CustomDialog maxWidth="md" dialogTitle='Request' open='true' handleClose={handleClose}>
        <Grid container>
            <Box>
                <CustomButton
                    btnText='Create Request'
                    variant='contained'
                    btnClass={{ backgroundColor: "#124590", color: "#fff", fontSize: "12px" }}
                    startIcon={<NoteAddIcon />}
                    onClick={createrequesthandler}
                />
            </Box>
        </Grid>
        <Box mt={2}>
            <Grid container className={classes.headermanage}>
                <Grid item xs='1'>
                    <Typography fontSize='14px'></Typography>
                </Grid>
                <Grid item xs='2'>
                    <Box>
                        <Typography fontSize='14px'>Request Type</Typography>
                    </Box>
                </Grid>
                <Grid item xs='2'>
                    <Typography fontSize='14px'>Start Date</Typography>
                </Grid>
                <Grid item xs='2'>
                    <Typography fontSize='14px'>End Date</Typography>
                </Grid>
                <Grid item xs='2'>
                    <Typography fontSize='14px'>Time / Hours</Typography>
                </Grid>
                <Grid item xs='2'>
                    <Typography fontSize='14px'>Creation Date</Typography>
                </Grid>
                <Grid item xs='1'>
                    <Typography fontSize='14px'>Status</Typography>
                </Grid>
            </Grid>
        </Box>
        {
            createRequest &&
            <RequestDetailsModel togglerhandler={setCreateRequest} />
        }
    </CustomDialog>
}
