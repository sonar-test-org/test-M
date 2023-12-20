import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { CustomButton } from '../../../../components/Button'
import { CustomDialog } from '../../../../components/CustomDialog'
import { makeStyles } from '@material-ui/styles'

import OptionRoaster from './OptionRoaster'
import Option2Roster from './Option2Roster'



const useStyles = makeStyles(theme => (
    {
        AssignHeaderContent: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
        },
        iconStyle: {
            color: "#5BB75B"
        },
        cancelIconStyle: {
            color: "#f51414"
        },
        BtnStyleOn: {
            color: "#fff",
            backgroundColor: "#124590"
        },

        BtnStyleOff: {
            color: "#fff",
            backgroundColor: "#dbdbd"
        }

    }
))

const AssignRoster = (props) => {
    const classes = useStyles()



    const { togglehandler } = props
    const [status, setStatus] = React.useState(1);



    const handleClose = () => {
        togglehandler(false)

    }
    const btnClick = (e) => {
        setStatus(e);
    };

    return (
        <>
            <CustomDialog maxWidth="xl" dialogTitle={status == 1 ? "Assign : Option 1" : "Assign : Option 2"} open="true" handleClose={handleClose}  >
                <Box>
                    <Grid item xs="12" className={classes.AssignHeaderContent}>
                        <Grid>
                            <CustomButton
                                btnText="Option 1"
                                variant="contained"
                                onClick={() => btnClick(1)}
                                btnClass={{ color: "#fff", backgroundColor: "#124590" }}


                            />

                            <CustomButton
                                btnText="Option 2"
                                variant="contained"
                                onClick={() => btnClick(2)}
                                btnClass={{ color: "#fff", backgroundColor: "#124590", marginLeft: "10px" }}

                            />




                        </Grid>
                        <Grid>
                            <Typography style={{ color: "red", fontSize: "10px" }}>*Overlapped shifts will be replaced.</Typography>
                        </Grid>
                    </Grid>
                    <Grid>
                        {status === 1 && <OptionRoaster status={status}
                            togglehandler={togglehandler}
                        />}
                        {status === 2 && <Option2Roster status={status} />}
                    </Grid>


                </Box>


            </CustomDialog>

        </>
    )
}

export default AssignRoster
