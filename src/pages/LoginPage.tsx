import { Button, TextField } from "@mui/material";
import React, { ChangeEvent } from "react";
import Header from "../components/header/Header";
import SquareSpacing from "../components/spacing/SquareSpacing";
import { SpacingSize } from "../components/spacing/SquareSpacing.enum";
import CopywritingConstants from "../constants/PageConstants";
import { defaultLoginPageCopywriting, ILoginPageCopywriting } from "../copywriting/interfaces/ILoginPage";
import "../css/LoginPage.css";
import { Locale, StorageKeys } from "../enums";
import { useCopywritingFromFile } from "../hooks/useCopywritingFromFile";
import useNavigation from "../hooks/useNavigation";
import { defaultLoginForm, ILoginForm } from "../models/ILoginForm";
import { login } from "../requests/login";
import { StyleButtonPrimary } from "../styling/ButtonPrimary";
import { AppStorageUtil } from "../utils/AppStorageUtil";
import { ErrorMessages } from "../components/styles/MessageComponents";

export default function LoginPage() {

  const navigate = useNavigation();
  const [locale, setLocale] = React.useState<string>(AppStorageUtil.getLocal(StorageKeys.Locale) ?? Locale.en);
  const [copywriting, setCopywriting] = React.useState<ILoginPageCopywriting>(defaultLoginPageCopywriting);
  const [loginError, setLoginError] = React.useState<string>('');

  React.useEffect(() => {
    useCopywritingFromFile<ILoginPageCopywriting>(locale, CopywritingConstants.PAGES.LOGIN).then(setCopywriting);
  }, [locale]);

  const [loginForm, setLoginForm] = React.useState<ILoginForm>(defaultLoginForm);

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prevForm) => ({
      ...prevForm,
      [event.target.id]: event.target.value,
    }));
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const loginSuccess = await login(loginForm);
    if (loginSuccess) {
      navigate.goHome();
    } else {
      setLoginError(copywriting.response.invalidCredentials)
    }

  };

  return (
    <>
      <Header setLocale={setLocale} />
      <div className="page hc vc">
        <div className="login-modal maxw vc">
          <div className="title-container fw tal">
            <span className="title-text">
              {copywriting?.title}
            </span>
          </div>
          <SquareSpacing spacing={SpacingSize.Large} />
          <form className="login-form" onSubmit={(event) => handleLogin(event)}>
            <div>
              <TextField
                id="username"
                label={copywriting?.fields?.username}
                size="small"
                fullWidth
                onChange={handleTextChange}
                autoComplete="off"
              />
            </div>
            <SquareSpacing spacing={SpacingSize.Medium} />
            <div>
              <TextField
                id="password"
                label={copywriting?.fields?.password}
                size="small"
                fullWidth
                type="password"
                onChange={handleTextChange}
                autoComplete="off"
              />
            </div>
            <SquareSpacing spacing={SpacingSize.Large} />
            <div className="login-button-container">
              <Button
                id="btn-login"
                type="submit"
                sx={StyleButtonPrimary}
                fullWidth
              >
                {copywriting?.labels.button}
              </Button>
            </div>
          </form>
          {
            loginError && (
              <>
                <SquareSpacing spacing={SpacingSize.Medium} />
                <ErrorMessages>{loginError}</ErrorMessages>
              </>

            )
          }
          <SquareSpacing spacing={SpacingSize.Medium} />
          <div className='register-container'>
            <a onClick={() => navigate.goRegister()}>{copywriting?.labels.noExistingAccount}</a>
          </div>
          <SquareSpacing spacing={SpacingSize.Small} />
        </div>
      </div>
    </>
  );
}
