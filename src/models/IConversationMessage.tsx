import { ICodeTable } from "./ICodeTable";

export interface IConversationMessage {
  createdDt: Date;
  content: string;
  isSender?: boolean;
  translationCodeTable?: ICodeTable[];
}