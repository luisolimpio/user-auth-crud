import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";

import Input from "../../components/Input";
import Alert from "../../components/Alert";

import { GetUser, UpdateUser } from "../../services/users";

import "./styles.css";

function EditUser({ location }) {
  const id = location.state.id;

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function setUser(data) {
    setName(data.name);
    setSurname(data.surname);
    setEmail(data.email);
    setPassword(data.password);
    setPhone(data.phone);
    setCpf(data.cpf);
  }

  const getUser = useCallback(async () => {
    try {
      const response = await GetUser(id);

      setUser(response);
    } catch (err) {
      if (err) setError(err.response.data.message);
      else setError("Erro interno no servidor");
    }
  }, [id]);

  async function updateUser(e) {
    e.preventDefault();

    try {
      let data;

      if (passwordOpen) {
        data = {
          name,
          surname,
          email,
          password,
          phone,
          cpf,
        };

        await UpdateUser(id, data);
      } else {
        data = {
          name,
          surname,
          email,
          phone,
          cpf,
        };

        await UpdateUser(id, data);
      }

      setSuccess(`O usuário ${name} foi atualizado com sucesso!`);
    } catch (err) {
      if (err) setError(err.response.data.message);
      else setError("Erro interno no servidor");
    }
  }

  useEffect(() => {
    getUser();
  }, [getUser]);

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
    <div id="edit-page">
      <Alert name={error ? 'Toastify__toast--error' : (success ? 'Toastify__toast--success' : '')} />
      <div id="edit-page-content" className="container">
        <main>
          <Link to="/">
            <FiArrowLeft size={36} />
          </Link>
          <form onSubmit={updateUser}>
            <div className="container-form">
              <legend>Editar</legend>
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
                  placeholder="Telefone"
                  label="Telefone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  required
                />

                <button
                  type="button"
                  className="open-password"
                  onClick={() => {
                    setPasswordOpen(!passwordOpen);
                  }}
                >
                  <p>Alterar senha</p>
                </button>

                {passwordOpen && (
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
                )}
              </fieldset>
              <button type="submit">Concluir</button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default EditUser;
