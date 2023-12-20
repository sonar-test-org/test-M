import { store } from "../redux/store";
import { apiConstant } from "./apiConstants";
import {
  QRRequest,
  Request,
  RequestUserMngt,
  RequestUserMngtAc,
  forFile,
  requestWithAuth,
} from "./service";
import { Request1 } from "./service copy";

const commonHeaders = { "Content-Type": "application/json" };

const generateHeadersTenant = () => {
  const { xtenantId } = store.getState().commonReducer;
  return {
    "Content-Type": "application/json",
    "X-TenantID": xtenantId || "",
  };
};

const generateHeadersTenantForFile = () => {
  const { xtenantId } = store.getState().commonReducer;
  return {
    "Content-Type": "multipart/form-data",
    "X-TenantID": xtenantId || "",
  };
};

export const loginUser = (params) => {
  return Request(
    apiConstant.login,
    "Post",
    params,
    false,
    generateHeadersTenant()
  );
};

export const getUserQRCode = (id) => {
  return QRRequest(
    `${apiConstant.getUserQRCode}/${id}`,
    "get",
    {},
    commonHeaders
  );
};
export const projectList = (params) => {
  return Request(apiConstant.projectList, "Post", params, false, {
    "Content-Type": "application/json",
  });
};

export const dashboardList = (params) => {
  return Request(apiConstant.dashboardList, "Post", params, false, {
    "Content-Type": "application/json",
  });
};
export const getDetailById = (params) => {
  return Request(apiConstant.timehseetById, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const getAllProject = (params) => {
  return Request(apiConstant.getAllProject, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const getAllTask = (params) => {
  return Request(apiConstant.getAllTask, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const getAllExpenditure = (params) => {
  return Request(apiConstant.getAllExpenditure, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const getallroasterdata = (params) => {
  return Request(apiConstant.getallRoasterProfileData, "get", params, false, {
    "Content-Type": "application/json",
  });
};

export const getallemployeedata = (params) => {
  return Request1(
    apiConstant.getallRoasterEmpDetailTableData,
    "Post",
    params,
    false,
    { "Content-Type": "application/json" }
  );
};

export const workDuration = (params) => {
  return Request(apiConstant.getWorkDurationData, "get", params, false, {
    "Content-Type": "application/json",
  });
};

export const getallStaffData = (params) => {
  return Request1(apiConstant.getAddStaffData, "Post", params, false, {
    "Content-Type": "application/json",
  });
};
export const workLocation = (params) => {
  return Request(apiConstant.getWorkLocationList, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const onCall = (params) => {
  return Request(apiConstant.getOnCallLovList, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const Emergency = (params) => {
  return Request(apiConstant.getEmergencyList, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const Option1 = (params) => {
  return Request1(apiConstant.postOption, "Post", params, false, {
    "Content-Type": "application/json",
  });
};
export const Department = (params) => {
  return Request1(apiConstant.getDepartMentList, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const JobTitle = (params) => {
  return Request1(apiConstant.getJobTitleList, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const DutyManager = (params) => {
  return Request1(apiConstant.getDutyManagerList, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const Option2 = (params) => {
  return Request1(apiConstant.postOption2, "Post", params, false, {
    "Content-Type": "application/json",
  });
};

export const DeleteRosterProfile = (params) => {
  return Request1(apiConstant.DeleteRoster, "Delete", params, false, {
    "Content-Type": "application/json",
  });
};
export const GetSingleShift = (params) => {
  // window.alert(params)
  return Request(
    apiConstant.getUpdateSingleShift +
      "/" +
      params.loginUserId +
      "/" +
      params.personRosterPivoteId +
      "/" +
      params.personRosterId,
    "get",
    {},
    false,
    { "Content-Type": "application/json" }
  );
};

// user management
export const getAllUsersUserMngt = (data, queryParams) => {
  return requestWithAuth(
    `${apiConstant.getAllUsersUserMngt}?${queryParams}`,
    "post",
    data,
    generateHeadersTenant()
  );
};
export const getMobileUser = (data, id) => {
  return requestWithAuth(
    `${apiConstant.getMobileUser}/${id}`,
    "get",
    data,
    generateHeadersTenant()
  );
};
export const updateMobileUser = (data, id) => {
  return requestWithAuth(
    `${apiConstant.updateMobileUser}/${id}`,
    "post",
    data,
    generateHeadersTenant()
  );
};
export const getAllWarehouseMaster = (data) => {
  return requestWithAuth(
    apiConstant.getAllWarehouseMaster,
    "get",
    data,
    generateHeadersTenant()
  );
};
export const getWarehouseByCodeName = (data, queryParams) => {
  return requestWithAuth(
    `${apiConstant.getWarehouseByCodeName}?${queryParams}`,
    "get",
    data,
    generateHeadersTenant()
  );
};
export const getAllTransactionPriviledge = (data) => {
  return requestWithAuth(
    apiConstant.getAllTransactionPriviledge,
    "get",
    data,
    generateHeadersTenant()
  );
};
export const createUserPost = (data) => {
  return requestWithAuth(
    apiConstant.createUserPost,
    "post",
    data,
    generateHeadersTenant()
  );
};

// Resources user management
export const getAllPrintersUserMngt = (data, queryParams) => {
  return requestWithAuth(
    `${apiConstant.getAllPrinters}`,
    "get",
    data,
    generateHeadersTenant()
  );
};
export const getPrinterUserMngt = (data, queryParams) => {
  return requestWithAuth(
    `${apiConstant.getPrinter}/${queryParams}`,
    "get",
    data,
    generateHeadersTenant()
  );
};
export const createPrinterUserMngt = (data, queryParams) => {
  return requestWithAuth(
    `${apiConstant.createPrinter}`,
    "post",
    data,
    generateHeadersTenant()
  );
};
export const deletePrinterUserMngt = (data, queryParams) => {
  return requestWithAuth(
    `${apiConstant.deletePrinter}/${queryParams}`,
    "delete",
    data,
    generateHeadersTenant()
  );
};
export const updatePrinterUserMngt = (data, queryParams) => {
  return requestWithAuth(
    `${apiConstant.updatePrinter}`,
    "put",
    data,
    generateHeadersTenant()
  );
};
export const createFusionUserPost = (data) => {
  return requestWithAuth(
    apiConstant.createFusionUserPost,
    "post",
    data,
    generateHeadersTenant()
  );
};
export const getAllFusionUser = (params) => {
  return requestWithAuth(
    apiConstant.getFusionUser,
    "get",
    params,
    generateHeadersTenant()
  );
};
export const updateFusionUserPost = (params, id) => {
  return requestWithAuth(
    `${apiConstant.updateFusionUserPost}/${id}`,
    "post",
    params,
    generateHeadersTenant()
  );
};
export const deleteFusionUserPost = (id, params) => {
  return requestWithAuth(
    `${apiConstant.deleteFusionUserPost}/${id}`,
    "Delete",
    params,
    generateHeadersTenant()
  );
};
export const deleteResourcePrinterPost = (id, params) => {
  return requestWithAuth(
    `${apiConstant.deleteResourcePost}/${id}`,
    "Delete",
    params,
    generateHeadersTenant()
  );
};
export const getTransactionHistory = (id, params) => {
  return requestWithAuth(
    `${apiConstant.getTransactionHistory}/${id}`,
    "get",
    params,
    generateHeadersTenant()
  );
};
export const exportToCsvUserManagement = () => {
  return requestWithAuth(
    `${apiConstant.exportToCsvUserManagement}`,
    "get",
    {},
    generateHeadersTenantForFile()
  );
};
export const inportXLUserManagement = (params) => {
  return forFile(
    `${apiConstant.inportXLUserManagement}`,
    "post",
    params,
    generateHeadersTenantForFile()
  );
};

// scheduler
export const getAllSetupReports = (id, params) => {
  return requestWithAuth(
    apiConstant.getAllSetupReports,
    "get",
    params,
    generateHeadersTenant()
  );
};
export const getSetupReport = (id, params) => {
  return requestWithAuth(
    `${apiConstant.getSetupReport}?schedulerId=${id}`,
    "get",
    params,
    generateHeadersTenant()
  );
};
export const getReportHistory = ({ schedulerId, pageNumber, pageSize }) => {
  return requestWithAuth(
    `${apiConstant.getReportHistory}?schedulerId=${schedulerId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const runReportAdhoc = (schedulerId, params) => {
  return requestWithAuth(
    `${apiConstant.runReportAdhoc}?schedulerId=${schedulerId}`,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const getDataFormats = () => {
  return requestWithAuth(
    `${apiConstant.getDataFormats}`,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const getAllTables = () => {
  return requestWithAuth(
    `${apiConstant.getAllTables}`,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const getAllSequences = () => {
  return requestWithAuth(
    `${apiConstant.getAllSequences}`,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const getDataLocale = () => {
  return requestWithAuth(
    `${apiConstant.getDataLocale}`,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const getSchedulerType = () => {
  return requestWithAuth(
    `${apiConstant.getSchedulerType}`,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const saveReport = (data) => {
  return requestWithAuth(
    `${apiConstant.saveReport}`,
    "post",
    data,
    generateHeadersTenant()
  );
};
export const updateReport = (data, schedulerId) => {
  return requestWithAuth(
    `${apiConstant.updateReport}/${schedulerId}`,
    "post",
    data,
    generateHeadersTenant()
  );
};
export const scheduleJob = (data, schedulerId) => {
  return requestWithAuth(
    `${apiConstant.scheduleJob}`,
    "post",
    data,
    generateHeadersTenant()
  );
};

// Physycal Count
// search page
export const physicalCountSearchList = (data) => {
  return requestWithAuth(
    `${apiConstant.physicalCountSearchList}?pageNo=${data.pageNo}&pageSize=${data.pageSize}&sortBy=&asc=false`,
    "post",
    data,
    generateHeadersTenant()
  );
};
export const physicalCountSearchListWithoutPagination = (data) => {
  return requestWithAuth(
    `${apiConstant.physicalCountSearchList}`,
    "post",
    data,
    generateHeadersTenant()
  );
};
export const getOrganizationCode = () => {
  return requestWithAuth(
    `${apiConstant.getOrganizationCode}`,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const getPhysicalInventoryName = () => {
  return requestWithAuth(
    `${apiConstant.getPhysicalInventoryName}`,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const getItemDescription = () => {
  return requestWithAuth(
    `${apiConstant.getItemDescription}`,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const getItemNumber = () => {
  return requestWithAuth(
    `${apiConstant.getItemNumber}`,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const getSubInventory = () => {
  return requestWithAuth(
    `${apiConstant.getSubInventory}`,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const getLocator = () => {
  return requestWithAuth(
    `${apiConstant.getLocator}`,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const getAllUsersPhysicalCount = () => {
  return requestWithAuth(
    `${apiConstant.getAllUsersPhysicalCount}`,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const assignUserPhysicalCount = (userName, data) => {
  return requestWithAuth(
    `${apiConstant.assignUserPhysicalCount}?userName=${userName}`,
    "put",
    data,
    generateHeadersTenant()
  );
};
export const submitForMobileCount = (data) => {
  return requestWithAuth(
    `${apiConstant.submitForMobileCount}`,
    "put",
    data,
    generateHeadersTenant()
  );
};
export const submitForApproval = (
  organizationId,
  physicalInventoryId,
  fromApproverUsername,
  fromApproverUserId
) => {
  return requestWithAuth(
    `${apiConstant.submitForApproval}?organizationId=${organizationId}&physicalInventoryId=${physicalInventoryId}&fromApproverUsername=${fromApproverUsername}&fromApproverUserId=${fromApproverUserId}`,
    "post",
    {},
    generateHeadersTenant()
  );
};

export const getNotificationsPhysicalCount = (notifTo) => {
  return requestWithAuth(
    `${apiConstant.getNotificationsPhysicalCount}?notifTo=${notifTo}`,
    "get",
    {},
    generateHeadersTenant()
  );
};

export const getApproversPhysicalCount = () => {
  return requestWithAuth(
    `${apiConstant.getApproversPhysicalCount}`,
    "get",
    {},
    generateHeadersTenant()
  );
};

export const getApproversPhysicalCountOrgId = (orgCode) => {
  return requestWithAuth(
    `${apiConstant.getApproversPhysicalCountOrgId}?orgCode=${orgCode}`,
    "get",
    {},
    generateHeadersTenant()
  );
};

// physical count
// notifications page
export const approveNotificationPhysicalCount = (id) => {
  return requestWithAuth(
    `${apiConstant.approveNotification}/${id}`,
    "post",
    {},
    generateHeadersTenant()
  );
};
export const recountAllPhysicalCount = (id) => {
  return requestWithAuth(
    `${apiConstant.recountAllPhysicalCount}/${id}`,
    "post",
    {},
    generateHeadersTenant()
  );
};
export const exportToCsvPhysicalCount = (body) => {
  return requestWithAuth(
    `${apiConstant.exportToCsvPhysicalCount}`,
    "post",
    body,
    generateHeadersTenant()
  );
};
export const inportXLPhysicalCount = (params) => {
  return forFile(
    `${apiConstant.inportXLPhysicalCount}`,
    "post",
    params,
    generateHeadersTenantForFile()
  );
};

export const deleteApproverPhysicalCount = (id) => {
  return requestWithAuth(
    `${apiConstant.deleteApproverPhysicalCount}/${id}`,
    "delete",
    {},
    generateHeadersTenant()
  );
};

export const createApproverPhysicalCount = (data) => {
  return requestWithAuth(
    `${apiConstant.createApproverPhysicalCount}`,
    "post",
    data,
    generateHeadersTenant()
  );
};

export const updateApproverPhysicalCount = (data) => {
  return requestWithAuth(
    `${apiConstant.updateApproverPhysicalCount}`,
    "put",
    data,
    generateHeadersTenant()
  );
};

export const updateStatusPC = (tagId, status) => {
  return requestWithAuth(
    `${apiConstant.updateStatusPC}?tagId=${tagId}&status=${status}`,
    "put",
    {},
    generateHeadersTenant()
  );
};

// cycle count

export const getOrganizationCodeCycle = () => {
  return requestWithAuth(
    `${apiConstant.getOrganizationCodeCycle}`,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const getSubInventoryCycle = () => {
  return requestWithAuth(
    `${apiConstant.getSubInventoryCycle}`,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const getLocatorListCycle = () => {
  return requestWithAuth(
    `${apiConstant.getLocatorListCycle}`,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const getAllUsersCycleCount = () => {
  return requestWithAuth(
    `${apiConstant.getAllUsersCycleCount}`,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const getCycleNameList = () => {
  return requestWithAuth(
    `${apiConstant.getCycleNameList}`,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const cycleCountSearchList = (params) => {
  return requestWithAuth(
    `${apiConstant.cycleCountSearchList}?pageNo=${params.pageNo}&pageSize=${params.pageSize}&sortBy=&asc=false`,
    "post",
    params,
    generateHeadersTenant()
  );
};
export const cycleCountSearchListWithoutPagination = (params) => {
  return requestWithAuth(
    `${apiConstant.cycleCountSearchList}`,
    "post",
    params,
    generateHeadersTenant()
  );
};
export const submitForApprovalCycleCount = (
  organizationId,
  cycleCountHeaderId,
  fromApproverUsername,
  fromApproverUserId
) => {
  return requestWithAuth(
    `${apiConstant.submitForApprovalCycleCount}?organizationId=${organizationId}&cycleCountHeaderId=${cycleCountHeaderId}&fromApproverUsername=${fromApproverUsername}&fromApproverUserId=${fromApproverUserId}`,
    "post",
    {},
    generateHeadersTenant()
  );
};

export const updateStatusCC = (lineId, status) => {
  return requestWithAuth(
    `${apiConstant.updateStatusCC}?lineId=${lineId}&status=${status}`,
    "put",
    {},
    generateHeadersTenant()
  );
};
export const submitForMobileCycleCount = (data) => {
  return requestWithAuth(
    `${apiConstant.submitForMobileCycleCount}`,
    "put",
    data,
    generateHeadersTenant()
  );
};
export const assignUserCycleCount = (userName, data) => {
  return requestWithAuth(
    `${apiConstant.assignUserCycleCount}?userName=${userName}`,
    "put",
    data,
    generateHeadersTenant()
  );
};

export const exportToCsvCycleCount = (body) => {
  return requestWithAuth(
    `${apiConstant.exportCycleCount}`,
    "post",
    body,
    generateHeadersTenant()
  );
};
export const inportXlCycleCount = (params) => {
  return forFile(
    `${apiConstant.importCycleCount}`,
    "post",
    params,
    generateHeadersTenantForFile()
  );
};

// cycle count notification page
export const getApproversCycleCount = () => {
  return requestWithAuth(
    `${apiConstant.getApproversCycleCount}`,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const getNotificationsCycleCount = (notifTo) => {
  return requestWithAuth(
    `${apiConstant.getNotificationsCycleCount}?notifTo=${notifTo}`,
    "get",
    {},
    generateHeadersTenant()
  );
};

// cycle count approve page
export const approveNotificationCycleCount = (id) => {
  return requestWithAuth(
    `${apiConstant.approveNotificationCycleCount}/${id}`,
    "post",
    {},
    generateHeadersTenant()
  );
};
export const recountAllCycleCount = (id) => {
  return requestWithAuth(
    `${apiConstant.recountAllCycleCount}/${id}`,
    "post",
    {},
    generateHeadersTenant()
  );
};
export const rejectAllCycleCount = (id) => {
  return requestWithAuth(
    `${apiConstant.rejectAllCycleCount}/${id}`,
    "post",
    {},
    generateHeadersTenant()
  );
};
export const getApproversCycleCountOrgId = (orgCode) => {
  return requestWithAuth(
    `${apiConstant.getApproversCycleCountOrgId}?orgCode=${orgCode}`,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const deleteApproverCycleCount = (id) => {
  return requestWithAuth(
    `${apiConstant.deleteApproverCycleCount}/${id}`,
    "delete",
    {},
    generateHeadersTenant()
  );
};
export const createApproverCycleCount = (data) => {
  return requestWithAuth(
    `${apiConstant.createApproverCycleCount}`,
    "post",
    data,
    generateHeadersTenant()
  );
};
export const updateApproverCycleCount = (data) => {
  return requestWithAuth(
    `${apiConstant.updateApproverCycleCount}`,
    "put",
    data,
    generateHeadersTenant()
  );
};

// par count
export const getParCountOrganizationList = () => {
  return requestWithAuth(
    `${apiConstant.getParCountOrganizationList}`,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const getParCountSubInventoryList = () => {
  return requestWithAuth(
    `${apiConstant.getParCountSubInventoryList}`,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const getParCountSyncByList = () => {
  return requestWithAuth(
    `${apiConstant.getParCountSyncByList}`,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const getFusionResponse = (id) => {
  return requestWithAuth(
    `${apiConstant.getFusionResponse}/${id}`,
    "get",
    {},
    generateHeadersTenant()
  );
};

export const searchParcount = (params, data) => {
  return requestWithAuth(
    `${apiConstant.searchParcount}?${params}`,
    "Post",
    data,
    generateHeadersTenant()
  );
};

// Label Printing
export const getAllTemplates = () => {
  return requestWithAuth(
    apiConstant.getAllTemplates,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const getPriviledges = () => {
  return requestWithAuth(
    apiConstant.getPriviledges,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const deleteTemplate = (id) => {
  return requestWithAuth(
    `${apiConstant.deleteTemplate}/${id}`,
    "delete",
    {},
    generateHeadersTenant()
  );
};
export const createTemplate = (params) => {
  return forFile(
    `${apiConstant.createTemplate}`,
    "post",
    params,
    generateHeadersTenantForFile()
  );
};
export const updateTemplate = (params) => {
  return forFile(
    `${apiConstant.updateTemplate}`,
    "put",
    params,
    generateHeadersTenantForFile()
  );
};
export const getLabelHistoryList = (params) => {
  return forFile(
    `${apiConstant.getLabelHistoryList}`,
    "post",
    params,
    generateHeadersTenant()
  );
};
export const getDocTypeList = (params) => {
  return forFile(
    `${apiConstant.getDocTypeList}`,
    "get",
    params,
    generateHeadersTenant()
  );
};
export const getTransactionTypeList = (params) => {
  return forFile(
    `${apiConstant.getTransactionTypeList}`,
    "get",
    params,
    generateHeadersTenant()
  );
};

// mappings
export const getAllTransactionTypes = (transactionName) => {
  return requestWithAuth(
    `${apiConstant.getAllTransactionTypes}?transactionName=${transactionName}`,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const getAllZplMappings = (transactionName) => {
  return requestWithAuth(
    `${apiConstant.getAllZplMappings}?transactionName=${transactionName}`,
    "get",
    {},
    generateHeadersTenant()
  );
};

export const getAllEssMappings = (transactionName) => {
  return requestWithAuth(
    `${apiConstant.getAllEssKeyMappings}?transactionName=${transactionName}`,
    "get",
    {},
    generateHeadersTenant()
  );
};

export const getAllTransKeyMappings = (transactionName) => {
  return requestWithAuth(
    `${apiConstant.getAllTransKeyMappings}?transactionName=${transactionName}`,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const deleteTransMapping = (mappingId) => {
  return requestWithAuth(
    `${apiConstant.deleteTransMapping}?mappingId=${mappingId}`,
    "delete",
    {},
    generateHeadersTenant()
  );
};
export const deleteZPLMapping = (mappingId) => {
  return requestWithAuth(
    `${apiConstant.deleteZPLMapping}?mappingId=${mappingId}`,
    "delete",
    {},
    generateHeadersTenant()
  );
};
export const deleteESSMapping = (mappingId) => {
  return requestWithAuth(
    `${apiConstant.deleteESSMapping}?mappingId=${mappingId}`,
    "delete",
    {},
    generateHeadersTenant()
  );
};
export const createMapping = (body, isZplMapPage, isEssMapPage) => {
  const url = isZplMapPage 
    ? `${apiConstant.createZPLMapping}` : isEssMapPage ? `${apiConstant.createEssMapping}`
    : `${apiConstant.createTransMapping}`;
  return requestWithAuth(url, "post", body, generateHeadersTenant());
};
export const updateMapping = (body, isZplMapPage, isEssMapPage) => {
  const url = isZplMapPage
    ? `${apiConstant.updateZPLMapping}`
    : isEssMapPage
    ? `${apiConstant.updateEssMapping}`
    : `${apiConstant.updateTransMapping}`;
  return requestWithAuth(url, "post", body, generateHeadersTenant());
};

// Misc
export const getOrganizationMisc = () => {
  return requestWithAuth(
    apiConstant.getOrganizationMisc,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const getTransactionType = () => {
  return requestWithAuth(
    apiConstant.getTransactionType,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const getSubInventories = (body) => {
  return requestWithAuth(
    apiConstant.getSubInventories,
    "post",
    body,
    generateHeadersTenant()
  );
};
export const getLocators = (body) => {
  return requestWithAuth(
    apiConstant.getLocators,
    "post",
    body,
    generateHeadersTenant()
  );
};
export const getProjects = () => {
  return requestWithAuth(
    apiConstant.getProjects,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const getProjectTasks = () => {
  return requestWithAuth(
    apiConstant.getProjectTasks,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const getExpenditureTypes = () => {
  return requestWithAuth(
    apiConstant.getExpenditureTypes,
    "get",
    {},
    generateHeadersTenant()
  );
};
export const getExpenditureOrgs = () => {
  return requestWithAuth(
    apiConstant.getExpenditureOrgs,
    "get",
    {},
    generateHeadersTenant()
  );
};

// Misc item details
export const getAllItemCodes = (body) => {
  return requestWithAuth(
    apiConstant.getAllItemCodes,
    "post",
    body,
    generateHeadersTenant()
  );
};
export const getReasons = (reasonType = "") => {
  return requestWithAuth(
    `${apiConstant.getReasons}?reasonType=${reasonType}`,
    "get",
    {},
    generateHeadersTenant()
  );
};

export const getItemDetails = (body) => {
  return requestWithAuth(
    apiConstant.getItemDetails,
    "post",
    body,
    generateHeadersTenant()
  );
};
export const generateLot = (body) => {
  return requestWithAuth(
    apiConstant.generateLot,
    "post",
    body,
    generateHeadersTenant()
  );
};
export const uploadMisc = (body) => {
  return requestWithAuth(
    apiConstant.uploadMisc,
    "post",
    body,
    generateHeadersTenant()
  );
};
export const getOnHandQty = (body) => {
  return requestWithAuth(
    apiConstant.getOnHandQty,
    "post",
    body,
    generateHeadersTenant()
  );
};
