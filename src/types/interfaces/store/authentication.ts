import { IGlobalAPIResponse, IStateMisc } from '../response';

export interface AuthState {
  login: ILoginResponseState;
  me: IMeResponseState;
}

/* login */
export interface ILoginResponseState extends IStateMisc {
  data: IGlobalAPIResponse<ILoginDataState>;
}

export interface ILoginDataState extends IMeDataState {
  id: string;
  accessToken: string;
  accessTokenExpiresAt: number;
}

/* auth */
export interface IMeResponseState extends IStateMisc {
  data: IGlobalAPIResponse<IMeDataState>;
}

export interface IMeDataState {
  userType: string;
  firstName: string;
  lastName: string;
}
