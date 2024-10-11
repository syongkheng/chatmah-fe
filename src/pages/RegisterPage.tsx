import { TextField } from "@mui/material";
import React, { ChangeEvent } from "react";
import Header from "../components/header/Header";
import ModalComponent, { IModalContent } from "../components/modal/ModalComponent";
import SquareSpacing from "../components/spacing/SquareSpacing";
import { SpacingSize } from "../components/spacing/SquareSpacing.enum";
import { H1 } from "../components/styled/HeadingComponents";
import { ErrorMessages } from "../components/styled/MessageComponents";
import StyledButton from "../components/styled/buttons/ButtonComponents";
import { StyledPage } from "../components/styled/pages/StyledPage";
import { Hyperlink, PreserveWhitespace } from "../components/styled/typography/Typography";
import CopywritingConstants from "../constants/PageConstants";
import { defaultRegisterPageCopywriting, IRegisterPageCopywriting } from "../copywriting/interfaces/IRegisterPage";
import { Locale, StorageKeys } from "../enums";
import { useCopywritingFromFile } from "../hooks/useCopywritingFromFile";
import useNavigation from "../hooks/useNavigation";
import { defaultRegisterForm, IRegisterForm } from "../models/IRegisterForm";
import { register } from "../requests/register";
import { AppStorageUtil } from "../utils/AppStorageUtil";
import { FormUtil } from "../utils/FormUtil";
import { RegistrationUtil } from "../utils/RegistrationUtil";
import { FullWidthBox, HorizontalCenter } from "../components/styled/alignment/AlignmentComponents";
import { StyledModal } from "../components/styled/modals/ModalComponents";

export default function RegisterPage() {

  const navigate = useNavigation();
  const [locale, setLocale] = React.useState<string>(AppStorageUtil.getLocal(StorageKeys.Locale) ?? Locale.en);
  const [formErrors, setFormErrors] = React.useState<string[]>([]);
  const [showRegistrationModal, setShowRegistrationModal] = React.useState<boolean>(false);
  const [modalContent, setModalContent] = React.useState<IModalContent>();

  const [copywriting, setCopywriting] = React.useState<IRegisterPageCopywriting>(defaultRegisterPageCopywriting);

  React.useEffect(() => {
    useCopywritingFromFile<IRegisterPageCopywriting>(locale, CopywritingConstants.PAGES.REGISTER).then(setCopywriting);
    const changeErrorLanguage = async () => {
      const errorList: string[] = await RegistrationUtil.validateForm(registerForm, locale as Locale);
      if (errorList.length === 0) {
        setFormErrors([]);
      } else {
        setFormErrors(errorList);
      }
    }
    if (!FormUtil.isFormEmpty(registerForm)) {
      changeErrorLanguage();
    }
  }, [locale]);

  const [registerForm, setRegisterForm] = React.useState<IRegisterForm>(defaultRegisterForm)

  React.useEffect(() => {
    RegistrationUtil.validateForm(registerForm, locale as Locale);
  }, [registerForm])

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRegisterForm((prevForm) => ({
      ...prevForm,
      [event.target.id]: event.target.value,
    }));
  }

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Validate the form
    const errorList: string[] = await RegistrationUtil.validateForm(registerForm, locale as Locale);
    if (errorList.length === 0) {
      setFormErrors([]);
      // Call the register function and handle the status code
      const statusCode = await register(registerForm);
      setShowRegistrationModal(true);
      if (statusCode === 200) {
        setModalContent({
          title: copywriting.modals.success.title,
          bodyContent: copywriting.modals.success.content,
          successButtonLabel: copywriting.modals.success.buttonLabel,
          cancelButtonLabel: copywriting.modals.success.cancelButtonLabel,
          onSuccessHandler: () => navigate.goLogin(),
        });
      } else if (statusCode === 409) {
        setModalContent({
          title: copywriting.modals.failure.title,
          bodyContent: copywriting.modals.failure.existingUsernameContent,
          successButtonLabel: copywriting.modals.failure.buttonLabel,
          cancelButtonLabel: copywriting.modals.failure.cancelButtonLabel,
          onSuccessHandler: () => setShowRegistrationModal(false),
        });
      }
    } else {
      setFormErrors(errorList);
    }
  }

  const handleExistingAccount = () => {
    navigate.goLogin();
  }

  return (
    <>
      <Header setLocale={setLocale} />
      <StyledPage $horizontalCenter $verticalCenter>
        <StyledModal>
          <H1>{copywriting?.title}</H1>
          <SquareSpacing spacing={SpacingSize.Large} />
          <FullWidthBox>
            <form onSubmit={(event) => handleRegister(event)}>
              <TextField
                id="username"
                label={copywriting?.fields.username}
                onBlur={() => { console.log("Check if username exists;") }}
                size="small"
                fullWidth
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleTextChange(event)}
                autoComplete="off"
              />
              <SquareSpacing spacing={SpacingSize.Medium} />
              <TextField
                id="password"
                label={copywriting?.fields.password}
                size="small"
                fullWidth
                type="password"
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleTextChange(event)}
                autoComplete="off"
              />
              <SquareSpacing spacing={SpacingSize.Small} />
              <PreserveWhitespace >{copywriting?.labels.passwordComplexity}</PreserveWhitespace>
              <SquareSpacing spacing={SpacingSize.Small} />
              <TextField
                id="confirmPassword"
                label={copywriting?.fields.confirmPassword}
                size="small"
                fullWidth
                type="password"
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleTextChange(event)}
                autoComplete="off"
              />
              <SquareSpacing spacing={SpacingSize.Large} />
              <StyledButton
                $primary
                id="btn-register"
                type="submit"
                $fullWidth
              >
                {copywriting?.labels.button}
              </StyledButton>
            </form>
            <SquareSpacing spacing={SpacingSize.Medium} />
            <HorizontalCenter>
              <Hyperlink onClick={() => handleExistingAccount()}>{copywriting?.labels.existingAccount}</Hyperlink>
            </HorizontalCenter>
            {
              formErrors?.length > 0 && formErrors?.map((error, index) => {
                return (
                  <ErrorMessages key={index}>
                    {error}
                  </ErrorMessages>
                )
              })
            }
          </FullWidthBox>
        </StyledModal>
      </StyledPage>
      <ModalComponent
        show={showRegistrationModal}
        setShow={setShowRegistrationModal}
        title={modalContent?.title}
        bodyContent={modalContent?.bodyContent}
        onSuccessHandler={modalContent?.onSuccessHandler}
        cancelButtonLabel={modalContent?.cancelButtonLabel}
      />
    </>
  );
}
