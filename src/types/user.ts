import { IRequestDataPageInfo } from './interfaces/request';

export type UserListPayload = IRequestDataPageInfo & {
  firstName: string | null;
  lastName: string | null;
  isEnabled: boolean;
}

export type UserDetailPayload = {
  id: string;
}