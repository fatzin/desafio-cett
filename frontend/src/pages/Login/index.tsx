import React, { useContext, useState } from "react";
import { LoginContainer, FormContainer, LinkContainer } from "./styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LoginSchema } from "../../validation/loginError";
import { Navigate, Link } from "react-router-dom";
import { UserContext } from "../../context/authContext";

interface LoginFormValues {
  email: string;
  senha: string;
}

const Login: React.FC = () => {
  const { user, setUser, setAuthenticated } = useContext(UserContext);
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = async (values: LoginFormValues) => {
    const { email, senha } = values;
    try {
      const response = await fetch(
        "http://localhost:8000/api/post/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            senha,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem("token", token);
        setUser(data.user);
        setAuthenticated(true);
      } else {
        const data = await response.json();
        setLoginError(true);
      }
    } catch (error) {
      // Ocorreu um erro ao fazer a solicitação
      console.log("Ocorreu um erro:", error);
    }
  };

  return (
    <LoginContainer>
      <FormContainer>
        <div>
          <h1>Entrar no POST's</h1>
        </div>
        <Formik
          initialValues={{ email: "", senha: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div id="float-label">
              <Field
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                autoCapitalize="off"
              ></Field>
              <label className="Active" htmlFor="email">
                Email
              </label>
              <ErrorMessage
                name="email"
                component="div"
                className="errorLogin"
              />
            </div>
            <div id="float-label">
              <Field type="password" name="senha" id="senha"></Field>
              <label className="Active" htmlFor="senha">
                Senha
              </label>
              <ErrorMessage
                name="senha"
                component="div"
                className="errorLogin"
              />
            </div>
            <div className="submit__button">
              <button type="submit">Login</button>
            </div>
            {user && <Navigate to="/" replace={true} />}
          </Form>
        </Formik>
        <LinkContainer>
          <p>Ainda não tem conta? </p>
          <Link to="/auth/register">Cadastre-se já</Link>
        </LinkContainer>
        {loginError && <p className="login__error">Credenciais inválidas!</p>}
      </FormContainer>
    </LoginContainer>
  );
};

export default Login;
