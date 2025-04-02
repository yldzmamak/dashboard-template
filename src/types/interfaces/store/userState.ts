import { IGlobalAPIResponse, IResultDataContent, IStateMisc } from '../response';

export interface UserState {
  userList: IUserListResponseState;
  userDetail: IUserResponseState;
  saveOrUpdateUser: IUserResponseState;
}

/* userList */
export interface IUserListResponseState extends IStateMisc {
  data: IGlobalAPIResponse<IResultDataContent<IUserListDataState[]>>;
}

/* user */
export interface IUserResponseState extends IStateMisc {
  data: IGlobalAPIResponse<IUserListDataState>;
}

export interface IUserListDataState {
  id: number | string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  userType: string;
  isEnabled: boolean;
}
