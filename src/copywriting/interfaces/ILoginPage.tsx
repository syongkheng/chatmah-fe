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
  }
}