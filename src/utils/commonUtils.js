import moment from "moment";

export const generateErrorMessage = (error) => {
  console.log("API Error", error);
  const errorMessage =
    error?.response?.data?.status?.description ||
    error?.response?.data?.status?.header ||
    error.message ||
    "Something went wrong!";

  return errorMessage;
};

export const convertToTitleCase = (str) => {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (match) => match.toUpperCase());
};

export const reduceText = (string, width) => {
  if (typeof string !== "string") return string;
  if (string.length <= width) {
    return string;
    // return <p>{string}</p>;
  } else {
    const reducedString = string.slice(0, width - 3) + "...";
    return reducedString;
    // return <p>{reducedString}</p>;
  }
};

export const generateFileFromBaseString = (base64String, templateFileName) => {
  // Your base64 string
  // const base64String = '...'; // Replace with your actual base64 string

  // Decode the base64 string to binary data
  const binaryString = atob(base64String);

  // Create a Uint8Array from the binary data
  const byteArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }

  // Create a Blob from the Uint8Array
  const blob = new Blob([byteArray], { type: "text/plain" });

  // Create a File from the Blob (optional, you can use the Blob directly)
  const file = new File([blob], `${templateFileName}`, {
    type: "text/plain",
  });

  // Now, 'file' contains your file in the appropriate format

  // You can access the file properties like name, type, and size:
  return file;
  // You can also use 'blob' if you don't need a File object
};

export const generateDateFromArray = (dateComponents) => {
  const dateMoment = moment(dateComponents);
  const formattedDate = dateMoment.format("DD/MM/YYYY");
  return formattedDate;
};

export const downloadTXTFileUsingBase64String = (base64String, fileName) => {
  // Step 1: Decode the base64 string
  const decodedString = atob(base64String);

  // Step 2: Create a blob object
  const blob = new Blob([decodedString], { type: "text/plain" });
  const blobURL = window.URL.createObjectURL(blob);

  // Step 3: Trigger the download
  const tempLink = document.createElement("a");
  tempLink.href = blobURL;
  tempLink.setAttribute("download", fileName || "textfile.txt");
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
};

export const generateDateInStrFormat = (dt) => {
  if (!dt) return "";
  const date = new Date(dt);
  return moment(date).format("YYYY-MM-DD");
  // return moment(date).format("DD/MM/YYYY");
};

export const locationOptions = [
  { category: true, label: "User Management" },
  { value: "/user-management/user-list", label: "User List" },
  { value: "/user-management/add-update-user", label: "Add User" },

  { category: true, label: "Scheduler" },
  { value: "/scheduler/generic-scheduler", label: "Scheduler Generic" },
  { value: "/scheduler/general-setup", label: "Scheduler General Setup" },

  { category: true, label: "Physical Count" },
  { value: "/physical-count/search", label: "Search PC" },
  {
    value: "/physical-count/notifications",
    label: "Notifications PC",
  },
  {
    value: "/physical-count/approval-setup",
    label: "Approval Setup PC",
  },

  { category: true, label: "Cycle Count" },
  { value: "/cycle-count/search", label: "Search CC" },
  {
    value: "/cycle-count/notifications",
    label: "Notifications CC",
  },
  {
    value: "/cycle-count/approval-setup",
    label: "Approval Setup CC",
  },
  { category: true, label: "Par Count" },
  { value: "/par-count/sync", label: "Par Count" },

  { category: true, label: "Label Printing" },
  { value: "/label-printing/template-master", label: "Template Master" },
  { value: "/label-printing/label-history", label: "Label History" },
  {
    value: "/label-printing/transaction-key-mapping",
    label: "Transaction key mapping",
  },
  { value: "/label-printing/zpl-mapping", label: "ZPL mapping" },
  { value: "/label-printing/ess-mapping", label: "ESS mapping" },
];

export const disableFutureDates = (date) => {
  const currentDate = new Date(); // Today's date
  currentDate.setHours(0, 0, 0, 0); // Resetting the time part to compare only the date

  return date > currentDate; // Returns `true` for dates after today
};
