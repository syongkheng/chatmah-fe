import { StorageKeys } from "../enums/StorageKeys.enum";
import axiosInstance from "../middleware/axios-interceptor";
import { ILoginForm } from "../models/ILoginForm";
import { AppStorageUtil } from "../utils/AppStorageUtil";

/**
 * Make a call to authenticate user
 * @param loginForm
 */
export const login = async (loginForm: ILoginForm): Promise<void> => {
  try {
    const res = await axiosInstance.post(`/api/auth/login`, loginForm);
    const jwt = res.data.data;
    AppStorageUtil.setSession(StorageKeys.Jwt, jwt);

    if (!(res.data.code === 200)) {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    console.log("Catch: ", JSON.stringify(err));
    throw err;  // Optionally rethrow the error to handle it in the calling function
  }
};