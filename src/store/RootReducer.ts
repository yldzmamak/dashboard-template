import { Action, Reducer, combineReducers } from 'redux';

import authSlices from '@/store/auth/authSlices';
import userSlices from '@/store/user/userSlices';

import { IStore } from './IStore';

const appReducer: Reducer<IStore> = combineReducers({
  auth: authSlices,
  user: userSlices,
});

const rootReducer = (state: IStore | undefined, action: Action<string>) => {
  return appReducer(state, action);
};

export default rootReducer;
