import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    email: "",
    uname: "",
    accessToken: "",
    age: "",
    weight: "",
    height: "",
    gender: "",
    condition:""
  });
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
