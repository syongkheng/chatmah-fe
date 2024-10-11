import { IHomePageCopywriting } from "../interfaces/IHomePage";

export default function copywritingEn() {
  const banner = {
    primary: 'What are your thoughts?',
    noMoreMessages: 'No more messages...',
  }

  const inputLabel = {
    prompt: 'Type something :)'
  };

  return {
    banner,
    inputLabel,
  } as IHomePageCopywriting;
}