import { all } from 'redux-saga/effects';

import watchAuth from '@/store/auth/authSagas';

export default function* rootSaga() {
  yield all([
    watchAuth(),
  ]);
}
