import moment from "moment";

export const afterValidate = (callBack, setSnakeBarProps) => {
  var errorMszDom = [];
  setTimeout(() => {
    errorMszDom = document.getElementsByClassName("errorDom");
    if (errorMszDom.length == 0) {
      callBack();
    } else {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Please fill all the required field",
        type: "error",
      });
    }
  });
};

export const setInput = (value, type, pageData, setPageData) => {
  setPageData({ ...pageData, [type]: value });
};
var mnths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const dateConverter = (str) => {
  if (typeof str == "string") {
    // console.log('str', typeof (str))
    var date = str?.split("-");
    var mnth = mnths[date[1] - 1];
    return `${date[0]}-${mnth}-${date[2]}`;
  } else {
    return null;
  }
};
export const dateConverterWithoutYear = (str) => {
  if (typeof str == "string") {
    // console.log('str', typeof (str))
    var date = str?.split("-");
    var mnth = mnths[date[1] - 1];
    return `${date[0]}-${mnth}`;
  } else {
    return null;
  }
};

export const createQueryParam = (obj) => {
  if (!obj) return "";
  const searchParams = new URLSearchParams();
  Object.keys(obj).forEach((key) => searchParams.append(key, obj[key]));
  return searchParams.toString();
};

export const createDateFormat = (date) => {
  return moment(new Date(date)).format("YYYY-MM-DD");
};
