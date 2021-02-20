import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FiPlusCircle, FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";

import Table from "../../components/Table";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Alert from "../../components/Alert";

import { DeleteUser, GetUsers } from "../../services/users";
import { useAuth } from "../../contexts/auth";

import "./styles.css";

function User() {
  const history = useHistory();
  const { logout } = useAuth()

  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");

  const [selectedValue, setSelectedValue] = useState("name");

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    current_page: 0,
    total_pages: 0,
    total: 0,
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const getUsers = useCallback(async () => {
    try {
      const response = await GetUsers(page, name, email, cpf);

      setUsers(response.users);
      setPagination(response.pagination);
    } catch (err) {
      if (err.response) setError(err.response.data.message);
      else setError("Erro interno no servidor");
    }
  }, [page, name, email, cpf]);

  function prevPage() {
    if (page === 1) {
      return;
    }

    setPage(page - 1);
  }

  function nextPage() {
    if (pagination.total_pages === pagination.current_page) {
      return;
    }

    setPage(page + 1);
  }

  function handleSearch(data) {
    if (selectedValue === "name") setName(data);
    else if (selectedValue === "email") setEmail(data);
    else setCpf(data);

    setPage(1);
  }

  async function handleDeleteUser(id) {
    try {
      await DeleteUser(id);

      setPage(1);

      getUsers();

      setSuccess("O usuário foi deletado com sucesso.");
    } catch (err) {
      if (err.response) setError(err.response.data.message);
      else setError("Erro interno no servidor");
    }
  }

  function handleSelected(data) {
    setSelectedValue(data);
    setName("");
    setEmail("");
    setCpf("");
  }

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    if (error)
      toast.error(error, {
        onClose: () => setError(""),
      });
  }, [error]);

  useEffect(() => {
    if (success)
      toast.success(success, {
        onClose: () => setSuccess(""),
      });
  }, [success]);

  return (
    <div id="user-page">
      <Alert
        name={
          error
            ? "Toastify__toast--error"
            : success
            ? "Toastify__toast--success"
            : ""
        }
      />
      <div id="user-page-content" className="container">
        <div className="header-table">
          <button type="button" id="logout" onClick={logout}>
            Sair
            <FiLogOut size="2rem" />
          </button>
          <div className="search-container">
            {selectedValue === "name" ? (
              <Input
                name="name"
                label="Pesquisar"
                placeholder="Pesquisar por nome"
                value={name}
                onChange={(e) => handleSearch(e.target.value)}
              />
            ) : selectedValue === "email" ? (
              <Input
                name="email"
                label="Pesquisar"
                value={email}
                placeholder="Pesquisar por e-mail"
                onChange={(e) => handleSearch(e.target.value)}
              />
            ) : (
              <Input
                name="cpf"
                label="Pesquisar"
                placeholder="Pesquisar por CPF"
                value={cpf}
                onChange={(e) => handleSearch(e.target.value)}
              />
            )}
            <Select
              name="filters"
              value={selectedValue}
              onChange={(e) => {
                handleSelected(e.target.value);
              }}
              options={[
                { value: "name", label: "Nome" },
                { value: "email", label: "E-mail" },
                { value: "cpf", label: "CPF" },
              ]}
            />
          </div>
          <button type="button" onClick={() => history.push("/registeruser")}>
            Novo usuário
            <FiPlusCircle size={20} />
          </button>
        </div>
        <div className="table-container">
          <Table
            users={users}
            onDelete={(id) => {
              handleDeleteUser(id);
            }}
          />
          <div className="page-options">
            <button type="button" onClick={prevPage}>
              Anterior
            </button>
            <button type="button" onClick={nextPage}>
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
