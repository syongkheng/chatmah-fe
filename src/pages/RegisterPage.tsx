import TextField from "@mui/material/TextField";
import React, { ChangeEvent } from "react";
import { IModalContent } from "../components/modal/ModalComponent";
import SquareSpacing from "../components/spacing/SquareSpacing";
import { SpacingSize } from "../components/spacing/SquareSpacing.enum";
import { H1 } from "../components/styled/HeadingComponents";
import { ErrorMessages } from "../components/styled/MessageComponents";
import StyledButton from "../components/styled/buttons/ButtonComponents";
import { StyledPage } from "../components/styled/pages/StyledPage";
import { Hyperlink, PreserveWhitespace } from "../components/styled/typography/Typography";
import CopywritingConstants from "../constants/PageConstants";
import { defaultRegisterPageCopywriting, IRegisterPageCopywriting } from "../copywriting/interfaces/IRegisterPage";
import { Locale } from "../enums";
import { useCopywritingFromFile } from "../hooks/useCopywritingFromFile";
import useNavigation from "../hooks/useNavigation";
import { defaultRegisterForm, IRegisterForm } from "../models/IRegisterForm";
import { FullWidthBox, HorizontalCenter } from "../components/styled/alignment/AlignmentComponents";
import { StyledModal } from "../components/styled/modals/ModalComponents";
import LoadingComponent from "../components/loader/LoadingComponent";
import { useLocale } from "../contexts/LocaleContext";

const LazyModalComponent = React.lazy(() => import('../components/modal/ModalComponent'));

export default function RegisterPage() {

  const navigate = useNavigation();
  const { locale } = useLocale();

  const [formErrors, setFormErrors] = React.useState<string[]>([]);
  const [showRegistrationModal, setShowRegistrationModal] = React.useState<boolean>(false);
  const [modalContent, setModalContent] = React.useState<IModalContent>();

  const [copywriting, setCopywriting] = React.useState<IRegisterPageCopywriting>(defaultRegisterPageCopywriting);

  React.useEffect(() => {
    useCopywritingFromFile<IRegisterPageCopywriting>(locale, CopywritingConstants.PAGES.REGISTER).then(setCopywriting);
  }, [locale]);

  const [registerForm, setRegisterForm] = React.useState<IRegisterForm>(defaultRegisterForm)

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRegisterForm((prevForm) => ({
      ...prevForm,
      [event.target.id]: event.target.value,
    }));
  }

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Validate the form      
    const { validateForm } = await import('../utils/RegistrationUtil').then(module => module.default);

    const errorList: string[] = await validateForm(registerForm, locale as Locale);

    if (errorList.length === 0) {
      setFormErrors([]);
      // Call the register function and handle the status code
      const statusCode = await import('../requests/register').then((request) =>
        request.register(registerForm)
      );
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
      <React.Suspense fallback={<LoadingComponent show />}>
        <LazyModalComponent
          show={showRegistrationModal}
          setShow={setShowRegistrationModal}
          title={modalContent?.title}
          bodyContent={modalContent?.bodyContent}
          onSuccessHandler={modalContent?.onSuccessHandler}
          cancelButtonLabel={modalContent?.cancelButtonLabel}
        />
      </React.Suspense>
    </>
  );
}
