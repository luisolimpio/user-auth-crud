import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";

import Input from "../../components/Input";
import Alert from "../../components/Alert";

import { SubmitUser } from "../../services/users";

import "./styles.css";

function RegisterUser() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function submitUser(e) {
    e.preventDefault();

    try {
      const data = {
        name,
        surname,
        email,
        password,
        phone,
        cpf,
      };

      await SubmitUser(data);

      setSuccess(`O usuário ${name} foi cadastrado com sucesso!`);

      setName("");
      setSurname("");
      setEmail("");
      setPassword("");
      setPhone("");
      setCpf("");
    } catch (err) {
      if (err) setError(err.response.data.message);
      else setError("Erro interno no servidor");
    }
  }

  useEffect(() => {
    if (error) toast.error(error, {
      onClose: () => setError(""),
    });
  }, [error]);

  useEffect(() => {
    if (success) toast.success(success, {
      onClose: () => setSuccess(""),
    });
  }, [success]);

  return (
    <div id="register-page">
      <Alert name={error ? 'Toastify__toast--error' : (success ? 'Toastify__toast--success' : '')} />
      <div id="register-page-content" className="container">
        <main>
          <Link to="/">
            <FiArrowLeft size={36} />
          </Link>
          <form onSubmit={submitUser}>
            <div className="container-form">
              <legend>Cadastrar</legend>
              <fieldset>
                <Input
                  placeholder="Nome"
                  label="Nome"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                />
                <Input
                  placeholder="Sobrenome"
                  label="Sobrenome"
                  value={surname}
                  onChange={(e) => {
                    setSurname(e.target.value);
                  }}
                  required
                />
                <Input
                  placeholder="CPF"
                  label="CPF"
                  value={cpf}
                  onChange={(e) => {
                    setCpf(e.target.value);
                  }}
                  required
                />
                <Input
                  placeholder="E-mail"
                  label="E-mail"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
                <Input
                  value={password}
                  type="password"
                  label="Senha"
                  placeholder="Senha"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />

                <Input
                  placeholder="Telefone"
                  label="Telefone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  required
                />
              </fieldset>
              <button type="submit">Cadastrar</button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default RegisterUser;
