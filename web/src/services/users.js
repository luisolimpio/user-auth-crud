import api from "./api";

async function GetUsers(page, name, email, cpf) {
  return new Promise((resolve, reject) => {
    api
      .get("/users", {
        params: { page, name, email, cpf },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function SubmitUser(data) {
  return new Promise((resolve, reject) => {
    api
      .post("/users", data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function GetUser(id) {
  return new Promise((resolve, reject) => {
    api
      .get(`/users/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function UpdateUser(id, data) {
  return new Promise((resolve, reject) => {
    api
      .put(`/users/${id}`, data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function DeleteUser(id) {
  return new Promise((resolve, reject) => {
    api
      .delete(`users/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export { GetUsers, SubmitUser, GetUser, UpdateUser, DeleteUser };