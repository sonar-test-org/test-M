import { Typography,Grid,Box } from '@mui/material'
import React from 'react'
import { CustomTextField } from '../../../../components/TextField'
import { makeStyles } from '@material-ui/styles'
const useStyles=makeStyles(theme=>({
    contentBox:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center"
    },
    text1:{
        fontSize:"8px",
        fontFamily:"Inter",

    }
}))
const SplitShit = () => {
    const classes=useStyles()
  return (
    <Grid xs="12" style={{marginTop:"10px"}}>
    <Box className={classes.contentBox}>
        <Grid xs="3">
        <Typography style={{fontSize:"14px",  fontFamily:"Inter",fontWeight:"bold"}}>*Split Shift</Typography>
        </Grid>
        
        <CustomTextField/>
        
    </Box>
    </Grid>
  )
}

export default SplitShit
