/**
 * local storage helper to get typed values from it
 */
export class LocalStorageHelper {
  static getItemValueString(key: string): string {
    const value: string = localStorage.getItem(key);
    return value;
  }

  static getItemValue<T>(key: string): T {
    const value: string = localStorage.getItem(key);
    return JSON.parse(value) as T;
  }
} 
