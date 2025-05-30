import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { stateMisc } from '@/types/constants';
import { CodeType } from '@/types/enums';
import { IGlobalAPIResponse } from '@/types/interfaces/response';
import { AuthState, ILoginDataState, IMeDataState } from '@/types/interfaces/store/authState';
import { LoginPayload } from '@/types/login';

const initialState: AuthState = {
  login: {
    data: {
      resultData: {
        id: '',
        accessToken: '',
        accessTokenExpiresAt: 0,
        userType: '',
        firstName: '',
        lastName: ''
      },
      resultInfo: {
        code: null,
        message: null
      },
    },
    ...stateMisc,
  },
  me: {
    data: {
      resultData: {
        userType: '',
        firstName: '',
        lastName: ''
      },
      resultInfo: {
        code: null,
        message: null
      },
    },
    loading: false,
    error: null
  }
};

const authSlices = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    login(state, _action: PayloadAction<LoginPayload>) {
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

    auth(state) {
      state.me.loading = true;
      state.me.error = initialState.login.error;
    },
    authSuccess(
      state,
      action: PayloadAction<IGlobalAPIResponse<IMeDataState>>,
    ) {
      state.me.loading = false;
      state.me.data = action.payload;

      if (action.payload.resultInfo.code !== CodeType.Success) {
        state.me.error = action?.payload?.resultInfo;
      }
    },
    authError(state, action) {
      state.me.loading = false;
      state.me.error = action.payload;
    },
  }
});

export const AuthActions = authSlices.actions;

export default authSlices.reducer;
