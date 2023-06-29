import React from "react";
import { NotAuthorized } from "./styles";
import { Link } from "react-router-dom";

const AcessoNegado: React.FC = () => {
  return (
    <NotAuthorized>
      <p>Acesso não autorizado, por favor faça</p>{" "}
      <Link to={"/auth/login"}>Login</Link>
    </NotAuthorized>
  );
};

export default AcessoNegado;
