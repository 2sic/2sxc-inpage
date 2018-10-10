
/**
 * This object helps persist / load / reset 
 * a setting in the session-state
 * */
export class SessionStateHandler<T> {
  constructor(private readonly key: string) { }

  set(value: string): void { sessionStorage.setItem(this.key, value); };

  remove(): void { sessionStorage.removeItem(this.key); }

  get(): T { return SessionStorageHelper.getItemValue<T>(this.key); }
}

/**
 * session storage helper to get typed values from it
 */
class SessionStorageHelper {
  static getItemValueString(key: string): string {
    const value = sessionStorage.getItem(key);
    return value;
  }

  static getItemValue<T>(key: string): T {
    const value = sessionStorage.getItem(key);
    return JSON.parse(value) as T;
  }
}
