
export default function copywritingCn() {
  const title = '欢迎您,';
  const fields = {
    username: '账号ID',
    password: '密码',
  }
  const labels = {
    button: '登录',
    noExistingAccount: '没有账号?',
  }
  const response = {
    invalidCredentials: 'ID或密码有错误',
  }

  // const forgetPasswordLabel = '忘记密码?';

  return { 
    title,
    fields,
    labels,
    response
  };
}