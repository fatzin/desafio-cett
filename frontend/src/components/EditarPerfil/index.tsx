import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import { ConfigContainer, FormContainer } from "./styles";
import { UpdateInfoSchema } from "../../validation/loginError";
import { UserContext } from "../../context/authContext";
import AcessoNegado from "../AcessoNegado";

interface LoginFormValues {
  username: string;
  email: string;
  senha: string;
  nome: string;
}

const CustomSubmitButton: React.FC = () => {
  const { submitForm } = useFormikContext<LoginFormValues>();

  const handleButtonClick = () => {
    submitForm();
  };

  return (
    <button type="submit" onClick={handleButtonClick}>
      Enviar
    </button>
  );
};

const EditarPerfil: React.FC = () => {
  //---------------------------------------
  const [sucess, setSuccess] = useState(false);
  const { authenticated } = useContext(UserContext);
  //-----------------------------------------
  const handleSubmit = async (values: LoginFormValues) => {
    const { username, nome, email, senha } = values;
    const token = localStorage.getItem("token");

    try {
      console.log(token);
      const response = await fetch("http://localhost:8000/api/put/updateuser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token || "",
        },
        body: JSON.stringify({
          username,
          nome,
          email,
          senha,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        window.location.reload();
        setSuccess(true);
      } else {
        const errorResponseText = await response.text();
        console.log("Ocorreu um erro:", errorResponseText);
      }
    } catch (error) {
      // Ocorreu um erro ao fazer a solicitação
      console.log("Ocorreu um erro:", error);
    }
  };

  return authenticated ? (
    <ConfigContainer>
      <h1 className="inicio__title">Editar Informações do usuário</h1>
      <FormContainer>
        <Formik
          initialValues={{
            username: "",
            nome: "",
            email: "",
            senha: "",
          }}
          validationSchema={UpdateInfoSchema}
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
            <div className="submit__button">
              <CustomSubmitButton />
            </div>
          </Form>
        </Formik>
        {sucess && (
          <p className="info_success">Informações alteradas com sucesso!</p>
        )}
      </FormContainer>
    </ConfigContainer>
  ) : (
    <AcessoNegado />
  );
};

export default EditarPerfil;
