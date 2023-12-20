export const generateTableDataSearch = (res, allUsers) => {
  const data = res.map((el) => {
    return {
      ...el,
      selected: false,
      assignedUsername: {
        value: el.assignedUsername || "",
        id: el.assignedUserId || "",
        name: "assignedUsername",
        label: "Username",
        fields: [{ name: "assignedUsername", label: "Username", value: "" }],
        resultOptions: allUsers.map((user) => {
          return {
            select: user.assignedUsername === el.assignedUsername,
            assignedUsername: user.assignedUsername,
            id: user.id,
            _id: user._id,
          };
        }),
      },
      statusLocal: {
        value: el.status ||  "",
        label: "Status",
        options: ["RECOUNT", "ACCEPT", "REJECT"],
        disabled:
          !el.status ||
          el.status === "WAITING_FOR_COUNT" ||
          el.status === "PENDING",
      },
      varienceQtyPercent: ((el.varienceQty / el.countQty) * 100).toFixed(2),
    };
  });

  return data;
};


export const physicalCountSearchHeadings = [
  { label: "Select", width: "", type: 'selectAll' },
  { label: "Sequence Number", width: "" },
  { label: "Example", width: "" },
  { label: "Item Code", width: "" },
  { label: "Item Description", width: "" },
  { label: "UOM", width: "" },
  { label: "Sub Inventory", width: "" },
  { label: "Locator", width: "" },
  { label: "Lot", width: "" },
  { label: "Serial", width: "" },
  { label: "System Quantity", width: "" },
  { label: "Total Count Quantity", width: "" },
  { label: "Quantity Variance", width: "" },
  { label: "Quantity Variance Percentage(%)", width: "" },
  { label: "Item Cost", width: "" },
  { label: "Total Cost", width: "" },
  { label: "Assigned User", width: "" },
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
  organizationCode: {
    value: "",
    name: "organizationCode",
    label: "Organization Code",
    required: true,
    error: false,
    fields: [
      { name: "organizationCode", label: "Organization Code", value: "" },
    ],
    resultOptions: [
      { select: false, organizationCode: "SE_REC" },
      { select: false, organizationCode: "CLP_DC" },
      { select: false, organizationCode: "PZ_MFG" },
      { select: false, organizationCode: "LC_MFG" },
    ],
  },
  subInventory: {
    value: "",
    name: "subInventory",
    label: "Sub Inventory",
    required: false,
    fields: [{ name: "subInventory", label: "Sub Inventory", value: "" }],
    resultOptions: [
      { select: false, subInventory: "SE_REC" },
      { select: false, subInventory: "CLP_DC" },
      { select: false, subInventory: "PZ_MFG" },
      { select: false, subInventory: "LC_MFG" },
    ],
  },
  locator: {
    value: "",
    name: "locator",
    label: "Locator",
    required: false,
    fields: [{ name: "locator", label: "Locator", value: "" }],
    resultOptions: [
      { select: false, locator: "SE_REC" },
      { select: false, locator: "CLP_DC" },
      { select: false, locator: "PZ_MFG" },
      { select: false, locator: "LC_MFG" },
    ],
  },
  cycleCountHeaderName: {
    value: "",
    name: "cycleCountHeaderName",
    label: "Cycle Count Name",
    required: true,
    error: false,
    fields: [
      {
        name: "cycleCountHeaderName",
        label: "Cycle Count Name",
        value: "",
      },
    ],
    resultOptions: [
      { select: false, "Cycle Count Name": "SE_REC" },
      { select: false, "Cycle Count Name": "CLP_DC" },
      { select: false, "Cycle Count Name": "PZ_MFG" },
      { select: false, "Cycle Count Name": "LC_MFG" },
    ],
  },
};
