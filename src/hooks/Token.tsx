import { createContext, useContext, useEffect, useState } from "react";

const Token = createContext(null);

export const AssignTokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(sessionStorage.getItem("Token"));
  }, []);

  useEffect(() => {
    sessionStorage.setItem("Token", token);
  }, [token]);

  return (
    <Token.Provider value={{ token, setToken }}>{children}</Token.Provider>
  );
};

export const useToken = () => {
  return useContext(Token);
};
