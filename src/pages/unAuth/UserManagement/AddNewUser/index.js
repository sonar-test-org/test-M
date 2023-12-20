import React, { useEffect, useState } from "react";
import { Alert, Grid, Snackbar } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { Heading } from "./Heading";
import { UserDetails } from "./UserDetails";
import { TransactionPriviledge } from "./TransactionPriviledge";
import { Warehouse } from "./Warehouse";
import { Modal } from "./Modals/Modal";
import { SearchAndSelectWarehouseModalBody } from "./Modals/SearchAndSelectWarehouseModalBody";
import { ConfirmationModal } from "./Modals/ConfirmationModal";
import {
  createUserPost,
  getAllFusionUser,
  getAllPrintersUserMngt,
  getAllTransactionPriviledge,
  getAllWarehouseMaster,
  getMobileUser,
  getWarehouseByCodeName,
  updateMobileUser,
} from "../../../../services/api";
import {
  dummyList,
  errorFieldsMock,
  searchWarehouseInputs,
} from "./AddNewUserUtils";
import { Loader } from "../../../../components/Loader";
import { ALERT_TIMEOUT } from "../../../../utils/variables";
import {
  createDateFormat,
  createQueryParam,
} from "../../../../utils/commonService";
import {
  isValidEmail,
  isValidPassword,
} from "../../../../utils/userManagementUtils";
import { generateErrorMessage } from "../../../../utils/commonUtils";
import { useDispatch } from "react-redux";
import { userAddedInUserManagementMessage } from "../../../../redux/commonSlice";

export const AddNewUser = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    flag: "",
  });

  const [globalUser, setGlobalUser] = useState({});
  const [userDetails, setUserDetails] = useState({
    mobileUsername: "",
    fusionUsername: "",
    printer: "",
    password: "",
    email: "",
    fromDate: new Date(),
    toDate: null,
  });
  const [errorFields, setErrorFields] = useState({ ...errorFieldsMock });
  const [printers, setPrinters] = useState([]);
  const [fusionUsers, setFusionUsers] = useState([]);

  // Transaction Priviledge
  const [transactionPriviledgeData, setTransactionPriviledgeData] = useState(
    []
  );

  // warehouses
  const [openSelectWarehouseModal, setOpenSelectWarehouseModal] =
    useState(false);
  const [showRemoveWarehouseModal, setShowRemoveWarehouseModal] =
    useState(false);
  const [warehouseList, setWarehouseList] = useState([]);
  const [warehouseListGlobal, setWarehouseListGlobal] = useState([]);
  const [inputsWarehouse, setInputsWarehouse] = useState(searchWarehouseInputs);
  const [allWarehousesChecked, setAllWarehousesChecked] = useState(false);
  const [selectedWarehouses, setSelectedWarehouses] = useState([]);
  const [removeWarehouse, setRemoveWarehouse] = useState(null);

  // loading
  const [loading, setLoading] = useState(false);
  // password
  // const [passwordTouched, setPasswordTouched] = useState(false);
  // const [emailTouched, setEmailTouched] = useState(false);

  const updateUser = !!state?.selectedUserId;

  useEffect(() => {
    initialCalls();
  }, []);

  const initialCalls = async () => {
    setLoading(true);

    try {
      let newTransactionPriviledgeData = [];
      let newWarehouseData = [];
      let newSwlectedWarehouse = [];

      const warehouseRes = await getAllWarehouseMaster({});
      // Warehouse API
      if (warehouseRes.data) {
        const k = warehouseRes.data.map((el) => {
          return {
            warehouse: el.warehouseName,
            warehouseCode: el.warehouseCode,
            id: el.id,
            checked: false,
          };
        });

        newWarehouseData = k;
      } else throw new Error("Error in Warehouse API");

      // TransactionPriviledge API
      const transactionPrivRes = await getAllTransactionPriviledge({});
      if (transactionPrivRes.data) {
        const k2 = transactionPrivRes.data.map((el) => {
          return {
            id: el.id,
            label: el.privilegeName,
            name: el.privilegeName,
            checked: false,
          };
        });
        newTransactionPriviledgeData = k2;
      } else throw new Error("Error in TransactionPriviledge API");

      // FusionUser API
      const allFusionUserData = await getAllFusionUser({});
      if (allFusionUserData.data?.data) {
        const fusionUsersMapped = allFusionUserData.data.data.map(
          (el) => el.username
        );
        setFusionUsers(fusionUsersMapped);
      } else throw new Error("Error in FusionUser API");

      // Printer API
      const res = await getAllPrintersUserMngt();
      if (res?.data?.data) {
        setPrinters(res.data.data.map((el) => el.resourceName));
      } else throw new Error("Error in PrintersUser API");

      // Update User Details
      if (updateUser) {
        const getMobileUserRes = await getMobileUser({}, state?.selectedUserId);
        if (getMobileUserRes.data.data) {
          const user = getMobileUserRes.data.data;
          setUserDetails({
            id: user.id,
            mobileUsername: user.mobileUsername,
            fusionUsername: user.fusionUsername,
            password: "*****",
            email: user.email,
            fromDate: new Date(user.fromDate),
            toDate: new Date(user.toDate),
            printer: user.printer || "",
          });
          setGlobalUser(user);

          if (user.transactionPrivilegePerUser.length) {
            const newTrans = newTransactionPriviledgeData.map((el) => {
              if (user.transactionPrivilegePerUser.find((fn) => fn == el.id)) {
                return { ...el, checked: true };
              }
              return el;
            });
            newTransactionPriviledgeData = newTrans;
          }

          if (user.warehouseTransactionPerUser.length) {
            const newTrans = newWarehouseData.map((el) => {
              if (user.warehouseTransactionPerUser.find((fn) => fn == el.id)) {
                return { ...el, checked: true };
              }
              return el;
            });
            newWarehouseData = newTrans;
            newSwlectedWarehouse = newTrans.filter((fl) => fl.checked);
          }
        } else {
          throw new Error();
        }
      }

      setTransactionPriviledgeData(newTransactionPriviledgeData);
      setWarehouseList(newWarehouseData);
      setWarehouseListGlobal(newWarehouseData);
      setSelectedWarehouses(newSwlectedWarehouse);
      setLoading(false);
    } catch (error) {
      // const errorMsg =
      //   typeof error === "string" ? error : "Something went wrong";

      const errorMsg = generateErrorMessage(error);
      alertHandler(true, errorMsg, "error");
      setLoading(false);
    }
  };

  const onClickOkModal = () => {
    const filtered = warehouseList.filter((el) => el.checked);
    setSelectedWarehouses(filtered);
    setOpenSelectWarehouseModal(false);
  };

  const onClickCancel = () => {
    navigate("/user-management/user-list");
  };

  const showOrHideWarehouseModal = (type) => {
    setOpenSelectWarehouseModal(type);
  };

  const showOrHideRemoveWarehouseModal = (type) => {
    if (type === false) {
      setRemoveWarehouse(null);
    }
    setShowRemoveWarehouseModal(type);
  };

  const onClickRemoveWarehouse = (el) => {
    setRemoveWarehouse(el);
    setShowRemoveWarehouseModal(true);
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

  const onClickAddOrUpdateUser = async () => {
    if (
      userDetails.fusionUsername == "" ||
      userDetails.mobileUsername == "" ||
      userDetails.password == "" ||
      userDetails.fromDate == "" ||
      userDetails.email == ""
    ) {
      alertHandler(true, "Please fill all the required fields", "warning");
      const newErrorFields = JSON.parse(JSON.stringify(errorFields));
      for (const key in userDetails) {
        if (!userDetails[key] && newErrorFields[key]) {
          newErrorFields[key].error = true;
          newErrorFields[key].isTouched = true;
        }
      }
      setErrorFields(newErrorFields);
      return;
    }

    if (
      (errorFields.password.isTouched &&
        !isValidPassword(userDetails.password)) ||
      (errorFields.email.isTouched && !isValidEmail(userDetails.email))
    ) {
      alertHandler(true, "Please fill all the required fields", "warning");
      return;
    }

    const checkedItem = transactionPriviledgeData.find((el) => el.checked);
    if (!checkedItem) {
      alertHandler(true, "Please select Transaction Priviledge", "warning");
      return;
    }

    if (!selectedWarehouses.length) {
      alertHandler(true, "Please select atleast one Warehouse", "warning");
      return;
    }
    setLoading(true);
    const data = { ...userDetails, userStatus: "", isFirstLogin: "" };

    data.transactionPrivilegePerUser = transactionPriviledgeData
      .filter((el) => el.checked)
      .map((m) => m.id);

    data.warehouseTransactionPerUser = selectedWarehouses.map((el) => el.id);

    data.fromDate = createDateFormat(data.fromDate);
    data.toDate = createDateFormat(data.toDate);

    try {
      if (updateUser) {
        if (!errorFields.password.isTouched) {
          data.password = "";
          // data.password = globalUser.password;
        }

        const updateUserRes = await updateMobileUser(
          data,
          state?.selectedUserId
        );
        if (updateUserRes.data.data) {
          // alertHandler(true, "Successfully Updated User", "success");
          setLoading(false);
          dispatch(
            userAddedInUserManagementMessage("Successfully Updated User")
          );
          setTimeout(() => {
            dispatch(userAddedInUserManagementMessage(""));
          }, 5000);
          navigate("/user-management/user-list");
        } else throw new Error("");
      } else {
        const createUserRes = await createUserPost(data);
        if (createUserRes.data.data) {
          setLoading(false);
          dispatch(
            userAddedInUserManagementMessage("Successfully Created User")
          );
          setTimeout(() => {
            dispatch(userAddedInUserManagementMessage(""));
          }, 5000);
          navigate("/user-management/user-list");
        } else throw new Error("");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.status?.description;
      setLoading(false);
      alertHandler(
        true,
        errorMessage || "Something went wrong while Creating/Updating User",
        "error"
      );
    }
  };

  const handleChangeSelectWarehouse = (e) => {
    const { name, checked } = e.target;
    const k = warehouseList.map((el) => {
      if (el.warehouseCode === name) {
        return { ...el, checked: checked };
      }
      return { ...el };
    });
    setWarehouseList(k);
  };

  const onClickSearchWarehouse = async (item) => {
    setLoading(true);
    const data = {};
    inputsWarehouse.forEach((el) => {
      data[el.name] = el.value;
    });
    const params = createQueryParam(data);

    try {
      const searchWarehouseRes = await getWarehouseByCodeName({}, params);

      if (searchWarehouseRes.data) {
        const curItem = warehouseListGlobal.find(
          (fn) => fn.id === searchWarehouseRes.data.id
        );
        const k = {
          warehouse: searchWarehouseRes.data.warehouseName,
          warehouseCode: searchWarehouseRes.data.warehouseCode,
          id: searchWarehouseRes.data.id,
          checked: curItem.checked,
        };
        const newData = warehouseList
          .map((m) => {
            const searched = m.id === k.id;
            return {
              ...m,
              searched,
            };
          })
          .sort((a, b) => {
            if (a.searched) {
              return -1;
            } else return 1;
          });
        setWarehouseList(newData);
        setLoading(false);
      } else throw new Error("");
    } catch (error) {
      setLoading(false);
      const errorMessage = generateErrorMessage(error);
      alertHandler(true, errorMessage, "warning");
    }
  };

  const onChangeSearchWarehouseInputs = (event) => {
    const { name, value } = event.target;
    const updatedInputs = inputsWarehouse.map((el) => {
      if (el.name === name) {
        return { ...el, value };
      }
      return { ...el };
    });
    setInputsWarehouse(updatedInputs);
  };

  const onClickReset = () => {
    setInputsWarehouse(searchWarehouseInputs);
    setWarehouseList(warehouseList.map((m) => ({ ...m, searched: false })));
  };

  const onChangeCheckAll = (event) => {
    const checked = event.target.checked;
    setAllWarehousesChecked(checked);

    const k = warehouseList.map((el) => {
      return { ...el, checked };
    });
    setWarehouseList(k);
  };

  const confirmRemoveWarehouse = () => {
    const k = selectedWarehouses.filter((el) => {
      return el.warehouseCode !== removeWarehouse.warehouseCode;
    });
    setSelectedWarehouses(k);
    showOrHideRemoveWarehouseModal(false);
  };

  const onChangeUserDetails = (e) => {
    const { name, value } = e.target;
    const k = { ...userDetails, [name]: value };
    setUserDetails(k);

    // Error Details
    const newErrorFields = JSON.parse(JSON.stringify(errorFields));
    newErrorFields[name].error = false;
    setErrorFields(newErrorFields);
  };

  const onClickInput = (e) => {
    const { name, value } = e.target;
    const starred = value.includes("**");
    if (name === "password" && starred) {
      const k = { ...userDetails, [name]: "" };
      setUserDetails(k);
    }
  };

  const handleChangeDate = (value, name) => {
    const k = { ...userDetails, [name]: value };
    setUserDetails(k);
  };

  const onChangeTransPrv = (e) => {
    const { name, checked } = e.target;
    const k = transactionPriviledgeData.map((el) => {
      if (el.name === name) {
        return { ...el, checked };
      }
      return { ...el };
    });
    setTransactionPriviledgeData(k);
  };

  const onBlur = (e) => {
    const { name, value, required } = e.target;

    if (!required) return;

    const newErrorFields = JSON.parse(JSON.stringify(errorFields));
    newErrorFields[name].isTouched = true;
    if (value) {
      newErrorFields[name].error = false;
    } else {
      newErrorFields[name].error = true;
    }

    setErrorFields(newErrorFields);
  };

  return (
    <Grid className={classes.maincontainer}>
      <Loader loading={loading}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={alert.open}
        >
          <Alert severity={alert.flag} sx={{ width: "100%" }}>
            {alert.message}
          </Alert>
        </Snackbar>
        <Heading
          updateUser={updateUser}
          onClickCancel={onClickCancel}
          onClickAddOrUpdateUser={onClickAddOrUpdateUser}
        />
        <UserDetails
          userDetails={userDetails}
          onChangeUserDetails={onChangeUserDetails}
          handleChangeDate={handleChangeDate}
          printers={printers}
          fusionUsers={fusionUsers}
          updateUser={updateUser}
          onClickInput={onClickInput}
          onBlur={onBlur}
          errorFields={errorFields}
        />
        <TransactionPriviledge
          data={transactionPriviledgeData}
          onChangeTransPrv={onChangeTransPrv}
        />
        <Warehouse
          onClick={() => showOrHideWarehouseModal(true)}
          onClickRemoveWarehouse={onClickRemoveWarehouse}
          warehouseList={selectedWarehouses}
        />
        <Modal
          title="Search & select warehouse"
          open={openSelectWarehouseModal}
          setOpen={showOrHideWarehouseModal}
          onClickOk={onClickOkModal}
          modalBody={
            <SearchAndSelectWarehouseModalBody
              handleChangeSelectWarehouse={handleChangeSelectWarehouse}
              warehouseList={warehouseList}
              onClickSearchWarehouse={onClickSearchWarehouse}
              inputsWarehouse={inputsWarehouse}
              onChangeSearchWarehouseInputs={onChangeSearchWarehouseInputs}
              onClickReset={onClickReset}
              onChangeCheckAll={onChangeCheckAll}
              allWarehousesChecked={allWarehousesChecked}
            />
          }
        />
        <ConfirmationModal
          title="Are you sure you want to remove this warehouse"
          open={showRemoveWarehouseModal}
          setOpen={showOrHideRemoveWarehouseModal}
          onClickOk={() => {
            confirmRemoveWarehouse();
          }}
        />
      </Loader>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  maincontainer: {
    padding: "0px 100px 100px 100px",
    minHeight: "100vh",
    position: "relative",
  },
}));
