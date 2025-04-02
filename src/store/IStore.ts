import { AuthState } from '@/types/interfaces/store/authState';
import { UserState } from '@/types/interfaces/store/userState';

export interface IStore {
  auth: AuthState;
  user: UserState;
}
