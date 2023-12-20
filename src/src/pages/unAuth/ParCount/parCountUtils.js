import moment from "moment";

export const searchInputsMock = {
  itemNumber: {
    label: "Item Number",
    name: "itemNumber",
    value: "",
    error: false,
  },
  fromSyncDate: {
    label: "From Sync Date",
    name: "fromSyncDate",
    value: null,
    // value: new Date(),
    error: false,
  },
  toSyncDate: {
    label: "To Sync Date",
    name: "toSyncDate",
    value: null,
    // value: new Date(),
    error: false,
  },
  organizationCode: {
    label: "Organization Code",
    name: "organizationCode",
    value: "",
    error: false,
    options: [],
    required: true,
  },
  status: {
    label: "Status",
    name: "status",
    value: "",
    error: false,
    options: ["PENDING", "PROCESSED"],
  },
  subInventory: {
    label: "Sub Inventory",
    name: "subInventory",
    value: "",
    error: false,
    options: [],
    required: true,
  },
  fusionResponse: {
    label: "Fusion Response",
    name: "fusionResponse",
    value: "",
    error: false,
  },
  syncBy: {
    label: "Sync By",
    name: "syncBy",
    value: "",
    error: false,
    options: [],
  },
};

export const generatePostData = (searchInputs) => {
  const k = {
    orgCode: searchInputs.organizationCode.value,
    subInventory: searchInputs.subInventory.value,
    itemNumber: searchInputs.itemNumber.value,
    status: searchInputs.status.value,
    fusionResponse: searchInputs.fusionResponse.value,
    syncBy: searchInputs.syncBy.value,
    fromSyncDate: searchInputs.fromSyncDate.value,
    toSyncDate: searchInputs.toSyncDate.value,
  };

  const endData = {};

  for (const key in k) {
    if (k[key]) {
      endData[key] = k[key];
    }
  }

  if (k.fromSyncDate) {
    const m = moment(new Date(k.fromSyncDate)).format("YYYY-MM-DD");
    endData.fromSyncDate = m;
  }

  if (endData.toSyncDate) {
    const m = moment(new Date(k.toSyncDate)).format("YYYY-MM-DD");
    endData.toSyncDate = m;
  }

  // {
  //   "orgCode":"001",
  //   "subInventory": "DUBAI NMC",
  //   "fromSyncDate": "2023-06-02",
  //   "toSyncDate" :  "2023-06-02"
  // }

  return endData;
};

export const generateTableDataSearch = (res) => {
  return res;
};

export const parCountSearchHeadings = [
  "Item Number",
  "Item Description",
  "UOM Code",
  "Organization Code",
  "Sub Inventory",
  "Locator",
  "Count Entered Quantity",
  "Sync By",
  "Sync Date",
  "Status",
  "Fusion Response",
];

export const infoTableHeadings = [
  "Fusion Id",
  "Response",
  "Request",
  "Creation Date",
  "Failed Records Count",
  "Group Id",
  "Return Message Code",
  "Return Message Text",
  "Return Status",
  "Success Record Count",
  "Total Record Count",
];
