import React, { useEffect, useState } from "react";
import { Alert, Box, Snackbar, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { CustomTable } from "./CustomTable";
import {
  addPrinterInputsMock,
  createEditPrinterInputs,
  resourcesDataMock,
} from "../../../../../utils/userManagementUtils";
import { CustomModal } from "./Modals/CustomModal";
import { AddNewPrinterModal } from "./Modals/AddNewPrinterModal";
import { EditPrinterModal } from "./Modals/EditPrinterModal";
import {
  createPrinterUserMngt,
  deletePrinterUserMngt,
  getAllPrintersUserMngt,
  updatePrinterUserMngt,
} from "../../../../../services/api";
import { Loader } from "../../../../../components/Loader";
import { ALERT_TIMEOUT } from "../../../../../utils/variables";
import { ConfirmationModal } from "../../AddNewUser/Modals/ConfirmationModal";
import { SubHeader } from "../../../../../components/Headers/SubHeader";
import { useNavigate } from "react-router-dom";

export const Resources = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  // add printer
  const [showAddPrinterModal, setShowAddPrinterModal] = useState(false);
  const [addPrinterInputs, setAddPrinterInputs] =
    useState(addPrinterInputsMock);

  // delete printer
  const [
    showDeletePrinterConfirmationModal,
    setDeletePrinterPrinterConfirmationModal,
  ] = useState(false);

  // edit printer
  const [showEditPrinterModal, setShowEditPrinterModal] = useState(false);
  const [editPrinterInputs, setEditPrinterInputs] =
    useState(addPrinterInputsMock);

  // selected Printer
  const [selectedRowId, setSelectedRowId] = useState(null);

  const selectedRow = tableData.find((el) => el.id === selectedRowId);

  // alert
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    flag: "",
  });

  useEffect(() => {
    getAllPrintersLocal();
  }, []);

  const getAllPrintersLocal = async () => {
    setLoading(true);
    try {
      const res = await getAllPrintersUserMngt();
      if (res?.data?.data) {
        setTableData(res.data.data);
        setLoading(false);
      } else {
        throw new Error("Error");
      }
    } catch (error) {
      setLoading(false);
      alertHandler(
        true,
        "Something went wrong while fetching Printers. Please try again!",
        "error"
      );
    }
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

  const onClickHeaderLink = (item) => {
    if (item.label === "Add") {
      setShowAddPrinterModal(true);
    } else if (item.label === "Edit") {
      if (selectedRowId !== null) {
        const newInputs = createEditPrinterInputs(selectedRow);
        setEditPrinterInputs(newInputs);
        setShowEditPrinterModal(true);
      } else {
        alertHandler(true, "Please select any Printer", "warning");
      }
    } else if (item.label === 'User List') {
      navigate('/user-management/user-list')
    }
  };

  const headerLinks = [
    { label: "Add", icon: <AddIcon /> },
    {
      label: "Edit",
      icon: <EditIcon sx={{ width: "23px" }} />,
    },
    {
      label: "User List",
      icon: <ArrowBackIosIcon sx={{ width: "23px" }} />,
    },
  ];

  const onClickDeletePrinterConfirmation = (id) => {
    setSelectedRowId(id);
    setDeletePrinterPrinterConfirmationModal(true);
  };

  const deletePrinter = async () => {
    setLoading(true);
    try {
      const res = await deletePrinterUserMngt({}, selectedRowId);
      if (res?.data?.data) {
        getAllPrintersLocal();
        alertHandler(true, "Successfully Deleted Printer.", "success");
        setDeletePrinterPrinterConfirmationModal(false);
      } else throw new Error();
    } catch (error) {
      setLoading(false);
      const errorMessage = error?.response?.data?.status?.description;
      alertHandler(
        true,
        errorMessage ||
        "Something went wrong while deleting Printer. Please try again!",
        "error"
      );
    }
  };

  const onChangeAddPrinter = (event) => {
    const { name, value } = event.target;
    const k = addPrinterInputs.map((el) => {
      if (el.name === name) {
        return { ...el, value };
      }
      return el;
    });
    setAddPrinterInputs(k);
  };

  const validateIPaddress = (ipaddress) => {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
      return (true)
    }
    return (false)
  }

  const addPrinter = async () => {
    const notValid = addPrinterInputs.find((el) => !el.value);
    if (notValid) {
      alertHandler(true, `Please add ${notValid.label}`, "warning");
      return;
    }
    if (!validateIPaddress(addPrinterInputs[1].value)) {
      alertHandler(true, `Please add valid IP Address`, "warning");
      return;
    }
    if (Number(addPrinterInputs[2].value) > 65535) {
      alertHandler(true, `Please add valid Port`, "warning");
      return;
    }
    setLoading(true);

    try {
      const data = {};
      addPrinterInputs.forEach((el) => {
        data[el.name] = el.value;
      });
      const res = await createPrinterUserMngt(data);
      if (res?.data?.data) {
        getAllPrintersLocal();
        alertHandler(true, "Successfullt added Printer", "success");
        setShowAddPrinterModal(false);
      } else {
        throw new Error();
      }
    } catch (error) {
      setLoading(false);
      alertHandler(
        true,
        "Something went wrong while adding Printer. Please try again!",
        "error"
      );
    }
  };

  const editPrinter = async () => {
    const printerId = selectedRow.id;

    const notValid = editPrinterInputs.find((el) => !el.value);
    if (notValid) {
      alertHandler(true, `Please add ${notValid.label}`, "warning");
      return;
    }

    const k = {};
    editPrinterInputs.forEach((el) => {
      k[el.name] = el.value;
    });

    var data = {
      id: printerId,
      resourceName: k.resourceName,
      ipAddress: k.ipAddress,
      port: k.port,
    };

    setLoading(true);
    try {
      const res = await updatePrinterUserMngt(data);
      if (res.data.data) {
        getAllPrintersLocal();
        setShowEditPrinterModal(false);
        alertHandler(true, "Successfully Updated Printer.", "success");
      } else throw new Error();
    } catch (error) {
      setLoading(false);
      alertHandler(
        true,
        "Something went wrong while editing Printer. Please try again!",
        "error"
      );
    }
  };

  const onChangeEditPrinter = (event) => {
    const { name, value } = event.target;
    const k = editPrinterInputs.map((el) => {
      if (name === el.name) {
        return { ...el, value };
      }
      return { ...el };
    });
    setEditPrinterInputs(k);
  };

  return (
    <Box sx={styles.wrapper}>
      <Loader loading={loading}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={alert.open}
        >
          <Alert severity={alert.flag} sx={{ width: "100%" }}>
            {alert.message}
          </Alert>
        </Snackbar>
        <SubHeader
          headerLinks={headerLinks}
          onClickHeaderLink={onClickHeaderLink}
        />
        <CustomTable
          tableData={tableData}
          onClickDeletePrinter={onClickDeletePrinterConfirmation}
          selectedRowId={selectedRowId}
          setSelectedRowId={setSelectedRowId}
        />
        <CustomModal
          title="Add/Update a Printer"
          btnText="Add"
          open={showAddPrinterModal}
          // setOpen={setShowAddPrinterModal}
          setOpen={(type) => {
            const newInputs = [...addPrinterInputs].map((el) => ({
              ...el,
              value: "",
            }));
            setAddPrinterInputs(newInputs);

            setShowAddPrinterModal(type);
          }}
          onClickOk={addPrinter}
          modalBody={
            <AddNewPrinterModal
              addPrinterInputs={addPrinterInputs}
              onChange={onChangeAddPrinter}
            />
          }
        />
        <CustomModal
          title={
            <Typography component="span" sx={styles.noPadding}>
              Are you sure to remove the Printer{" "}
              <Typography
                component="span"
                sx={{ ...styles.bold, ...styles.noPadding }}
              >
                {selectedRow?.resourceName || ""}
              </Typography>{" "}
              ?
            </Typography>
          }
          btnText="Remove"
          open={showDeletePrinterConfirmationModal}
          setOpen={(type) => {
            setDeletePrinterPrinterConfirmationModal(type);
          }}
          onClickOk={deletePrinter}
          modalBody={null}
        />
        <CustomModal
          title="Edit Printer"
          open={showEditPrinterModal}
          setOpen={(type) => {
            setShowEditPrinterModal(type);
          }}
          onClickOk={editPrinter}
          modalBody={
            <EditPrinterModal
              editPrinterInputs={editPrinterInputs}
              onChange={onChangeEditPrinter}
            />
          }
        />
      </Loader>
    </Box>
  );
};

const styles = {
  wrapper: {
    padding: "0px",
  },
  bold: {
    fontWeight: "bold",
  },
  noPadding: {
    padding: "0 !important",
  },
};
