import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";

import Table from "../../components/Table";
import Input from "../../components/Input";
import Select from "../../components/Select";

import { DeleteUser, GetUsers } from "../../services/users";

import "./styles.css";

function User() {
  const history = useHistory();

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
    if (error) alert(error);
  }, [error]);

  return (
    <div id="user-page">
      <div id="user-page-content" className="container">
        <div className="header-table">
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
        </div>
      </div>
    </div>
  );
}

export default User;
