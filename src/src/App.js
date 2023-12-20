//Library import statements...
import React, { useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { UserList } from "./pages/unAuth/UserManagement/UserList";
import { MasterSetup } from "./pages/unAuth/UserManagement/MasterSetup";
import { UserMngHistory } from "./pages/unAuth/UserManagement/History";
import { SpotRoaster } from "./pages/unAuth/Dashboard/Roasters/Index";
import { LoginPage } from "./pages/unAuth/LoginPage";
import { AddNewUser } from "./pages/unAuth/UserManagement/AddNewUser";
import "./App.css";
import { CreateNewSetup } from "./pages/unAuth/Scheduler/CreateNewSetup";
import { GeneralSetup } from "./pages/unAuth/Scheduler/GeneralSetup";
import { AppHeader } from "./components/Headers/AppHeader";
import { GenericScheduler } from "./pages/unAuth/Scheduler/GenericScheduler";
// import { RunScheduler } from "./pages/unAuth/Scheduler/RunScheduler";
import {
  ApprovalSetup,
  Approve,
  Notification,
  SearchPhysicalCount,
} from "./pages/unAuth/PhysicalCount";

import {
  ApprovalSetup as CycleCountApprovalSetup,
  Notification as CycleCountNotification,
  SearchCycleCount as CycleCountSearchCycleCount,
  Approve as CycleCountApprove,
} from "./pages/unAuth/CycleCount";
import { ParCountSync } from "./pages/unAuth/ParCount";
import {
  LabelHistory,
  Mapping,
  TemplateMaster,
} from "./pages/unAuth/LabelPrinting";
import { MiscellaneousTrans } from "./pages/unAuth/MiscellaneousTrans/Main";
import { ItemDetails } from "./pages/unAuth/MiscellaneousTrans/ItemDetails";

const App = () => {
  const { access_token } = useSelector((state) => state.commonReducer);

  return (
    <>
      <AppHeader />
      {access_token == "" ? (
        <Routes>
          <Route path="*" element={<LoginPage />} />
        </Routes>
      ) : (
        <Routes>
          {/* user management Routes*/}
          <Route path="/" element={<UserList />} />
          <Route path="/user-management/history" element={<UserMngHistory />} />
          <Route
            path="/user-management/master-setup"
            element={<MasterSetup />}
          />
          <Route path="/user-management/user-list" element={<UserList />} />
          <Route
            path="/user-management/add-update-user"
            element={<AddNewUser />}
          />

          {/* Scheduler Routes*/}
          <Route
            path="/scheduler/create-new-setup"
            element={<CreateNewSetup />}
          />
          <Route path="/scheduler/general-setup" element={<GeneralSetup />} />
          <Route
            path="/scheduler/generic-scheduler"
            element={<GenericScheduler />}
          />

          {/* Physical Count routes */}
          <Route
            path="/physical-count/approval-setup"
            element={<ApprovalSetup />}
          />
          <Route path="/physical-count/approve" element={<Approve />} />
          <Route
            path="/physical-count/notifications"
            element={<Notification />}
          />
          <Route
            path="/physical-count/search"
            element={<SearchPhysicalCount />}
          />

          {/* Cycle Count routes */}
          <Route
            path="/cycle-count/approval-setup"
            element={<CycleCountApprovalSetup />}
          />
          <Route path="/cycle-count/approve" element={<CycleCountApprove />} />
          <Route
            path="/cycle-count/notifications"
            element={<CycleCountNotification />}
          />
          <Route
            path="/cycle-count/search"
            element={<CycleCountSearchCycleCount />}
          />

          {/*  par count */}
          <Route path="/par-count/sync" element={<ParCountSync />} />

          {/* Label Printing */}
          <Route
            path="/label-printing/template-master"
            element={<TemplateMaster />}
          />
          <Route
            path="/label-printing/label-history"
            element={<LabelHistory />}
          />
          <Route
            path="/label-printing/transaction-key-mapping"
            element={<Mapping />}
          />
          <Route path="/label-printing/zpl-mapping" element={<Mapping />} />
          <Route path="/label-printing/ess-mapping" element={<Mapping />} />

          {/* Miscellaneous Transaction */}
          <Route
            path="/miscellaneous-transaction/main"
            element={<MiscellaneousTrans />}
          />
          <Route
            path="/miscellaneous-transaction/item-details"
            element={<ItemDetails />}
          />
        </Routes>
      )}
    </>
  );
};

export default App;
