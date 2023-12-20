export const transactionPriviledgeDatamock = [
  {
    id: 0,
    label: "Cycle Count",
    name: "cycleCount",
    checked: false,
  },
  {
    id: 1,
    label: "Inspection Details AdHoc",
    name: "inspectionDetailsAdHoc",
    checked: false,
  },
  { id: 2, label: "Receiving", name: "receiving", checked: false },
  { id: 3, label: "Put Away", name: "putAway", checked: false },
  { id: 4, label: "Pick Confim", name: "pickConfim", checked: false },
  {
    id: 5,
    label: "Process MFG Operation Completion",
    name: "processMFGOperationCompletion",
    checked: false,
  },
];

export const allUSerHeadings = [
  "Mobile Username",
  "Email",
  "Fusion Username",
  "Printer",
  "From Date",
  "To Date",
  "Details",
  "History",
];

export const userHistoryHeadings = [
  "Username",
  "Comments",
  "Enter By",
  "History Date",
];

export const searchInputsMock = [
  {
    name: "username",
    value: "",
    label: "Mobile Username",
    id: 1,
  },
  {
    name: "fusionUsername",
    value: "",
    label: "Fusion Username",
    id: 2,
  },
  { name: "printer", value: "", label: "Printer", id: 3 },
];

export const romoveDuplicatesArray = (arr, name) => {
  const newArr = [];
  arr.forEach((el) => {
    const exists = newArr.some((sm) => sm[name] === el[name]);
    if (exists) {
      return;
    } else {
      newArr.push(el);
    }
  });
  return newArr;
};

export const createResourcesData = (printerId, printer, ip, port, id) => {
  return {
    printerId,
    printer,
    ip,
    port,
    id,
  };
};

export const resourcesDataMock = [
  createResourcesData("1", "Test Printer 1", "10.10.10.1", "10", 1),
  createResourcesData("2", "Test Printer 2", "10.10.10.1", "11", 2),
  createResourcesData("3", "Test Printer 3", "10.10.10.1", "12", 3),
];

export const resourcesHeadings = [
  "Printer Id",
  "Printer",
  "IP",
  "Port",
  "Delete",
];

export const createFusionUsersData = (Id, username, password, personId, id) => {
  return {
    Id,
    username,
    password,
    personId,
    id,
  };
};

export const fusionUsersDataMock = [
  createFusionUsersData("1", "paras@mastec.com", "pass", "12345678", 1),
  createFusionUsersData("2", "paras2@mastec.com", "pass", "12345679", 2),
  createFusionUsersData("3", "paras3@mastec.com", "pass", "12345680", 3),
];

export const fusionUsersHeadings = [
  "Fusion Userid",
  "Fusion Username",
  "Fusion Password",
  "Fusion PersonId",
  "Delete",
];

export const addPrinterInputsMock = [
  {
    name: "resourceName",
    value: "",
    label: "Printer",
    id: 1,
  },
  {
    name: "ipAddress",
    value: "",
    label: "IP",
    id: 2,
  },
  { name: "port", value: "", label: "Port", id: 3 },
];

export const createEditPrinterInputs = (selectedItem) => {
  const inputs = [
    {
      name: "resourceName",
      value: selectedItem.resourceName || "",
      label: "Printer",
      id: 1,
    },
    {
      name: "ipAddress",
      value: selectedItem.ipAddress || "",
      label: "IP",
      id: 2,
    },
    { name: "port", value: selectedItem.port || "", label: "Port", id: 3 },
  ];
  return inputs;
};

export const addFusionUSerInputsMock = [
  {
    name: "username",
    value: "",
    id: 1,
    label: "Fusion User Name",
  },
  {
    name: "password",
    value: "",
    id: 2,
    label: "Fusion Password",
  },
];

export const editFusionUSerInputsMock = [
  {
    name: "username",
    value: "",
    id: 1,
    label: "Fusion User Name",
  },
  {
    name: "password",
    value: "",
    id: 2,
    label: "Fusion Password",
  },
];

export const createEditFusionUSerInputsMock = (selectedRow) => {
  const inputs = [
    {
      name: "username",
      value: selectedRow.username,
      id: 1,
      label: "Fusion User Name",
    },
    {
      name: "password",
      value: selectedRow.password,
      id: 2,
      label: "Fusion Password",
    },
  ];

  return inputs;
};

export const createErrorText = (pass) => {
  const errors = [];
  const lowerCaseIncluded = pass.match(/[a-z]/g);
  const upperCaseIncluded = pass.match(/[A-Z]/g);
  const numberIncluded = pass.match(/[0-9]/g);
  const specialCharacterIncluded = /[*@!#%&()^~{}$]+/.test(pass);

  if (pass.length < 8) {
    errors.push("Must contain atleast 8 characters");
  }
  if (!lowerCaseIncluded) {
    errors.push("Must contain one lower case");
  }
  if (!upperCaseIncluded) {
    errors.push("Must contain one upper case");
  }
  if (!numberIncluded) {
    errors.push("Must contain one number");
  }
  if (!specialCharacterIncluded) {
    errors.push("Must contain one special Character");
  }

  return errors;
};

export const isValidEmail = (emailAddress) => {
  var sQtext = "[^\\x0d\\x22\\x5c\\x80-\\xff]";
  var sDtext = "[^\\x0d\\x5b-\\x5d\\x80-\\xff]";
  var sAtom =
    "[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+";
  var sQuotedPair = "\\x5c[\\x00-\\x7f]";
  var sDomainLiteral = "\\x5b(" + sDtext + "|" + sQuotedPair + ")*\\x5d";
  var sQuotedString = "\\x22(" + sQtext + "|" + sQuotedPair + ")*\\x22";
  var sDomain_ref = sAtom;
  var sSubDomain = "(" + sDomain_ref + "|" + sDomainLiteral + ")";
  var sWord = "(" + sAtom + "|" + sQuotedString + ")";
  var sDomain = sSubDomain + "(\\x2e" + sSubDomain + ")*";
  var sLocalPart = sWord + "(\\x2e" + sWord + ")*";
  var sAddrSpec = sLocalPart + "\\x40" + sDomain; // complete RFC822 email address spec
  var sValidEmail = "^" + sAddrSpec + "\\.(com|co|co\\.in)$"; // as whole string with valid top-level domain

  var reValidEmail = new RegExp(sValidEmail);

  return reValidEmail.test(emailAddress);
};

export const isValidPassword = (pass) => {
  const lowerCaseIncluded = pass.match(/[a-z]/g);
  const upperCaseIncluded = pass.match(/[A-Z]/g);
  const numberIncluded = pass.match(/[0-9]/g);
  const specialCharacterIncluded = /[*@!#%&()^~{}$]+/.test(pass);

  if (pass.length < 8) {
    return false;
  }
  if (!lowerCaseIncluded) {
    return false;
  }
  if (!upperCaseIncluded) {
    return false;
  }
  if (!numberIncluded) {
    return false;
  }
  if (!specialCharacterIncluded) {
    return false;
  }
  return true;
};
