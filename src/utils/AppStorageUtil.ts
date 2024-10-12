/**
 * Utility functions for interacting with session and local storages.
 */
export class AppStorageUtil {

  /**
   * Stores a value in Session Storage
   * @param key - List of keys from StorageKeys
   * @param value - string value to be stored
   */
  static setSession(key: string, value: string): void {
    window.sessionStorage.setItem(key, value);
  }

  /**
   * Retrieves a value in Session Storage
   * @param key - List of keys from AppStorageUtil.Key
   * @returns - string value, null if not found
   */
  static getSession(key: string): string | null {
    return window.sessionStorage.getItem(key);
  }

  /**
   * Removes a value in Session Storage based on the key
   * @param key - List of keys from AppStorageUtil.Key
   */
  static removeSession(key: string): void {
    window.sessionStorage.removeItem(key);
  }

  /**
   * Stores a value in Local Storage
   * @param key - List of keys from StorageKeys
   * @param value - string value to be stored
   */
  static setLocal(key: string, value: string): void {
    window.localStorage.setItem(key, value);
  }

  /**
   * Retrieves a value in Local Storage
   * @param key - List of keys from AppStorageUtil.Key
   * @returns - string value, null if not found
   */
  static getLocal(key: string): string | null {
    return window.localStorage.getItem(key);
  }

  /**
   * Removes a value in Local Storage based on the key
   * @param key - List of keys from AppStorageUtil.Key
   */
  static removeLocal(key: string): void {
    window.sessionStorage.removeItem(key);
  }
}