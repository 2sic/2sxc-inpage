/**
 * session storage helper to get typed values from it
 */
export class SessionStorageHelper {
  static getItemValueString(key: string): string {
    const value = sessionStorage.getItem(key);
    return value;
  }

  static getItemValue<T>(key: string): T {
    const value = sessionStorage.getItem(key);
    return JSON.parse(value) as T;
  }
}
