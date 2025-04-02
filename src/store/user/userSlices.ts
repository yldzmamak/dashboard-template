import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { stateMisc } from '@/types/constants';
import { CodeType } from '@/types/enums';
import { IGlobalAPIResponse, IResultDataContent } from '@/types/interfaces/response';
import { IUserListDataState, UserState } from '@/types/interfaces/store/userState';
import { UserDetailPayload, UserListPayload } from '@/types/user';

const initialState: UserState = {
  userList: {
    data: {
      resultData: {
        content: [],
        pageNumber: 0,
        pageSize: 0,
        totalElements: 0
      },
      resultInfo: {
        code: null,
        message: null
      },
    },
    ...stateMisc,
  },
  userDetail: {
    data: {
      resultData: {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        userType: '',
        isEnabled: false
      },
      resultInfo: {
        code: null,
        message: null
      },
    },
    ...stateMisc,
  },
  saveOrUpdateUser: {
    data: {
      resultData: {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        userType: '',
        isEnabled: false
      },
      resultInfo: {
        code: null,
        message: null
      },
    },
    ...stateMisc,
  }
};

const userSlices = createSlice({
  name: 'User',
  initialState,
  reducers: {
    getUserList(state, _action: PayloadAction<UserListPayload>) {
      state.userList.loading = true;
      state.userList.error = initialState.userList.error;
    },
    getUserListSuccess(
      state,
      action: PayloadAction<IGlobalAPIResponse<IResultDataContent<IUserListDataState[]>>>,
    ) {
      state.userList.loading = false;
      state.userList.data = action.payload;

      if (action.payload.resultInfo.code !== CodeType.Success) {
        state.userList.error = action?.payload?.resultInfo;
      }
    },
    getUserListError(state, action) {
      state.userList.loading = false;
      state.userList.error = action.payload;
    },

    getUserDetail(state, _action: PayloadAction<UserDetailPayload>) {
      state.userDetail.loading = true;
      state.userDetail.error = initialState.userList.error;
    },
    getUserDetailSuccess(
      state,
      action: PayloadAction<IGlobalAPIResponse<IUserListDataState>>,
    ) {
      state.userDetail.loading = false;
      state.userDetail.data = action.payload;

      if (action.payload.resultInfo.code !== CodeType.Success) {
        state.userDetail.error = action?.payload?.resultInfo;
      }
    },
    getUserDetailError(state, action) {
      state.userDetail.loading = false;
      state.userDetail.error = action.payload;
    },

    saveOrUpdateUser(state, _action: PayloadAction<IUserListDataState>) {
      state.saveOrUpdateUser.loading = true;
      state.saveOrUpdateUser.error = initialState.userList.error;
    },
    saveOrUpdateUserSuccess(
      state,
      action: PayloadAction<IGlobalAPIResponse<IUserListDataState>>,
    ) {
      state.saveOrUpdateUser.loading = false;
      state.saveOrUpdateUser.data = action.payload;

      if (action.payload.resultInfo.code !== CodeType.Success) {
        state.saveOrUpdateUser.error = action?.payload?.resultInfo;
      }
    },
    saveOrUpdateUserError(state, action) {
      state.saveOrUpdateUser.loading = false;
      state.saveOrUpdateUser.error = action.payload;
    },
  }
});

export const UserActions = userSlices.actions;

export default userSlices.reducer;
