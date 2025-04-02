
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/store/ConfigStore';

const userList = (state: RootState) => state.user.userList;

const userDetail = (state: RootState) => state.user.userDetail;

const saveOrUpdateUser = (state: RootState) => state.user.saveOrUpdateUser;

export const userSelector = createSelector(
  [userList, userDetail, saveOrUpdateUser],
  (userList, userDetail, saveOrUpdateUser) => ({
    userList,
    userDetail,
    saveOrUpdateUser
  }),
);
