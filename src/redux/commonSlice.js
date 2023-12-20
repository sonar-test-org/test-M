import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  token: "",
  userName: "",
  expire: "",
  userId: "",
  startDate: new Date(),
  endDate: new Date(),

  selectedProjectObj: {},
  selectedEmployeeId: {},
  dayArr: [],
  dateFromPicker: new Date(),

  qrCode: "",
  tenantName: "",
  xtenantId: "",
  TENENT_IDENTIFIER: "",
  userAddedInUserManagementMessage: "",
  access_token: ''
};
export const commonSlice = createSlice({
  name: "commonlo",
  initialState: initialValue,
  reducers: {
    updateState: (state, action) => {
      assignValueInState(action.payload, state);
      if (action && action.payload.callback) {
        action.payload.callback();
      }
    },
    resetState: (state) => {
      assignValueInState(initialValue, state);
    },
    userAddedInUserManagementMessage: (state, action) => {
      // setTimeout(() => {
      //   assignValueInState({ userAddedInUserManagementMessage: "" }, state);
      // }, 5000);
      assignValueInState(
        { userAddedInUserManagementMessage: action.payload },
        state
      );
    },
  },
});

const assignValueInState = (obj, state) => {
  for (const key in obj) {
    state[key] = obj[key];
  }
};

export const { updateState, resetState, userAddedInUserManagementMessage } =
  commonSlice.actions;
export default commonSlice.reducer;

// dispatch(updateState({ value: 25 }))
// dispatch(resetState())

// const commonReducer = useSelector((state) => state.commonReducer);
