import { PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { browserHistory } from '@/components/History';

import { AuthService } from '@/services/AuthService';
import { CookieService } from '@/services/CookieService';

import { pathNames } from '@/types/constants';
import { CodeType, StorageKeys } from '@/types/enums';
import { IGlobalAPIResponse } from '@/types/interfaces/response';
import { ILoginDataState, IMeDataState } from '@/types/interfaces/store/authState';
import { LoginPayload } from '@/types/login';

import { AuthActions } from './authSlices';

function* getLogin(action: PayloadAction<LoginPayload>) {
  try {
    const response: IGlobalAPIResponse<ILoginDataState> = yield call(AuthService.login, action.payload);

    if (response.resultInfo.code === CodeType.Success) {
      CookieService.setCookie(StorageKeys.AccessToken, response.resultData.accessToken, {
        expires: dayjs(response.resultData.accessTokenExpiresAt).toDate(),
        secure: process.env.VITE_COOKIE_SECURE === 'true',
      });

      browserHistory.push(pathNames.dashboardPage);
    }

    yield put(AuthActions.loginSuccess(response));
    yield put(AuthActions.authSuccess(response));
  } catch (error) {
    yield put(AuthActions.loginError(error));
  }
}

function* getAuth() {
  try {
    const response: IGlobalAPIResponse<IMeDataState> = yield call(AuthService.auth);

    yield put(AuthActions.authSuccess(response));
  } catch (error) {
    yield put(AuthActions.authError(error));
  }
}

export default function* watchAuth() {
  yield all([
    takeLatest(AuthActions.login.type, getLogin),
    takeLatest(AuthActions.auth.type, getAuth),
  ]);
}