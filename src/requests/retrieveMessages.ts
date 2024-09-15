import axiosInstance from "../middleware/axios-interceptor";
import { IConversationMessage } from "../models/IConversationMessage";

/**
 * Make a call to retrieve messages based on JWT
 * @returns - List of Messages
 */
export const retrieveMessages = async (): Promise<IConversationMessage[]> => {
  try {
    const response = await axiosInstance.get("/api/messages");
    return response['data']['data'] as IConversationMessage[];
  } catch (err: any) {
    throw new Error(`Unexpected error: ${err}`);
  }
}