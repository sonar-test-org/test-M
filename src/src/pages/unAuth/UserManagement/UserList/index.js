import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Alert, Box, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import * as XLSX from "xlsx";

import { CustomSearch } from "../../../../components/CustomSearch";
import { CustomTable } from "./CustomTable";
import { searchInputsMock } from "../../../../utils/userManagementUtils";
import {
  exportToCsvUserManagement,
  getAllUsersUserMngt,
  inportXLUserManagement,
} from "../../../../services/api";

import { createQueryParam } from "../../../../utils/commonService";
import { Loader } from "../../../../components/Loader";
import { ALERT_TIMEOUT, INFO } from "../../../../utils/variables";
import { UserListTablePagination } from "../../../../components/CustomPagination/UserListTablePagination";
import { SubHeader } from "../../../../components/Headers/SubHeader";
import { generateErrorMessage } from "../../../../utils/commonUtils";
import { WARNING } from "../../../../utils/variables";
import { useSelector } from "react-redux";

export const UserList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const addedOrUpdatedMessage = useSelector(
    (st) => st.commonReducer?.userAddedInUserManagementMessage
  );

  const [searchInputs, setSearchInputs] = useState([...searchInputsMock]);
  const [tableData, setTableData] = useState([]);
  const [mainData, setMainData] = useState([]);
  // const [selectedRowId, setSelectedRowId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pagesCount, setPagesCount] = useState(0);
  const [rowsPerPageOptions, setRowsPerPageOptions] = useState([
    10, 20, 30, 50,
  ]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    flag: "",
  });
  const uploadRef = useRef(null);

  useEffect(() => {
    getAllUsersLocal();
  }, []);

  useEffect(() => {
    if (addedOrUpdatedMessage) {
      alertHandler(true, addedOrUpdatedMessage, "success");
    }
  }, [addedOrUpdatedMessage]);

  const handleChangePagination = async (event, value) => {
    setLoading(true);

    try {
      const queryParams = createQueryParam({
        pageNo: value - 1,
        pageSize: rowsPerPage,
        sortBy: "",
        asc: false,
      });
      const k = await paginationAPI(queryParams);
      setTableData(k);
      setMainData(k);
      setPage(value);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, "error");
    }
    setLoading(false);
  };

  const paginationAPI = (queryParams) => {
    return new Promise(async (resolve, reject) => {
      const params = {
        username: "",
        fusionUsername: "",
        printer: "",
      };

      try {
        const dataApi = await getAllUsersUserMngt(params, queryParams);
        if (dataApi?.data?.data) {
          const ress = dataApi.data.data.items;
          const k = ress.map((el) => {
            return {
              id: el.id,
              mobileUsername: el.mobileUsername,
              email: el.email,
              fusionUsername: el.fusionUsername,
              printer: el.printer,
              fromDate: el.fromDate,
              toDate: el.toDate,
              transactionPrivilegePerUser: [
                ...el.transactionPrivilegePerUser,
              ].join(","),
              warehouseTransactionPerUser: [
                ...el.warehouseTransactionPerUser,
              ].join(","),
              isFirstLogin: el.isFirstLogin,
            };
          });
          resolve(k);
        } else {
          throw new Error("Error");
        }
      } catch (error) {
        reject();
      }
    });
  };

  const handleChangeRowsPerPage = async (e) => {
    const pageSize = +e.target.value;
    setLoading(true);
    try {
      const queryParams = createQueryParam({
        pageNo: 0,
        pageSize: pageSize,
        sortBy: "",
        asc: false,
      });

      const k = await paginationAPI(queryParams);
      setTableData(k);
      setMainData(k);

      setLoading(false);
      setPage(1);
      setRowsPerPage(pageSize);
    } catch (error) {
      setLoading(false);
      alertHandler(true, "Pagination Error", "error");
    }
  };

  const getAllUsersLocal = async (type) => {
    setLoading(true);
    const queryParams = createQueryParam({
      pageNo: 0,
      pageSize: 10,
      sortBy: "",
      asc: false,
    });

    const params = {
      username: "",
      fusionUsername: "",
      printer: "",
    };

    try {
      const dataApi = await getAllUsersUserMngt(params, queryParams);
      if (dataApi?.data?.data) {
        const ress = dataApi.data.data.items;
        const newPagesCount = dataApi.data.data.totalPages;

        const k = ress.map((el) => {
          return {
            id: el.id,
            mobileUsername: el.mobileUsername,
            email: el.email,
            fusionUsername: el.fusionUsername,
            printer: el.printer,
            fromDate: el.fromDate,
            toDate: el.toDate,
            transactionPrivilegePerUser: [
              ...el.transactionPrivilegePerUser,
            ].join(","),
            warehouseTransactionPerUser: [
              ...el.warehouseTransactionPerUser,
            ].join(","),
            isFirstLogin: el.isFirstLogin,
          };
        });
        setTableData(k);
        setMainData(k);
        setPagesCount(newPagesCount);
        setLoading(false);
        if( k?.length === 0 ){
          console.log('no data');
          alertHandler(true, "No Data Found!", WARNING);
        }

      } else {
        throw new Error("Error");
      }
    } catch (error) {
      setLoading(false);
      if (type !== "fromReset") {
        const errorMessage = generateErrorMessage(error);
        alertHandler(
          true,
          errorMessage || "Something went Wrong in Get Users API!",
          "error"
        );
      }
    }
  };

  const headerLinks = [
    {
      label: "Add",
      name: "add",
      icon: <PersonAddIcon className={classes.headerIcon} />,
      route: "/user-management/add-update-user",
    },
    {
      label: "Export",
      name: "export",
      icon: <FileUploadIcon className={classes.headerIcon} />,
    },
    {
      label: "Import",
      name: "import",
      icon: <FileDownloadIcon className={classes.headerIcon} />,
    },
  ];

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

  const onClickHeaderLink = (el) => {
    if (el.name === "export") {
      exportToCSV();
    } else if (el.name === "import") {
      importCsv();
    } else {
      navigate(el.route, { state: { selectedUser: null } });
    }
  };

  const importCsv = () => {
    if (!uploadRef.current) return;
    uploadRef.current.click();
  };

  const exportToCSV = async () => {
    // const wb = XLSX.utils.book_new();
    // const ws = XLSX.utils.json_to_sheet(tableData);

    // XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    // XLSX.writeFile(wb, "ExportMobileUsers.xlsx");
    try {
      const api = await exportToCsvUserManagement();
      const k = api.data;
      downloadCSV(k, "user_list");
      alertHandler(true, "Successfully exported as csv file.", "success");
    } catch (error) {
      const errorMessage = generateErrorMessage(error);
      alertHandler(
        true,
        errorMessage || "Something went Wrong while exporting!",
        "error"
      );
    }
  };

  function downloadCSV(csvData, filename) {
    const blob = new Blob([csvData], { type: "text/csv" });

    // Create a temporary download link
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;

    // Trigger the download
    link.click();

    // Clean up the temporary link
    link.remove();
  }

  const onChangeSearchInput = (event) => {
    const { name, value } = event.target;
    const searchInputsChanged = searchInputs.map((el) => {
      if (name === el.name) {
        return { ...el, value };
      }
      return { ...el };
    });
    setSearchInputs(searchInputsChanged);
  };

  const onClickSearch = async () => {
    setLoading(true);
    // API call
    const params = {};
    searchInputs.forEach((el) => {
      params[el.name] = el.value;
    });

    const queryParams = createQueryParam({
      pageNo: 0,
      pageSize: 20,
      sortBy: "",
    });

    try {
      const res = await getAllUsersUserMngt(params, queryParams);
      if (res.data.data) {
        setTableData(res.data.data.items);
        const newPagesCount = res.data.data.totalPages;
        setPagesCount(newPagesCount);
        if( res.data.data.items?.length === 0 ){
          alertHandler(true, "No Data Found!", WARNING);
        }
      }
      setPage(1);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onClickResetFilter = () => {
    setSearchInputs([...searchInputsMock]);
    // setTableData([...mainData]);
    getAllUsersLocal("fromReset");
    setPage(1);
  };

  const onClickHistory = (id) => {
    const user = tableData.find((el) => el.id === id);
    navigate("/user-management/history", {
      state: { id, username: user.mobileUsername },
    });
  };

  const onClickDetails = (id) => {
    navigate("/user-management/add-update-user", {
      state: {
        selectedUserId: id,
      },
    });
  };

  const uploadHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = await file.arrayBuffer();
    const wb = XLSX.read(data);

    const sheetName = wb.SheetNames[0];
    const workSheet = wb.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(workSheet);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const api = await inportXLUserManagement(formData);
      const res = api?.data;
      if (!res)
        throw new Error("Something went Wrong while importing the file!");
      alertHandler(true, "Successfully imported file.", "success");
    } catch (error) {
      const errorMessage = generateErrorMessage(error);
      alertHandler(
        true,
        errorMessage || "Something went Wrong while importing the file!",
        "error"
      );
    }
  };

  const onClickMaster = () => {
    navigate("/user-management/master-setup");
  };

  return (
    <Box container className={classes.maincontainer}>
      <Loader loading={loading}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={alert.open}
        >
          <Alert severity={alert.flag} sx={{ width: "100%" }}>
            {alert.message}
          </Alert>
        </Snackbar>

        <CustomSearch
          searchInputs={searchInputs}
          onChange={onChangeSearchInput}
          onClickSearch={onClickSearch}
          onClickResetFilter={onClickResetFilter}
          disabledSearchBtn={!searchInputs.some((el) => el.value)}
          master
          onClickMaster={onClickMaster}
        />
        <SubHeader
          text="All Users"
          headerLinks={headerLinks}
          onClickHeaderLink={onClickHeaderLink}
        />
        <CustomTable
          onClickDetails={onClickDetails}
          tableData={tableData}
          onClickHistory={onClickHistory}
          // selectedRowId={selectedRowId}
          // setSelectedRowId={setSelectedRowId}
        />
        <UserListTablePagination
          handleChangePagination={handleChangePagination}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          pagesCount={pagesCount}
        />
        <input
          hidden={true}
          type="file"
          ref={uploadRef}
          onChange={uploadHandler}
          accept="xlsx, xls"
          multiple={false}
        />
      </Loader>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  maincontainer: {
    padding: "0px 100px 100px 100px",
    minHeight: "100vh",
  },
  headerIcon: {
    width: "20px",
  },
}));
