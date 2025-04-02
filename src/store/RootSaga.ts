import { all } from 'redux-saga/effects';

import watchAuth from '@/store/auth/authSagas';
import watchUser from '@/store/user/userSagas';

export default function* rootSaga() {
  yield all([
    watchAuth(),
    watchUser(),
  ]);
}
