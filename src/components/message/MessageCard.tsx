import React from 'react';
import { IConversationMessage } from "../../models/IConversationMessage";
import LoadingComponent from '../loader/LoadingComponent';

const LazyGptMessageCard = React.lazy(() => import('./GptMessageCard'));
const LazyUserMessageCard = React.lazy(() => import('./UserMessageCard'));

export default function MessageCard({
  content,
  isSender,
  createdDt,
  translationCodeTable,
}: IConversationMessage) {

  return (
    <React.Fragment key={createdDt + content}>
      <React.Suspense fallback={<LoadingComponent show />} >
        {
          isSender
            ?
            <LazyUserMessageCard
              content={content}
              createdDt={createdDt}
              translationCodeTable={translationCodeTable}
            />
            :
            <LazyGptMessageCard
              content={content}
              createdDt={createdDt}
              translationCodeTable={translationCodeTable}
            />
        }
      </React.Suspense>
    </React.Fragment>
  )
}
