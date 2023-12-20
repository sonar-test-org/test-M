import moment from "moment";
import { generateDateInStrFormat } from "../../../utils/commonUtils";

export const searchInputsmock = [
  {
    label: "Template Name",
    value: "",
    name: "templateName",
  },
  {
    label: "Created Date",
    value: "",
    name: "createdDate",
    type: "date",
  },
];

export const headings = [
  "Transaction Type",
  "Template Name",
  "File Name",
  "Created Date",
  "Delete",
  "Edit",
  "Download",
];

export const templateInputsMock = {
  templateName: {
    label: "Template Name",
    value: "",
    name: "templateName",
    required: true,
  },
  createdDate: {
    label: "Created Date",
    value: moment().format("MM/DD/YYYY"),
    name: "createdDate",
    disabled: true,
  },
  transactionType: {
    label: "Transaction Type",
    value: "",
    name: "transactionType",
    required: true,
    fields: [
      { name: "priviledgeName", label: "Priviledge Name", value: "" },
      { name: "priviledgeCode", label: "Priviledge Code", value: "" },
    ],
    resultOptions: [],
  },
  uploadTemplate: {
    label: "Upload Template",
    value: "",
    name: "uploadTemplate",
    required: true,
  },
  fileName: {
    label: "File Name",
    value: "",
    name: "fileName",
    disabled: true,
  },
};

export const generateEditTemplateInputsMock = (priviledgeOptions, row) => {
  const dat = JSON.parse(JSON.stringify(templateInputsMock));
  dat.createdBy = row.createdBy;
  dat.createdDate.value = row.createdDate;
  dat.fileName.value = row.templateFileName;
  dat.id = row.id;
  dat.templateName.value = row.templateName;
  dat.transactionType.value = row.transactionType;
  dat.updatedBy = row.updatedBy;
  dat.updatedDate = row.updatedDate;
  dat.transactionType.resultOptions = priviledgeOptions;

  return dat;
};

export const generateAddTemplateInputsMock = (priviledgeOptions) => {
  const dat = JSON.parse(JSON.stringify(templateInputsMock));
  dat.transactionType.resultOptions = priviledgeOptions;

  return dat;
};

export const generatePriviledgesOptions = (data) => {
  return data.map((dat, i) => {
    return {
      select: false,
      priviledgeName: dat.privilegeName,
      priviledgeCode: dat.privilegeCode,
      _id: i,
    };
  });
};

// label history
export const tableHeadingsHistory = [
  { label: "", width: "", type: "selectAll" },
  { label: "Print Id", width: "", type: "" },
  { label: "Total Print", width: "", type: "" },
  { label: "Status", width: "", type: "" },
  { label: "StatusZPL Data", width: "", type: "" },
  { label: "Transaction Type", width: "", type: "" },
  { label: "Organization", width: "", type: "" },
  { label: "Item", width: "", type: "" },
  { label: "Item Description", width: "", type: "" },
  { label: "Lot", width: "", type: "" },
  { label: "Quantity", width: "", type: "" },
  { label: "Document Number", width: "", type: "" },
  { label: "Transaction Date", width: "", type: "" },
  { label: "User Name", width: "", type: "" },
  { label: "Template Name", width: "", type: "" },
];

export const labelHistorySearchInputsMock = {
  item: {
    label: "Item",
    value: "",
  },
  fromTransactionDate: {
    label: "Transaction From Date",
    value: "",
  },
  toTransactionDate: {
    label: "Transaction To Date",
    value: "",
  },
  itemDescription: {
    label: "Item Description",
    value: "",
  },
  documentNumber: {
    label: "Document Number",
    value: "",
  },
  transactionType: {
    label: "Transaction Type",
    value: "",
    options: [],
  },
  documentType: {
    label: "Documnet Type",
    value: "",
    options: [],
  },
};

export const generateBodyToGetList = (data) => {
  const reqPayload = {
    itemDescription: "",
    documentType: "",
    documentNumber: "",
    transactionType: "",
    fromTransactionDate: "",
    toTransactionDate: "",
  };

  if (data) {
    for (const key in data) {
      if (key === "fromTransactionDate" || key === "toTransactionDate") {
        const formatedDate = generateDateInStrFormat(data[key].value);
        reqPayload[key] = formatedDate;
      } else {
        reqPayload[key] = data[key].value;
      }
    }
  }
  return reqPayload;
};

// mapping
export const mappingSearchInputsmock = {
  label: "Transaction Name",
  value: "",
  name: "transactionName",
  type: "dropdown",
  options: [],
};

export const ZPL_ESSInputMock = [
  {
    value: "",
    label: "Constant Name",
    name: "constantName",
    required: true,
  },
  {
    value: "",
    label: "Print Master Table Field Name",
    name: "printMasterTableFieldName",
    required: true,
  },
  {
    value: "",
    label: "Transaction Type",
    name: "transactionType",
    options: [],
    type: "dropdown",
    required: true,
  },
  {
    value: "",
    label: "Enable",
    name: "enable",
    type: "dropdown",
    options: [
      { value: "1", label: "Yes" },
      { value: "0", label: "No" },
    ],
    required: true,
  },
  {
    value: "",
    label: "Label Length",
    name: "labelLength",
  },
  {
    value: "",
    label: "Data Type",
    name: "dataType",
  },
  {
    value: "",
    label: "From Date Format",
    name: "fromDateFormat",
  },
];

export const addTransKeyMappinInputsMock = [
  {
    value: "",
    label: "Print Line Key Name",
    name: "printLineKeyName",
    required: true,
  },
  {
    value: "",
    label: "Key From Web Service",
    name: "keyFromWebservice",
    required: true,
  },
  {
    value: "",
    label: "Transaction Type",
    name: "transactionType",
    options: [],
    type: "dropdown",
    required: true,
  },
];

export const generateAddMappingInputs = (
  isZplMapPage,
  isEssMapPage,
  transactionTypeOptions,
  row
) => {
  const dat = isZplMapPage || isEssMapPage ? ZPL_ESSInputMock : addTransKeyMappinInputsMock;
  const modifiedDat = dat.map((el) => {
    const value = row && row[el.name] ? row[el.name] : "";

    if (el.name === "transactionType") {
      return { ...el, options: transactionTypeOptions, value };
    }
    return { ...el, value };
  });

  return modifiedDat;
};

export const transCustomTableHeadings = [
  { label: "Mapping ID", width: "", type: "" },
  { label: "Print Line Key Name", width: "", type: "" },
  { label: "Key From Web Service", width: "", type: "" },
  { label: "Transaction Type", width: "", type: "" },
  { label: "Delete", width: "", type: "" },
  { label: "Edit", width: "", type: "" },
];

export const zpl_ess_CustomTableHeadings = [
  { label: "Mapping ID", width: "", type: "" },
  { label: "Constant Name", width: "", type: "" },
  { label: "Print Master Table Field Name", width: "", type: "" },
  { label: "Transaction Type", width: "", type: "" },
  { label: "Enable", width: "", type: "" },
  { label: "Label Length", width: "", type: "" },
  { label: "Data Type", width: "", type: "" },
  { label: "From Date Format", width: "", type: "" },
  { label: "Delete", width: "", type: "" },
  { label: "Edit", width: "", type: "" },
];

export const generateMappingForCreate = (inputs) => {
  const obj = {};
  inputs.forEach((el) => {
    if (el.value) {
      obj[el.name] = el.value;
    }
  });
  return obj;
};
