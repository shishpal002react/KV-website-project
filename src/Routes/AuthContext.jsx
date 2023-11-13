import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [login, setLogin] = useState(true);
  const [carDetails, setCarDetails] = useState({
    manufacturer: "",
    model: "",
    fuelType: "",
    name: "",
  });

  return (
    <AuthContext.Provider
      value={{ token, setToken, login, setLogin, carDetails, setCarDetails }}
    >
      {children}
    </AuthContext.Provider>
  );
};
