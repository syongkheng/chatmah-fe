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

export default function LoginPage() {

  const navigate = useNavigation();
  const [locale, setLocale] = React.useState<string>(AppStorageUtil.getLocal(StorageKeys.Locale) ?? Locale.en);
  const [copywriting, setCopywriting] = React.useState<ILoginPageCopywriting>(defaultLoginPageCopywriting);

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

  const handleLogin = async () => {
    try {
      await login(loginForm);
      navigate.goHome();
    } catch (err) {
      // TODO: Display error
      console.error("Error: ", err);
    }
  };

  return (
    <>
      <Header setLocale={setLocale} />
      <div className="page-container hc">
        <div className="login-modal maxw">
          <div className="title-container">
            <span className="title-text">
              {copywriting?.title}
            </span>
          </div>
          <SquareSpacing spacing={SpacingSize.Large} />
          <form onSubmit={handleLogin}>
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
                onClick={handleLogin}
                sx={StyleButtonPrimary}
                fullWidth
              >
                {copywriting?.labels.button}
              </Button>
            </div>
          </form>
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
