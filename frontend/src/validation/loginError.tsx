import * as Yup from "yup";
//import { parse } from "date-fns";
export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Campo obrigatório"),
  senha: Yup.string()
    .min(3, "A senha deve conter pelo menos 3 caracteres")
    .required("Campo obrigatório"),
});

export const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Campo obrigatório").min(4),
  nome: Yup.string().required("Campo obrigatório").max(25),
  email: Yup.string().email("Email inválido").required("Campo obrigatório"),
  senha: Yup.string()
    .min(3, "A senha deve conter pelo menos 3 caracteres")
    .required("Campo obrigatório"),
});

export const UpdateInfoSchema = Yup.object().shape({
  username: Yup.string().min(
    4,
    "Nome de usuário deve ter pelo menos 4 caracteres"
  ),
  nome: Yup.string().max(25),
  email: Yup.string().email("Email inválido"),
  senha: Yup.string().min(3, "A senha deve conter pelo menos 3 caracteres"),
});
