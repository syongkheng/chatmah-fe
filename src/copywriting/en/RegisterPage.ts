
export default function copywritingEn() {

  const title = 'Registration';
  const modals = {
    success: {
      title: 'Registration Successful',
      content: ['Account has been created successfully', 'Please login'],
      buttonLabel: 'Login',
      cancelButtonLabel: 'Cancel',
    },
    failure: {
      title: 'Registration Failed',
      existingUsernameContent: ['Username has been taken.', 'Please use another username.'],
      buttonLabel: 'Try Again',
      cancelButtonLabel: 'Cancel',
    },
    other: {
      title: 'Registration Successful',
      content: ['An unexpected error occurred. Please try again later.'],
      buttonLabel: 'Login',
      cancelButtonLabel: 'Cancel',
    }
  };
  const fields = {
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password',
  };
  const labels = {
    button: 'Register',
    existingAccount: 'Have an existing account? Login',
    passwordComplexity: 'Password must be at least 8 characters \n\nand any 3 of the following:\n1) 1 Uppercase Character\n2) 1 Lowercase Character\n3) 1 Number\n4) 1 Special Character',
  };


  return {
    title,
    modals,
    fields,
    labels,
  };
}