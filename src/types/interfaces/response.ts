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
  code: CodeType | null;
  message: string | null;
}

export interface IResultDataContent<T> extends IResultDataPageInfo {
  content: T;
}

export interface IResultDataPageInfo {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
}