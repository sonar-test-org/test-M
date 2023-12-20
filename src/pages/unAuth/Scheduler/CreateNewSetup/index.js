import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { Loader } from "../../../../components/Loader";
import { AlertSnackbar } from "../../../../components/Snackbars/AlertSnackbar";
import {
  ALERT_TIMEOUT,
  ERROR,
  GLOBAL_ERROR,
  SUCCESS,
} from "../../../../utils/variables";
import { SetupDetail } from "./SetupDetail/SetupDetail";
import { ReportParameters } from "./ReportParameters/ReportParameters";
import { ReportDataMapping } from "./ReportDataMapping/ReportDataMapping";
import {
  createDataToUpdateReport,
  generateOnsaveReport,
  generateReportDataMapping,
  inputsMock,
  reportDataMappingsMock,
  reportParameterMock,
  validationKeys,
} from "../../../../utils/schedulerUtils";
import {
  getAllSequences,
  getAllTables,
  getDataFormats,
  getDataLocale,
  getSchedulerType,
  getSetupReport,
  saveReport,
  updateReport,
} from "../../../../services/api";
import { generateErrorMessage } from "../../../../utils/commonUtils";
import { Heading } from "./Heading";
import { toSnakeCase } from "../../../../utils/validator";
import { InvalidFieldsModal } from "./InvalidFieldsModal";

export const CreateNewSetup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const schedulerId = location?.state?.schedulerId || null;
  const isUpdate = schedulerId ? true : false;

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    flag: "",
  });
  const [reportParameters, setReportParameters] = useState([]);
  const [reportDataMappings, setReportDataMappings] = useState([]);

  const [inputs, setInputs] = useState({ ...inputsMock });
  const [invalidFields, setInvalidFields] = useState([]);

  useEffect(() => {
    setLoading(true);

    const duplicateData = {};
    for (const key in inputsMock) {
      duplicateData[key] = { ...inputsMock[key] };
    }

    if (isUpdate) {
      updateSetupInitialCalls(duplicateData);
    } else {
      createSetupInitialCalls(duplicateData);
    }
  }, []);

  const createSetupInitialCalls = async (data) => {
    const inputsNew = { ...data };

    const {
      dataFormatOptions,
      dataLocaleOptions,
      schedulerTypeOptions,
      tables,
    } = await getSelectOptionsHelper();

    inputsNew.dataFormat = {
      ...inputsNew.dataFormat,
      options: dataFormatOptions || [],
    };

    inputsNew.dataLocale = {
      ...inputsNew.dataLocale,
      options: dataLocaleOptions || [],
    };

    inputsNew.schedulerType = {
      ...inputsNew.schedulerType,
      options: schedulerTypeOptions || [],
    };

    inputsNew.tableName = {
      ...inputsNew.tableName,
      resultOptions: tables || [],
    };

    setInputs(inputsNew);
    setLoading(false);
  };

  const getAllSequencesLocal = async () => {
    try {
      const api = await getAllSequences();
      const res = api.data.data;
      if (!res) throw new Error("Error in get all Sequences");
      const options = res.map((el) => ({
        ...el,
        label: el.value,
        value: el.code,
      }));
      return options;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.status?.description ||
        error.message ||
        "Something went wrong";
      alertHandler(true, errorMessage || errorMessage, ERROR);
      return [];
    }
  };

  const getSelectOptionsHelper = async () => {
    const dataFormatOptions = await getDataFormatsLocal();
    const dataLocaleOptions = await getDataLocaleL();
    const schedulerTypeOptions = await getSchedulerTypeLocal();
    const tablesApi = await getAllTablesLocal();
    const tables = tablesApi.map((el, i) => {
      return {
        ...el,
        _id: i + 1,
      };
    });

    return {
      dataFormatOptions,
      dataLocaleOptions,
      schedulerTypeOptions,
      tables,
    };
  };

  const updateSetupInitialCalls = async (data) => {
    setLoading(true);
    try {
      const res = await getSetupReport(schedulerId, {});
      if (!res.data.data) throw new Error(GLOBAL_ERROR);

      const initialInputs = { ...data };

      // get call options
      const { dataFormatOptions, dataLocaleOptions, schedulerTypeOptions } =
        await getSelectOptionsHelper();
      const allSequences = await getAllSequencesLocal();

      initialInputs.dataFormat = {
        ...initialInputs.dataFormat,
        options: dataFormatOptions || [],
      };

      initialInputs.dataLocale = {
        ...initialInputs.dataLocale,
        options: dataLocaleOptions || [],
      };

      initialInputs.schedulerType = {
        ...initialInputs.schedulerType,
        options: schedulerTypeOptions || [],
      };

      const { inputsNW, reportParametersNW, reportDataMappingsNW } =
        createDataToUpdateReport(res.data.data, initialInputs, allSequences);

      setInputs(inputsNW);
      setReportParameters(reportParametersNW);
      setReportDataMappings(reportDataMappingsNW);

      setLoading(false);
    } catch (error) {
      const errorMessage =
        error.data?.status?.description || error || GLOBAL_ERROR;
      setLoading(false);
      alertHandler(true, errorMessage, ERROR);
    }
  };

  const getAllTablesLocal = async () => {
    try {
      const api = await getAllTables();
      const res = api.data.data;
      if (!res) throw new Error();
      const options = res.map((el) => ({
        select: false,
        table: el,
      }));
      return options;
    } catch (error) {
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
      return [];
    }
  };

  const getDataFormatsLocal = async () => {
    try {
      const api = await getDataFormats();
      const res = api.data.data;
      if (!res) throw new Error();
      const options = res.map((el) => ({
        ...el,
        label: el.value,
        value: el.code,
      }));
      return options;
    } catch (error) {
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
      return [];
    }
  };

  const getDataLocaleL = async () => {
    try {
      const api = await getDataLocale();
      const res = api.data.data;
      if (!res) throw new Error();
      const options = res.map((el) => ({ ...el, label: el.value }));
      return options;
    } catch (error) {
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
      return [];
    }
  };

  const getSchedulerTypeLocal = async () => {
    try {
      const api = await getSchedulerType();
      const res = api.data.data;
      if (!res) throw new Error();
      const options = res.map((el) => ({
        ...el,
        label: el.value,
        value: el.code,
      }));
      return options;
    } catch (error) {
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
      return [];
    }
  };

  const headerLinksReportParam = [
    {
      label: "Add New",
      name: "addNew",
      icon: (
        <AddCircleOutlineIcon className={styles.headerIcon} color="primary" />
      ),
    },
  ];

  const headerLinksReportDataMapping = [
    {
      label: "Add New",
      name: "addNew",
      icon: (
        <AddCircleOutlineIcon className={styles.headerIcon} color="primary" />
      ),
    },
  ];

  const onCancel = () => {
    navigate("/scheduler/general-setup");
  };

  const onSave = async () => {
    const valid = onValidate();
    if (!valid) return;

    setLoading(true);
    if (isUpdate) {
      updateReportLocal();
    } else {
      saveNewReportLocal();
    }
  };

  const onValidate = () => {
    const data = JSON.parse(JSON.stringify(inputs));
    let validArr = [];

    [...validationKeys].forEach((el) => {
      const element = data[el.name];
      const label = element.label;
      const description = element.errorDescription;
      if (!element.value) {
        validArr.push({ label, description });
        data[el.name] = { ...data[el.name], error: true };
      }
    });

    setInvalidFields([...validArr]);
    setInputs(data);

    return validArr.length ? false : true;
  };

  const handleCloseErrorModal = () => {
    setInvalidFields([]);
  };

  const saveNewReportLocal = async () => {
    try {
      const data = generateOnsaveReport(
        inputs,
        reportParameters,
        reportDataMappings
      );
      const api = await saveReport(data);
      const res = api.data?.data;
      if (!res) throw new Error();
      alertHandler(
        true,
        "Successfully Saved report. Navigating to General Setup...",
        SUCCESS
      );
      setLoading(false);
      setTimeout(() => {
        navigate("/scheduler/general-setup");
      }, 3000);
    } catch (error) {
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
    }
  };

  const updateReportLocal = async () => {
    try {
      const data = generateOnsaveReport(
        inputs,
        reportParameters,
        reportDataMappings
      );
      const api = await updateReport(data, schedulerId);
      const res = api.data?.data;
      if (!res) throw new Error();
      alertHandler(
        true,
        "Successfully Updated report. Navigating to General Setup...",
        SUCCESS
      );
      setLoading(false);
      setTimeout(() => {
        navigate("/scheduler/general-setup");
      }, 3000);
    } catch (error) {
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
    }
  };

  const onClickHeaderLinkReportParam = () => {
    setReportParameters((prvSt) => {
      return [...prvSt, { ...reportParameterMock }];
    });
  };

  const onAddReportDataMapping = async (item) => {
    const allSequences = await getAllSequencesLocal();
    const k = generateReportDataMapping(allSequences);
    setReportDataMappings((prvSt) => {
      return [...prvSt, k];
    });
  };

  const onClickRemoveParameter = (i) => {
    const newParams = [...reportParameters];
    newParams.splice(i, 1);
    setReportParameters(newParams);
  };

  const onClickRemoveDataMapping = (i) => {
    const newDataMappings = [...reportDataMappings];
    newDataMappings.splice(i, 1);
    setReportDataMappings(newDataMappings);
  };

  const onChangeParams = (e, i) => {
    const { value, name } = e.target;

    const row = { ...reportParameters[i] };
    row[name] = value;

    const newParams = reportParameters.map((el, subI) => {
      if (subI === i) {
        return { ...row };
      }
      return { ...el };
    });
    setReportParameters(newParams);
  };

  const onChangeDataMappings = (e, i) => {
    const { value, name } = e.target;

    const row = { ...reportDataMappings[i] };
    row[name].value = value;

    const newDataMappings = reportDataMappings.map((el, subI) => {
      if (subI === i) {
        return { ...row };
      }
      return { ...el };
    });
    setReportDataMappings(newDataMappings);
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

  const onChangeInputs = (e) => {
    const { name, value } = e.target;
    const inputsNew = { ...inputs };
    const selectedInput = { ...inputsNew[name], value };
    inputsNew[name] = { ...selectedInput };

    if (name === "tableName") {
      inputsNew[name].fields[0].value = value;
    }

    setInputs(inputsNew);
  };

  const onBlur = (e) => {
    const { name } = e.target;
    const inputsNew = { ...inputs };

    if (name === "serviceName") {
      const val = inputsNew.serviceName.value;
      const serviceTypeValue = toSnakeCase(val.toUpperCase());

      inputsNew.serviceType = {
        ...inputsNew.serviceType,
        value: serviceTypeValue,
      };
    }
    setInputs(inputsNew);
  };

  const onChangeSearch = () => {};

  const onChangeCheckbox = (e, _id, key, newResultOptions) => {
    const { checked } = e.target;
    const inputsNew = { ...inputs };
    inputsNew.tableName.resultOptions = newResultOptions.map((el, idx) => {
      let select = false;
      if (el._id === _id) {
        select = checked;
      }
      return { ...el, select };
    });
    setInputs(inputsNew);
  };

  // const onChangeCheckboxModal = (e, _id, key, newResultOptions) => {
  //   const { checked } = e.target;
  //   const data = JSON.parse(JSON.stringify(searchFields));
  //   const currentField = { ...data[key] };

  //   const newRows = newResultOptions.map((el, i) => {
  //     let select = false;
  //     if (el._id === _id) {
  //       select = checked;
  //     }
  //     return { ...el, select };
  //   });
  //   currentField.resultOptions = newRows;
  //   data[key] = currentField;
  //   setSearchFields(data);
  // };

  const onClickOkTablename = () => {
    const inputsNew = { ...inputs };
    const selectedTable = inputsNew.tableName.resultOptions.find(
      (el) => el.select
    );
    inputsNew.tableName.value = selectedTable.table;
    setInputs(inputsNew);
  };

  return (
    <Box container sx={styles.maincontainer}>
      <Loader loading={loading}>
        <AlertSnackbar
          open={alert.open}
          flag={alert.flag}
          message={alert.message}
        />
        <Heading onCancel={onCancel} onSave={onSave} isUpdate={isUpdate} />
        <SetupDetail
          inputs={inputs}
          onChange={onChangeInputs}
          onBlur={onBlur}
          onChangeSearch={onChangeSearch}
          onClickOk={onClickOkTablename}
          onChangeCheckbox={onChangeCheckbox}
        />
        {inputs.parameterized.value === "Y" ? (
          <ReportParameters
            headerLinks={headerLinksReportParam}
            onClickHeaderLink={onClickHeaderLinkReportParam}
            reportParameters={reportParameters}
            onClickRemoveParameter={onClickRemoveParameter}
            onChangeParams={onChangeParams}
          />
        ) : null}
        <ReportDataMapping
          headerLinks={headerLinksReportDataMapping}
          onClickHeaderLink={onAddReportDataMapping}
          reportDataMappings={reportDataMappings}
          onClickRemoveDataMapping={onClickRemoveDataMapping}
          onChangeDataMappings={onChangeDataMappings}
        />
        {
          <InvalidFieldsModal
            open={invalidFields.length}
            invalidFields={invalidFields}
            handleClose={handleCloseErrorModal}
          />
        }
      </Loader>
    </Box>
  );
};

const styles = {
  maincontainer: {
    padding: "0px 100px 100px 100px",
    minHeight: "100vh",
  },
  headerIcon: { width: "20px" },
  customStylesHeading: {
    paddingTop: "20px",
  },
};
