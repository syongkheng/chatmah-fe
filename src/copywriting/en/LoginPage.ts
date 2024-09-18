import { ILoginPageCopywriting } from "../interfaces/ILoginPage";

export default function copywritingEn() {
  const title = 'Welcome,';
  const fields = {
    username: 'Username',
    password: 'Password',
  }
  const labels = {
    button: 'Login',
    noExistingAccount: 'No Account?',
  }
  const response = {
    invalidCredentials: 'Invalid Credentials',
  }

  // const forgetPasswordLabel = 'Forget Password?'

  return { 
    title,
    fields,
    labels,
    response
  } as ILoginPageCopywriting;
}