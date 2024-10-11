import { StorageKeys } from "../enums/StorageKeys.enum";
import axiosInstance from "../middleware/axios-interceptor";
import { ILoginForm } from "../models/ILoginForm";
import { AppStorageUtil } from "../utils/AppStorageUtil";

/**
 * Make a call to authenticate user
 * @param loginForm
 */
export const login = async (loginForm: ILoginForm): Promise<boolean> => {
  try {
    const res = await axiosInstance.post(`/auth/login`, loginForm);
    if (!(res.data.code === 200)) {
      return false;
    }
    const jwt = res.data.data;
    AppStorageUtil.setSession(StorageKeys.Jwt, jwt);
    return true;


  } catch (err) {
    console.log("Catch: ", JSON.stringify(err));
    return false; // Optionally rethrow the error to handle it in the calling function
  }
};