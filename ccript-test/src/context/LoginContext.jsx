'use client';

import { createContext, useState } from 'react';

const getFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('wirsa');
    return token || '';
  }
};

export const LoginContext = createContext();

export const LoginContextProvider = ({ children }) => {
  const [newToken, setNewToken] = useState((() => getFromLocalStorage())());

  const loginHandler = (data) => {
    setNewToken(data);
    localStorage.setItem('wirsa', data);
  };

  const logoutHandler = () => {
    localStorage.removeItem('wirsa');
    setNewToken('');
  };

  return (
    <LoginContext.Provider value={{ newToken, loginHandler, logoutHandler }}>
      {children}
    </LoginContext.Provider>
  );
};
