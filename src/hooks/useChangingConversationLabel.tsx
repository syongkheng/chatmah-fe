import { useState, useEffect } from 'react';

export function useChangingConversationLabel(intervalTime: number = 3000): string{

  const conversationTranslationList: string[] = [
    "CONVERSATION",
    "对话"
  ]

  
  const [_, setIndex] = useState(0);
  const [label, setLabel] = useState(conversationTranslationList[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % conversationTranslationList.length;
        setLabel(conversationTranslationList[newIndex]);
        return newIndex;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [conversationTranslationList, intervalTime]);

  return label;
}
