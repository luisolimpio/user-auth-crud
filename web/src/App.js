import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/auth";

import Routes from "./routes";

import "./styles/global.css";
import 'react-toastify/dist/ReactToastify.min.css'; 

function App() {
  return (
    <div className="App">
      <>
        <BrowserRouter>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
