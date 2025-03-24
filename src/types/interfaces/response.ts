import { CodeType } from '@/types/enums';

export interface IStateMisc {
  loading: boolean;
  error: null | string | object;
}

export interface IGlobalAPIResponse<T> {
  resultData: T;
  resultInfo: IResultInfoDetail;
}

export interface IResultInfoDetail {
  code: CodeType;
  message: string;
}