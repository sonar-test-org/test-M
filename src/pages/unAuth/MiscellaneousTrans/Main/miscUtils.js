import moment from "moment";
import {
  disableFutureDates,
  generateDateInStrFormat,
} from "../../../../utils/commonUtils";
import { ERROR, SUCCESS } from "../../../../utils/variables";

export const miscInputsMock = [
  {
    value: "",
    name: "organization",
    label: "Organization",
    type: "lookup",
    rows: [],
    required: true,
  },
  {
    value: "",
    name: "transactionType",
    label: "Transaction Type",
    type: "lookup",
    rows: [],
    required: true,
  },
  {
    value: "",
    name: "accountCombinationId",
    label: "Enter Account Combination ID",
    rows: [],
    required: true,
  },
  {
    value: "",
    name: "subInventory",
    label: "SubInventory",
    type: "lookup",
    rows: [],
    required: true,
  },
  {
    value: "",
    name: "locator",
    label: "Locator",
    type: "lookup",
    rows: [],
    required: true,
  },
  {
    value: "",
    name: "transactiondate",
    label: "Enter Transaction Date",
    type: "date",
    disableFutureDates: disableFutureDates,
    required: true,
  },
  {
    value: "",
    name: "project",
    label: "Project",
    type: "lookup",
    rows: [],
    required: true,
  },
  {
    value: "",
    name: "projectTask",
    label: "Project Task",
    type: "lookup",
    rows: [],
    required: true,
  },
  {
    value: "",
    name: "expenditureType",
    label: "Expenditure Type",
    type: "lookup",
    rows: [],
    required: true,
  },
  {
    value: "",
    name: "expenditureOrganization",
    label: "Expenditure Organization",
    type: "lookup",
    rows: [],
    required: true,
  },
];

export const itemDetailInputsMock = [
  {
    value: "",
    name: "itemCode",
    label: "Item Code",
    type: "lookup",
    isAsyncMethod: true,
    rows: [],
    required: true,
  },
  {
    value: "",
    name: "description",
    label: "Description",
    type: "lookup",
    isAsyncMethod: true,
    rows: [],
    required: true,
  },
  {
    value: "",
    name: "uomCode",
    label: "UOM Code",
    type: "lookup",
    rows: [],
    required: true,
  },
  {
    value: "",
    name: "onHandQuantity",
    label: "On Hand QTY",
    required: true,
    disabled: true,
  },
  {
    value: "",
    name: "enterQuantity",
    label: "Enter Quantity",
    required: true,
  },
  {
    value: "",
    name: "reason",
    label: "Reason",
    type: "lookup",
    rows: [],
    required: false,
  },
];

export const addLotInputsMock = [
  {
    value: "",
    name: "lot",
    label: "Lot",
    required: true,
  },
  {
    value: "",
    name: "Quantity",
    label: "Quantity",
    required: true,
  },
  {
    value: "",
    name: "expiryDate",
    label: "Expiry Date",
    type: "date",
    required: true,
  },
];

// generate payloads
export const subInventoryBody = (inputs) => {
  const orgInput = inputs.find((fn) => fn.name === "organization");
  const orgCode = orgInput.value;
  return {
    orgList: [orgCode || ""],
    // orgList: ["EVO"],
    fields: [
      "StatusCode",
      "LocationId",
      "Description",
      "SecondaryInventoryName",
      "SubinventoryId",
      "OrganizationCode",
      "OrganizationId",
      "OrganizationName",
      "SubinventoryType",
      "LocatorType",
      "DisableDate",
    ],
  };
};
export const locatorBody = (inputs) => {
  const orgInput = inputs.find((fn) => fn.name === "organization");
  const orgCode = orgInput.value;

  const subInventoryInput = inputs.find((fn) => fn.name === "subInventory");
  return {
    orgCode,
    subInventory: subInventoryInput.value,
  };
  // return {
  //   orgCode: "EVO",
  //   subInventory: "Pick",
  // };
};
export const itemCodesBody = (value, miscInputs) => {
  const orgInp = miscInputs.find((el) => el.name === "organization");
  const orgCode = orgInp.value;

  return {
    itemNumber: value,
    // itemNumber: 'Test,
    itemDescription: "",
    organizationCode: orgCode,
    // organizationCode: "EVO",
    fields: [
      "OrganizationId",
      "OrganizationCode",
      "ItemNumber",
      "PrimaryUOMValue",
      "LotControlValue",
      "SerialGenerationValue",
      "ItemDescription",
    ],
  };
};
export const descriptionBody = (value, miscInputs) => {
  const orgInp = miscInputs.find((el) => el.name === "organization");
  const orgCode = orgInp.value;
  return {
    itemNumber: "",
    itemDescription: value,
    // itemDescription: "Test",
    organizationCode: orgCode,
    // organizationCode: "EVO",
    fields: [
      "OrganizationId",
      "OrganizationCode",
      "ItemNumber",
      "PrimaryUOMValue",
      "LotControlValue",
      "SerialGenerationValue",
      "ItemDescription",
    ],
  };
};
export const itemDetailsBody = (miscInputs, itemDetailInputs) => {
  const orgInp = miscInputs.find((el) => el.name === "organization");
  const orgCode = orgInp.value;

  const itemCodeInput = itemDetailInputs.find((el) => el.name === "itemCode");
  return {
    CrossReferenceNumber: itemCodeInput.value,
    OrganizationCode: orgCode,
    // CrossReferenceNumber: "Test Screw",
    // OrganizationCode: "EVO",
  };
};
export const generateLotBody = (miscInputs, itemDetailInputs) => {
  const orgInp = miscInputs.find((el) => el.name === "organization");
  const orgCode = orgInp.value;

  const itemNumber = itemDetailInputs.find((el) => el.name === "itemCode");
  return {
    ItemNumber: itemNumber.value,
    OrganizationCode: orgCode,
  };
  // return {
  //   ItemNumber: "Test Conductor",
  //   OrganizationCode: "EVO",
  // };
};
export const generateFinalUploadBody = (miscInputs, tableData) => {
  const miscInputObj = miscInputs.reduce((acu, cur) => {
    return { ...acu, [cur.name]: cur };
  }, {});

  const organizationInput = miscInputObj.organization;
  const organizationId = organizationInput.selectedRow.warehouseFusionId;

  const transactionTypeInput = miscInputObj.transactionType;
  const transactionTypeId = transactionTypeInput.selectedRow.transactionTypeId;
  const transactionAction = transactionTypeInput.selectedRow.transactionAction;
  const transactionSourceTypeName =
    transactionTypeInput.selectedRow.transactionSourceTypeName;

  const transactionDateInp = miscInputObj.transactiondate;

  const transactionDate = generateDateInStrFormat(
    moment(transactionDateInp.value).toDate()
  );

  const subinventoryCode = miscInputObj.subInventory.value;

  const locatorIdInp = miscInputObj.locator;
  const locatorId = locatorIdInp.selectedRow.inventoryLocationId;

  const accountCombinationId = miscInputObj.accountCombinationId.value;

  const items = tableData.map((el) => {
    const itemDetailsInpObj = el.inputs.reduce((acu, cur) => {
      return { ...acu, [cur.name]: cur };
    }, {});

    const itemNumberInput = itemDetailsInpObj.itemCode;
    const itemNumber = itemNumberInput.value;

    const transactionQuantity = itemDetailsInpObj.enterQuantity.value;

    const uomCode = itemDetailsInpObj.uomCode.value;
    const reason = itemDetailsInpObj.reason.value;

    const payload = {
      OrganizationId: organizationId,
      TransactionTypeId: transactionTypeId,
      ItemNumber: itemNumber,
      TransactionQuantity: generateTransQty(
        transactionQuantity,
        transactionAction
      ),
      TransactionUnitOfMeasure: uomCode,
      TransactionDate: transactionDate,
      SubinventoryCode: subinventoryCode,
      LocatorId: locatorId,
      DistributionAccountId: accountCombinationId,
      SourceHeaderId: "1", // hardcode
      SourceLineId: "1", //hardcode
      TransactionMode: "1", //hardcoode
      SourceCode: "Warehouse360", //hardcode
      TransactionSourceId: accountCombinationId,
      UseCurrentCostFlag: "true", // hardcode
    };

    if (reason) {
      payload.ReasonName = reason;
    }

    if (transactionSourceTypeName === "Inventory") {
      payload.trackingAttributesDFF = generateTrackingDFFs(miscInputObj);
    } else {
      payload.projectCostingDFFs = generateProjectCostingDFFs(miscInputObj);
    }

    const canAddLot = el.lotRows && el.lotRows.length;
    if (canAddLot) {
      payload.lots = generateLotPayload(el.lotRows);
    }
    debugger;

    return payload;
  });

  console.log("my upload payload", items);
  return { items };
};

// generate rows
export const generateOrgRows = (res) => {
  return res.data.map((el) => ({
    // organization: el.warehouseName,
    organization: el.warehouseCode,
    warehouseName: el.warehouseName,
    warehouseFusionId: el.warehouseFusionId,
  }));
};
export const generateTransactionType = (res) => {
  const k = res.data.data.items.filter((el) => {
    return (
      el.TransactionTypeName === "Miscellaneous issue" ||
      el.TransactionTypeName === "Miscellaneous Receipt" ||
      el.TransactionTypeName === "Project Issue" ||
      el.TransactionTypeName === "Project Return"
    );
  });
  return k.map((el) => ({
    transactionType: el.TransactionTypeName,
    transactionTypeId: el.TransactionTypeId,
    transactionAction: el.TransactionAction,
    transactionSourceTypeName: el.TransactionSourceTypeName,
  }));
};
export const generateSubInventoryRows = (res) => {
  const obj = res.data.data;
  let rows = Object.keys(obj).map((key) => {
    return obj[key];
  });
  return rows.flat().map((el) => ({
    subInventory: el.SecondaryInventoryName,
    subinventoryId: el.SubinventoryId,
  }));
};
export const generateLocatorRows = (res) => {
  return res.data.data.slice(0, 100).map((el) => ({
    locator: el.locatorName,
    inventoryLocationId: el.inventoryLocationId,
  }));
};
export const generateProjectRows = (res) => {
  return res.data.data.items.map((el) => {
    return {
      project: el.ProjectId,
      projectNumber: el.ProjectNumber,
      // ProjectNumber: el.ProjectNumber,
      // ProjectId: el.ProjectId,
    };
  });
};
export const generateProjectTasks = (res) => {
  return res.data.data.items.map((el) => {
    return {
      projectTask: el.TaskId,
      taskName: el.TaskName,
      taskNumber: el.TaskNumber,
      // TaskId: el.TaskId,
    };
  });
};
export const generateExpenditureRows = (res) => {
  return res.data.data.items.map((el) => {
    return {
      expenditureType: el.ExpenditureTypeId,
      expenditureName: el.ExpenditureTypeName,
      category: el.ExpenditureCategory,
    };
  });
};
export const generateExpenditureOrgRows = (res) => {
  return res.data.data.items.map((el) => {
    return {
      expenditureOrganization: el.OrganizationId,
      organizationName: el.OrganizationName,
      // expenditureOrganization: el.OrganizationName,
      // businedssUnitId: el.BusinessUnitId,
    };
  });
};

// generate rows Item details
export const generateReasonRows = (res) => {
  return res.data.data.items.map((el) => ({
    reason: el.ReasonName,
    description: el.Description,
    reasonType: el.ReasonType,
  }));
};
export const generateRowsItemCode = (res) => {
  return res.data.data.items.map((el) => ({
    itemCode: el.ItemNumber,
    description: el.ItemDescription,
    reasonType: el.ReasonType,
    PrimaryUOMValue: el.PrimaryUOMValue,
  }));
};
export const generateRowsDescription = (res) => {
  return res.data.data.items.map((el) => ({
    description: el.ItemDescription,
    itemCode: el.ItemNumber,
    reasonType: el.ReasonType,
    PrimaryUOMValue: el.PrimaryUOMValue,
  }));
};

// others
export const populateVariable = {
  itemCode: {
    description: "description",
    uomCode: "PrimaryUOMValue",
  },
  description: {
    itemCode: "itemCode",
    uomCode: "PrimaryUOMValue",
  },
  uomCode: {},
};
export const apiDependencies = {
  subInventory: ["organization"],
  locator: ["organization", "subInventory"],
};
export const generateTransQty = (transactionQuantity, transactionAction) => {
  if (transactionAction === "Issue from stores") {
    // if there is already minus symbol then dont add minus. Logic must be added
    return `-${transactionQuantity}`;
  } else {
    return transactionQuantity;
  }
};
export const generateTrackingDFFs = (miscInputObj) => {
  const projectInp = miscInputObj.project;
  const project = projectInp.selectedRow.projectNumber;

  const projectTaskInp = miscInputObj.projectTask;
  const projectTask = projectTaskInp.selectedRow.taskNumber;

  const expenditureType = miscInputObj.expenditureType.value;
  const expenditureOrganization = miscInputObj.expenditureOrganization.value;

  return [
    {
      projectId_Display: project,
      taskId_Display: projectTask,
      _EXPENDITURE_TYPE_ID: expenditureType,
      _ORGANIZATION_ID: expenditureOrganization,
    },
  ];
};
export const generateProjectCostingDFFs = (miscInputObj) => {
  const project = miscInputObj.project.value;
  const projectTask = miscInputObj.projectTask.value;

  const expenditureType = miscInputObj.expenditureType.value;
  const expenditureOrganization = miscInputObj.expenditureOrganization.value;

  return [
    {
      __FLEX_Context: "INV_Misc_Transactions", // hardcode
      _PROJECT_ID: project,
      _TASK_ID: projectTask,
      _EXPENDITURE_ITEM_DATE: generateDateInStrFormat(new Date()),
      _EXPENDITURE_TYPE_ID: expenditureType,
      _ORGANIZATION_ID: expenditureOrganization,
    },
  ];
};
// testConductor
export const generateLotPayload = (lotRows) => {
  return lotRows.map((lot) => ({
    LotNumber: lot.inputs[0].value,
    TransactionQuantity: lot.inputs[1].value,
    LotExpirationDate: generateDateInStrFormat(moment(lot.inputs[2].value).toDate()),
  }));
};

// generate alerts
export const generateAlerts = (responses) => {
  const updatedAlerts = [];
  responses.forEach((el) => {
    if (el.statusCode === 400) {
      updatedAlerts.push({
        flag: ERROR,
        message: el.statusDescription || "Something went wrong!",
      });
    } else {
      if (el.response.ErrorExplanation) {
        updatedAlerts.push({
          flag: ERROR,
          message: el.response.ErrorExplanation || "Something went wrong!",
        });
      } else {
        updatedAlerts.push({
          flag: SUCCESS,
          message: "Transaction created successfully!",
        });
      }
    }
  });
  return updatedAlerts;
};
