import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Loader } from "../../../../components/Loader";
import { AlertSnackbar } from "../../../../components/Snackbars/AlertSnackbar";
import {
  assignUserPhysicalCount,
  getAllUsersPhysicalCount,
  getItemDescription,
  getItemNumber,
  getLocator,
  getOrganizationCode,
  getPhysicalInventoryName,
  getSubInventory,
  physicalCountSearchList,
  submitForApproval,
  submitForMobileCount,
  exportToCsvPhysicalCount,
  inportXLPhysicalCount,
  updateStatusPC,
} from "../../../../services/api";
import { generateErrorMessage } from "../../../../utils/commonUtils";
import { ERROR, SUCCESS, WARNING } from "../../../../utils/variables";
import { CustomTable } from "./CustomTable";
import { Search } from "./Search";
import {
  checkIsSubmitedForApproval,
  createSearchAPIQueryParams,
  generateTableDataSearch,
  searchFieldsMock,
} from "./SearchPcUtils";
import { ALERT_TIMEOUT } from "../../../../utils/variables";
import { ButtonWrapper } from "./ButtonWrapper";
import { UserListTablePagination } from "../../../../components/CustomPagination/UserListTablePagination";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { AssignUserModal } from "./AssignUserModal";

export const SearchPhysicalCount = () => {
  const uploadRef = useRef(null);
  const userDetails = useSelector((state) => state.commonReducer);
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

  // PAGINATION
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
    name: "pcAssignedUserName",
    label: "Username",
    fields: [
      {
        name: "username",
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
      { name: "subInventory", api: getSubInventory },
      { name: "itemDescription", api: getItemDescription },
      { name: "itemNumber", api: getItemNumber },
      { name: "organizationCode", api: getOrganizationCode },
      { name: "locator", api: getLocator },
      { name: "physicalInventoryName", api: getPhysicalInventoryName },
      { name: "pcAssignedUserName", api: getAllUsersPhysicalCount },
    ];

    try {
      const responses = await Promise.all(
        apis.map(async (api) => {
          const res = await api.api();
          if (api.name === "locator" || api.name === "subInventory")
            return {
              name: api.name,
              data: res?.data?.data?.filter((el) => el),
            };
          return { name: api.name, data: res?.data?.data };
        })
      );

      const stateData = JSON.parse(JSON.stringify(searchFields));
      responses.forEach((response) => {
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
              if (response.name === "pcAssignedUserName") {
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
      const allUsers = stateData.pcAssignedUserName.resultOptions;
      const newAssignedData = {
        ...assignedUserNameInput,
        resultOptions: stateData.pcAssignedUserName.resultOptions,
      };
      setAssignedUserNameInput(newAssignedData);
      setAllUsers(allUsers);
      setSearchFields(stateData);
    } catch (error) {
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
    }
  };

  const onChangeSearchInput = (e, idx, optionsArr) => {
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

  // main functionality
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
      const api = await physicalCountSearchList(params);
      const res = api.data.data;
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

    const { organizationCode, physicalInventoryName } = fields;
    const orgCodeValue = organizationCode.value;
    const physicalInventoryNameValue = physicalInventoryName.value;

    const messages = [];

    if (!orgCodeValue) {
      fields.organizationCode.error = true;
      messages.push("Organization Code");
    }
    if (!physicalInventoryNameValue) {
      fields.physicalInventoryName.error = true;
      messages.push("Physical Inventory Name");
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
      const submitForApprovalResponse = await submitForApproval(
        singleRow.organizationId,
        singleRow.physicalInventoryId,
        userDetails.userName,
        userDetails.userId
      );
      if (!submitForApprovalResponse.data.data)
        throw new Error("Error in Submit for Approval");

      setLoading(false);
      alertHandler(true, "Sussessfully submited for Approval", SUCCESS);
      onClickResetMain();
    } catch (error) {
      setLoading(false);
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
    }
  };

  const submitForMobileCountLocal = async () => {
    const selectedRow = tableData.find((el) => el.selected);
    if (!selectedRow) {
      alertHandler(true, "Please select any row", WARNING);
      return;
    }
    const selectedData = tableData.filter((el) => el.selected);

    const mobileCountData = selectedData
      .filter((el) => el.pcAssignedUserId)
      .map((el) => el.tagId);

    if (selectedData.find((el) => !el.pcAssignedUserId)) {
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
      if (mobileCountData.length) {
        const mobileCountAPI = await submitForMobileCount(mobileCountData);
        if (!mobileCountAPI.data.data)
          throw new Error("Submit for Mobile count error!");
      }

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

    let tagList = [];
    if (isSingleUser) {
      tagList = [{ tagId: row.tagId }];
    } else {
      tagList = tableData
        .filter((el) => el.selected)
        .map((el) => ({ tagId: el.tagId }));
    }

    const userSelectedForAssign = isSingleUser
      ? selectedUser.username
      : assignedUserNameInput.value;

    setLoading(true);
    try {
      const api = await assignUserPhysicalCount(userSelectedForAssign, {
        tagList,
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
      alertHandler(true, "Something went Wrong!", ERROR);
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
      alertHandler(true, "Something went Wrong!", ERROR);
    }
    setLoading(false);
  };

  const handleChangeRowsPerPage = async (e) => {
    const pageSize = +e.target.value;
    setLoading(true);
    try {
      const searchAPIQueryParams = createSearchAPIQueryParams(searchFields);
      const paramData = {
        // organizationId: "300000047274444",
        // physicalInventoryId: "300000273319079",
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
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
    }
  };

  const paginationAPI = async (paramData) => {
    try {
      const api = await physicalCountSearchList(paramData);
      const res = api.data.data;
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
    row.pcAssignedUserName.resultOptions = newResultOptions.map(
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

    const selectedUser = row.pcAssignedUserName.resultOptions.find(
      (el) => el.select
    );
    if (key === "pcAssignedUserName") {
      assignUserConfirm("singleUser", row, selectedUser);
      return;
    }
    row.pcAssignedUserName.value = selectedUser.username;
    row.pcAssignedUserName.id = selectedUser.id;
    row.pcAssignedUserId = selectedUser.id;
    data[tableRowIndex] = row;
    setTableData(data);
  };

  const onchangeStatus = async (e, i, row) => {
    const { value } = e.target;
    setLoading(true);
    try {
      const api = await updateStatusPC(row.tagId, value);

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
      const api = await exportToCsvPhysicalCount(searchAPIQueryParams);
      const k = api.data;
      downloadCSV(k, "user_list");
      alertHandler(true, "Successfully exported as csv file.", "success");
    } catch (error) {
      console.log("error export", error);
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
      const api = await inportXLPhysicalCount(formData);
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
      value: selected.pcAssignedUserName,
      id: selected.id,
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
          exportHandler={exportHandler}
          importHandler={importHandler}
          showMainButtons={tableData.length}
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
