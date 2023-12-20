import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
// import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useNavigate, useSearchParams } from "react-router-dom";
import { getErrorMsz } from "../../utils/validator";
import { afterValidate } from "../../utils/commonService";
import { CustomSnackbar } from "../../components/CustomSnackbar";
import { CustomTextField } from "../../components/TextField";
import { CustomButton } from "../../components/Button";
import { loginUser } from "../../services/api";
import { useMutation } from "react-query";
import { Loader } from "../../components/Loader";
import { updateState } from "../../redux/commonSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserQRCode } from "../../services/api";
import { AppVersion } from "./AppVersion";

export const LoginLayout = (props) => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const { qrCode } = useSelector((state) => state.commonReducer);

  const [snakeBarProps, setSnakeBarProps] = useState({});

  const [searchParams] = useSearchParams();
  let id = searchParams.get("tenant");

  const [submitFlag, setSubmitFlag] = useState(false);

  const [pagedata, setPagedata] = useState({
    username: "",
    loginpassword: "",
  });

  const { mutate: loginUserMutate, isLoading: approveLoading } = useMutation(
    loginUser,
    {
      onSuccess: (data, context, variables) =>
        onSuccessmasterapprove(data, context, variables),
      onError: (data, context, variables) =>
        onErrormasterapprove(data, context, variables),
    }
  );

  const navigateCallback = (data) => {
    setTimeout(() => {
      Navigate("/user-management/user-list", {
        state: { ...pagedata, userId: data.data.data.userId },
        replace: true,
      });
    }, 0)
  }

  const onSuccessmasterapprove = (data) => {
    console.log("data :>> ", data.data.data);
    if (data.data) {
      dispatch(updateState({ ...data.data.data, callback: () => navigateCallback(data) }));
      // initial Navigation
      // Navigate("/user-management/user-list", {
      //   state: { ...pagedata, userId: data.data.data.userId },
      //   replace: true,
      // });
      // Navigate("/dashboard", { state: { ...pagedata, userId: data.data.data.userId }, replace: true })
    }
  };

  const onErrormasterapprove = (data) => {
    console.log("data :>> ", data);
    if (data && data.response) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: data.response.data.status.description,
        type: "error",
      });
    }
  };

  const checkvalidation = () => {
    loginUserMutate({
      username: pagedata.username,
      password: pagedata.loginpassword,
    });
  };

  const loginclickhandler = () => {
    afterValidate(checkvalidation, setSnakeBarProps);
    setSubmitFlag(true);
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      loginclickhandler();
    }
  };

  useEffect(() => {
    getUserQRCodeLocal();
  }, []);

  const getUserQRCodeLocal = async () => {
    try {
      const api = await getUserQRCode(id);
      const dat = {
        qrCode: api.data.qrCode || "",
        tenantName: api.data.tenantName || "",
        xtenantId: api.data.xtenantId || "",
        TENENT_IDENTIFIER: id,
      };
      dispatch(updateState(dat));
      setLoading(false);
    } catch (error) {
      const errMsg =
        typeof error.response?.data === "string"
          ? error.response?.data
          : "QR code failed to fetch";
      setSnakeBarProps({
        snackbarFlag: true,
        msz: errMsg,
        type: "error",
      });
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={4}
      style={{
        borderRadius: "20px",
        width: "85%",
        maxWidth: '422px',
        padding: "20px",
        backgroundColor: "#fff",
      }}
    >
      <Loader loading={loading}>
        <Grid item style={{ padding: "0px 30px 10px 30px" }}>
         
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "128px",
              margin: "auto",
              textAlign: "center",
            }}
          >
            <Typography style={{ fontSize: "14px" }}>
              Connect through scanner
            </Typography>
            {qrCode ? (
              <img
                src={`data:image/png;base64,${qrCode}`}
                style={{ width: "128px", height: "128px" }}
              />
            ) : (
              "QR Code"
            )}
          </Box>
          <Typography style={{ fontSize: "30px", marginTop: "40px" }}>
            {/* color: "#124590" */}
            Login your account
          </Typography>
          <Grid item style={{ padding: "10px 0px 10px 0px" }}>
            <CustomTextField
              type="text"
              inputLabel="Username"
              value={pagedata?.username}
              onChange={(event) =>
                setPagedata({ ...pagedata, username: event.target.value.trim() })
              }
              required
              error={
                submitFlag && getErrorMsz("username", pagedata?.username) != ""
              }
              errorMsz={getErrorMsz("username", pagedata?.username)}
              onKeyDown={onKeyDown}
              sx={{maxWidth: '322px', width: '100%', '& .MuiInputBase-input': {
                padding: '9px 10px'
              }}}
              labelSx={{fontSize: '14px'}}
            />
          </Grid>
          <Grid item style={{ padding: "10px 0px 10px 0px" }}>
            <CustomTextField
              type="password"
              inputLabel="Password"
              value={pagedata?.loginpassword}
              onChange={(event) =>
                setPagedata({ ...pagedata, loginpassword: event.target.value.trim() })
              }
              required
              error={
                submitFlag &&
                getErrorMsz("password", pagedata?.loginpassword) != ""
              }
              errorMsz={getErrorMsz("password", pagedata?.loginpassword)}
              onKeyDown={onKeyDown}
              sx={{maxWidth: '322px', width: '100%', '& .MuiInputBase-input': {
                padding: '9px 10px'
              }}}
              labelSx={{fontSize: '14px'}}
            />
          </Grid>
          <Grid style={{ padding: "20px 0px 20px 0px" }}>
            <CustomButton
              variant="contained"
              btnText="login"
              fullWidth
              color="primary"
              onClick={loginclickhandler}
              btnClass={{ backgroundColor: "#124590" }}
              sx={{maxWidth: '322px', width: '100%', height: '40px'}}
            />
          </Grid>
          {/* <AppVersion /> */}
        </Grid>
        <Grid
          container
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "38px 20px 7px 20px",
          }}
        >
          <Grid item>
            <Typography
              style={{
                color: "#717171",
                fontFamily: "Inter",
                fontSize: "14px",
              }}
            >
              Powered by
            </Typography>
            <img width="80%" src="/w360/assets/imagenine.svg" alt="Image" />
          </Grid>
          <Grid item>
            <Typography
              style={{
                color: "#717171",
                fontFamily: "Inter",
                fontSize: "14px",
              }}
            >
              Managed by
            </Typography>
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <img
                width="60%"
                src="/w360/assets/imageten.svg"
                alt="Image"
                style={{ display: "flex", justifyContent: "center" }}
              />
            </Box>
          </Grid>
        </Grid>
          <AppVersion />
      </Loader>

      {Object.keys(snakeBarProps).length > 0 && (
        <CustomSnackbar
          {...snakeBarProps}
          setSnakeBarProps={setSnakeBarProps}
        />
      )}
    </Paper>
  );
};
