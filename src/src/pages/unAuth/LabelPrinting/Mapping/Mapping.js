import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Alert, Box, Grid, Snackbar } from "@mui/material";
import { Loader } from "../../../../components/Loader";
import {
  generateAddMappingInputs,
  generateMappingForCreate,
  mappingSearchInputsmock,
} from "../labelPrintingUtils";
import {
  createMapping,
  deleteESSMapping,
  deleteTransMapping,
  deleteZPLMapping,
  getAllEssMappings,
  getAllTransKeyMappings,
  getAllTransactionTypes,
  getAllZplMappings,
  updateMapping,
} from "../../../../services/api";
import { generateErrorMessage } from "../../../../utils/commonUtils";
import { AddOrEditMapping } from "./AddOrEditMapping";
import { ALERT_TIMEOUT, INFO } from "../../../../utils/variables";
import { TransCustomTable } from "./TransCustomTable";
import { ZPL_ESS_Table } from "./ZPL_ESS_Table";
import { PageHeading } from "../../../../components/TextUI/PageHeading";
import SearchHeader from "../../../../components/UI/SearchHeader";

export const Mapping = () => {
  const location = useLocation();

  const isTransactionMapPage =
    location.pathname === "/label-printing/transaction-key-mapping";
  const isZplMapPage = location.pathname === "/label-printing/zpl-mapping";
  const isEssMapPage = location.pathname === "/label-printing/ess-mapping";

  const [isEditing, setIsEditing] = useState(false);
  const [editMappingId, setEditMappingId] = useState(null);

  const [transactionTypes, setTransactionTypes] = useState([]);

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    flag: "",
  });

  const [searchInputs, setSearchInputs] = useState({
    ...mappingSearchInputsmock,
  });
  const [tableData, setTableData] = useState([]);

  const [addMappingInputs, setAddMappingInputs] = useState([]);
  const [showAddMappingModal, setShowAddMappingModal] = useState(false);

  useEffect(() => {
    const getAllTransactionTypesLocal = async () => {
      setLoading(true);
      try {
        const api = await getAllTransactionTypes();
        const res = api?.data?.data;
        setSearchInputs((state) => ({ ...state, options: res }));
        setTransactionTypes(res);
      } catch (error) {
        const errorMessage = generateErrorMessage(error);
        alertHandler(
          true,
          errorMessage || "Something went Wrong in Get All Transaction Types",
          "error"
        );
      }
      setLoading(false);
    };

    getAllTransactionTypesLocal();
  }, []);

  const onChangeSearch = (e) => {
    const { value } = e.target;
    const data = { ...searchInputs, value };
    setSearchInputs(data);
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

  const onClickSearch = async (showPopup) => {
    const isShowPopup = showPopup === "showPopup";
    setLoading(true);
    try {
      // checkHere
      const api = isZplMapPage
        ? await getAllZplMappings(searchInputs.value)
        : isEssMapPage
        ? await getAllEssMappings(searchInputs.value)
        : await getAllTransKeyMappings(searchInputs.value);
      const res = api?.data?.data;

      if (isShowPopup && (!res || !res.length)) {
        throw new Error("Data is not available!");
      }
      setTableData(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const errorMessage = generateErrorMessage(error);
      alertHandler(
        true,
        errorMessage || "Something went Wrong in Get mappings",
        "error"
      );
    }
  };

  const onClickSearchLogic = (type) => {
    if (type === "search") onClickSearch("showPopup");
    else if (type === "reset") onClickResetFilter();
    else if (type === "add") onClickAddNew();
  };

  const handleCloseAddOrEditModal = () => {
    setShowAddMappingModal(false);
    setAddMappingInputs([]);
    setIsEditing(false);
    setEditMappingId(null);
  };

  const onChangeAddOrEdit = (e, i) => {
    const { name, value } = e.target;
    const dat = [...addMappingInputs];
    dat[i].value = value;

    setAddMappingInputs(dat);
  };

  const onClickResetFilter = () => {
    setTableData([]);
    setSearchInputs({ ...searchInputs, value: "" });
  };

  const onClickAddNew = () => {
    const generatedInputs = generateAddMappingInputs(
      isZplMapPage,
      isEssMapPage,
      transactionTypes
    );

    setAddMappingInputs(generatedInputs);
    setShowAddMappingModal(true);
  };

  const onEditRow = (row) => {
    const generatedRowData = generateAddMappingInputs(
      isZplMapPage,
      isEssMapPage,
      transactionTypes,
      row
    );

    setIsEditing(true);
    setEditMappingId(row.mappingId);
    setAddMappingInputs(generatedRowData);
    setShowAddMappingModal(true);
  };

  const onDeleteRow = async (row) => {
    setLoading(true);
    try {
      const api = isZplMapPage
        ? await deleteZPLMapping(row.mappingId)
        : isEssMapPage
        ? await deleteESSMapping(row.mappingId)
        : await deleteTransMapping(row.mappingId);
      const res = api.data?.data;
      if (!res) throw new Error();
      alertHandler(true, res || "Successfully deleted", "success");
      onClickSearch();
    } catch (error) {
      setLoading(false);
      const errorMessage = generateErrorMessage(error);
      alertHandler(
        true,
        errorMessage || "Something went Wrong in Delete API!",
        "error"
      );
    }
  };

  const validateInputs = () => {
    const isEmptyField = addMappingInputs.some(
      (input) => input.required && !input.value
    );
    if (isEmptyField) {
      alertHandler(true, "Please fill all the required fields", INFO);
    }

    return isEmptyField;
  };

  const onClickSave = async () => {
    const notValid = validateInputs();
    if (notValid) return;

    const data = generateMappingForCreate(addMappingInputs);
    setLoading(true);
    try {
      const api = isEditing
        ? await updateMapping(
            { ...data, mappingId: editMappingId },
            isZplMapPage, isEssMapPage
          )
        : await createMapping(data, isZplMapPage, isEssMapPage);

      const res = api.data?.data;
      if (!res) throw new Error("");
      alertHandler(true, res, "success");
      onClickSearch();
      handleCloseAddOrEditModal();
    } catch (error) {
      setLoading(false);
      const errorMessage = generateErrorMessage(error);
      alertHandler(
        true,
        errorMessage || "Something went Wrong in creating/updating Mapping!",
        "error"
      );
    }
  };

  return (
    <Grid sx={styles.maincontainer}>
      <Loader loading={loading}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={alert.open}
        >
          <Alert severity={alert.flag} sx={{ width: "100%" }}>
            {alert.message}
          </Alert>
        </Snackbar>
        <PageHeading
          text={
            isZplMapPage
              ? "ZPL Mapping"
              : isEssMapPage
              ? "ESS Mapping"
              : "Transaction Key Mapping"
          }
        />
        <SearchHeader
          inputs={[searchInputs]}
          onChange={onChangeSearch}
          onClick={onClickSearchLogic}
          disableSearch={!searchInputs.value}
          includeAddButton
        />
        {tableData.length ? (
          isZplMapPage || isEssMapPage ? (
            <ZPL_ESS_Table
              tableData={tableData}
              onDeleteRow={onDeleteRow}
              onEditRow={onEditRow}
              isZplMapPage={isZplMapPage}
            />
          ) : (
            <TransCustomTable
              tableData={tableData}
              onDeleteRow={onDeleteRow}
              onEditRow={onEditRow}
            />
          )
        ) : null}
        <AddOrEditMapping
          open={showAddMappingModal}
          handleClose={handleCloseAddOrEditModal}
          inputs={addMappingInputs}
          onChange={onChangeAddOrEdit}
          onClickSave={onClickSave}
          isEditing={isEditing}
        />
      </Loader>
    </Grid>
  );
};

const styles = {
  maincontainer: {
    padding: "0px 100px 100px 100px",
    minHeight: "100vh",
  },
};
