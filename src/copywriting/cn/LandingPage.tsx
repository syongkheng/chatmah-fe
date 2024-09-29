import { ILandingPageCopywriting } from "../interfaces/ILandingPage";

export default function copywritingCn() {
  const typewriterText = [
    '最近过得挺好!',
    '昨天有点不耐烦...',
    '我能应付过来吧..?',
  ];
  const buttonLabel = '发送';
  const prompt = `
  嘿,

  您咋样?
  ` // In Markdown
  const maintenanceLabel = '正在维修, 请耐心稍等';

  return { 
    typewriterText,
    buttonLabel,
    prompt,
    maintenanceLabel
  } as ILandingPageCopywriting;
}