import React from 'react';
import { IConversationMessage } from "../../models/IConversationMessage";
import GptMessageCard from './GptMessageCard';
import UserMessageCard from './UserMessageCard';

export default function MessageCard({
  content,
  isSender,
  createdDt,
  translationCodeTable,
}: IConversationMessage) {

  return (
    <React.Fragment key={createdDt + content}>
      {
        isSender
          ?
          <UserMessageCard
            content={content}
            createdDt={createdDt}
            translationCodeTable={translationCodeTable}
          />
          :
          <GptMessageCard
            content={content}
            createdDt={createdDt}
            translationCodeTable={translationCodeTable}
          />
      }
    </React.Fragment>
  )
}
