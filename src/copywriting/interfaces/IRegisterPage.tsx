export interface IRegisterPageCopywriting {
  title: string,
  modals: RegisterFormModals;
  fields: RegisterFormFields;
  labels: RegisterFormLabels;
}

export const defaultRegisterPageCopywriting: IRegisterPageCopywriting = {
  title: '',
  modals: {
    success: {
      title: '',
      content: [''],
      buttonLabel: '',
      cancelButtonLabel: '',
    },
    failure: {
      title: '',
      existingUsernameContent: [''],
      buttonLabel: '',
      cancelButtonLabel: '',
    },
    other: {
      title: '',
      content: [''],
      buttonLabel: '',
      cancelButtonLabel: '',
    },
  },
  fields: {
    username: '',
    password: '',
    confirmPassword: '',
  },
  labels: {
    button: '',
    existingAccount: '',
    passwordComplexity: '',
  }
}

export interface RegisterFormFields {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterFormLabels {
  button: string;
  existingAccount: string;
  passwordComplexity: string;
}

export interface RegisterFormModals {
  success: RegisterFormModalContent;
  failure: RegisterFormFailureModalContent;
  other: RegisterFormModalContent;
}

export interface RegisterFormModalContent {
  title: string;
  content?: string[];
  buttonLabel: string;
  cancelButtonLabel: string,
}

export interface RegisterFormFailureModalContent extends RegisterFormModalContent {
  existingUsernameContent: string[];
}