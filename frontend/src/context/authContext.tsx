import React, { createContext, useState, ReactNode, useEffect } from "react";

interface UserProviderProps {
  children: ReactNode;
}

type User = {
  id: number;
  nome: string;
  username: string;
  email: string;
  senha: string;
  data_nascimento: string;
  imagem: string;
};

type UserContextType = {
  user: User | null;
  authenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  authenticated: false,
  setUser: () => {},
  setAuthenticated: () => {},
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const checkAuthentication = async () => {
      if (token) {
        // Verificar se o usuario está logado
        try {
          const response = await fetch(
            "http://localhost:8000/api/get/auth/validate",
            {
              method: "GET",
              headers: { Authorization: token },
            }
          );
          if (response.ok) {
            // O token é válido, o usuário está autenticado
            const data = await response.json();
            setUser(data);
            setAuthenticated(true);
          } else {
            // O token não é válido, o usuário não está autenticado
            setAuthenticated(false);
            localStorage.removeItem("token");
            // Remover o token inválido do localStorage
          }
        } catch (error) {
          // Ocorreu um erro ao fazer a solicitação
          console.log("Ocorreu um erro:", error);
        }
      } else {
        localStorage.removeItem("token");
      }
    };

    checkAuthentication();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, authenticated, setAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};
