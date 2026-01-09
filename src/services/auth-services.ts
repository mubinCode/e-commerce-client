import { authKey } from "@/constants/auth.constants";
import { decodedToken } from "@/utils/jwt";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/local-storage";

export type TUserAuthInfo = {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage(authKey, accessToken);
};
export const getAuthInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    const userAuthInfo = decodedToken(authToken) as TUserAuthInfo;
    return { ...userAuthInfo, role: userAuthInfo.role.toLowerCase() };
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    return !!authToken;
  }
};
export const removeAuthUser = () => {
  return removeFromLocalStorage(authKey);
};
