import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import "./styles.css";

function Table({ users, onDelete }) {
  const history = useHistory();

  function handleEdit(id) {
    history.push("/edituser", { id })
  }

  return (
    <div className="table-block">
      <table width="100%">
        <thead>
          <th>Nome completo</th>
          <th>E-mail</th>
          <th>Ação</th>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button type="button" onClick={() => handleEdit(user.id)}>
                    <FiEdit2 size={20} />
                  </button>

                  <button type="button" onClick={() => {onDelete(user.id)}}>
                    <FiTrash2 size={20} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
