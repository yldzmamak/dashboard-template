import { StorageKeys } from '@/types/enums/system';

const setLocalStorageItem = <T = object>(key: StorageKeys, value: T) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

const updateLocalStorageItem = (key: StorageKeys, value: null | object) => {
  const oldData: string | null = localStorage.getItem(key);
  if (oldData !== null && value !== null) {
    const newData = {
      ...JSON.parse(oldData),
      ...(value as Record<string, unknown>),
    };
    setLocalStorageItem(key, newData);
  }
};

const getLocalStorageItem = (key: StorageKeys) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const deleteLocalStorageItem = (key: StorageKeys) => {
  return localStorage.removeItem(key);
};

const clearFromLocalStorage = () => {
  return localStorage.clear();
};

const getSessionStorageItem = (key: StorageKeys) => {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const setSessionStorageItem = <T = object>(key: StorageKeys, value: T) => {
  return sessionStorage.setItem(key, JSON.stringify(value));
};

const updateSessionStorageItem = (key: StorageKeys, value: null | object) => {
  const oldData: string | null = sessionStorage.getItem(key);
  if (oldData !== null && value !== null) {
    const newData = {
      ...JSON.parse(oldData),
      ...(value as Record<string, unknown>),
    };
    setSessionStorageItem(key, newData);
  }
};

const deleteSessionStorageItem = (key: StorageKeys) => {
  return sessionStorage.removeItem(key);
};

export const StorageService = {
  setLocalStorageItem,
  updateLocalStorageItem,
  getLocalStorageItem,
  deleteLocalStorageItem,
  clearFromLocalStorage,
  getSessionStorageItem,
  setSessionStorageItem,
  updateSessionStorageItem,
  deleteSessionStorageItem,
};
