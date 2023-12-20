import { useRef } from "react";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Loader } from "../../../../components/Loader";
import { AlertSnackbar } from "../../../../components/Snackbars/AlertSnackbar";
import {
  getOrganizationCodeCycle,
  getSubInventoryCycle,
  getLocatorListCycle,
  getCycleNameList,
  getAllUsersCycleCount,
  cycleCountSearchList,
  submitForApprovalCycleCount,
  submitForMobileCycleCount,
  assignUserCycleCount,
  exportToCsvCycleCount,
  inportXlCycleCount,
  updateStatusCC,
} from "../../../../services/api";
import { generateErrorMessage } from "../../../../utils/commonUtils";
import { ERROR, INFO, SUCCESS, WARNING } from "../../../../utils/variables";
import { CustomTable } from "./CustomTable";
import { Search } from "./Search";
import {
  createSearchAPIQueryParams,
  generateTableDataSearch,
  searchFieldsMock,
} from "./SearchCcUtils";
import { ALERT_TIMEOUT } from "../../../../utils/variables";
import { ButtonWrapper } from "./ButtonWrapper";
import { UserListTablePagination } from "../../../../components/CustomPagination/UserListTablePagination";
import { AssignUserModal } from "./AssignUserModal";
import { useSelector } from "react-redux";
import { checkIsSubmitedForApproval } from "../CycleCountUtils";

export const SearchCycleCount = () => {
  const userDetails = useSelector((state) => state.commonReducer);
  const uploadRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: true,
    message: "",
    flag: "",
  });
  const [selectAll, setSelectAll] = useState({
    checked: false,
    name: "selectAll",
  });

  const [tableData, setTableData] = useState([]);
  const [searchFields, setSearchFields] = useState({ ...searchFieldsMock });
  const [isSubmitedForApproval, setIsSubmitedForApproval] = useState(null);

  const [allUsers, setAllUsers] = useState([]);

  // PAGINATION States
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pagesCount, setPagesCount] = useState(0);
  const [rowsPerPageOptions, setRowsPerPageOptions] = useState([
    10, 20, 30, 50,
  ]);

  const [showAssignUserModal, setShowAssignUserModal] = useState(false);
  const [assignedUserNameInput, setAssignedUserNameInput] = useState({
    value: "",
    id: "",
    name: "assignedUsername",
    label: "Username",
    fields: [
      {
        name: "assignedUsername",
        label: "Username",
        value: "",
      },
    ],
    resultOptions: [],
  });

  useEffect(() => {
    initialCalls();
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

  const initialCalls = async () => {
    const apis = [
      { name: "organizationCode", api: getOrganizationCodeCycle },
      { name: "subInventory", api: getSubInventoryCycle },
      { name: "locator", api: getLocatorListCycle },
      { name: "cycleCountHeaderName", api: getCycleNameList },
      { name: "assignedUsername", api: getAllUsersCycleCount },
    ];

    try {
      const responses = await Promise.all(
        apis.map(async (api) => {
          const res = await api.api();
          return { name: api.name, data: res?.data?.data };
        })
      );

      const stateData = JSON.parse(JSON.stringify(searchFields));
      let allUsers = [];
      responses.forEach((response) => {
        if (response.name === "assignedUsername") {
          allUsers = response.data.map((user, idx) => {
            return {
              select: false,
              assignedUsername: user.username,
              id: user.id,
              _id: idx + 1,
            };
          });
          return;
        }
        stateData[response.name].resultOptions = response.data.map(
          (el, index) => {
            if (typeof el === "string") {
              return {
                select: false,
                [response.name]: el,
                _id: index + 1,
              };
            } else {
              let dat = el[response.name];
              if (response.name === "assignedUsername") {
                dat = el.username;
              }
              return {
                select: false,
                [response.name]: dat,
                id: el.id,
                _id: index + 1,
              };
            }
          }
        );
      });

      const newAssignedData = {
        ...assignedUserNameInput,
        resultOptions: allUsers,
      };
      setAssignedUserNameInput(newAssignedData);

      setAllUsers(allUsers);
      setSearchFields(stateData);
    } catch (error) {
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
    }
  };

  const onChangeSearchInput = (e, idx) => {
    const { value, name } = e.target;

    const data = tableData.map((el, i) => {
      if (i === idx) {
        const k = { ...el };
        k[name].value = value;
        return k;
      }
      return el;
    });
    setTableData(data);
  };

  const onChangeSearchInputMain = (e) => {
    const { name, value } = e.target;

    const data = { ...searchFields };
    data[name].value = value;
    data[name].error = false;
    setSearchFields(data);
  };

  const onChangeCheckboxModal = (e, _id, key, newResultOptions) => {
    const { checked } = e.target;
    const data = JSON.parse(JSON.stringify(searchFields));
    const currentField = { ...data[key] };

    const newRows = newResultOptions.map((el, i) => {
      let select = false;
      if (el._id === _id) {
        select = checked;
      }
      return { ...el, select };
    });
    currentField.resultOptions = newRows;
    data[key] = currentField;
    setSearchFields(data);
  };

  const onClickOk = (key) => {
    const data = JSON.parse(JSON.stringify(searchFields));
    const currentField = { ...data[key] };
    const findVal = currentField.resultOptions.find((el) => el.select);
    const value = findVal ? findVal[key] : "";
    data[key].value = value;
    data[key].error = false;
    setSearchFields(data);
  };

  const onClickSearch = async () => {
    const valid = checkIsValidForSearch();
    if (!valid) return;

    setLoading(true);
    try {
      const searchAPIQueryParams = createSearchAPIQueryParams(searchFields);
      const params = {
        pageNo: 0,
        pageSize: rowsPerPage,
        ...searchAPIQueryParams,
      };
      const api = await cycleCountSearchList(params);
      const res = api?.data?.data;
      if (!res) return "Something went wrong!";
      setLoading(false);
      setTableData(generateTableDataSearch(res.items, allUsers));
      setIsSubmitedForApproval(checkIsSubmitedForApproval(res.status));

      setSelectAll({ ...selectAll, checked: false });
      setPage(1);
      setPagesCount(res.totalPages);
    } catch (error) {
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
      setLoading(false);
    }
  };

  const checkIsValidForSearch = () => {
    const fields = JSON.parse(JSON.stringify(searchFields));

    const { organizationCode, cycleCountHeaderName } = fields;
    const orgCodeValue = organizationCode.value;
    const physicalInventoryNameValue = cycleCountHeaderName.value;

    const messages = [];

    if (!orgCodeValue) {
      fields.organizationCode.error = true;
      messages.push("Organization Code");
    }
    if (!physicalInventoryNameValue) {
      fields.cycleCountHeaderName.error = true;
      messages.push("Cycle Count Name");
    }

    const message = "Please add " + messages.join(" and ");
    if (messages.length) {
      alertHandler(true, message, WARNING);
    }

    setSearchFields(fields);

    return !messages.length;
  };

  const onClickResetMain = async () => {
    setTableData([]);
    const stateData = JSON.parse(JSON.stringify(searchFields));
    const newInputs = {};
    for (const key in stateData) {
      const fields = stateData[key].fields.map((el) => ({ ...el, value: "" }));
      const resultOptions = stateData[key].resultOptions.map((el) => ({
        ...el,
        select: false,
      }));
      newInputs[key] = { ...stateData[key], value: "", fields, resultOptions };
    }
    setSearchFields(newInputs);
    setPage(1);
    setIsSubmitedForApproval(null);
  };

  const handleChangeSelectRow = (e, idx) => {
    const { checked } = e.target;

    let isAllChecked = true;
    const data = tableData.map((el, i) => {
      let selected = el.selected;
      if (i === idx) {
        selected = checked;
      }
      const obj = { ...el, selected };

      if (!obj.selected) isAllChecked = false;
      return obj;
    });
    setTableData(data);

    setSelectAll({ ...selectAll, checked: isAllChecked });
  };

  const submitForApprovalLocal = async () => {
    const selectedRows = tableData.filter((el) => el.selected);
    const isAllRowsNotSelected = tableData.length !== selectedRows.length;
    if (!selectedRows.length || isAllRowsNotSelected) {
      alertHandler(
        true,
        "Please select all the rows to submit for approval",
        WARNING
      );
      return;
    }

    const isAllRowsAreInAcceptStatus =
      tableData.length ===
      tableData.filter((el) => el.statusLocal.value === "ACCEPT").length;

    if (!isAllRowsAreInAcceptStatus) {
      alertHandler(true, "All the rows should be in ACCEPT status", WARNING);
      return;
    }

    const singleRow = tableData.find(
      (el) => el.selected && el.statusLocal.value === "ACCEPT"
    );

    setLoading(true);
    try {
      const submitForApprovalResponse = await submitForApprovalCycleCount(
        singleRow.organizationId,
        singleRow.cycleCountHeaderId,
        userDetails.userName,
        userDetails.userId
      );
      if (!submitForApprovalResponse?.data?.data)
        throw new Error("Error in Submit for Approval");

      setLoading(false);
      alertHandler(true, "Successfully submited for Approval", SUCCESS);
      onClickResetMain();
    } catch (error) {
      setLoading(false);
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
    }
  };

  const submitForMobileCountLocal = async () => {
    const selectedData = tableData.filter((el) => el.selected);

    if (!selectedData.length) {
      alertHandler(true, "Please select any row", WARNING);
      return;
    }

    const mobileCountData = selectedData
      .filter((el) => el.assignedUserId)
      .map((el) => el.lineId);

    if (selectedData.find((el) => !el.assignedUserId)) {
      alertHandler(
        true,
        "Please assign user for all the selected rows",
        WARNING
      );
      return;
    }

    if (!mobileCountData.length) return;

    setLoading(true);

    try {
      const mobileCountAPI = await submitForMobileCycleCount(mobileCountData);
      if (!mobileCountAPI?.data?.data)
        throw new Error("Submit for Mobile count error!");
      setLoading(false);
      refreshCall();
      alertHandler(true, "Sussessfully submited for Mobile Count", SUCCESS);
      setAssignedUserNameInput({ ...assignedUserNameInput, value: "" });
    } catch (error) {
      setLoading(false);
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
    }
  };

  const assignUser = async () => {
    const isRowSelected = tableData.find((el) => el.selected);
    if (!isRowSelected) {
      alertHandler(true, "Please select any row", WARNING);
      return;
    }
    setShowAssignUserModal(true);
  };

  const assignUserConfirm = async (singleUser, row, selectedUser) => {
    const isSingleUser = singleUser === "singleUser";
    if (!isSingleUser && !assignedUserNameInput.value) return;

    const k = tableData.filter((el) => el.selected);

    let lineList = [];
    if (isSingleUser) {
      lineList = [{ lineId: row.lineId }];
    } else {
      lineList = tableData
        .filter((el) => el.selected)
        .map((el) => ({ lineId: el.lineId }));
    }

    const userSelectedForAssign = isSingleUser
      ? selectedUser.assignedUsername
      : assignedUserNameInput.value;

    setLoading(true);
    try {
      const api = await assignUserCycleCount(userSelectedForAssign, {
        lineList,
      });
      if (!api.data.data.length) throw new Error("Something went wrong!");

      refreshCall();
      alertHandler(true, "Successfully assigned user", SUCCESS);
      setShowAssignUserModal(false);
    } catch (error) {
      setLoading(false);
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
    }
  };

  const handleChangePagination = async (event, value) => {
    setLoading(true);

    try {
      const searchAPIQueryParams = createSearchAPIQueryParams(searchFields);
      const paramData = {
        pageNo: value - 1,
        pageSize: rowsPerPage,
        ...searchAPIQueryParams,
      };
      const k = await paginationAPI(paramData);
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

  const refreshCall = async () => {
    setLoading(true);

    try {
      const searchAPIQueryParams = createSearchAPIQueryParams(searchFields);
      const paramData = {
        pageNo: page - 1,
        pageSize: rowsPerPage,
        ...searchAPIQueryParams,
      };
      const k = await paginationAPI(paramData);
      setTableData(k);

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
      const searchAPIQueryParams = createSearchAPIQueryParams(searchFields);
      const paramData = {
        pageNo: 0,
        pageSize: pageSize,
        ...searchAPIQueryParams,
      };

      const k = await paginationAPI(paramData);
      setTableData(k);

      setLoading(false);
      setPage(1);
      setRowsPerPage(pageSize);
    } catch (error) {
      setLoading(false);
      alertHandler(true, "Pagination Error", "error");
    }
  };

  const paginationAPI = async (paramData) => {
    try {
      const api = await cycleCountSearchList(paramData);
      const res = api?.data?.data;
      if (!res) return "Something went wrong!";
      setPagesCount(res.totalPages);
      setIsSubmitedForApproval(checkIsSubmitedForApproval(res.status));
      
      const k = generateTableDataSearch(res.items, allUsers);
      return k.map((el) => ({ ...el, selected: selectAll.checked }));
    } catch (error) {
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
    }
  };

  const onCheckAssignUser = (e, _id, key, tableRowIndex, newResultOptions) => {
    const data = [...tableData];
    const row = { ...data[tableRowIndex] };
    row.assignedUsername.resultOptions = newResultOptions.map(
      (el, iCheckBox) => {
        const select = el._id === _id;
        return { ...el, select };
      }
    );
    data[tableRowIndex] = row;
    setTableData(data);
  };

  const onClickOkTableRow = (key, tableRowIndex) => {
    const data = [...tableData];
    const row = { ...data[tableRowIndex] };
    const selectedUser = row.assignedUsername.resultOptions.find(
      (el) => el.select
    );
    if (key === "assignedUsername") {
      assignUserConfirm("singleUser", row, selectedUser);
      return;
    }
    row.assignedUsername.value = selectedUser.assignedUsername;
    row.assignedUsername.id = selectedUser.id;
    row.assignedUserId = selectedUser.id;
    data[tableRowIndex] = row;
    setTableData(data);
  };

  const onchangeStatus = async (e, i, row) => {
    const { value } = e.target;
    setLoading(true);
    try {
      const api = await updateStatusCC(row.lineId, value);

      const res = api.data.data;
      if (!res) throw new Error();

      const searchAPIQueryParams = createSearchAPIQueryParams(searchFields);
      const paramData = {
        pageNo: page - 1,
        pageSize: rowsPerPage,
        ...searchAPIQueryParams,
      };
      const k = await paginationAPI(paramData);
      if (value === "RECOUNT") {
        alertHandler(
          true,
          "Submited for recount. Please check your Mobile",
          SUCCESS
        );
      }
      setTableData(k);
    } catch (error) {
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
    }
    setLoading(false);
  };

  const exportHandler = async () => {
    const searchAPIQueryParams = createSearchAPIQueryParams(searchFields);
    try {
      const api = await exportToCsvCycleCount(searchAPIQueryParams);
      const k = api.data;
      downloadCSV(k, "user_list");
      alertHandler(true, "Successfully exported as csv file.", "success");
    } catch (error) {
      console.log("Error export", error);
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

  const importHandler = () => {
    if (!uploadRef.current) return;
    uploadRef.current.click();
  };

  const uploadHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const api = await inportXlCycleCount(formData);
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

  const onChangeAssign = (e, b, c) => {
    const { value } = e.target;
    const data = { ...assignedUserNameInput };
    data.value = value;
    setAssignedUserNameInput(data);
  };

  const onCheckAssignUserAssign = (e, _id) => {
    const { checked } = e.target;
    const data = { ...assignedUserNameInput };
    data.resultOptions = data.resultOptions.map((el) => {
      let select = false;
      if (el._id === _id) {
        select = checked;
      }
      return { ...el, select };
    });
    setAssignedUserNameInput(data);
  };

  const onClickOkChildAssign = (a, b, c, d) => {
    const data = { ...assignedUserNameInput };
    const selected = data.resultOptions.find((el) => el.select);
    setAssignedUserNameInput({
      ...data,
      value: selected.assignedUsername,
      id: selected.id,
      assignedUserId: selected.id,
    });
  };

  const onChangeSelectAll = (e) => {
    const { checked } = e.target;
    setSelectAll({ ...selectAll, checked });

    const data = tableData.map((el, i) => {
      return { ...el, selected: checked };
    });
    setTableData(data);
  };

  return (
    <Box sx={styles.con}>
      <Loader loading={loading}>
        <AlertSnackbar
          open={alert.open}
          flag={alert.flag}
          message={alert.message}
        />
        <Search
          onChangeSearchInputMain={onChangeSearchInputMain}
          searchFields={searchFields}
          onChangeCheckboxModal={onChangeCheckboxModal}
          onClickOk={onClickOk}
        />

        <ButtonWrapper
          onClickSearch={onClickSearch}
          onClickResetMain={onClickResetMain}
          submitForApproval={submitForApprovalLocal}
          submitForMobileCount={submitForMobileCountLocal}
          assignUser={assignUser}
          showMainButtons={tableData.length}
          exportHandler={exportHandler}
          importHandler={importHandler}
          isSubmitedForApproval={isSubmitedForApproval}
        />
        {tableData.length ? (
          <CustomTable
            tableData={tableData}
            handleChangeSelectRow={handleChangeSelectRow}
            onChangeSearchInput={onChangeSearchInput}
            onCheckAssignUser={onCheckAssignUser}
            onClickOkTableRow={onClickOkTableRow}
            onchangeStatus={onchangeStatus}
            selectAll={selectAll}
            onChangeSelectAll={onChangeSelectAll}
            isSubmitedForApproval={isSubmitedForApproval}
          />
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
        <input
          hidden={true}
          type="file"
          ref={uploadRef}
          onChange={uploadHandler}
          accept="xlsx, xls"
          multiple={false}
        />
        {showAssignUserModal ? (
          <AssignUserModal
            open={showAssignUserModal}
            handleClose={() => setShowAssignUserModal(false)}
            onClickOk={assignUserConfirm}
            input={assignedUserNameInput}
            onChange={onChangeAssign}
            onCheckAssignUser={onCheckAssignUserAssign}
            onClickOkChild={onClickOkChildAssign}
            disableOkBtn={!assignedUserNameInput.value}
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
