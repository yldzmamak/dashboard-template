import { Action, Reducer, combineReducers } from 'redux';

import authSlices from "@/store/auth/authSlices";

import { IStore } from './IStore';

const appReducer: Reducer<IStore> = combineReducers({
	auth: authSlices,
});

const rootReducer = (state: IStore | undefined, action: Action<string>) => {
  return appReducer(state, action);
};

export default rootReducer;
