const loadItem = (key: string, defaultValue: string) => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    } else return defaultValue;
  }
};

const saveItem = <T>(key: string, value: T | unknown) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export { loadItem, saveItem };
