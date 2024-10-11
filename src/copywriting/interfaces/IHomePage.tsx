import React from "react";

export interface IHomePageCopywriting {
  banner: IHomePageBanner;
  prompt: IHomePagePrompt[];
  inputLabel: IHomePageInputLabel;
}

export const defaultHomePageCopywriting: IHomePageCopywriting = {
  banner: {
    primary: '',
    noMoreMessages: '',
  },
  prompt: [],
  inputLabel: {
    prompt: ''
  }
}

export interface IHomePageBanner {
  primary: string;
  noMoreMessages: string;
}

export interface IHomePagePrompt {
  icon: React.ReactNode;
  label: string;
}

export interface IHomePageInputLabel {
  prompt: string;
}
