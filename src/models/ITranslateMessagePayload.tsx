import { IMessagePayload } from "./IMessagePayload";

export interface ITranslateMessagePayload extends IMessagePayload {
  language: string;
}

// Example usage
export const defaultTranslateMessagePayload: ITranslateMessagePayload = {
  message: '',
  language: '',
};