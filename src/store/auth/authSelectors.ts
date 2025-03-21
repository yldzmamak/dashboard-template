
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/store/ConfigStore';

const login = (state: RootState) => state.auth.login;

export const authSelector = createSelector(
  [login],
  (login) => ({
    login,
  }),
);
