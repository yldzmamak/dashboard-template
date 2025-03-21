import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { stateMisc } from "@/types/constants";
import { CodeType } from "@/types/enums";
import { ILoginPayload } from "@/types/interfaces/login";
import { IGlobalAPIResponse } from "@/types/interfaces/response";
import { AuthState, ILoginDataState } from "@/types/interfaces/store/authentication";

const initialState: AuthState = {
  login: {
    data: {
      resultData: {
        id: '',
        accessToken: '',
        accessTokenExpiresAt: 0,
        userType: '',
      },
      resultInfo: {
        code: CodeType.Success,
        message: ''
      },
    },
    ...stateMisc,
  },
};

const authSlices = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login(state, _action: PayloadAction<ILoginPayload>) {
      state.login.loading = true;
      state.login.error = initialState.login.error;
    },
    loginSuccess(
      state,
      action: PayloadAction<IGlobalAPIResponse<ILoginDataState>>,
    ) {
      state.login.loading = false;
      state.login.data = action.payload;

      if (action.payload.resultInfo.code !== CodeType.Success) {
        state.login.error = action?.payload?.resultInfo;
      }
    },
    loginError(state, action) {
      state.login.loading = false;
      state.login.error = action.payload;
    },
  }
});

export const AuthActions = authSlices.actions;

export default authSlices.reducer;
