import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "../../../../components/Loader";
import { AlertSnackbar } from "../../../../components/Snackbars/AlertSnackbar";
import { PageHeading } from "../../../../components/TextUI/PageHeading";
import { getNotificationsCycleCount } from "../../../../services/api";
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
      alertHandler(true, "Successfully Approved", SUCCESS);

      const timerId = setTimeout(() => {
        navigate("/cycle-count/notifications", {
          state: { showSuccessAlert: false },
        });
      }, 5000);
      return () => clearTimeout(timerId);
    }
  }, []);

  const initialCall = async () => {
    try {
      const api = await getNotificationsCycleCount(userDetails.userId);
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
    navigate("/cycle-count/approve", {
      state: {
        organizationId: row.organizationId,
        cycleCountHeaderId: row.cycleCountHeaderId,
        cycleCountHeaderName: row.cycleCountHeaderName,
        status: row.status,
        notificationId: row.id,
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
      <PageHeading text="Cycle Count Notifications" />
      <Loader loading={loading}>
        <CustomTable
          onClickAction={onClickAction}
          tableData={notificationData}
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
