import { Alert, Box, Snackbar } from "@mui/material";
import { useState } from "react";
import { ALERT_TIMEOUT, ERROR, INFO } from "../../../../utils/variables";
import { InputGroup } from "../../../../components/InputGroup/Index";
import { Buttons } from "./Buttons";
import { useEffect } from "react";
import {
  generateLot,
  getAllItemCodes,
  getItemDetails,
  getReasons,
  uploadMisc,
} from "../../../../services/api";
import {
  generateRowsItemCode,
  itemCodesBody,
  generateReasonRows,
  itemDetailInputsMock,
  itemDetailsBody,
  descriptionBody,
  addLotInputsMock,
  generateLotBody,
  generateFinalUploadBody,
  populateVariable,
  generateAlerts,
} from "../Main/miscUtils";
import { Loader } from "../../../../components/Loader";
import { PageHeading } from "../../../../components/TextUI/PageHeading";
import { generateErrorMessage } from "../../../../utils/commonUtils";
import { useLocation, useNavigate } from "react-router-dom";
import { TableItemDetails } from "./TableItemDetails";
import { AddLot } from "./AddLot/AddLot";
import { MultiAlerts } from "../../../../components/UI/Alerts";

export const ItemDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const miscInputs = location.state?.miscInputs;
  console.log("my statemiscInputs", location);

  const [submited, setSubmited] = useState(false);
  const [alerts, setAlerts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    flag: "",
  });

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

  useEffect(() => {
    if (!miscInputs) {
      navigate("/miscellaneous-transaction/main");
    }
  }, []);

  const [itemDetailInputs, setItemDetailInputs] = useState([
    ...itemDetailInputsMock,
  ]);

  const [itemDetailsData, setItemDetailsData] = useState(null);
  const [tableData, setTableData] = useState([]);

  // Add Lot
  const [showAddLotPage, setShowAddLotPage] = useState(false);
  const [lotInputs, setLotInputs] = useState([...addLotInputsMock]);
  const [lotRows, setLotRows] = useState([]);
  const [isEditingLotPage, setIsEditingLotPage] = useState(false);

  useEffect(() => {
    initialCalls();
  }, []);

  const initialCalls = async () => {
    setLoading(true);
    const reasonType = "";
    try {
      const apis = await Promise.all([getReasons(reasonType)]);

      const resObj = {
        reason: generateReasonRows(apis[0]),
      };
      const dat = itemDetailInputs.map((el) => {
        if (el.type === "lookup") {
          return { ...el, rows: resObj[el.name] || [] };
        }
        return el;
      });

      setItemDetailInputs(dat);
    } catch (error) {
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
    }
    setLoading(false);
  };

  const onChange = (e, type, selectedRow) => {
    const { name, value: val } = e.target;

    const inputsNew = itemDetailInputs.map((el) => {
      const element = {
        ...el,
        error: el.name === name ? false : el.error,
        value: el.name === name ? val : el.value,
      };

      if (
        selectedRow &&
        el.name !== name &&
        populateVariable[name] &&
        populateVariable[element.name]
      ) {
        element.error = false;
        element.value = selectedRow[populateVariable[name][element.name]];
      }
      if (el.name === name && selectedRow) {
        element.selectedRow = selectedRow;
        element.error = false;
      }
      return element;
    });
    setItemDetailInputs(inputsNew);

    if (name === "itemCode" && type === "lookupOnClickOk") {
      getItemDetailsPublic(inputsNew);
    }
  };

  const getItemDetailsPublic = async (inputsNew) => {
    setLoading(true);
    try {
      const body = itemDetailsBody(miscInputs, inputsNew);
      const api = await getItemDetails(body);
      const res = api.data.data;
      setItemDetailsData(res[0]);

      const newItemDetailsInputs = inputsNew.map((el) => {
        if (el.name === "onHandQuantity") {
          return { ...el, value: res[0]?.onHandQuantity };
        }
        return el;
      });
      setItemDetailInputs(newItemDetailsInputs);
    } catch (error) {
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
    }
    setLoading(false);
  };

  const onClickSubmit = async () => {
    setLoading(true);

    try {
      const body = generateFinalUploadBody(miscInputs, tableData);
      const api = await uploadMisc(body);
      const responses = api.data.responses;

      const updatedAlerts = generateAlerts(responses);
      setAlerts(updatedAlerts);
      setTimeout(() => {
        setAlerts([]);
      }, ALERT_TIMEOUT);

      generateStatusesInTable(updatedAlerts);
    } catch (error) {
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
    }
    disableItemDetailsInputs();
    setSubmited(true);
    setLoading(false);
  };

  const generateStatusesInTable = (updatedAlerts) => {
    const k = [...tableData].map((el, i) => {
      const status = updatedAlerts[i].flag;
      const message = updatedAlerts[i].message;
      return { ...el, response: { status, message } };
    });
    setTableData(k);
  };

  const validateItemDetails = () => {
    const inValidFields = itemDetailInputs.filter(
      (fl) => fl.required && !fl.value
    );
    if (!!inValidFields.length) {
      const newInputs = itemDetailInputs.map((el) => {
        const error = el.required && !el.value;
        return { ...el, error };
      });
      alertHandler(true, "Please fill all required fields", INFO);
      setItemDetailInputs(newInputs);
    }

    return !!inValidFields.length;
  };

  const onClickAdd = () => {
    const isInValid = validateItemDetails();
    if (isInValid) return;

    if (canAddLot() && !lotRows.length) {
      alertHandler(true, "Please add Lot Details", INFO);
      return;
    }

    const rowArr = [...itemDetailInputs];
    const l = {
      inputs: rowArr,
      lotRows: lotRows.length ? [...lotRows] : null,
    };
    if (itemDetailsData) {
      l.itemDetailsData = { ...itemDetailsData };
    }
    setTableData([...tableData, l]);
    cleanUpItemDetailsInputs();
    setItemDetailsData(null);
    setLotRows([]);
  };

  const onClickCancel = () => {
    cleanUpItemDetailsInputs();
    setTableData([]);
    navigate("/miscellaneous-transaction/main");
  };

  const asyncMethod = async (e) => {
    const { name, value } = e.target;
    const itemBodyPriv =
      name === "itemCode"
        ? itemCodesBody(value, miscInputs)
        : descriptionBody(value, miscInputs);

    try {
      const api = await getAllItemCodes(itemBodyPriv);
      const rows = generateRowsItemCode(api);

      const dat = itemDetailInputs.map((el) => {
        if (el.name === name) {
          return { ...el, rows };
        }
        return el;
      });

      setItemDetailInputs(dat);
    } catch (error) {
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
    }
  };

  const onDeleteRow = (i) => {
    const data = [...tableData];
    data.splice(i, 1);
    setTableData(data);
  };

  const editLotFormIDPage = (row) => {
    // const { inputs, lotRows, itemDetailsData } = row;
    cleanUpItemDetailsInputs();
    setItemDetailsData(row.itemDetailsData);
    setLotRows(row.lotRows);
    setShowAddLotPage(true);
    setIsEditingLotPage(true);
  };

  // Add lot
  const goToAddLotPage = () => {
    const isInValid = validateItemDetails();
    if (isInValid) return;

    setShowAddLotPage(true);
  };

  const onChangeAddLotInputs = (e) => {
    const { value, name } = e.target;
    const dat = lotInputs.map((el) => {
      const val = name === el.name ? value : el.value;
      const error = name === el.name ? false : el.error;
      return { ...el, value: val, error };
    });
    setLotInputs(dat);
  };

  const generateLotPrivate = async () => {
    setLoading(true);
    try {
      const body = generateLotBody(miscInputs, itemDetailInputs);
      const api = await generateLot(body);
      const res = api.data.data;
      console.log("my res generateLot", res);

      const dat = [...lotInputs];
      dat[0].value = res.LotNumber;
      setLotInputs(dat);
    } catch (error) {
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
    }
    setLoading(false);
  };

  const addLotToTable = () => {
    const isInValid = validateLots();
    if (isInValid) return;

    const newLotRows = {
      inputs: lotInputs,
    };
    setLotRows([...lotRows, newLotRows]);
    cleanUpLotRows();
  };

  const validateQty = () => {
    const countShouldBe = +itemDetailInputs.find(
      (fn) => fn.name === "enterQuantity"
    ).value;
    const currentCount = lotRows.reduce((acu, cur) => {
      return acu + +cur.inputs[1].value;
    }, 0);

    if (countShouldBe === currentCount) {
      return false;
    } else {
      alertHandler(
        true,
        "Combined Lots Quantity should be equivalent to Total quantity!",
        INFO
      );
      return true;
    }
  };

  const deleteLotRow = (i) => {
    const k = [...lotRows];
    k.splice(i, 1);
    setLotRows(k);
  };

  const cancelAddLot = () => {
    // cleanUpLotRows();
    setShowAddLotPage(false);
    setIsEditingLotPage(false);
  };

  const validateLots = () => {
    const inValidFields = lotInputs.filter((fl) => fl.required && !fl.value);
    if (!!inValidFields.length) {
      const newInputs = lotInputs.map((el) => {
        const error = el.required && !el.value;
        return { ...el, error };
      });
      alertHandler(true, "Please fill all required fields", INFO);
      setLotInputs(newInputs);
    }

    return !!inValidFields.length;
  };

  const onClickDoneAddLot = () => {
    const isNotValid = validateQty();
    if (isNotValid) return;
    setShowAddLotPage(false);
    cleanUpLotRows();
    setIsEditingLotPage(false);
  };

  // clean up
  const cleanUpItemDetailsInputs = () => {
    setItemDetailInputs((prv) =>
      prv.map((el) => ({ ...el, value: "", error: false }))
    );
  };

  const cleanUpLotRows = () => {
    setLotInputs((prv) =>
      prv.map((el) => ({ ...el, value: "", error: false }))
    );
  };

  // checkHere
  const disableItemDetailsInputs = () => {
    setItemDetailInputs((prv) =>
      prv.map((el) => ({
        ...el,
        value: "",
        rows: [],
        disabled: true,
      }))
    );
  };

  console.log("my data", {
    tableData,
    lotRows,
    itemDetailsData,
    miscInputs,
    itemDetailInputs,
    tableData,
  });

  const canAddLot = () => {
    return (
      itemDetailsData &&
      (itemDetailsData.itemControlType === "L" ||
        itemDetailsData.itemControlType === "LS")
    );
  };

  const pageHeading = showAddLotPage ? "Add Lot" : "Item Details";
  const isEditableLot = !!lotRows.length;

  return (
    <Box sx={styles.maincontainer}>
      <Loader loading={loading}>
        <MultiAlerts alerts={alerts} open={alerts.length} />
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={alert.open}
        >
          <Alert severity={alert.flag} sx={{ width: "100%" }}>
            {alert.message}
          </Alert>
        </Snackbar>
        <PageHeading text={pageHeading} />
        {showAddLotPage ? (
          <AddLot
            inputs={lotInputs}
            onChange={onChangeAddLotInputs}
            generateLot={generateLotPrivate}
            addLotToTable={addLotToTable}
            deleteLotRow={deleteLotRow}
            lotRows={lotRows}
            cancelAddLot={cancelAddLot}
            onClickDoneAddLot={onClickDoneAddLot}
            isEditingLotPage={isEditingLotPage}
          />
        ) : (
          <>
            <InputGroup
              inputs={itemDetailInputs}
              onChange={onChange}
              asyncMethod={asyncMethod}
            />
            <Buttons
              onClickSubmit={onClickSubmit}
              onClickAdd={onClickAdd}
              onClickCancel={onClickCancel}
              goToAddLotPage={goToAddLotPage}
              canAddLot={canAddLot()}
              isEditableLot={isEditableLot}
              submited={submited}
            />
            {tableData.length ? (
              <TableItemDetails
                tableData={tableData}
                onDeleteRow={onDeleteRow}
                editLotFormIDPage={editLotFormIDPage}
                submited={submited}
              />
            ) : null}
          </>
        )}
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
