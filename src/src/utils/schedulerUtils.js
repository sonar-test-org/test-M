import moment from "moment";

export const genericSchedulerTableHeadings = [
  "Service Name",
  "Last Run Date",
  "Hour",
  "Minute",
  "Second",
  "Scheduler Type",
  "Status",
  "ad hoc Run",
  "Schedule",
];

export const generalSetupTableHeadings = [
  "Edit",
  "Service Name",
  "Service Type",
  "Scheduler Type", // f \\ t
  "Hour",
  "Minute",
  "Second",
  "Parameterized",
];

export const schedulerTypeOptions = [
  { label: "Time", value: "T" },
  { label: "Frequent", value: "F" },
];

export const reportParameterMock = {
  parameterName: "",
  SQLType: "",
  defaultValue: "",
  query: "",
};

export const reportHistoryHeadings = [
  "Error",
  "Process Number",
  "Service Type",
  "Run Type",
  "Status",
  "Record Processed",
  "Start Time",
  "End Time",
];

export const inputsMock = {
  serviceName: {
    value: "",
    label: "Service Name",
    name: "serviceName",
    disabled: false,
    error: false,
    errorDescription: "You must enter a value",
  },
  serviceType: {
    value: "",
    label: "Service Type",
    name: "serviceType",
    disabled: true,
    error: false,
    errorDescription: "You must enter a value",
  },
  tableName: {
    value: "",
    label: "Table Name",
    name: "tableName",
    disabled: false,
    error: false,
    errorDescription: "You must enter a value",

    fields: [{ name: "table", label: "Table Name", value: "" }],
    resultOptions: [],
  },
  schedulerType: {
    value: "",
    label: "Scheduler Type",
    name: "schedulerType",
    disabled: false,
    error: false,
    options: [],
    errorDescription: "You must make a selection",
  },
  hour: {
    value: "",
    label: "Hour",
    name: "hour",
    disabled: false,
    error: false,
    options: [],
    errorDescription: "You must make a selection",
  },
  minute: {
    value: "",
    label: "Minute",
    name: "minute",
    disabled: false,
    error: false,
    options: [],
    errorDescription: "You must make a selection",
  },
  seconds: {
    value: "",
    label: "Seconds",
    name: "seconds",
    disabled: false,
    error: false,
    options: [],
    errorDescription: "You must make a selection",
  },
  dataLocale: {
    value: "",
    label: "Data Locale",
    name: "dataLocale",
    disabled: false,
    error: false,
    options: [],
    errorDescription: "You must make a selection",
  },
  parameterized: {
    value: "",
    label: "Parameterized",
    name: "parameterized",
    disabled: false,
    error: false,
    options: [
      { value: "Y", label: "Yes" },
      { value: "N", label: "No" },
    ],
    errorDescription: "You must make a selection",
  },
  dataFormat: {
    value: "",
    label: "Data Format",
    name: "dataFormat",
    disabled: false,
    error: false,
    options: [],
    errorDescription: "You must make a selection",
  },
  isRefresh: {
    value: "",
    label: "Is Refresh",
    name: "isRefresh",
    disabled: false,
    error: false,
    options: [
      { value: "Y", label: "Yes" },
      { value: "N", label: "No" },
    ],
    errorDescription: "You must make a selection",
  },
  reportPath: {
    value: "",
    label: "Report Path",
    name: "reportPath",
    disabled: false,
    error: false,
    errorDescription: "You must enter a value",
  },
  rootNode: {
    value: "",
    label: "Root Node",
    name: "rootNode",
    disabled: false,
    error: false,
    errorDescription: "You must enter a value",
  },
};

export const generateOnsaveReport = (
  inputs,
  reportParameters,
  reportDataMappings
) => {
  const mappedInputs = {};
  for (const key in inputs) {
    const element = inputs[key];
    mappedInputs[key] = element.value;
  }

  const schedulerSetupDetail = reportParameters.map((el) => {
    return {
      paramName: el.parameterName,
      paramSqlType: el.SQLType,
      defaultVal: el.defaultValue,
      createdBy: "",
      sqlStatement: el.query,
    };
  });

  const schedulerDataMapping = reportDataMappings.map((el) => {
    return {
      reportColumnName: el.reportColumnName.value,
      tableColumnName: el.tableColumnName.value,
      defaultValue: el.defaultValue.value,
      primaryFlag: el.primaryFlag.value,
      createdBy: "",
      dateFormat: el.dateFormat.value,
      isSeq: el.isSeq.value,
      columnDataType: el.columnDataType.value,
    };
  });

  const data = {
    serviceName: mappedInputs.serviceName,
    schedulerType: mappedInputs.schedulerType,
    hour: mappedInputs.hour,
    minute: mappedInputs.minute,
    second: mappedInputs.seconds,
    serviceType: mappedInputs.serviceType,
    UpdatedBy: "",
    isParameterized: mappedInputs.parameterized,

    schedulerSetupHeader: {
      reportPath: mappedInputs.reportPath,
      reportDataTable: mappedInputs.tableName,
      reportDataFormat: mappedInputs.dataFormat,
      reportDataLocale: mappedInputs.dataLocale,
      createdBy: "",
      isRefresh: mappedInputs.isRefresh,
      rootNode: mappedInputs.rootNode,
    },
    schedulerSetupDetail,
    schedulerDataMapping,
  };

  return data;
};

export const createDataToUpdateReport = (data, initialInputs, allSequences) => {
  const inputsNW = { ...initialInputs };
  inputsNW.serviceName.value = data.serviceName;
  inputsNW.serviceType.value = data.serviceType;
  inputsNW.tableName.value = data.schedulerSetupHeader.reportDataTable;
  inputsNW.schedulerType.value = data.schedulerType;
  inputsNW.hour.value = data.hour;
  inputsNW.minute.value = data.minute;
  inputsNW.seconds.value = data.second;
  inputsNW.dataLocale.value = data.schedulerSetupHeader.reportDataLocale;
  inputsNW.parameterized.value = data.isParameterized;
  inputsNW.dataFormat.value = data.schedulerSetupHeader.reportDataFormat;
  inputsNW.isRefresh.value = data.schedulerSetupHeader.isRefresh;
  inputsNW.reportPath.value = data.schedulerSetupHeader.reportPath;
  inputsNW.rootNode.value = data.schedulerSetupHeader.rootNode;

  const reportParametersNW = data.schedulerSetupDetail.map((el) => {
    return {
      parameterName: el.paramName,
      SQLType: el.paramSqlType,
      defaultValue: el.defaultVal,
      query: el.sqlStatement,
    };
  });

  const reportDataMappingsNW = data.schedulerDataMapping.map((el) => {
    const kk = {};
    for (const key in reportDataMappingsMock) {
      if (key === "defaultValue") {
        kk[key] = {
          ...reportDataMappingsMock[key],
          value: el[key],
          resultOptions: allSequences || [],
        };
      } else {
        kk[key] = { ...reportDataMappingsMock[key], value: el[key] };
      }
    }
    return kk;
  });

  return { inputsNW, reportParametersNW, reportDataMappingsNW };
};

export const reportDataMappingsMock = {
  reportColumnName: {
    name: "reportColumnName",
    value: "",
  },
  tableColumnName: {
    name: "tableColumnName",
    value: "",
  },
  isSeq: {
    name: "isSeq",
    value: "N",
  },
  defaultValue: {
    name: "defaultValue",
    value: "",
    label: "Default Value",
    fields: [{ name: "defaultValue", label: "Default Value", value: "" }],
    resultOptions: [],
  },
  primaryFlag: {
    name: "primaryFlag",
    value: "",
  },
  dateFormat: {
    name: "dateFormat",
    value: "",
  },
  columnDataType: {
    name: "columnDataType",
    value: "",
  },
};

export const generateReportDataMapping = (allSequences) => {
  const data = JSON.parse(JSON.stringify(reportDataMappingsMock));
  data.defaultValue.resultOptions = allSequences || [];
  return data;
};

export const validationKeys = [
  {
    name: "serviceName",
    label: "Service Name",
  },
  // {
  //   name: "serviceType",
  //   label: "Service Type",
  // },
  {
    name: "tableName",
    label: "Table Name",
  },
  {
    name: "schedulerType",
    label: "Scheduler Type",
  },
  // { name: "hour", label: "Hour" },
  // {
  //   name: "minute",
  //   label: "Minute",
  // },
  // {
  //   name: "seconds",
  //   label: "seconds",
  // },
  {
    name: "dataLocale",
    label: "Data Locale",
  },
  {
    name: "parameterized",
    label: "Parameterized",
  },
  {
    name: "dataFormat",
    label: "Data Format",
  },
  {
    name: "isRefresh",
    label: "Is Refresh",
  },
  {
    name: "reportPath",
    label: "Report Path",
  },
  {
    name: "rootNode",
    label: "Root Node",
  },
];

export const manualScheduleInputsMock = {
  schedulerType: {
    value: "",
    label: "Scheduler Type",
    name: "schedulerType",
    disabled: false,
    error: false,
    options: [
      {
        value: "F",
        label: "Frequency",
      },
      {
        value: "T",
        label: "Time",
      },
    ],
    errorDescription: "You must make a selection",
  },
  hour: {
    value: "",
    label: "Hour",
    name: "hour",
    disabled: false,
    error: false,
    options: [],
    errorDescription: "You must make a selection",
  },
  minute: {
    value: "",
    label: "Minute",
    name: "minute",
    disabled: false,
    error: false,
    options: [],
    errorDescription: "You must make a selection",
  },
  seconds: {
    value: "",
    label: "Seconds",
    name: "seconds",
    disabled: false,
    error: false,
    options: [],
    errorDescription: "You must make a selection",
  },
};

export const historyStatus = {
  C: "Completed",
  E: "Error",
  undefined: "",
  "": "",
};

export const generateHistoryData = (data) => {
  if (!data) return [];
  return data.map((item) => ({
    ...item,
    endTime: item.endTime
      ? moment.utc(item.endTime).local().format("YYYY-MM-DD HH:mm:ss")
      : "",
    startTime: item.startTime
      ? moment.utc(item.startTime).local().format("YYYY-MM-DD HH:mm:ss")
      : "",
    status: historyStatus[item.status],
  }));
};

export const generateTableData = (data) => {
  if (!data) return [];
  return data.map((item) => ({
    ...item,
    lastRunDate: item.lastRunDate
      ? moment.utc(item.lastRunDate).local().format("YYYY-MM-DD HH:mm:ss")
      : "",
    schedulerType:
      item.schedulerType === "F"
        ? "Frequency"
        : item.schedulerType === "T"
        ? "Time"
        : item.schedulerType,
  }));
};
