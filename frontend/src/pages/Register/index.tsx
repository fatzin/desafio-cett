import { LoginContainer, FormContainer, LinkContainer } from "./styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { RegisterSchema } from "../../validation/loginError";
import { Navigate, Link } from "react-router-dom";
import { useState } from "react";

interface LoginFormValues {
  username: string;
  email: string;
  senha: string;
  nome: string;
  data_nascimento: string;
}

const Register: React.FC = () => {
  const [formSuccess, setFormSuccess] = useState(false);
  const handleSubmit = async (values: LoginFormValues) => {
    const { username, nome, email, senha, data_nascimento } = values;
    try {
      const response = await fetch(
        "http://localhost:8000/api/post/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            nome,
            email,
            senha,
            data_nascimento,
          }),
        }
      );

      if (response.ok) {
        setFormSuccess(true);
      } else {
        const data = await response.json();
        console.log(data.message);
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
          <h1>Registre no POST's</h1>
        </div>
        <Formik
          initialValues={{
            username: "",
            nome: "",
            email: "",
            senha: "",
            data_nascimento: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div id="float-label">
              <Field
                type="username"
                name="username"
                id="username"
                autoComplete="off"
                autoCapitalize="off"
              ></Field>
              <label className="Active" htmlFor="username">
                Username
              </label>
              <ErrorMessage
                name="username"
                component="div"
                className="errorLogin"
              />
            </div>
            <div id="float-label">
              <Field
                type="nome"
                name="nome"
                id="nome"
                autoComplete="off"
                autoCapitalize="off"
              ></Field>
              <label className="Active" htmlFor="nome">
                Nome
              </label>
              <ErrorMessage
                name="senha"
                component="div"
                className="errorLogin"
              />
            </div>
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
              <Field
                type="password"
                name="senha"
                id="senha"
                autoComplete="off"
                autoCapitalize="off"
              ></Field>
              <label className="Active" htmlFor="senha">
                Senha
              </label>
              <ErrorMessage
                name="senha"
                component="div"
                className="errorLogin"
              />
            </div>
            <div id="float-label">
              <Field
                type="data_nascimento"
                name="data_nascimento"
                id="data_nascimento"
                placeholder="mês/dia/ano"
                autoComplete="off"
                autoCapitalize="off"
              ></Field>
              <label className="Active" htmlFor="data_nascimento">
                Data de nascimento
              </label>
              <ErrorMessage
                name="data_nascimento"
                component="div"
                className="errorLogin"
              />
            </div>
            <button type="submit">Registrar</button>
          </Form>
        </Formik>
        <LinkContainer>
          <p>Já tem conta? </p>
          <Link to="/auth/login">Faça login</Link>
          {formSuccess && <Navigate to={"/auth/login"} />}
        </LinkContainer>
      </FormContainer>
    </LoginContainer>
  );
};

export default Register;
