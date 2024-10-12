import { StorageKeys } from "../enums/StorageKeys.enum";
import axiosInstance from "../middleware/axios-interceptor";
import { ILoginForm } from "../models/ILoginForm";
import { AppStorageUtil } from "../utils/AppStorageUtil";

/**
 * Make a call to authenticate user
 * @param loginForm
 */
export const login = async (loginForm: ILoginForm): Promise<string | undefined> => {
  try {
    const res = await axiosInstance.post(`/auth/login`, loginForm);
    if (!(res.data.code === 200)) {
      return undefined;
    }
    const jwt = res.data.data;
    AppStorageUtil.setSession(StorageKeys.Jwt, jwt);
    return jwt;


  } catch (err) {
    console.log("Catch: ", JSON.stringify(err));
    return undefined; // Optionally rethrow the error to handle it in the calling function
  }
};