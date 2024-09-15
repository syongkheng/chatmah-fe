import axiosInstance from "../middleware/axios-interceptor";
import { ITranslateMessagePayload } from "../models/ITranslateMessagePayload";

/**
 * Submits a message to be translated along with the desired language
 * @param payload - Message + desired language
 * @returns - translated content
 */
export const translateContent = async (payload: ITranslateMessagePayload): Promise<string> => {
  try {
    const result = await axiosInstance.post(`${import.meta.env.VITE_APP_URL}/api/v1/gpt/translate`, { payload });
    return result['data']['data'] as string;
  } catch (err: any) {
    throw new Error(`Unexpected error: ${err}`);
  }
}