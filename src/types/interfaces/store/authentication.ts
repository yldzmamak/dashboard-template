import { IGlobalAPIResponse, IStateMisc } from "../response";

export interface AuthState {
  login: ILoginResponseState;
}

export interface ILoginResponseState extends IStateMisc {
  data: IGlobalAPIResponse<ILoginDataState>;
}

export interface ILoginDataState {
  id: string;
  accessToken: string;
  accessTokenExpiresAt: number;
  userType: string;
}
