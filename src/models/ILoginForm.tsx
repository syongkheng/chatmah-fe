export interface ILoginForm {
  username: string;
  password: string;
}

export const defaultLoginForm: ILoginForm = {
  password: '',
  username: '',
}