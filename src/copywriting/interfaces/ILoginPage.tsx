export interface ILoginPageCopywriting {
  title: string;
  fields: {
    username: string;
    password: string;
  }
  labels: {
    button: string;
    noExistingAccount: string;
  }
  response: {
    invalidCredentials: string;
  }
}

export const defaultLoginPageCopywriting: ILoginPageCopywriting = {
  title: '',
  fields: {
    username: '',
    password: '',
  },
  labels: {
    button: '',
    noExistingAccount: '',
  },
  response: {
    invalidCredentials: '',
  }
}