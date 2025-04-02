import { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { browserHistory } from '@/components/History';

import { UserService } from '@/services/UserService';

import { pathNames } from '@/types/constants';
import { CodeType } from '@/types/enums';
import { IGlobalAPIResponse, IResultDataContent } from '@/types/interfaces/response';
import { IUserListDataState } from '@/types/interfaces/store/userState';
import { UserDetailPayload, UserListPayload } from '@/types/user';

import { UserActions } from './userSlices';

function* getUserList(action: PayloadAction<UserListPayload>) {
  try {
    const response: IGlobalAPIResponse<IResultDataContent<IUserListDataState[]>> = yield call(UserService.getUserList, action.payload);

    yield put(UserActions.getUserListSuccess(response));
  } catch (error) {
    yield put(UserActions.getUserListError(error));
  }
}

function* getUserDetail(action: PayloadAction<UserDetailPayload>) {
  try {
    const response: IGlobalAPIResponse<IUserListDataState> = yield call(UserService.getUserDetail, action.payload);

    yield put(UserActions.getUserDetailSuccess(response));
  } catch (error) {
    yield put(UserActions.getUserDetailError(error));
  }
}

function* saveOrUpdateUser(action: PayloadAction<IUserListDataState>) {
  try {
    const response: IGlobalAPIResponse<IUserListDataState> = yield call(UserService.saveOrUpdateUser, action.payload);

    if (response.resultInfo.code === CodeType.Success) {
      notification.success({
        message: response.resultInfo.message,
        duration: 3,
        showProgress: true,
      });

      browserHistory.push(pathNames.userListPage);
    }

    yield put(UserActions.saveOrUpdateUserSuccess(response));
  } catch (error) {
    yield put(UserActions.saveOrUpdateUserError(error));
  }
}

export default function* watchUser() {
  yield all([
    takeLatest(UserActions.getUserList.type, getUserList),
    takeLatest(UserActions.getUserDetail.type, getUserDetail),
    takeLatest(UserActions.saveOrUpdateUser.type, saveOrUpdateUser),
  ]);
}