import { IHomePageCopywriting } from '../interfaces/IHomePage';

// Copywriting function
export default function copywritingEn() {
  const banner = {
    primary: '在想什么呢?',
  };

  const inputLabel = {
    prompt: '请打字 :)',
  };

  return {
    banner,
    inputLabel,
  } as IHomePageCopywriting;
}
