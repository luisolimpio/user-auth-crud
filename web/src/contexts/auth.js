import React, {
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useHistory } from "react-router-dom";

import Auth from "../services/auth";
import api from "../services/api";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const history = useHistory();

  const [user, setUser] = useState({
    id: 0,
    name: "",
    email: "",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState("");

  const [signed, setSigned] = useState(false);
  const [error, setError] = useState("");

  const loadStoragedData = useCallback(() => {
    const storagedUser = localStorage.getItem("@RNUSR:user");
    const storagedToken = localStorage.getItem("@RNUSR:token");
    const rememberMe = localStorage.getItem("@RNUSR:rememberme");
    const storagedLogin = localStorage.getItem("@RNUSR:login");

    if (rememberMe && storagedLogin) {
      const loginJson = JSON.parse(storagedLogin);
      setChecked(true);
      setEmail(loginJson.user);
      setPassword(loginJson.password);
    }

    if (storagedUser && storagedToken) {
      setSigned(true);
      setEmail(JSON.parse(storagedUser));
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  const saveLogin = useCallback(() => {
    if (checked) {
      localStorage.setItem(
        "@RNUSR:login",
        `{"user": "${email}", "password": "${password}"}`
      );
    } else {
      localStorage.removeItem("@RNUSR:rememberme");
      localStorage.removeItem("@RNUSR:login");
    }
  }, [checked, email, password]);

  async function login() {
    try {
      const response = await Auth(email, password);

      setUser(response.user);
      setSigned(true);
      api.defaults.headers.Authorization = `Bearer ${response.token}`;

      localStorage.setItem("@RNUSR:user", JSON.stringify(response.user));
      localStorage.setItem("@RNUSR:token", response.token);

      saveLogin();
    } catch (err) {
      if (err.response) setError(err.response.data.message);
      else setError("Erro interno no servidor");
    }
  }

  function logout() {
    localStorage.removeItem("@RNUSR:user");
    localStorage.removeItem("@RNUSR:token");

    setUser({
      id: 0,
      name: "",
      email: "",
    });

    setEmail("");
    setPassword("");
    setError("");
    setSigned(false);
    history.push("/");
  }

  function handleEmail(data) {
    setEmail(data);
  }
  function handlePassword(data) {
    setPassword(data);
  }
  function handleCheckbox(data) {
    setChecked(!checked);
  }

  useEffect(() => {
    saveLogin();
  }, [checked, saveLogin]);

  useEffect(() => {
    loadStoragedData();
  }, [loadStoragedData]);

  return (
    <AuthContext.Provider
      value={{
        user,
        email,
        password,
        checked,
        signed,
        error,
        login,
        logout,
        setError,
        handleCheckbox,
        handleEmail,
        handlePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
