import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Input from "../../components/Input";
import Alert from "../../components/Alert";
import { useAuth } from "../../contexts/auth";

import "./styles.css";

function Login() {
  const {
    login,
    email,
    password,
    error,
    setError,
    handleEmail,
    handleCheckbox,
    handlePassword,
    checked,
  } = useAuth();

  function handleLogin(e) {
    e.preventDefault();

    login();
  }

  useEffect(() => {
    if (error)
      toast.error(error, {
        onClose: () => setError(""),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <div id="login-page">
      <Alert name={error ? "Toastify__toast--error" : ""} />
      <div className="left">
        <h1>Login</h1>
      </div>
      <main>
        <form className="right" onSubmit={handleLogin}>
          <div className="container-form">
            <legend>Faça seu login</legend>
            <fieldset>
              <Input
                type="email"
                placeholder="E-mail"
                label="E-mail"
                value={email}
                onChange={(e) => {
                  handleEmail(e.target.value);
                }}
                required
              />
              <Input
                value={password}
                type="password"
                onChange={(e) => {
                  handlePassword(e.target.value);
                }}
                label="Senha"
                placeholder="Senha"
                required
              />
            </fieldset>
            <div className="remember-me">
              <p>Lembar de mim</p>
              <input
                value={checked}
                type="checkbox"
                onChange={(e) => {
                  handleCheckbox(e.target.value);
                }}
              />
            </div>
            <button type="submit">Entrar</button>
            <p>
              É novo por aqui? <Link to="/signup">Cadastrar-se</Link>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Login;
