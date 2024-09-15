export interface IHomePageCopywriting {
  banner: IHomePageBanner;
  promptTrip: IHomePagePrompt;
  promptLearn: IHomePagePrompt;
  inputLabel: IHomePageInputLabel;
}

export const defaultHomePageCopywriting: IHomePageCopywriting = {
  banner: {
    assistant: '',
  },
  promptTrip: {
    label: ''
  },
  promptLearn: {
    label: ''
  },
  inputLabel: {
    prompt: ''
  }
}

export interface IHomePageBanner {
  assistant: string;
}

export interface IHomePagePrompt {
  label: string;
}

export interface IHomePageInputLabel {
  prompt: string;
}
