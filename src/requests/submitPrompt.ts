import axiosInstance from "../middleware/axios-interceptor";
import { IMessagePayload } from "../models/IMessagePayload";

/**
 * Makes a request to submit a prompt
 * @param payload - Contains message
 * @returns - void
 */
export const submitPrompt = async (payload: IMessagePayload): Promise<void> => {
  try {
    await axiosInstance.post(`${import.meta.env.VITE_APP_URL}/api/v1/gpt`, { payload })
    return;
  } catch (err: any) {
    throw new Error(`Unexpected error: ${err}`);
  }
} 