import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Loader } from "../../../../components/Loader";
import { ALERT_TIMEOUT, ERROR } from "../../../../utils/variables";
import { Heading } from "./Heading";
import {
  generatePostData,
  generateTableDataSearch,
  searchInputsMock,
} from "../parCountUtils";
import { Search } from "./Search";
import { ButtonWrapper } from "./ButtonWrapper";
import {
  getFusionResponse,
  getParCountOrganizationList,
  getParCountSubInventoryList,
  getParCountSyncByList,
  searchParcount,
} from "../../../../services/api";
import { generateErrorMessage } from "../../../../utils/commonUtils";
import { createQueryParam } from "../../../../utils/commonService";
import { UserListTablePagination } from "../../../../components/CustomPagination/UserListTablePagination";
import { CustomTable } from "./CustomTable";
import { InfoModal } from "./InfoModal";
import { AlertSnackbar } from "../../../../components/Snackbars/AlertSnackbar";

export const ParCountSync = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    flag: "",
  });

  // PAGINATION States
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pagesCount, setPagesCount] = useState(0);
  const [rowsPerPageOptions, setRowsPerPageOptions] = useState([
    10, 20, 30, 50,
  ]);

  // modal
  const [infoData, setInfoData] = useState([]);
  const [openInfoModal, setOpenInfoModal] = useState(false);

  const [searchInputs, setSearchInputs] = useState({ ...searchInputsMock });
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    initialCall();
  }, []);

  const initialCall = async () => {
    setLoading(true);
    const data = JSON.parse(JSON.stringify(searchInputs));

    try {
      const orgList = await getParCountOrganizationList();
      const orgListRes = orgList?.data?.data;
      if (!orgListRes) throw new Error("Error in Get Organization List");
      data.organizationCode.options = orgListRes.filter((el) => el);

      const subInvList = await getParCountSubInventoryList();
      const subInvRes = subInvList?.data?.data;
      if (!subInvRes) throw new Error("Error in Get Sub Inventory List");
      data.subInventory.options = subInvRes.filter((el) => el);

      const syncByApi = await getParCountSyncByList();
      const syncByRes = syncByApi?.data?.data;
      if (!syncByRes) throw new Error("Error in Get Sync By List");
      data.syncBy.options = syncByRes.filter((el) => el);

      setSearchInputs(data);
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

  const validation = () => {
    const messages = [];
    if (!searchInputs.organizationCode.value) {
      messages.push("Please fill Organization");
    }
    if (!searchInputs.subInventory.value) {
      messages.push("Please fill Sub Inventory");
    }

    if (messages.length) {
      const msg = messages.join(", ");
      alertHandler(true, msg, ERROR);

      return false;
    } else return true;
  };

  const onClickSearch = async () => {
    const valid = validation();
    if (!valid) return;
    setLoading(true);
    try {
      const data = generatePostData(searchInputs);
      const params = createQueryParam({
        pageNo: 0,
        pageSize: rowsPerPage,
        sortBy: "",
        asc: false,
      });
      const api = await searchParcount(params, data);
      const res = api?.data?.data;
      if (!res) throw new Error("Error in Search API");

      setTableData(generateTableDataSearch(res.items));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
    }
  };

  const onClickResetMain = () => {
    const data = JSON.parse(JSON.stringify(searchInputs));
    for (const key in searchInputs) {
      if (key === "fromSyncDate" || key === "toSyncDate") {
        data[key].value = null;
      } else {
        data[key].value = "";
      }
    }
    setSearchInputs(data);
    setTableData([]);
  };

  const handleChangeDate = (value, name) => {
    const data = JSON.parse(JSON.stringify(searchInputs));
    data[name].value = value;
    setSearchInputs(data);
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    const data = JSON.parse(JSON.stringify(searchInputs));
    data[name].value = value;
    setSearchInputs(data);
  };

  // pagination functions
  const handleChangePagination = async (event, value) => {
    setLoading(true);

    try {
      const data = generatePostData(searchInputs);
      const params = createQueryParam({
        pageNo: value - 1,
        pageSize: rowsPerPage,
      });
      const k = await paginationAPI(params, data);
      setTableData(k);
      setPage(value);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
    }
    setLoading(false);
  };

  const handleChangeRowsPerPage = async (e) => {
    const pageSize = +e.target.value;
    setLoading(true);
    try {
      const data = generatePostData(searchInputs);
      const params = createQueryParam({
        pageNo: 0,
        pageSize: pageSize,
      });

      const k = await paginationAPI(params, data);
      setTableData(k);

      setLoading(false);
      setPage(1);
      setRowsPerPage(pageSize);
    } catch (error) {
      setLoading(false);
      alertHandler(true, "Pagination Error", "error");
    }
  };

  const paginationAPI = async (params, data) => {
    try {
      const api = await searchParcount(params, data);
      const res = api?.data?.data;
      if (!res) return "Pagination API error";
      setPagesCount(res.totalPages);
      return generateTableDataSearch(res.items);
    } catch (error) {
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
    }
  };

  const onClickFusionRes = async (fusionResponse) => {
    setLoading(true);
    try {
      const api = await getFusionResponse(fusionResponse);
      const res = api.data?.data;
      if (!res) return "Get Fusion Response API error";
      setInfoData(res);
      setOpenInfoModal(true);
      setLoading(false);
    } catch (error) {
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
      setLoading(false);
    }
  };

  const handleCloseInfoModal = () => {
    setInfoData([]);
    setOpenInfoModal(false);
  };

  return (
    <Box container sx={styles.maincontainer}>
      <Loader loading={loading}>
        <AlertSnackbar
          open={alert.open}
          flag={alert.flag}
          message={alert.message}
        />
        <Heading />
        <Search
          searchInputs={searchInputs}
          onChange={onChange}
          handleChangeDate={handleChangeDate}
        />
        <ButtonWrapper
          onClickSearch={onClickSearch}
          onClickResetMain={onClickResetMain}
        />

        {tableData.length ? (
          <CustomTable onClick={onClickFusionRes} tableData={tableData} />
        ) : null}

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
        <InfoModal
          open={openInfoModal}
          handleClose={handleCloseInfoModal}
          data={infoData}
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
};
