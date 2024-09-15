import axiosInstance from "../middleware/axios-interceptor";
import { IRegisterForm } from "../models/IRegisterForm";


/**
 * Make a call to add a new user.
 * @param registerForm 
 * @returns 
 */
export const register = async (registerForm: IRegisterForm): Promise<number> => {
  try {
    await axiosInstance.post(`/api/auth/register`, registerForm);
    return 200; // Return 200 if the request is successful
  } catch (err: any) {
    const customStatusCode: number = err.response?.data?.code ?? 500; // Default to 500 if code is not available
    if (customStatusCode === 409) {
      return customStatusCode;
    }
    throw new Error(`Unexpected error: ${customStatusCode}`); // Rethrow other errors with status code
  }
}
