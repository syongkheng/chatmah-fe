import { Button, TextField } from "@mui/material";
import React, { ChangeEvent } from "react";
import Header from "../components/header/Header";
import ModalComponent, { IModalContent } from "../components/modal/ModalComponent";
import SquareSpacing from "../components/spacing/SquareSpacing";
import { SpacingSize } from "../components/spacing/SquareSpacing.enum";
import CopywritingConstants from "../constants/PageConstants";
import { defaultRegisterPageCopywriting, IRegisterPageCopywriting } from "../copywriting/interfaces/IRegisterPage";
import "../css/RegisterPage.css";
import { Locale, StorageKeys } from "../enums";
import { useCopywritingFromFile } from "../hooks/useCopywritingFromFile";
import useNavigation from "../hooks/useNavigation";
import { defaultRegisterForm, IRegisterForm } from "../models/IRegisterForm";
import { register } from "../requests/register";
import { StyleButtonPrimary } from "../styling/ButtonPrimary";
import { AppStorageUtil } from "../utils/AppStorageUtil";
import { FormUtil } from "../utils/FormUtil";
import { RegistrationUtil } from "../utils/RegistrationUtil";

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
      <div className="page hc vc">
        <div className="login-modal maxw">
          <div className="title-container">
            <span className="title-text">
              {copywriting?.title}
            </span>
          </div>
          <SquareSpacing spacing={SpacingSize.Large} />
          <form className="registration-form" onSubmit={(event) => handleRegister(event)}>
            <div>
              <TextField
                id="username"
                label={copywriting?.fields.username}
                onBlur={() => { console.log("Check if username exists;") }}
                size="small"
                fullWidth
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleTextChange(event)}
                autoComplete="off"
              />
            </div>
            <SquareSpacing spacing={SpacingSize.Medium} />
            <div>
              <TextField
                id="password"
                label={copywriting?.fields.password}
                size="small"
                fullWidth
                type="password"
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleTextChange(event)}
                autoComplete="off"
              />
            </div>
            <SquareSpacing spacing={SpacingSize.Small} />
            <span className="pre-line">{copywriting?.labels.passwordComplexity}</span>
            <SquareSpacing spacing={SpacingSize.Small} />
            <div>
              <TextField
                id="confirmPassword"
                label={copywriting?.fields.confirmPassword}
                size="small"
                fullWidth
                type="password"
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleTextChange(event)}
                autoComplete="off"
              />
            </div>
            <SquareSpacing spacing={SpacingSize.Large} />
            <div className="login-button-container">
              <Button
                id="btn-register"
                type="submit"
                sx={StyleButtonPrimary}
                fullWidth
              >
                {copywriting?.labels.button}
              </Button>
            </div>
          </form>
          <SquareSpacing spacing={SpacingSize.Medium} />
          <div className='register-container'>
            <a onClick={() => handleExistingAccount()}>{copywriting?.labels.existingAccount}</a>
          </div>

          {
            formErrors?.length > 0 && formErrors?.map((error, index) => {
              return (
                <div className="form-errors" key={index}>
                  {error}
                </div>
              )
            })
          }
        </div>
      </div>
      <ModalComponent
        show={showRegistrationModal}
        setShow={setShowRegistrationModal}
        title={modalContent?.title}
        bodyContent={modalContent?.bodyContent}
        onSuccessHandler={modalContent?.onSuccessHandler}
        successButtonLabel={modalContent?.successButtonLabel}
        cancelButtonLabel={modalContent?.cancelButtonLabel}
      />
    </>
  );
}
