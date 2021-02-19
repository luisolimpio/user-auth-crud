import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import Input from "../../components/Input";

import { SubmitUser } from '../../services/users';

import "./styles.css";

function Signup() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");

  const [error, setError] = useState("");

  async function handleSignup(e) {
    e.preventDefault();

    const data = {
      name,
      surname,
      email,
      password,
      phone,
      cpf,
    };

    console.log(data);

    try {
      await SubmitUser(data);

      alert(`O usuário ${name}, foi cadastrado com sucesso`);

      setName('');
      setSurname('');
      setEmail('');
      setPassword('');
      setPhone('');
      setCpf('');
    } catch (err) {
      if(err.response)
        setError(err.response.data.message);
      else
        setError("Erro interno no servidor");
    }
  }

  return (
    <div id="signup-page">
      <main>
        <header>
          <Link to="/">
            <FiArrowLeft size={36} />
          </Link>
        </header>
        <form className="left" onSubmit={handleSignup}>
          <div className="container-form">
            <legend>Cadastro</legend>
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
                label="Senha"
                type="password"
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
      <div className="right">
        <h1>Signup</h1>
      </div>
    </div>
  );
}

export default Signup;
