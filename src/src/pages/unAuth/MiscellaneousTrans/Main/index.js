import { Alert, Box, Snackbar } from "@mui/material";
import { Loader } from "../../../../components/Loader";
import { PageHeading } from "../../../../components/TextUI/PageHeading";
import { useState } from "react";
import { ALERT_TIMEOUT, ERROR, INFO } from "../../../../utils/variables";
import {
  apiDependencies,
  generateExpenditureOrgRows,
  generateExpenditureRows,
  generateLocatorRows,
  generateOrgRows,
  generateProjectRows,
  generateProjectTasks,
  generateSubInventoryRows,
  generateTransactionType,
  locatorBody,
  miscInputsMock,
  subInventoryBody,
} from "./miscUtils";
import { Buttons } from "./Buttons";
import { InputGroup } from "../../../../components/InputGroup/Index";
import { useEffect } from "react";
import {
  getExpenditureOrgs,
  getExpenditureTypes,
  getOrganizationMisc,
  getProjects,
  getSubInventories,
  getProjectTasks,
  getTransactionType,
  getLocators,
} from "../../../../services/api";
import { generateErrorMessage } from "../../../../utils/commonUtils";
import { useNavigate } from "react-router-dom";

export const MiscellaneousTrans = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    flag: "",
  });

  const [miscInputs, setMiscInputs] = useState([...miscInputsMock]);

  useEffect(() => {
    initialCalls();
  }, []);

  const initialCalls = async () => {
    try {
      setLoading(true);
      const apis = [
        getOrganizationMisc(),
        getTransactionType(),
        getProjects(),
        getProjectTasks(),
        getExpenditureTypes(),
        getExpenditureOrgs(),
      ];

      const resArray = await Promise.all(apis);

      const resObj = {
        organization: generateOrgRows(resArray[0]),
        transactionType: generateTransactionType(resArray[1]),
        project: generateProjectRows(resArray[2]),
        projectTask: generateProjectTasks(resArray[3]),
        expenditureType: generateExpenditureRows(resArray[4]),
        expenditureOrganization: generateExpenditureOrgRows(resArray[5]),
      };

      const newInputs = miscInputs.map((el) => {
        if (el.type === "lookup") {
          return { ...el, rows: resObj[el.name] || [] };
        }
        return el;
      });
      setMiscInputs(newInputs);
    } catch (error) {
      console.log("my error", error);
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, ERROR);
    }
    setLoading(false);
  };

  const alertHandler = (type, message, flag) => {
    setAlert({
      open: type,
      message,
      flag,
    });

    setTimeout(() => {
      setAlert({
        open: false,
        message: "",
        flag: "",
      });
    }, ALERT_TIMEOUT);
  };

  const onChange = (e, type, selectedRow, isAsyncMethod) => {
    const { name, value } = e.target;
    const inputsNew = miscInputs.map((el) => {
      const element = { ...el };
      if (el.name === name) {
        element.error = false;
        element.value = value;
        if (selectedRow) {
          element.selectedRow = { ...selectedRow };
        }
      }
      return element;
    });
    setMiscInputs(inputsNew);
    if (type === "lookupOnClickOk") {
      fetchRows(name, inputsNew);
    }
  };

  const fetchRows = async (name, updatedInputs) => {
    let shouldMakeApiCall = false;
    const apiKeys = [];
    for (const key in apiDependencies) {
      if (apiDependencies[key].includes(name)) {
        shouldMakeApiCall = true;
        apiKeys.push(key);
      }
    }

    if (!shouldMakeApiCall) return;

    setLoading(true);
    const apisList = {
      subInventory: getSubInventories(subInventoryBody(updatedInputs)),
      locator: getLocators(locatorBody(updatedInputs)),
    };

    const apisArr = apiKeys.map((el) => ({ name: el, api: apisList[el] }));
    const apis = await Promise.allSettled(
      apisArr.map(async (el) => {
        const res = await el.api;
        return { name: el.name, res };
      })
    );
    console.log("my api test apis", apis);

    // error scenarios
    const rejectedCalls = apis.filter((api) => api.status === "rejected");
    const errorMessages = rejectedCalls.map((el) =>
      generateErrorMessage(el.reason)
    );
    // if (errorMessages.length) {
    //   alertHandler(true, errorMessages[0], ERROR);
    // }

    // success calls
    const rowGenerator = {
      subInventory: generateSubInventoryRows,
      locator: generateLocatorRows,
    };
    const newInputs = apis
      .filter((api) => api.status === "fulfilled")
      .map((el) => el.value)
      .reduce((acu, cur) => {
        return acu.map((inp) => {
          if (inp.name === cur.name) {
            const fn = rowGenerator[inp.name];
            return { ...inp, rows: fn(cur.res) };
          }
          return inp;
        });
      }, updatedInputs);
    setMiscInputs(newInputs);

    setLoading(false);
  };

  const validate = () => {
    const inValidFields = miscInputs.filter((fl) => !fl.value);
    if (!!inValidFields.length) {
      const newInputs = miscInputs.map((el) => {
        const error = el.required && !el.value;
        return { ...el, error };
      });
      alertHandler(true, "Please fill all required fields", INFO);
      setMiscInputs(newInputs);
    }

    return !!inValidFields.length;
  };

  const onClickNext = () => {
    const isInValid = validate();
    if (isInValid) return;

    navigate("/miscellaneous-transaction/item-details", {
      state: {
        miscInputs: miscInputs.map((el) => ({
          name: el.name,
          value: el.value,
          selectedRow: el.selectedRow,
        })),
      },
    });
  };

  return (
    <Box sx={styles.maincontainer}>
      <Loader loading={loading}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={alert.open}
        >
          <Alert severity={alert.flag} sx={{ width: "100%" }}>
            {alert.message}
          </Alert>
        </Snackbar>
        <PageHeading text="Miscellaneous Transaction" />
        <InputGroup inputs={miscInputs} onChange={onChange} />
        <Buttons onClickNext={onClickNext} />
      </Loader>
    </Box>
  );
};

const styles = {
  maincontainer: {
    padding: "0px 100px 100px 100px",
    minHeight: "100vh",
  },
};
