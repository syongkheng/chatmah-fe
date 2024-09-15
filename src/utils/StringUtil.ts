/**
 * Utility functions for strings
 */
export class StringUtil {

  /**
   * Pass in a supposed string object to check if empty
   * @param content - supposed string object
   * @returns - true if length is 0 or is null or is undefined
   */
  static isStringEmpty(content: string | null | undefined): boolean {
    return content?.length === 0 || content === null || content === undefined;
  }
}