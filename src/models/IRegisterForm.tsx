export interface IRegisterForm {
  username: string;
  password: string;
  confirmPassword: string;
}

export const defaultRegisterForm: IRegisterForm = {
  username: '',
  password: '',
  confirmPassword: '',
}