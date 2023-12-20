import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import {
  createPayloadCreate,
  createPayloadUpdate,
  generateApprovalSetupTableData,
  generateNewEntry,
  searchInputMock,
} from "../CycleCountUtils";
import { CustomTable } from "./CustomTable";
import { Loader } from "../../../../components/Loader";
import {
  createApproverCycleCount,
  cycleCountSearchListWithoutPagination,
  deleteApproverCycleCount,
  getApproversCycleCountOrgId,
  getOrganizationCodeCycle,
  updateApproverCycleCount,
} from "../../../../services/api";
import { ALERT_TIMEOUT, ERROR, SUCCESS } from "../../../../utils/variables";
import { AlertSnackbar } from "../../../../components/Snackbars/AlertSnackbar";
import { setInput } from "../../../../utils/commonService";
import { CustomSearch } from "./CustomSearch";
import { generateErrorMessage } from "../../../../utils/commonUtils";

export const ApprovalSetup = () => {
  const [searchInput, setSearchInput] = useState({ ...searchInputMock });
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  const [allOrganizationCodes, setAllOrganizationCodes] = useState([]);
  const [organizationId, setOrganizationId] = useState();
  const [allApprovers, setAllApprovers] = useState([]);
  const [alert, setAlert] = useState({
    open: true,
    message: "",
    flag: "",
  });

  useEffect(() => {
    initialCall();
  }, []);

  const initialCall = async () => {
    try {
      setLoading(true);
      const api = await getOrganizationCodeCycle();
      if (!api?.data?.data) throw new Error("Error in get all Users");
      const data = api.data.data.map((el, i) => {
        return {
          select: false,
          organizationCode: el,
          _id: i + 1,
        };
      });
      setAllOrganizationCodes(data);
      const k = JSON.parse(JSON.stringify(searchInput));
      k.resultOptions = data;
      setSearchInput(k);
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

  const onClickSearch = async () => {
    setLoading(true);
    try {
      const approverAPIRes = await getApproversCycleCountOrgId(
        searchInput.value
      );
      if (!approverAPIRes.data.data)
        throw new Error("Error in getting Approvers");

      const getOrgIdAPI = await cycleCountSearchListWithoutPagination({
        organizationCode: searchInput.value,
        // pageNo: 0,
        // pageSize: 1000
      });
      const res = getOrgIdAPI.data.data;
      if (!res) return "Something went wrong!";
      if (res.items.length) {
        const orgId = res.items[0].organizationId;
        setOrganizationId(orgId);
      }

      const data = approverAPIRes.data.data;
      const tabdataNew = generateApprovalSetupTableData(
        data,
        allOrganizationCodes
      );
      setAllApprovers(data);
      setTableData(tabdataNew);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
    }
  };

  const onClickResetFilter = () => {
    setSearchInput({ ...searchInput, value: "" });
    setOrganizationId("");
    setTableData([]);
  };

  const onChangeSearchFields = (e, index) => {
    const newdata = tableData.map((el, i) => {
      if (i === index) {
        const { name, value } = e.target;
        const element = { ...el };
        element[name].value = value;
        if (element.fromDB) {
          element.touched = true;
        }
        return element;
      }
      return { ...el };
    });
    setTableData(newdata);
  };

  const onClickAddNew = () => {
    setTableData([
      ...tableData,
      generateNewEntry(allApprovers, allOrganizationCodes),
    ]);
  };

  const onClickDeleteRow = async (i) => {
    const newData = [...tableData];
    const selectedRow = newData[i];

    setLoading(true);
    try {
      if (selectedRow.fromDB) {
        const api = await deleteApproverCycleCount(selectedRow.id);
        const res = api.data?.data;
        if (!res) throw new Error("Error in delete Approver");
      }
      setLoading(false);
      newData.splice(i, 1);
      setTableData(newData.map((el) => el));
      alertHandler(true, "Successfully Deleted", SUCCESS);
    } catch (error) {
      setLoading(false);
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
    }
  };

  const onChange = (e, idx) => {
    const { name, value } = e.target;
    const data = tableData.map((el, i) => {
      if (i === idx) {
        const k = { ...el };
        k[name].value = value;
        if (k.fromDB) {
          k.touched = true;
        }
        return k;
      }
      return el;
    });
    setTableData(data);
  };

  const onChangeCheckboxRow = (e, _id, key, rowIndex, newResultOptions) => {
    const newdata = tableData.map((row, i) => {
      if (i === rowIndex) {
        const newRow = { ...row };
        const obj = { ...newRow[key] };
        obj.resultOptions = newResultOptions.map((el) => {
          const select = el._id === _id;
          return { ...el, select };
        });
        newRow[key] = obj;
        return newRow;
      }
      return { ...row };
    });
    setTableData(newdata);
  };

  const onClickOkTableRow = (key, rowIndex) => {
    const data = tableData.map((row, i) => {
      if (i === rowIndex) {
        const newRow = { ...row };
        const obj = { ...newRow[key] };
        const selectedVal = obj.resultOptions.find((el) => el.select);
        obj.value = selectedVal[key];
        if (newRow.fromDB) {
          newRow.touched = true;
        }

        newRow[key] = obj;
        return newRow;
      }
      return { ...row };
    });
    setTableData(data);
  };

  const onChangeOrgInputMain = (e) => {
    const { value } = e.target;
    const k = JSON.parse(JSON.stringify(searchInput));
    k.value = value;
    setSearchInput(k);
  };

  const onClickOk = () => {
    const k = JSON.parse(JSON.stringify(searchInput));
    const selectedItemVal = k.resultOptions.find(
      (el) => el.select
    ).organizationCode;
    k.value = selectedItemVal;
    setSearchInput(k);
  };

  const onChangeCheckboxOrg = (a, _id, c, newResultOptions) => {
    const k = JSON.parse(JSON.stringify(searchInput));
    k.resultOptions = newResultOptions.map((el) => {
      const select = el._id === _id;
      return { ...el, select };
    });
    setSearchInput(k);
  };

  const onClickSave = async () => {
    const dataToUpdate = tableData
      .filter((el) => el.fromDB && el.touched)
      .map(createPayloadUpdate);

    const dataToCreate = tableData
      .filter((el) => !el.fromDB)
      .map((el) => createPayloadCreate(el, organizationId));

    try {
      await Promise.all(
        dataToCreate.map(async (paramsData) => {
          return await createApproverCycleCount(paramsData);
        })
      );

      await Promise.all(
        dataToUpdate.map(async (paramsData) => {
          return await updateApproverCycleCount(paramsData);
        })
      );
      alertHandler(true, "Successfully Updated/Created", SUCCESS);

      onClickSearch();
    } catch (error) {
      setLoading(false);
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
    }
  };

  const onClickSingleRow = async (row, type, index) => {
    try {
      if (type === "create") {
        const createApi = await createApproverCycleCount(
          createPayloadCreate(row, organizationId)
        );
        const res = createApi.data?.data;
        if (!res) throw new Error("Error in Create Approver");

        updateTableData(index);

        alertHandler(true, "Successfully Created Approver", SUCCESS);
      } else {
        const updateApi = await updateApproverCycleCount(
          createPayloadUpdate(row)
        );
        const res = updateApi.data?.data;
        if (!res) throw new Error("Error in Update Approver");

        updateTableData(index);

        alertHandler(true, "Successfully Updated Approver", SUCCESS);
      }
    } catch (error) {
      setLoading(false);
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
    }
  };

  const updateTableData = (index) => {
    const newTableData = tableData.map((tablRow, i) => {
      if (i === index) {
        return { ...tablRow, fromDB: true, touched: false };
      }
      return tablRow;
    });
    setTableData(newTableData);
  };

  const disableSave = tableData.find((el) => {
    return !el.fromDB || el.touched;
  });

  return (
    <Box sx={styles.maincontainer}>
      <Loader loading={loading}>
        <AlertSnackbar
          open={alert.open}
          flag={alert.flag}
          message={alert.message}
        />
        <CustomSearch
          searchInput={searchInput}
          onClickSearch={onClickSearch}
          onClickResetFilter={onClickResetFilter}
          disabledSearchBtn={!searchInput.value}
          onClickAddNew={onClickAddNew}
          onChangeOrgInputMain={onChangeOrgInputMain}
          onChangeCheckboxOrg={onChangeCheckboxOrg}
          onClickOk={onClickOk}
          onClickSave={onClickSave}
          disableSave={!disableSave}
        />
        <CustomTable
          tableData={tableData}
          onChangeSearchFields={onChangeSearchFields}
          onClickDeleteRow={onClickDeleteRow}
          onChange={onChange}
          onChangeCheckboxRow={onChangeCheckboxRow}
          onClickOk={onClickOkTableRow}
          onClickSingleRow={onClickSingleRow}
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
