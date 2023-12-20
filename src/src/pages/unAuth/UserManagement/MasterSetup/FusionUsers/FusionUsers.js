import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import {
  addFusionUSerInputsMock,
  fusionUsersDataMock,
  editFusionUSerInputsMock,
  createEditFusionUSerInputsMock,
} from "../../../../../utils/userManagementUtils";
import { CustomTable } from "./CustomTable";
import { Alert, Box, Snackbar, Typography } from "@mui/material";
import { CustomModal } from "./CustomModal/CustomModal";
import { AddFusionUserModal } from "./CustomModal/AddFusionUserModal";
import { EditUserModal } from "./CustomModal/EditUserModal";
import {
  deleteFusionUserPost,
  createFusionUserPost,
  getAllFusionUser,
  updateFusionUserPost,
} from "../../../../../services/api";
import { Loader } from "../../../../../components/Loader";
import { ALERT_TIMEOUT } from "../../../../../utils/variables";
import { SubHeader } from "../../../../../components/Headers/SubHeader";
import { useNavigate } from "react-router-dom";

export const FusionUsers = () => {
  const navigate = useNavigate();

  // add user
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [addFusionUserInputs, setAddFusionUSerInputs] = useState(
    addFusionUSerInputsMock
  );

  // delete user
  const [showDeleteUserConfirmationModal, setDeleteAddUserConfirmationModal] =
    useState(false);

  // edit user
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editFusionUserInputs, setEditFusionUserInputs] = useState(
    editFusionUSerInputsMock
  );

  // selected User
  const [selectedRowId, setSelectedRowId] = useState(null);

  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllFusionUsersLocal();
  }, []);

  const selectedRow = tableData.find((el) => el.id === selectedRowId);

  //Api for get fusion user
  const getAllFusionUsersLocal = async () => {
    setLoading(true);
    try {
      const allFusionUserData = await getAllFusionUser({});
      if (allFusionUserData.data?.data) {
        const k = allFusionUserData.data.data.map((el) => {
          return {
            id: el.id,
            username: el.username,
            password: "*****",
            personId: el.personId,
          };
        });
        setTableData(k);
        setLoading(false);
      } else {
        throw new Error("Error");
      }
    } catch (error) {
      setLoading(false);
      alertHandler(true, "Something went wrong in Fusion User API!", "error");
    }
  };

  //Api for create fusion user
  const addFusionUser = async () => {
    setLoading(true);
    const data = {};
    addFusionUserInputs.forEach((el) => {
      data[el.name] = el.value;
    });
    try {
      const res = await createFusionUserPost(data);
      if (res.data.data) {
        getAllFusionUsersLocal();
        alertHandler(true, "Successfully Created User", "success");
        setShowAddUserModal(false);
      } else throw new Error();
    } catch (err) {
      const errorMessage = err?.response?.data?.status?.description;
      alertHandler(
        true,
        errorMessage || "Something went wrong while adding User",
        "error"
      );
      setLoading(false);
    }
  };

  //Api for update
  const onClickUpdateFusionUser = async () => {
    const id = selectedRowId;
    const data = { id };
    editFusionUserInputs.forEach((el) => {
      data[el.name] = el.value;
    });

    try {
      const k = await updateFusionUserPost(data, selectedRowId);
      if (k.data.data) {
        getAllFusionUsersLocal();
        alertHandler(true, "Successfully Updated User", "success");
        setShowEditUserModal(false);
      } else throw new Error("");
    } catch (err) {
      const errorMessage = err.response?.data?.status?.description;
      alertHandler(
        true,
        errorMessage || "Something went wrong while Updating User",
        "error"
      );
    }
  };

  //Api for delete row
  const deleteFusionUser = async () => {
    setLoading(true);
    const id = selectedRowId;
    try {
      const res = await deleteFusionUserPost(id);
      if (res.data.data) {
        alertHandler(true, "Successfully deleted user.", "success");
        getAllFusionUsersLocal();
        setDeleteAddUserConfirmationModal(false);
        setLoading(false);
      } else throw new Error();
    } catch (error) {
      alertHandler(
        true,
        "Something went Wrong while deleting user! Please try again.",
        "error"
      );
      setLoading(false);
    }
  };

  // alert
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    flag: "",
  });

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

  const headerLinks = [
    { label: "Add", icon: <AddIcon />, name: "add" },
    {
      label: "Edit",
      icon: <EditIcon sx={{ width: "23px" }} />,
      name: "edit",
    },
    {
      label: "User List",
      icon: <ArrowBackIosIcon sx={{ width: "23px" }} />,
      name: 'userList'
    },
  ];

  const onChangeUserDetails = (e) => {
    const { name, value } = e.target;
    const k = editFusionUserInputs.map((el) => {
      if (el.name === name) {
        return { ...el, value };
      }
      return { ...el };
    });
    setEditFusionUserInputs(k);
  };

  const onClickInput = (e) => {
    const { name, value } = e.target;
    const starred = value.includes("**");
    if (name === "password" && starred) {
      const k = editFusionUserInputs.map((el) => {
        if (el.name === name) {
          return { ...el, value: "" };
        }
        return { ...el };
      });
      setEditFusionUserInputs(k);
    }
  };

  const onChangeAddUserDetails = (e) => {
    const { name, value } = e.target;
    const k = addFusionUserInputs.map((el) => {
      if (el.name === name) {
        return { ...el, value };
      }
      return { ...el };
    });
    setAddFusionUSerInputs(k);
  };

  const onClickHeaderLink = (item) => {
    if (item.name === "add") {
      setShowAddUserModal(true);
    } else if (item.name === "edit") {
      if (selectedRowId !== null) {
        const inputs = createEditFusionUSerInputsMock(selectedRow);
        setEditFusionUserInputs(inputs);
        setShowEditUserModal(true);
      } else {
        alertHandler(true, "Please select any User", "warning");
      }
    } else if (item.name === 'userList') {
      navigate('/user-management/user-list')
    }
  };

  const onClickDeleteUser = (id) => {
    setSelectedRowId(id);

    setDeleteAddUserConfirmationModal(true);
  };

  return (
    <Box>
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
          onClickDeleteUser={onClickDeleteUser}
          selectedRowId={selectedRowId}
          setSelectedRowId={setSelectedRowId}
        />
        <CustomModal
          title="Add/Update a Fusion User"
          open={showAddUserModal}
          setOpen={(type) => {
            const newInputs = [...addFusionUserInputs].map((el) => ({
              ...el,
              value: "",
            }));
            setAddFusionUSerInputs(newInputs);
            setShowAddUserModal(type);
          }}
          onClickOk={addFusionUser}
          modalBody={
            <AddFusionUserModal
              addFusionUserInputs={addFusionUserInputs}
              onChange={onChangeAddUserDetails}
            />
          }
        />
        <CustomModal
          btnText="Remove"
          title={
            <Typography component="span" sx={styles.noPadding}>
              Are you sure to remove the Fusion User{" "}
              <Typography
                component="span"
                sx={{ ...styles.bold, ...styles.noPadding }}
              >
                {selectedRow?.username || ""}
              </Typography>{" "}
              ?
            </Typography>
          }
          open={showDeleteUserConfirmationModal}
          setOpen={(type) => {
            setDeleteAddUserConfirmationModal(type);
          }}
          onClickOk={deleteFusionUser}
          modalBody={null}
        />
        <CustomModal
          title="Edit User"
          open={showEditUserModal}
          setOpen={(type) => {
            setShowEditUserModal(type);
          }}
          onClickOk={onClickUpdateFusionUser}
          modalBody={
            <EditUserModal
              editFusionUserInputs={editFusionUserInputs}
              onChange={onChangeUserDetails}
              onClickInput={onClickInput}
            />
          }
        />
      </Loader>
    </Box>
  );
};

const styles = {
  bold: {
    fontWeight: "bold",
  },
  noPadding: {
    padding: "0 !important",
  },
};
