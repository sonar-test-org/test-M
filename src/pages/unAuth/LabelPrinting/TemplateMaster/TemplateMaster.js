import { useEffect, useState, useMemo } from "react";
import { Alert, Grid, Snackbar } from "@mui/material";
import {
  createTemplate,
  deleteTemplate,
  getAllTemplates,
  getPriviledges,
  updateTemplate,
} from "../../../../services/api";
import {
  generateAddTemplateInputsMock,
  generateEditTemplateInputsMock,
  generatePriviledgesOptions,
  searchInputsmock,
} from "../labelPrintingUtils";
import {
  downloadTXTFileUsingBase64String,
  generateErrorMessage,
  generateFileFromBaseString,
} from "../../../../utils/commonUtils";
import { Loader } from "../../../../components/Loader";
import { ALERT_TIMEOUT, INFO } from "../../../../utils/variables";
import { CustomTable } from "./CustomTable";
import moment from "moment";
import { AddOrEditTemplateMaster } from "./AddOrEditTemplateMaster";
import { PageHeading } from "../../../../components/TextUI/PageHeading";
import SearchHeader from "../../../../components/UI/SearchHeader";
import { useSelector } from "react-redux";

export const TemplateMaster = () => {
  const commonReducer = useSelector((state) => state.commonReducer);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    flag: "",
  });

  const [addTemplateInputs, setAddTemplateInputs] = useState({});
  const [showAddTemplateModal, setShowAddTemplateModal] = useState(false);

  const [searchInputs, setSearchInputs] = useState([...searchInputsmock]);
  const [filterCriteria, setFilterCriteria] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [priviledgeOptions, setPriviledgeOptions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const isEditing = !!addTemplateInputs.id;

  useEffect(() => {
    initialCalls();
  }, []);

  const initialCalls = async () => {
    setLoading(true);
    try {
      const apis = await Promise.all([getAllTemplates(), getPriviledges()]);
      const getAllTemplatesRes = apis[0]?.data?.data;
      const getPriviledgesApi = generatePriviledgesOptions(apis[1]?.data?.data);

      setTableData(getAllTemplatesRes);
      setPriviledgeOptions(getPriviledgesApi);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      const errorMessage = generateErrorMessage(error);
      alertHandler(
        true,
        errorMessage || "Something went Wrong in Get Users API!",
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

  const onChangeSearch = (e, b) => {
    const { name, value } = e.target;

    const data = searchInputs.map((el) => {
      if (el.name === name) {
        return { ...el, value };
      }
      return el;
    });
    setSearchInputs(data);
  };

  const onClickResetFilter = (e) => {
    setSearchInputs(searchInputs.map((el) => ({ ...el, value: "" })));
    setFilterCriteria([]);
  };

  const onClickSearch = () => {
    const k = searchInputs
      .filter((fl) => fl.value)
      .map((el) => {
        const currentValue = el.value;
        const newValue =
          typeof currentValue === "string"
            ? currentValue
            : moment(new Date(currentValue)).format("MM/DD/YYYY");
        return { key: el.name, value: newValue };
      });
    setFilterCriteria(k);
  };

  const onClickAddNew = () => {
    const generatedRowData = generateAddTemplateInputsMock(priviledgeOptions);
    setAddTemplateInputs(generatedRowData);
    setShowAddTemplateModal(true);
  };

  const onDeleteRow = async (row) => {
    setLoading(true);
    try {
      const api = await deleteTemplate(row.id);
      const res = api.data?.data;
      if (!res) throw new Error();
      alertHandler(true, res || "Successfully deleted Template Id", "success");
      initialCalls();
    } catch (error) {
      setLoading(false);
      const errorMessage = generateErrorMessage(error);
      alertHandler(
        true,
        errorMessage || "Something went Wrong in Delete Users API!",
        "error"
      );
    }
  };

  const handleCloseAddOrEditModal = () => {
    setShowAddTemplateModal(false);
    setAddTemplateInputs({});
    setSelectedFile(null);
  };

  const onChangeAddOrEdit = (e, type) => {
    const { name, value } = e.target;
    const dat = JSON.parse(JSON.stringify(addTemplateInputs));

    if (type === "file") {
      const file = e.target.files[0];
      if (file) {
        dat[name].value = file.name;
        setSelectedFile(file);
      }
    } else {
      dat[name].value = value;
    }

    setAddTemplateInputs(dat);
  };

  const validateInputs = () => {
    if (
      !addTemplateInputs.transactionType.value ||
      !addTemplateInputs.templateName.value ||
      !addTemplateInputs.fileName.value
    ) {
      alertHandler(true, "Please fill all the required fields", INFO);
      return true;
    } else return false;
  };

  const onClickSave = async () => {
    const notValid = validateInputs();
    if (notValid) return;

    const formData = new FormData();
    formData.append("transactionType", addTemplateInputs.transactionType.value);
    formData.append("templateName", addTemplateInputs.templateName.value);
    formData.append("fileName", addTemplateInputs.fileName.value);
    formData.append("createdBy", commonReducer.userName);
    formData.append("fileObject", selectedFile);

    if (isEditing) {
      formData.append("id", addTemplateInputs.id);
      formData.append("updatedBy", commonReducer.userName);
    }

    setLoading(true);
    try {
      const api = isEditing
        ? await updateTemplate(formData)
        : await createTemplate(formData);

      const res = api.data?.data;
      if (!res) return;
      alertHandler(true, res, "success");
      initialCalls();
      handleCloseAddOrEditModal();
    } catch (error) {
      setLoading(false);
      const errorMessage = generateErrorMessage(error);
      alertHandler(
        true,
        errorMessage || "Something went Wrong in creating Template!",
        "error"
      );
    }
  };

  const onChangeCheckbox = (e, index, c, arr) => {
    const { checked } = e.target;
    const dat = JSON.parse(JSON.stringify(addTemplateInputs));
    dat.transactionType.resultOptions = arr.map((el) => {
      const select = el._id === index ? checked : false;
      return { ...el, select };
    });
    setAddTemplateInputs(dat);
  };

  const onClickOk = (a) => {
    const dat = JSON.parse(JSON.stringify(addTemplateInputs));
    const selectedVal = dat.transactionType.resultOptions.find(
      (fn) => fn.select
    );
    dat.transactionType.value = selectedVal.priviledgeName;
    setAddTemplateInputs(dat);
  };

  const onEditRow = (row) => {
    const generatedRowData = generateEditTemplateInputsMock(
      priviledgeOptions,
      row
    );
    const file = generateFileFromBaseString(row.fileData, row.templateFileName);
    setSelectedFile(file);

    setAddTemplateInputs(generatedRowData);
    setShowAddTemplateModal(true);
  };

  const generateFilteredData = useMemo(() => {
    const k = filterCriteria.reduce(
      (acu, cur) =>
        acu.filter((fl) =>
          (fl[cur.key] || "").toLowerCase().includes(cur.value.toLowerCase())
        ),
      tableData
    );
    return k;
  }, [tableData, filterCriteria]);

  const onClickSearchLogic = (type) => {
    if (type === "search") onClickSearch();
    else if (type === "reset") onClickResetFilter();
    else if (type === "add") onClickAddNew();
  };

  const onDownload = (row) => {
    const { fileData, templateFileName } = row;
    if (!fileData) {
      alertHandler(true, "File data is not available!", INFO);
      return;
    }
    downloadTXTFileUsingBase64String(fileData, templateFileName);
  };

  const isDisableSearch = !searchInputs.some((sm) => sm.value);

  return (
    <Grid sx={styles.maincontainer}>
      <Loader loading={loading}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={alert.open}
        >
          <Alert severity={alert.flag} sx={{ width: "100%" }}>
            {alert.message}
          </Alert>
        </Snackbar>
        <PageHeading text="Template Master" />
        <SearchHeader
          inputs={searchInputs}
          onChange={onChangeSearch}
          onClick={onClickSearchLogic}
          disableSearch={isDisableSearch}
          includeAddButton
        />
        <CustomTable
          onEditRow={onEditRow}
          tableData={generateFilteredData}
          onDeleteRow={onDeleteRow}
          onDownload={onDownload}
        />
        <AddOrEditTemplateMaster
          open={showAddTemplateModal}
          inputs={addTemplateInputs}
          handleClose={handleCloseAddOrEditModal}
          onChange={onChangeAddOrEdit}
          onChangeCheckbox={onChangeCheckbox}
          onClickOk={onClickOk}
          onClickSave={onClickSave}
        />
      </Loader>
    </Grid>
  );
};

const styles = {
  maincontainer: {
    padding: "0px 100px 100px 100px",
    minHeight: "100vh",
  },
};
