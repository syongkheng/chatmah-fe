import { ICodeTable } from "./ICodeTable";

export interface IConversationMessage {
  createdDt: string | number | Date;
  content: string;
  isSender?: boolean;
  translationCodeTable?: ICodeTable[];
}