import { Typography, Grid, Box, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { CustomDialog } from '../../../../components/CustomDialog'
import { CustomTextField } from '../../../../components/TextField';
import AssignTimes from './AssignTimes';
import { CustomButton } from '../../../../components/Button/index'
import { useMutation } from 'react-query';
// import { DeleteRosterProfile } from '../../../../services/api';
import Autocomplete from '@mui/material/Autocomplete';



const DeleteRoster = (props) => {
  const { toggleHandler, personRosterId } = props;


  const [deleteRoster, setDeleteRoster] = useState();


  const handleCloseDelete = () => {
    toggleHandler(false)
  }



  const DeleteRosterProfile = () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify([
      personRosterId
    ]);

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://182.72.11.106:9091/ews/roster/personRosterData", requestOptions)
      .then(response => setDeleteRoster(response))
      .then(result => console.log(result));

    toggleHandler(false)

  }


  return (
    <CustomDialog maxWidth="sm" dialogTitle="Confirm Delete All Shift(s)" open="true" handleClose={handleCloseDelete} maxHeight="50vh">
      <Grid container >
        <Grid item>
          <Box style={{ marginLeft: "50px" }}>
            <Typography style={{ fontSize: "14px", fontFamily: "Inter", fontWeight: "bold" }}>
              Are you sure want to delete?
            </Typography>
          </Box>




          <Grid container style={{ marginTop: "20px", height: "10vh" }}>
            <Box style={{ display: "flex", flexDirection: "row", marginLeft: "60px", height: "20%", alignItems: "center" }}>

              <Typography style={{ fontSize: "14px", fontFamily: "Inter", fontWeight: "bold", textAlign: "center" }}>
                Reason
              </Typography>
              <Autocomplete
                style={{ marginLeft: "10px" }}
                disableClearable
                id="free-solo-demo"
                options={Reason}
                ListboxProps={{ style: { maxHeight: 120, fontSize: "14px", fontFamily: "Inter", } }}
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
          </Grid>


        </Grid>

      </Grid>
      <Grid style={{ display: "flex", justifyContent: "flex-end ", marginTop: "20px" }}>
        <CustomButton
          btnText="Confirm"
          onClick={DeleteRosterProfile}
          btnClass={{ backgroundColor: "#124590", color: "#fff" }}
        />
      </Grid>
    </CustomDialog>
  )
}

export default DeleteRoster
const Reason = [
  { label: 'Data Entry' },
  { label: 'Duty Changed' },
  { label: 'Not return back after leave' },
  { label: 'other' },
]