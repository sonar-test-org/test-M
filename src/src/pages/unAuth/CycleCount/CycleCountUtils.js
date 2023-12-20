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
  "From Amount",
  "To Amount",
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
    personId: {
      name: "personId",
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
    fromAmount: {
      value: "",
      error: false,
      label: "From Amount",
    },
    toAmount: {
      value: "",
      error: false,
      label: "To Amount",
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
      personId: {
        name: "personId",
        label: "Person Number",
        value: el.personId || "",
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
      fromAmount: {
        value: el.fromAmount,
        error: false,
        label: "From Amount",
      },
      toAmount: {
        value: el.toAmount,
        error: false,
        label: "To Amount",
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
    personId: el.personId?.value || "",
    fromAmount: el.fromAmount?.value || "",
    toAmount: el.toAmount?.value || "",
    level: el.approvalLevel?.value || "",
    createdBy: el.createdBy || "",
    createdDate: el.createdDate,
    modifiedBy: el.modifiedBy || "",
    modifiedDate: el.modifiedDate || "",
  };
};

export const createPayloadCreate = (el, organizationId) => {
  return {
    organizationId: organizationId,
    orgCode: el.organizationCode?.value || "",
    subInvCode: null,
    personName: el.personName?.value || "",
    personId: el.personId?.value || "",
    fromAmount: el.fromAmount?.value || "",
    toAmount: el.toAmount?.value || "",
    level: el.approvalLevel.value,
    createdBy: "User",
  };
};

export const notificationTableMock = [
  "Cycle Count Name",
  "Notification From",
  "Status",
  "Action",
];

export const approveTableHeadingsMock = [
  "Item Code",
  "Item Description",
  "UOM",
  "Total Count Qty",
  "Total System Qty",
  "Unit Cost",
  "Quantity Variance",
  "Quantity Variance Percent(%)",
  "Unit Cost Variance",
  "Status",
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

export const checkIsSubmitedForApproval = (status) => {
  return status && (status === "PA" || status === "A");
};
