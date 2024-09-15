
export default function copywritingCn() {

  const title = '创新账号';
  const modals = {
    success: {
      title: '成功',
      content: ['账号已创新', '请登录'],
      buttonLabel: '登录',
      cancelButtonLabel: '取消',
    },
    failure: {
      title: '失败',
      existingUsernameContent: ['ID已存在, 请重新设置'],
      buttonLabel: '重新尝试',
      cancelButtonLabel: '取消',
    },
  };
  const fields = {
    username: '账号ID',
    password: '密码',
    confirmPassword: '确认密码',
  };
  const labels = {
    button: '创新',
    existingAccount: '已有用户? 登录',
    passwordComplexity: '密码必须至少包含8个字符\n并且满足以下任意3项:\n1) 至少1个大写字母\n2) 至少1个小写字母\n3) 至少1个数字\n4) 至少1个特殊字符',
  };
  return {
    title,
    modals,
    fields,
    labels,
  };
}