export const apiUrl = "http://114.79.159.250:9097";
export const apiUrl2 = "http://182.72.11.106:9091";
export const apiUrl3 = "http://182.72.11.106:9097";

export const apiUrlPrefix = `${apiUrl}/`;

// Below commented url was there before
// const devUrl = "http://20.68.224.25:9015";

const devUrl = "http://129.154.242.120:9015";
const prodUrl = "http://" + window.location.hostname + ":9015";
const baseUrl = process.env.NODE_ENV === "development" ? devUrl : prodUrl;

const miscUrl = "http://140.238.207.240:9015";

export const apiUrlPrefix2 = `${apiUrl2}/`;

export const apiConstant = {
  login: baseUrl + "/auth-service/web/login",
  getUserQRCode: baseUrl + "/auth-service/qrcode",
  //   login: apiUrlPrefix + "ews/timesubmission/auth/login",
  projectList: apiUrlPrefix + "ews/timesubmission/dashboard/user/project/list",
  dashboardList:
    apiUrlPrefix +
    "ews/timesubmission/dashboard/project/employee/timesheet/data",
  timehseetById:
    apiUrlPrefix + "ews/timesubmission/get/employee/project/timehseet/data",
  getAllProject: apiUrlPrefix + "ews/timesubmission/get/all/projects",
  getAllTask: apiUrlPrefix + "ews/timesubmission/get/all/tasks",
  getAllExpenditure: apiUrlPrefix + "ews/timesubmission/get/all/expenditure",

  // application_version: apiUrlPrefix + "/application_version",

  getallRoasterProfileData:
    apiUrlPrefix2 + "ews/roster/profile/list/300000006565312",
  getallRoasterEmpDetailTableData:
    apiUrlPrefix2 + "ews/roster/personRosterData",
  getWorkDurationData: apiUrlPrefix2 + "ews/roster/workDuration",
  getAddStaffData: apiUrlPrefix2 + "ews/roster/searchStaff/list",
  getWorkLocationList:
    apiUrlPrefix2 + "ews/roster/workLocation/list/300000006565312/3038",
  getOnCallLovList: apiUrlPrefix2 + "ews/roster/onCallLov/list",
  getEmergencyList: apiUrlPrefix2 + "ews/roster/emergencyLov/list",
  postOption: apiUrlPrefix2 + "ews/roster/assignSpotRosterOption1",
  getDepartMentList:
    apiUrlPrefix2 + "ews/roster/department/list/300000006565312/3038",
  getJobTitleList:
    apiUrlPrefix2 + "ews/roster/jobTitle/list/300000006565312/3038",
  getDutyManagerList:
    apiUrlPrefix2 + "ews/roster/dutyManager/list/300000006565312/3038",
  postOption2: apiUrlPrefix2 + "ews/roster/assignSpotRosterOption2",
  DeleteRoster: apiUrlPrefix2 + "ews/roster/personRosterData",
  getUpdateSingleShift: apiUrlPrefix2 + "ews/roster/personRosterData",

  // User Management main screen
  getAllUsersUserMngt: baseUrl + "/Warehouse360/UserManagement/users",
  getMobileUser: baseUrl + "/Warehouse360/UserManagement/user",
  getAllWarehouseMaster:
    baseUrl + "/Warehouse360/UserManagement/wareHouse/master",
  getWarehouseByCodeName:
    baseUrl + "/Warehouse360/UserManagement/wareHouse/master/by/code/name",
  getAllTransactionPriviledge:
    baseUrl + "/Warehouse360/UserManagement/transactionPrivileges",
  createUserPost: baseUrl + "/Warehouse360/UserManagement/create/user",
  updateMobileUser: baseUrl + "/Warehouse360/UserManagement/update/user",

  // User management Resources
  getAllPrinters: baseUrl + "/Warehouse360/UserManagement/printers/all",
  getPrinter: baseUrl + "/Warehouse360/UserManagement/printers",
  createPrinter: baseUrl + "/Warehouse360/UserManagement/printers/create",
  deletePrinter: baseUrl + "/Warehouse360/UserManagement/printers",
  updatePrinter: baseUrl + "/Warehouse360/UserManagement/printers/update",
  getFusionUser: baseUrl + "/Warehouse360/UserManagement/fusion/users",
  createFusionUserPost:
    baseUrl + "/Warehouse360/UserManagement/fusion/create/fusionUser",
  updateFusionUserPost:
    baseUrl + "/Warehouse360/UserManagement/fusion/update/fusionUser",
  deleteFusionUserPost:
    baseUrl + "/Warehouse360/UserManagement/fusion/delete/fusionUser",
  deleteResourcePost: baseUrl + "/Warehouse360/UserManagement/printers",
  getTransactionHistory:
    baseUrl + "/Warehouse360/UserManagement/get/transactions/History",
  exportToCsvUserManagement: baseUrl + "/csv/export/service/users/export",
  inportXLUserManagement: baseUrl + "/csv/export/service/users/import",

  // Scheduler
  getAllSetupReports:
    baseUrl +
    "/Warehouse360/Scheduler/setup/get/all/setupReports?moduleType=MOBILE",
  getSetupReport:
    baseUrl + "/Warehouse360/Scheduler/setup/get/report/infoBy/schedulerId",
  getReportHistory:
    baseUrl + "/Warehouse360/Scheduler/setup/get/report/run/history",
  runReportAdhoc:
    baseUrl + "/Warehouse360/Scheduler/setup/run/report/by/schedulerId",
  getDataFormats:
    baseUrl +
    "/Warehouse360/Scheduler/setup/get/lookupStrings/byType?type=DATA_FORMAT",
  getAllTables: baseUrl + "/Warehouse360/Scheduler/setup/get/all/tables",
  getAllSequences: baseUrl + "/Warehouse360/Scheduler/setup/get/all/sequences",
  getDataLocale:
    baseUrl +
    "/Warehouse360/Scheduler/setup/get/lookupStrings/byType?type=DATA_LOCALE",
  getSchedulerType:
    baseUrl +
    "/Warehouse360/Scheduler/setup/get/lookupStrings/byType?type=SCHEDULER_TYPE",
  saveReport: baseUrl + "/Warehouse360/Scheduler/setup/save/report/info",
  updateReport: baseUrl + "/Warehouse360/Scheduler/setup/update/report/info",
  scheduleJob: baseUrl + "/Warehouse360/Scheduler/setup/schedule/job",

  // PhysicalCount
  recountAllPhysicalCount: baseUrl + "/physical/count/web/recount-all",
  deleteApproverPhysicalCount: baseUrl + "/physical/count/web/approver",
  createApproverPhysicalCount: baseUrl + "/physical/count/web/approver/create",
  updateApproverPhysicalCount: baseUrl + "/physical/count/web/approver/update",
  physicalCountSearchList: baseUrl + "/physical/count/web/physical-count",

  getOrganizationCode:
    baseUrl + "/physical/count/web/options/organization-code",
  getPhysicalInventoryName:
    baseUrl + "/physical/count/web/options/physical-inventory-name",
  getItemDescription: baseUrl + "/physical/count/web/options/item-description",
  getItemNumber: baseUrl + "/physical/count/web/options/item-number",
  getSubInventory: baseUrl + "/physical/count/web/options/sub-inventory",
  getLocator: baseUrl + "/physical/count/web/options/locator",
  getAllUsersPhysicalCount: baseUrl + "/physical/count/web/all-users",
  assignUserPhysicalCount: baseUrl + "/physical/count/web/assign-user",
  submitForMobileCount:
    baseUrl + "/physical/count/web/submit-for-mobile-count",
  submitForApproval: baseUrl + "/physical/count/web/submit-for-approval",
  approveNotification: baseUrl + "/physical/count/web/approve",
  getNotificationsPhysicalCount: baseUrl + "/physical/count/web/notification",
  getApproversPhysicalCount: baseUrl + "/physical/count/web/approver-list",
  getApproversPhysicalCountOrgId: baseUrl + "/physical/count/web/org-approver",
  exportToCsvPhysicalCount: baseUrl + "/csv/export/service/physical/export",
  inportXLPhysicalCount: baseUrl + "/csv/export/service/physicalcount/import",
  updateStatusPC: baseUrl + "/physical/count/web/update-status",

  // cycle count
  getOrganizationCodeCycle:
    baseUrl + "/cycle/count/web/options/organization-code",
  getSubInventoryCycle: baseUrl + "/cycle/count/web/options/sub-inventory",
  getCycleNameList:
    baseUrl + "/cycle/count/web/options/cycle-count-header-name",
  getLocatorListCycle: baseUrl + "/cycle/count/web/options/locator",
  submitForApprovalCycleCount: baseUrl + "/cycle/count/web/submit-for-approval",
  getAllUsersCycleCount: baseUrl + "/cycle/count/web/all-users",
  cycleCountSearchList: baseUrl + "/cycle/count/web/cycle-count",
  submitForMobileCycleCount:
    baseUrl + "/cycle/count/web/submit-for-mobile-count",
  assignUserCycleCount: baseUrl + "/cycle/count/web/assign-user",
  exportCycleCount: baseUrl + "/csv/export/service/cycle/export",
  importCycleCount: baseUrl + "/csv/export/service/cyclecount/import",
  updateStatusCC: baseUrl + "/cycle/count/web/update-status",

  // cycle count notification page
  getApproversCycleCount: baseUrl + "/cycle/count/web/approver-list",
  getNotificationsCycleCount: baseUrl + "/cycle/count/web/notification",

  // cycle count approve page
  approveNotificationCycleCount: baseUrl + "/cycle/count/web/approve",
  recountAllCycleCount: baseUrl + "/cycle/count/web/recount-all",
  rejectAllCycleCount: baseUrl + "/cycle/count/web/reject",
  getApproversCycleCountOrgId: baseUrl + "/cycle/count/web/org-approver",
  deleteApproverCycleCount: baseUrl + "/cycle/count/web/approver",
  createApproverCycleCount: baseUrl + "/cycle/count/web/approver/create",
  updateApproverCycleCount: baseUrl + "/cycle/count/web/approver/update",

  // par count
  getParCountOrganizationList:
    baseUrl + "/par/count/web/options/organization-code",
  getParCountSyncByList: baseUrl + "/par/count/web/options/sync-by",
  getParCountSubInventoryList: baseUrl + "/par/count/web/options/sub-inventory",
  searchParcount: baseUrl + "/par/count/web/par-count-search",
  getFusionResponse: baseUrl + "/par/count/web/fusion-response",

  // label printing
  getAllTemplates: baseUrl + "/label/printing/web/template/get/all",
  createTemplate: baseUrl + "/label/printing/web/template/create",
  updateTemplate: baseUrl + "/label/printing/web/template/update",
  deleteTemplate: baseUrl + "/label/printing/web/template/delete",
  getPriviledges:
    baseUrl + "/label/printing/web/template/transactionprivileges",

  // label history
  getLabelHistoryList:
    baseUrl +
    "/label/printing/web/label/history/print-label?pageNo=0&pageSize=30&asc=false",
  getDocTypeList:
    baseUrl + "/label/printing/web/label/history/options/document-type",
  getTransactionTypeList:
    baseUrl + "/label/printing/web/label/history/options/transaction-type",

  // Mappings
  getAllTransactionTypes:
    baseUrl + "/label/printing/web/template/get/all/transaction/types",
  getAllZplMappings:
    baseUrl + "/label/printing/zpl/constant/keymapping/get/all/mappings",
    getAllEssKeyMappings:
    baseUrl + "/label/printing/ess/constant/keymapping/get/all/mappings",
  getAllTransKeyMappings:
    baseUrl + "/label/printing/trans/keymapping/get/all/mappings",
  deleteTransMapping:
    baseUrl + "/label/printing/trans/keymapping/delete/mapping",
  deleteZPLMapping:
    baseUrl + "/label/printing/zpl/constant/keymapping/delete/mapping",
  deleteESSMapping:
    baseUrl + "/label/printing/ess/constant/keymapping/delete/mapping",
  createZPLMapping:
    baseUrl + "/label/printing/zpl/constant/keymapping/create/mapping",
  createEssMapping:
    baseUrl + "/label/printing/ess/constant/keymapping/create/mapping",
  createTransMapping:
    baseUrl + "/label/printing/trans/keymapping/create/mapping",
  updateZPLMapping:
    baseUrl + "/label/printing/zpl/constant/keymapping/update/mapping",
  updateEssMapping:
    baseUrl + "/label/printing/ess/constant/keymapping/update/mapping",
  updateTransMapping:
    baseUrl + "/label/printing/trans/keymapping/update/mapping",

  // Misc
  getOrganizationMisc:
    miscUrl + "/Warehouse360/UserManagement/wareHouse/master",
  getTransactionType: miscUrl + "/miscellaneous/new/transactiontype",
  // getTransactionType: miscUrl + "/w360/mis/trans/transactiontype",
  getSubInventories: miscUrl + "/wh360/stockOnHand/get/subInventories",
  getLocators: miscUrl + "/wh360/Receiving/get/locatorsBySubinventory",
  getProjects: miscUrl + "/miscellaneous/new/projectsLOV",
  getProjectTasks: miscUrl + "/miscellaneous/new/projectTasksLOV",
  getExpenditureTypes: miscUrl + "/miscellaneous/new/expenditureTypesLOV",
  getExpenditureOrgs: miscUrl + "/miscellaneous/new/projectOrganizationsLOV",

  // Misc Item Details
  getAllItemCodes: miscUrl + "/wh360/stockOnHand/get/itemCodes",
  getReasons: miscUrl + "/pick/confirm/inventory-transaction-reasons",
  getItemDetails: miscUrl + "/wh360/Subinventory/get/itemDetails",
  generateLot: miscUrl + "/wh360/Receiving/generate/lot",
  uploadMisc: miscUrl + "/miscellaneous/new/upload-transaction",
  getOnHandQty: miscUrl + "/wh360/stockOnHand/get/onHandQuantity",
};
