import { Locale } from "../enums";
import { IRegisterForm } from "../models/IRegisterForm";

/**
 * Utility functions for Registration Flow
 */
export class RegistrationUtil {

  /**
   * Validates the registration form to ensure all input is valid.
   * 
   * @param form - The entire registration form
   * @param locale - Language for prompts or error messages
   * @returns - A string array with error message, empty if form is valid
   */
  static async validateForm (form: IRegisterForm, locale: Locale): Promise<string[]> {
    return new Promise<string[]>(async (resolve, _) => {
      const errorList: string[] = [];
      await import(`../copywriting/${locale}/RegisterValidation.tsx`).then((module) => {
        const {
          username,
          password,
          confirmPassword
        } = form;
        const {
          usernameAlphanumericLabel,
          minimumCharacterLabel,
          smallLetterLabel,
          capitalLetterLabel,
          numberLabel,
          matchLabel,
        } = module.default();
        if (!username.match(/^[a-zA-Z0-9]+$/)) {
          errorList.push(usernameAlphanumericLabel);
        }
        if (password.length < 8) {
          errorList.push(minimumCharacterLabel);
        }
        if (!password.match(/[a-z]+/)) {
          errorList.push(smallLetterLabel);
        }
        if (!password.match(/[A-Z]+/)) {
          errorList.push(capitalLetterLabel);
        }
        if (!password.match(/[0-9]+/)) {
          errorList.push(numberLabel);
        }
        if (password !== confirmPassword) {
          errorList.push(matchLabel);
        }
      })
      resolve(errorList);
    })
  }

}