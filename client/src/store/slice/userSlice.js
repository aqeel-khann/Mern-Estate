import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading:false
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userInStart: (state) => {
      state.loading = true;
    },
    userInSuccess: (state, action) => {
        (state.loading = false),
        (state.currentUser = action.payload);
    },
    userInFailure: (state) => {
      state.loading = false;
    },
    userReset: (state) => {
      state.currentUser = null;
      state.loading = false;
    }
  },
});

export const { userInStart, userInSuccess, userInFailure,userReset } = userSlice.actions;  
export default userSlice.reducer;