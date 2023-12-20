export const generateTableDataSearch = (res, allUsers) => {
  const data = res.map((el) => {
    return {
      ...el,
      selected: false,
      pcAssignedUserName: {
        value: el.pcAssignedUserName || "",
        id: el.pcAssignedUserId || "",
        name: "pcAssignedUserName",
        label: "Username",
        fields: [{ name: "username", label: "Username", value: "" }],
        resultOptions: allUsers.map((user) => {
          return {
            select: user.username === el.pcAssignedUserName,
            username: user.pcAssignedUserName,
            id: user.id,
            _id: user._id,
          };
        }),
      },
      statusLocal: {
        value: el.status || "",
        label: "Status",
        options: ["RECOUNT", "ACCEPT"],
        disabled:
          !el.status ||
          el.status === "WAITING_FOR_COUNT" ||
          el.status === "PENDING",
      },
    };
  });

  return data;
};

export const physicalCountSearchHeadings = [
  // { label: "Select", width: "" },
  { label: "Select", width: "", type: "selectAll" },
  { label: "Tag Number", width: "" },
  { label: "Sub Inventory", width: "" },
  { label: "Locator", width: "" },
  { label: "Item Number", width: "" },
  { label: "Item Description", width: "" },
  { label: "Item Category", width: "" },
  { label: "Lot Number", width: "" },
  { label: "Serial Number", width: "" },
  { label: "Tag Uom", width: "" },
  { label: "Tag Type Code", width: "" },
  { label: "Snapshot Quantity", width: "" },
  { label: "Mobile Quantity", width: "" },
  { label: "Variance Quantity", width: "" },
  { label: "Unit Cost Fd", width: "" },
  { label: "Username", width: "" },
  { label: "Status", width: "" },
];

export const createSearchAPIQueryParams = (data) => {
  const searchAPIQueryParams = {};
  for (const key in data) {
    if (data[key].value) {
      searchAPIQueryParams[key] = data[key].value;
    }
  }

  return searchAPIQueryParams;
};

export const searchFieldsMock = {
  subInventory: {
    value: "",
    name: "subInventory",
    label: "Sub Inventory",
    required: false,
    fields: [{ name: "subInventory", label: "Sub Inventory", value: "" }],
    resultOptions: [],
  },
  itemDescription: {
    value: "",
    name: "itemDescription",
    label: "Item Description",
    required: false,
    fields: [{ name: "itemDescription", label: "Item Description", value: "" }],
    resultOptions: [],
  },
  itemNumber: {
    value: "",
    name: "itemNumber",
    label: "Item Number",
    required: false,
    fields: [{ name: "itemNumber", label: "Item Number", value: "" }],
    resultOptions: [],
  },
  organizationCode: {
    value: "",
    name: "organizationCode",
    label: "Organization Code",
    required: true,
    error: false,
    fields: [
      { name: "organizationCode", label: "Organization Code", value: "" },
    ],
    resultOptions: [],
  },
  locator: {
    value: "",
    name: "locator",
    label: "Locator",
    required: false,
    fields: [{ name: "locator", label: "Locator", value: "" }],
    resultOptions: [],
  },
  physicalInventoryName: {
    value: "",
    name: "physicalInventoryName",
    label: "Physical Inventory Name",
    required: true,
    error: false,
    fields: [
      {
        name: "physicalInventoryName",
        label: "Physical Inventory Name",
        value: "",
      },
    ],
    resultOptions: [],
  },
  pcAssignedUserName: {
    value: "",
    name: "pcAssignedUserName",
    label: "Username",
    required: false,
    fields: [
      {
        name: "userid",
        label: "Userid",
        value: "",
      },
      {
        name: "username",
        label: "Username",
        value: "",
      },
    ],
    resultOptions: [],
  },
};

export const checkIsSubmitedForApproval = (status) => {
  return status && (status === "PA" || status === "A");
};