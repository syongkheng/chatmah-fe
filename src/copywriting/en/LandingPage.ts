import { ILandingPageCopywriting } from "../interfaces/ILandingPage";

export default function copywritingEn() {

  const typewriterText = [
    'Recently, I am fine!',
    'I was angry yesterday...',
    'I will manage..?',
  ];
  const buttonLabel = 'Send';
  const prompt = `
  Hey,

  How are you?
  ` // In Markdown
  const maintenanceLabel = "Under maintenance, please wait patiently.";

  return {
    typewriterText,
    buttonLabel,
    prompt,
    maintenanceLabel
  } as ILandingPageCopywriting;
}