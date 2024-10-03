import axiosInstance from "../middleware/axios-interceptor";
import { IConversationMessage } from "../models/IConversationMessage";



/**
 * Make a call to retrieve messages based on JWT
 * @returns - List of Messages
 */
export const retrieveMessages = async (offset: number = 0): Promise<IConversationMessage[]> => {
  try {
    const response = await axiosInstance.get(`/api/messages`, {
      params: { offset }
    });
    return response['data']['data'] as IConversationMessage[];
  } catch (err: any) {
    throw new Error(`Unexpected error: ${err}`);
  }
}