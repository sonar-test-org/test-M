import { Alert, Box, Snackbar } from "@mui/material";
import { useState } from "react";
import {
  generateBodyToGetList,
  labelHistorySearchInputsMock,
} from "../labelPrintingUtils";
import { Search } from "./Search";
import { useEffect } from "react";
import { Loader } from "../../../../components/Loader";
import {
  getDocTypeList,
  getLabelHistoryList,
  getTransactionTypeList,
} from "../../../../services/api";
import { CustomTable } from "./CustomTable";
import { generateErrorMessage } from "../../../../utils/commonUtils";
import { ALERT_TIMEOUT } from "../../../../utils/variables";
import { ButtonWrapper } from "./ButtonBox";
import { PageHeading } from "../../../../components/TextUI/PageHeading";

export const LabelHistory = () => {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    flag: "",
  });
  const [loading, setLoading] = useState(false);

  const [searchInputs, setSearchInputs] = useState({
    ...labelHistorySearchInputsMock,
  });
  const [tableData, setTableData] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    const payload = generateBodyToGetList();
    initialCalls(payload, searchInputs);
  }, []);

  console.log("my searchInputs", searchInputs);

  const initialCalls = async (payload, inputs) => {
    setLoading(true);
    try {
      const apis = await Promise.all([
        getLabelHistoryList(payload),
        getDocTypeList(),
        getTransactionTypeList(),
      ]);
      const listRes = apis[0]?.data?.data;
      const docTypeList = apis[1]?.data?.data;
      const transactionTypeList = apis[2]?.data?.data;

      setTableData(listRes.items);

      const newInputsData = JSON.parse(JSON.stringify(inputs));
      newInputsData.transactionType.options = transactionTypeList;
      newInputsData.documentType.options = docTypeList;
      setSearchInputs(newInputsData);

      setLoading(false);
    } catch (error) {
      console.log("my error", error);
      setLoading(false);
      const errorMessage = generateErrorMessage(error);
      alertHandler(
        true,
        errorMessage || "Something went Wrong in Get Users API!",
        "error"
      );
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

  const onChangeSearch = (e) => {
    const { name, value } = e.target;
    const data = JSON.parse(JSON.stringify(searchInputs));
    // const data = { ...searchInputs };
    data[name].value = value;
    setSearchInputs(data);
  };

  const onChangeCustomTable = (e, i) => {
    const { name, checked } = e.target;

    if (name === "selectAll") {
      setIsAllSelected(checked);
      setTableData((dat) => dat.map((el) => ({ ...el, selected: checked })));
    } else {
      const k = [...tableData];
      k[i].selected = checked;
      setTableData(k);
      setIsAllSelected(false);
    }
  };

  const onClickSearch = () => {
    const payload = generateBodyToGetList(searchInputs);
    initialCalls(payload, searchInputs);
  };

  const onClickResetMain = () => {
    const k = JSON.parse(JSON.stringify(labelHistorySearchInputsMock));
    for (const key in k) {
      k[key].value = "";
    }
    const payload = generateBodyToGetList();
    initialCalls(payload, k);
  };

  const showSearch = Object.keys(searchInputs).length;
  const showTable = Object.keys(tableData).length;

  return (
    <Box sx={styles.maincontainer}>
      <Loader loading={loading}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={alert.open}
        >
          <Alert severity={alert.flag} sx={{ width: "100%" }}>
            {alert.message}
          </Alert>
        </Snackbar>
        <PageHeading text={"Label History"} />
        {showSearch ? (
          <Search inputs={searchInputs} onChange={onChangeSearch} />
        ) : null}
        <ButtonWrapper
          onClickSearch={onClickSearch}
          onClickResetMain={onClickResetMain}
        />
        {showTable ? (
          <CustomTable
            tableData={tableData}
            onChange={onChangeCustomTable}
            isAllSelected={isAllSelected}
          />
        ) : null}
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
