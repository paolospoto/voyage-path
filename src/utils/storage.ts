export const createItem = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const readItem = (key: string): any => {
  const value = localStorage.getItem(key);

  return value;
};

export const updateItem = (key: string, value: any): void => {
  if (localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const deleteItem = (key: string): void => {
  localStorage.removeItem(key);
};
