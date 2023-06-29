import React, { useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import EditarPerfil from "./components/EditarPerfil";
import Notificacoes from "./components/Notificacoes";
import Inicio from "./components/Inicio";
import PostDetail from "./components/PostDetail";
import { io } from "socket.io-client";
import { UserContext } from "./context/authContext";

const App: React.FC = () => {
  const { authenticated } = useContext(UserContext);

  useEffect(() => {
    if (authenticated) {
      // Conectar ao socket
      const socket = io("http://localhost:8001");
      socket?.on("connect", () => {
        console.log("Conexão com o socket estabelecida.");
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          {/* rotas aninhadas */}
          <Route path="/" element={<Inicio />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/notifications" element={<Notificacoes />} />
          <Route path="/settings/profile" element={<EditarPerfil />} />
        </Route>
        <Route path="/auth/login" element={<SignIn />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
