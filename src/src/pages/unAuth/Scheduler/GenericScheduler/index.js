import { Box, Checkbox, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SubHeader } from "../../../../components/Headers/SubHeader";
import SyncIcon from "@mui/icons-material/Sync";
import {
  getAllSetupReports,
  getReportHistory,
  runReportAdhoc,
  scheduleJob,
} from "../../../../services/api";
import { AlertSnackbar } from "../../../../components/Snackbars/AlertSnackbar";
import {
  ALERT_TIMEOUT,
  ERROR,
  GLOBAL_ERROR,
  INFO,
  INITIAL_CALL,
  SUCCESS,
} from "../../../../utils/variables";
import { Loader } from "../../../../components/Loader";
import { generateErrorMessage } from "../../../../utils/commonUtils";
import { CustomTable } from "./CustomTable";
import { HistoryCustomTable } from "./HistoryCustomTable";
import { HistoryPagination } from "./HistoryPagination";
import { RunSchedulerModal } from "./RunSchedulerModal";
import {
  generateHistoryData,
  generateTableData,
  historyStatus,
  manualScheduleInputsMock,
} from "../../../../utils/schedulerUtils";
import moment from "moment";

export const GenericScheduler = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const [historyData, setHistoryData] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [selectedSchedulerIdToReRun, setSelectedSchedulerIdToReRun] =
    useState(null);

  // pagination State
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [pagesCount, setPagesCount] = useState(0);
  const [rowsPerPageOptions, setRowsPerPageOptions] = useState([
    10, 20, 30, 50,
  ]);

  // schedule report manual
  const [scheduleInputs, setScheduleInputs] = useState({
    ...manualScheduleInputsMock,
  });
  const [showRunSchedulerModal, setShowRunSchedulerModal] = useState(false);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    flag: "",
  });

  useEffect(() => {
    getAllSetupReportsLocal();
  }, []);

  const getAllSetupReportsLocal = async () => {
    setLoading(true);
    try {
      const res = await getAllSetupReports();
      if (res.data?.data) {
        setTableData(generateTableData(res.data.data));

        const sc1 = res.data.data[0].schedulerId;
        setSelectedRowId(sc1);
        getHistory(sc1, INITIAL_CALL);
        setLoading(false);
      } else {
        const errorMessage = res.data?.status?.description || GLOBAL_ERROR;
        throw new Error(errorMessage);
      }
    } catch (error) {
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
      setLoading(false);
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

  const headerLinks = [
    {
      label: "Sync",
      name: "refresh",
      icon: <SyncIcon className={styles.headerIcon} />,
    },
  ];

  const onClickHeaderLink = (item) => {
    if (item.name === "refresh") {
      getAllSetupReportsLocal();
    }
  };

  const runSchedule = (schedulerId) => {
    setShowRunSchedulerModal(true);
    setSelectedSchedulerIdToReRun(schedulerId);
  };

  const onRunScheduler = async () => {
    setLoadingHistory(true);
    setLoading(true);
    try {
      const body = {
        schedulerId: selectedSchedulerIdToReRun,
        scheduleFlag: "Y",
        schedulerType: scheduleInputs.schedulerType.value,
        hour: scheduleInputs.hour.value || 0,
        minute: scheduleInputs.minute.value || 0,
        seconds: scheduleInputs.seconds.value || 0,
      };
      const api = await scheduleJob(body);
      const res = api.data.data;
      if (!res) throw new Error(api.data?.status?.description || GLOBAL_ERROR);

      alertHandler(true, "Successfully Updated", SUCCESS);
      getAllSetupReportsLocal();
    } catch (error) {
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
      setLoadingHistory(false);
      setLoading(false);
    }
    onCloseRunSchModal();
  };

  const cancelSchedule = async (schedulerId) => {
    setLoadingHistory(true);
    setLoading(true);
    try {
      const body = {
        schedulerId,
        scheduleFlag: "N",
      };
      const api = await scheduleJob(body);
      const res = api.data.data;
      if (!res) throw new Error(api.data?.status?.description || GLOBAL_ERROR);
      alertHandler(true, "Successfully Updated", SUCCESS);
      getAllSetupReportsLocal();
    } catch (error) {
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
    }
    setLoadingHistory(false);
    setLoading(false);
  };

  const onChangeRunSchedulerModal = (e) => {
    const { name, value } = e.target;

    const data = { ...scheduleInputs };
    data[name].value = value;

    setScheduleInputs(data);
  };

  const onCloseRunSchModal = () => {
    const data = {};
    for (const key in scheduleInputs) {
      data[key] = { ...scheduleInputs[key], value: "" };
    }

    setScheduleInputs(data);
    setShowRunSchedulerModal(false);
  };

  const runAdhoc = async (schedulerId) => {
    alertHandler(true, "Ad hoc run", INFO);
    setLoadingHistory(true);
    setLoading(true);
    try {
      const api = await runReportAdhoc(schedulerId);
      const res = api.data.data;
      if (!res) throw new Error(api.data?.status?.description || GLOBAL_ERROR);

      alertHandler(true, "Ad hoc run success", SUCCESS);
      getHistory(schedulerId);
      setLoading(false);
    } catch (error) {
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
      setLoadingHistory(false);
      setLoading(false);
    }
  };

  const getHistory = async (schedulerId, isInitialCall) => {
    setLoadingHistory(true);
    const data = { schedulerId, pageNumber: 0, pageSize: 20 };
    try {
      const api = await getReportHistory(data, {});
      const res = api.data.data;

      if (!res) throw new Error(api.data?.status?.description || GLOBAL_ERROR);

      if (!isInitialCall) {
        alertHandler(true, "Successfully fetched record history", SUCCESS);
      }

      setRowsPerPage(res.pageSize);
      setPagesCount(res.totalPages);

      setHistoryData(generateHistoryData(res.schedulerRunHistoryList));
      setLoadingHistory(false);
    } catch (error) {
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
      setLoadingHistory(false);
    }
  };

  // pagination functions

  const handleChangePagination = async (event, value) => {
    setLoadingHistory(true);
    try {
      const data = {
        pageNumber: value - 1,
        pageSize: rowsPerPage,
        schedulerId: selectedRowId,
      };
      const api = await getReportHistory(data);
      const res = api.data.data;
      if (!res) throw new Error(api.data?.status?.description || GLOBAL_ERROR);

      setHistoryData(generateHistoryData(res.schedulerRunHistoryList));

      setPage(value);
      setLoadingHistory(false);
    } catch (error) {
      setLoadingHistory(false);
      alertHandler(
        true,
        "Something went Wrong while fetching History!",
        "error"
      );
    }
    setLoadingHistory(false);
  };

  const handleChangeRowsPerPage = async (e) => {
    const pageSize = +e.target.value;
    setLoadingHistory(true);
    try {
      const data = {
        pageNumber: 0,
        pageSize: pageSize,
        schedulerId: selectedRowId,
      };

      const api = await getReportHistory(data, {});
      const res = api.data.data;
      if (!res) throw new Error(api.data?.status?.description || GLOBAL_ERROR);

      setHistoryData(generateHistoryData(res.schedulerRunHistoryList));

      setPagesCount(res.totalPages);
      setPage(1);
      setRowsPerPage(pageSize);

      setLoadingHistory(false);
    } catch (error) {
      setLoadingHistory(false);
      alertHandler(true, "Pagination Error", "error");
    }
  };

  return (
    <Box sx={styles.con}>
      <Loader loading={loading}>
        <AlertSnackbar
          open={alert.open}
          flag={alert.flag}
          message={alert.message}
        />
        <SubHeader
          text="Schedulers"
          headerLinks={headerLinks}
          onClickHeaderLink={onClickHeaderLink}
        />
        <CustomTable
          tableData={tableData}
          selectedRowId={selectedRowId}
          setSelectedRowId={setSelectedRowId}
          runSchedule={runSchedule}
          runAdhoc={runAdhoc}
          getHistory={getHistory}
          cancelSchedule={cancelSchedule}
        />
        <HistoryCustomTable tableData={historyData} loading={loadingHistory} />
        <HistoryPagination
          handleChangePagination={handleChangePagination}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          pagesCount={pagesCount}
        />
        <RunSchedulerModal
          open={showRunSchedulerModal}
          scheduleInputs={scheduleInputs}
          handleClose={onCloseRunSchModal}
          handleOk={onRunScheduler}
          onChange={onChangeRunSchedulerModal}
        />
      </Loader>
    </Box>
  );
};

const styles = {
  con: {
    padding: "0px 100px 100px 100px",
    minHeight: "100vh",
  },
  headerIcon: {
    width: "20px",
  },
};
