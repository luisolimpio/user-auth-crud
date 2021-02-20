import React from 'react';
import { FiX } from 'react-icons/fi';
import { ToastContainer } from 'react-toastify';

import "./styles.css";

function Alert({ name }) {
  return (
    <ToastContainer
      toastClassName={name}
      progressClassName="Toastify_progress-bar"
      closeButton={() => <FiX size="2rem" color="#FFF"/>}
    />
  );
}

export default Alert;