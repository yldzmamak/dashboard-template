
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/store/ConfigStore';

const login = (state: RootState) => state.auth.login;

const me = (state: RootState) => state.auth.me;

export const authSelector = createSelector(
  [login, me],
  (login, me) => ({
    login,
    me,
  }),
);
