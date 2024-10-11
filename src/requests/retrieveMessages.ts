import axiosInstance from "../middleware/axios-interceptor";
import { IConversationMessage } from "../models/IConversationMessage";
import { Page } from "../models/Page";



/**
 * Make a call to retrieve messages based on JWT
 * @returns - List of Messages
 */
export const retrieveMessages = async (offset: number = 0): Promise<Page<IConversationMessage>> => {
  try {
    const response = await axiosInstance.get(`/api/messages`, {
      params: { offset }
    });
    return response['data']['data'] as Page<IConversationMessage>;
  } catch (err: any) {
    throw new Error(`Unexpected error: ${err}`);
  }
}