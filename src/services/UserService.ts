
import { IGlobalAPIResponse, IResultDataContent } from '@/types/interfaces/response';
import { IUserListDataState } from '@/types/interfaces/store/userState';
import { UserDetailPayload, UserListPayload } from '@/types/user';

import { HttpService } from './BaseService';

class User {
  getUserList = (payload: UserListPayload) => {
    return HttpService.post<UserListPayload, IGlobalAPIResponse<IResultDataContent<IUserListDataState[]>>>('/api/v0/users/filter', payload);
  };

  getUserDetail = (payload: UserDetailPayload) => {
    return HttpService.get<IGlobalAPIResponse<IUserListDataState>>(`/api/v0/users/${payload.id}`);
  };

  saveOrUpdateUser = (payload: IUserListDataState) => {
    return HttpService.post<IUserListDataState, IGlobalAPIResponse<IUserListDataState>>('/api/v0/users', payload);
  };
}

export const UserService = new User();
