import api from './api';

async function Auth(email, password) {
  return new Promise((resolve, reject) => {
    api.post('/sessions', {
      email,
      password
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err);
    })
  })
}

export default Auth;