import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // 1/2 EXTREMELLY IMPORTANT FOR LOGIN PERSISTATION
  user: JSON.parse(localStorage.getItem("userInfo")) || null,
  isFetching: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  //So what are the actions for redux we want to deploy.
  reducers: {
    //This is how we can dispatch loginFailure in the login page: ------> dispatch(login(data))
    //then the data is assigned to the "user" in the state.
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null; // means there should be no data of any user
    },
    credentialsFetched: (state, action) => {
      state.isFetching = true;
    },
    loginError: (state, action) => {
      //This is how we can dispatch loginFailure in the login page: ------>    dispatch(loginFailure())
      state.error = true;
    },
  },
});

export const { login, logout, credentialsFetched, loginError } =
  userSlice.actions;

// The function below is called a selector and allows us to select a value from the state to send/export the state value
export const selectUser = (state) => state.user.user;
export const selectError = (state) => state.user.error;
export const selectIsFetching = (state) => state.user.isFetching;

export default userSlice.reducer;
