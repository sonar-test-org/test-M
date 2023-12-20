import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "../../../../components/Loader";
import { AlertSnackbar } from "../../../../components/Snackbars/AlertSnackbar";
import { PageHeading } from "../../../../components/TextUI/PageHeading";
import {
  getApproversPhysicalCount,
  getNotificationsPhysicalCount,
  physicalCountSearchList,
} from "../../../../services/api";
import { ALERT_TIMEOUT, ERROR, SUCCESS } from "../../../../utils/variables";
import { CustomTable } from "./CustomTable";
import { generateErrorMessage } from "../../../../utils/commonUtils";
import { useSelector } from "react-redux";

export const Notification = () => {
  const userDetails = useSelector((state) => state.commonReducer);
  const navigate = useNavigate();
  const { state } = useLocation();

  const [loading, setLoading] = useState(false);
  const [notificationData, setNotificationData] = useState([]);

  const [alert, setAlert] = useState({
    open: true,
    message: "",
    flag: "",
  });

  useEffect(() => {
    initialCall();
    
    if (state?.showSuccessAlert) {
      alertHandler(true, "Sussessfully Approved", SUCCESS);

      const timerId = setTimeout(() => {
        navigate("/physical-count/notifications", {
          state: { showSuccessAlert: false },
        });
      }, 5000);
      return () => clearTimeout(timerId);
    }
  }, []);

  const initialCall = async () => {
    try {
      const api = await getNotificationsPhysicalCount(userDetails.userId);
      const res = api.data?.data;
      if (res) {
        setNotificationData(res);
      } else throw new Error();

    } catch (error) {
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
    }
  };
  
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

  const onClickAction = async (row) => {
    navigate("/physical-count/approve", {
      state: {
        organizationId: row.organizationId,
        physicalInventoryName: row.physicalInventoryName,
        notificationId: row.id,
        status: row.status
      },
    });
  };

  return (
    <Box sx={styles.maincontainer}>
      <AlertSnackbar
        open={alert.open}
        flag={alert.flag}
        message={alert.message}
      />
      <PageHeading text="Physical Count Notifications" />
      <Loader loading={loading}>
        <CustomTable
          onClickAction={onClickAction}
          tableData={notificationData || []}
        />
      </Loader>
    </Box>
  );
};

const styles = {
  maincontainer: {
    padding: "0px 100px 100px 100px",
    minHeight: "100vh",
  },
  headerIcon: {
    width: "20px",
  },
};
