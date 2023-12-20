import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { CustomTable } from "./CustomTable";
import { Loader } from "../../../../components/Loader";
import { ALERT_TIMEOUT } from "../../../../utils/variables";
import { getTransactionHistory } from "../../../../services/api";

export const UserMngHistory = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    flag: "",
  });

  useEffect(() => {
    getHistoryLocal();
  }, []);

  const alertHandler = (type, message, flag) => {
    setAlert({
      open: type,
      message,
      flag,
    });

    setTimeout(() => {
      setAlert({
        open: false,
        message: "",
        flag: "",
      });
    }, ALERT_TIMEOUT);
  };

  const getHistoryLocal = async () => {
    setLoading(true);
    try {
      const historyRes = await getTransactionHistory(state.id);
      if (historyRes.data.data) {
        setTableData(historyRes.data.data);
        setLoading(false);
        if (!historyRes.data.data.length) {
          alertHandler(
            true,
            "Successfully fetched but history is not available for this user",
            "success"
          );
        }
      } else throw new Error();
    } catch (error) {
      alertHandler(true, "Something went wrong while getting history", "error");
      setLoading(false);
    }
  };

  const onClickBack = () => {
    navigate("/user-management/user-list");
  };

  return (
    <Box sx={styles.maincontainer}>
      <Loader loading={loading}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={alert.open}
        >
          <Alert severity={alert.flag} sx={{ width: "100%" }}>
            {alert.message}
          </Alert>
        </Snackbar>
        <Typography sx={styles.heading}>History Details</Typography>
        <Box sx={styles.btnContainer}>
          <Button
            variant="contained"
            sx={{ ...styles.button, ...styles.resetBtn }}
            onClick={onClickBack}
          >
            Back
          </Button>
        </Box>
        <CustomTable tableData={tableData} user={state.username} />
      </Loader>
    </Box>
  );
};

const styles = {
  maincontainer: {
    padding: "0px 100px 100px 100px",
    minHeight: "100vh",
  },
  btnContainer: {
    marginBottom: "30px",
    display: "flex",
    justifyContent: "right",
  },
  button: {
    width: "100px",
    background: "#4994EC",
    borderRadius: "5px !important",
    color: "#FFFFFF",
    height: "50px",
  },
  resetBtn: {
    background: "#E7E7E7",
    color: "#000000",
    "&:hover": {
      color: "white",
    },
  },
  heading: {
    fontWeight: "600 !important",
    marginBottom: "30px !important",
    fontSize: "24px !important",
    marginTop: "30px !important",
  },
};
