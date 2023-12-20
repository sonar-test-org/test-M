import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { approveTableMock } from "../PhysicalCountUtils";
import { CustomTable } from "./CustomTable";
import { Heading } from "./Heading";
import { StatusContainer } from "./StatusContainer";
import * as api from "../../../../services/api";
import { Loader } from "../../../../components/Loader";
import { ALERT_TIMEOUT, ERROR, SUCCESS } from "../../../../utils/variables";
import { AlertSnackbar } from "../../../../components/Snackbars/AlertSnackbar";
import { generateErrorMessage } from "../../../../utils/commonUtils";
import { UserListTablePagination } from "../../../../components/CustomPagination/UserListTablePagination";

export const Approve = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pagesCount, setPagesCount] = useState(0);
  const [rowsPerPageOptions, setRowsPerPageOptions] = useState([
    10, 20, 30, 50,
  ]);

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: true,
    message: "",
    flag: "",
  });

  const [tableData, setTableData] = useState([]);
  const [status, setStatus] = useState({
    name: "",
    status: "",
  });

  useEffect(() => {
    const paginationParams = {
      pageNo: 0,
      pageSize: rowsPerPage,
    };
    initialGetCall(paginationParams);
  }, []);

  const initialGetCall = async (paginationParams) => {
    try {
      const params = {
        organizationId: state.organizationId,
        physicalInventoryName: state.physicalInventoryName,
        ...paginationParams,
      };
      setLoading(true);

      const apiRes = await api.physicalCountSearchList(params);

      if (!apiRes?.data?.data)
        throw new Error("Something went wrong in get call");

      const res = apiRes.data.data;
      setPagesCount(res.totalPages);
      setPage(paginationParams.pageNo + 1);
      setRowsPerPage(paginationParams.pageSize);
      setTableData(res.items);

      setStatus({
        name: params.physicalInventoryName,
        status: state.status,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
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

  const onClickApprove = async () => {
    setLoading(true);
    try {
      const apiRes = await api.approveNotificationPhysicalCount(
        state.notificationId
      );
      if (!apiRes.data.data) throw new Error();
      setLoading(false);
      alertHandler(true, "Sussessfully Approved", SUCCESS);
      navigate("/physical-count/notifications", {
        state: { showSuccessAlert: true },
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
    }
  };

  const onClickRecount = async () => {
    setLoading(true);
    try {
      const apiRes = await api.recountAllPhysicalCount(state.notificationId);
      if (!apiRes.data.data) throw new Error("Error in recount all");
      setLoading(false);
      alertHandler(true, "Successfully submited for Recount", SUCCESS);
      navigate("/physical-count/notifications");
    } catch (error) {
      setLoading(false);
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
    }
  };

  const handleChangePagination = (event, value) => {
    const paginationParams = {
      pageNo: value - 1,
      pageSize: rowsPerPage,
    };
    initialGetCall(paginationParams);
  };

  const handleChangeRowsPerPage = (e) => {
    const k = e.target.value;
    const paginationParams = {
      pageNo: 0,
      pageSize: +e.target.value,
    };
    initialGetCall(paginationParams);
  };

  return (
    <Box sx={styles.con}>
      <Loader loading={loading}>
        <AlertSnackbar
          open={alert.open}
          flag={alert.flag}
          message={alert.message}
        />
        <Heading
          text="Physical Count Approval Page"
          onClickApprove={onClickApprove}
          onClickRecount={onClickRecount}
          disabled={!tableData.length}
        />
        <StatusContainer status={status} />
        {tableData.length ? <CustomTable tableData={tableData} /> : null}
        {tableData.length ? (
          <UserListTablePagination
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
            pagesCount={pagesCount}
            handleChangePagination={handleChangePagination}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        ) : null}
      </Loader>
    </Box>
  );
};

const styles = {
  con: {
    padding: "0px 100px 100px 100px",
    minHeight: "100vh",
  },
};
