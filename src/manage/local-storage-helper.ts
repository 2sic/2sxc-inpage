export class LocalStorageHelper {
  static getItemValueString(key: string): string {
    let value: string = localStorage.getItem(key);
    return value;
  }
  static getItemValue<T>(key: string): T {
    let value: string = localStorage.getItem(key);
    return JSON.parse(value) as T;
  }
} 