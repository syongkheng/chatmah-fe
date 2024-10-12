import TextField from "@mui/material/TextField";
import React, { ChangeEvent } from "react";
import SquareSpacing from "../components/spacing/SquareSpacing";
import { SpacingSize } from "../components/spacing/SquareSpacing.enum";
import CopywritingConstants from "../constants/PageConstants";
import { defaultLoginPageCopywriting, ILoginPageCopywriting } from "../copywriting/interfaces/ILoginPage";
import { useCopywritingFromFile } from "../hooks/useCopywritingFromFile";
import useNavigation from "../hooks/useNavigation";
import { defaultLoginForm, ILoginForm } from "../models/ILoginForm";
import { login } from "../requests/login";
import { ErrorMessages } from "../components/styled/MessageComponents";
import { StyledPage } from "../components/styled/pages/StyledPage";
import { H1 } from "../components/styled/HeadingComponents";
import { StyledModal } from "../components/styled/modals/ModalComponents";
import { HorizontalCenter } from "../components/styled/alignment/AlignmentComponents";
import { Hyperlink } from "../components/styled/typography/Typography";
import StyledButton from "../components/styled/buttons/ButtonComponents";
import { useLocale } from "../contexts/LocaleContext";

export default function LoginPage() {

  const navigate = useNavigation();
  const { locale } = useLocale();
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
              $primary
              $fullWidth
              id="btn-login"
              type="submit"
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
