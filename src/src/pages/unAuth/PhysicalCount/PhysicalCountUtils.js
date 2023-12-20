export const searchInputMock = {
  name: "organizationCode",
  value: "",
  label: "Organization Code",
  id: 1,
  error: false,
  fields: [{ name: "organizationCode", label: "Organization Code", value: "" }],
  resultOptions: [],
};

export const tableHeadings = [
  "Organization Code",
  "Person Number",
  "Person Name",
  "Approval Level",
  "Existance Status",
  "Delete",
];

export const generateNewEntry = (approvers, allOrganizationCodes) => {
  const personNames = approvers.map((el, i) => ({
    select: false,
    personName: el.personName,
    _id: i + 1,
  }));

  const tableDataMock = {
    organizationCode: {
      value: "",
      error: false,
      name: "organizationCode",
      label: "Organization Code",
      fields: [
        { name: "organizationCode", label: "Organization Code", value: "" },
      ],
      resultOptions: [...allOrganizationCodes],
    },
    personNumber: {
      name: "personNumber",
      label: "Person Number",
      value: "",
      error: false,
      disabled: false,
    },
    personName: {
      value: "",
      error: false,
      label: "Person Name",
      name: "personName",
      fields: [{ name: "personName", label: "Person Name", value: "" }],
      resultOptions: personNames,
    },
    approvalLevel: {
      value: "",
      error: false,
      label: "",
    },
    fromDB: false,
    touched: false,
  };

  return tableDataMock;
};

export const generateApprovalSetupTableData = (
  approvers,
  allOrganizationCodes
) => {
  const personNames = approvers.map((el, i) => ({
    select: false,
    personName: el.personName,
    _id: i + 1,
  }));

  const k = approvers.map((el) => {
    return {
      ...el,
      organizationCode: {
        value: el.orgCode,
        error: false,
        name: "organizationCode",
        label: "Organization Code",
        fields: [
          { name: "organizationCode", label: "Organization Code", value: "" },
        ],
        resultOptions: [...allOrganizationCodes],
      },
      personNumber: {
        name: "personNumber",
        label: "Person Number",
        value: el.personNumber || "",
        error: false,
        disabled: true,
      },
      personName: {
        value: el.personName,
        error: false,
        label: "Person Name",
        name: "personName",
        fields: [{ name: "personName", label: "Person Name", value: "" }],
        resultOptions: personNames,
      },
      approvalLevel: {
        value: el.level,
        error: false,
        label: "Approval Level",
      },
      fromDB: true,
      touched: false,
    };
  });

  return k;
};

export const createPayloadUpdate = (el) => {
  return {
    id: el.id,
    orgCode: el.organizationCode?.value || "",
    orgId: el.orgId || "",
    subInvCode: el.subInvCode || "",
    personName: el.personName?.value || "",
    personNumber: el.personNumber?.value || "",
    level: el.approvalLevel?.value || "",
    createdBy: el.createdBy || "",
    createdDate: el.createdDate,
    modifiedBy: el.modifiedBy || "",
    modifiedDate: el.modifiedDate || "",
  };
};

export const createPayloadCreate = (el, organizationId, userDetails) => {
  return {
    orgId: organizationId,
    orgCode: el.organizationCode?.value || "",
    personName: el.personName?.value || "",
    personNumber: el.personNumber?.value || "",
    level: el.approvalLevel.value,
    createdBy: userDetails.userName,
  };
};

export const notificationTableMock = [
  "Physical Inventory Name",
  "Notification From",
  "Status",
  "Action",
];

export const approveTableHeadingsMock = [
  "Tag Number",
  "Sub Inventory",
  "Item Number",
  "Item Description",
  "Cross Reference",
  "Quantity",
  "Lot Number",
  "Serial Number",
  "Item Uom",
  "Tag Uom",
  "Tag Type Count",
  "Mobile Quantity",
  "Username",
];

export const approveTableMock = [
  {
    tagNumber: "GR2",
    subInventory: "GRIDS",
    itemNumber: "GN1221",
    itemDescription: "NegGrids",
    crossReference: "",
    quantity: "1",
    lotNumber: "2",
    serialNumber: "",
    itemUom: "EA",
    tagUom: "EA",
    tagTypeCount: "1",
    mobileQuantity: "1000",
    username: "RUSHABH",
  },
  {
    tagNumber: "GR2",
    subInventory: "GRIDS",
    itemNumber: "GN1221",
    itemDescription: "NegGrids",
    crossReference: "",
    quantity: "1",
    lotNumber: "2",
    serialNumber: "",
    itemUom: "EA",
    tagUom: "EA",
    tagTypeCount: "1",
    mobileQuantity: "1000",
    username: "RUSHABH",
  },
  {
    tagNumber: "GR2",
    subInventory: "GRIDS",
    itemNumber: "GN1221",
    itemDescription: "NegGrids",
    crossReference: "",
    quantity: "1",
    lotNumber: "2",
    serialNumber: "",
    itemUom: "EA",
    tagUom: "EA",
    tagTypeCount: "1",
    mobileQuantity: "1000",
    username: "RUSHABH",
  },
  {
    tagNumber: "GR2",
    subInventory: "GRIDS",
    itemNumber: "GN1221",
    itemDescription: "NegGrids",
    crossReference: "",
    quantity: "1",
    lotNumber: "2",
    serialNumber: "",
    itemUom: "EA",
    tagUom: "EA",
    tagTypeCount: "1",
    mobileQuantity: "1000",
    username: "RUSHABH",
  },
  {
    tagNumber: "GR2",
    subInventory: "GRIDS",
    itemNumber: "GN1221",
    itemDescription: "NegGrids",
    crossReference: "",
    quantity: "1",
    lotNumber: "2",
    serialNumber: "",
    itemUom: "EA",
    tagUom: "EA",
    tagTypeCount: "1",
    mobileQuantity: "1000",
    username: "RUSHABH",
  },
  {
    tagNumber: "GR2",
    subInventory: "GRIDS",
    itemNumber: "GN1221",
    itemDescription: "NegGrids",
    crossReference: "",
    quantity: "1",
    lotNumber: "2",
    serialNumber: "",
    itemUom: "EA",
    tagUom: "EA",
    tagTypeCount: "1",
    mobileQuantity: "1000",
    username: "RUSHABH",
  },
];
