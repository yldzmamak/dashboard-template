import { IStore } from "@/store/IStore";

const getAuthState = (state: IStore) => state.auth;
const getLogin = (state: IStore) => state.auth.login;

export {
  getAuthState,
  getLogin,
};