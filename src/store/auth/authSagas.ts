import { PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { all, call, put, takeLatest } from "redux-saga/effects";

import { history } from "@/components/History";

import { AuthService } from "@/services/AuthService";
import { CookieService } from "@/services/CookieService";

import { pathNames } from "@/types/constants";
import { CodeType, StorageKeys } from "@/types/enums";
import { ILoginPayload } from "@/types/interfaces/login";
import { IGlobalAPIResponse } from "@/types/interfaces/response";
import { ILoginDataState } from "@/types/interfaces/store/authentication";

import { AuthActions } from "./authSlices";

function* getLogin(action: PayloadAction<ILoginPayload>) {
  try {
    const response: IGlobalAPIResponse<ILoginDataState> = yield call(AuthService.login, action.payload);

    if (response.resultInfo.code === CodeType.Success) {
      CookieService.setCookie(StorageKeys.AccessToken, response.resultData.accessToken, {
        expires: dayjs(response.resultData.accessTokenExpiresAt).toDate(),
        secure: process.env.VITE_COOKIE_SECURE === 'true',
      });

      history.push(pathNames.dashboardPage);
    }

    yield put(AuthActions.loginSuccess(response));
  } catch (error) {
    yield put(AuthActions.loginError(error));
  }
}

export default function* watchAuth() {
  yield all([
    takeLatest(AuthActions.login.type, getLogin),
  ]);
}