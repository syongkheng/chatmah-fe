import { TextField } from "@mui/material";
import React, { ChangeEvent } from "react";
import Header from "../components/header/Header";
import SquareSpacing from "../components/spacing/SquareSpacing";
import { SpacingSize } from "../components/spacing/SquareSpacing.enum";
import CopywritingConstants from "../constants/PageConstants";
import { defaultLoginPageCopywriting, ILoginPageCopywriting } from "../copywriting/interfaces/ILoginPage";
import { Locale, StorageKeys } from "../enums";
import { useCopywritingFromFile } from "../hooks/useCopywritingFromFile";
import useNavigation from "../hooks/useNavigation";
import { defaultLoginForm, ILoginForm } from "../models/ILoginForm";
import { login } from "../requests/login";
import { AppStorageUtil } from "../utils/AppStorageUtil";
import { ErrorMessages } from "../components/styled/MessageComponents";
import { StyledPage } from "../components/styled/pages/StyledPage";
import { H1 } from "../components/styled/HeadingComponents";
import { StyledModal } from "../components/styled/modals/ModalComponents";
import { HorizontalCenter } from "../components/styled/alignment/AlignmentComponents";
import { Hyperlink } from "../components/styled/typography/Typography";
import StyledButton from "../components/styled/buttons/ButtonComponents";

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
      <StyledPage $horizontalCenter $verticalCenter>
        <StyledModal>
          <H1>{copywriting?.title}</H1>
          <SquareSpacing spacing={SpacingSize.Large} />
          <form className="login-form" onSubmit={(event) => handleLogin(event)}>
            <TextField
              id="username"
              label={copywriting?.fields?.username}
              size="small"
              fullWidth
              onChange={handleTextChange}
              autoComplete="off"
            />
            <SquareSpacing spacing={SpacingSize.Medium} />
            <TextField
              id="password"
              label={copywriting?.fields?.password}
              size="small"
              fullWidth
              type="password"
              onChange={handleTextChange}
              autoComplete="off"
            />
            <SquareSpacing spacing={SpacingSize.Large} />
            <StyledButton
              primary
              id="btn-login"
              type="submit"
              fullWidth
            >
              {copywriting?.labels.button}
            </StyledButton>
          </form>
          {
            loginError && (
              <>
                <SquareSpacing spacing={SpacingSize.Medium} />
                <HorizontalCenter>
                  <ErrorMessages>{loginError}</ErrorMessages>
                </HorizontalCenter>
              </>

            )
          }
          <SquareSpacing spacing={SpacingSize.Medium} />
          <HorizontalCenter>
            <Hyperlink onClick={() => navigate.goRegister()}>{copywriting?.labels.noExistingAccount}</Hyperlink>
          </HorizontalCenter>
          <SquareSpacing spacing={SpacingSize.Small} />
        </StyledModal>
      </StyledPage>
    </>
  );
}
