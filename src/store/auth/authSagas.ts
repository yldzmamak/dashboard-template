import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, takeLatest } from "redux-saga/effects";

import { AuthService } from "@/services/AuthService";

import { ILoginPayload } from "@/types/interfaces/login";
import { IGlobalAPIResponse } from "@/types/interfaces/response";
import { ILoginDataState } from "@/types/interfaces/store/authentication";

import { AuthActions } from "./authSlices";

function* getLogin (action: PayloadAction<ILoginPayload>) {
  try {
    const response: IGlobalAPIResponse<ILoginDataState> = yield call(AuthService.login, action.payload);

    yield put(AuthActions.loginSuccess(response));
  } catch (error) {
    yield put(AuthActions.loginError(error));
  }
}

export default function* watchAuth () {
  yield all([
    takeLatest(AuthActions.login.type, getLogin),
  ]);
}