import { useEffect, useState } from 'react';

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key)) || defaultValue
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};
