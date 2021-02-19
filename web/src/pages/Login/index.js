import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Input from "../../components/Input";
import { useAuth } from "../../contexts/auth";


import "./styles.css";

function Login() {
  const { login, email, password, error, handleEmail, handlePassword } = useAuth();

  function handleLogin(e) {
    e.preventDefault();

    login();
  }

  useEffect(() => {
    if(error !== '') {
      alert(error);
    }
      
  }, [error])

  return (
    <div id="login-page">
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
