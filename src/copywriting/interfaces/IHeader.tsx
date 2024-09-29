export interface IHeaderCopywriting {
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

export const defaultHeaderCopywriting: IHeaderCopywriting = {
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