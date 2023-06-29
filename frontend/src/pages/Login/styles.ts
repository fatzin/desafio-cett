import styled from "styled-components";

export const LoginContainer = styled.div`
  font-family: "Poppins", sans-serif;
  min-height: 100vh;
  height: auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-black);
`;

export const FormContainer = styled.div`
  font-family: "Poppins", sans-serif;
  background-color: var(--bg-hover);
  border-radius: 10px;
  height: 500px;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .errorLogin {
    color: var(--font-danger);
    font-size: 15px;
    font-weight: 600;
  }
  & div > h1 {
    font-size: 30px;
  }
  #float-label {
    display: flex;
    flex-direction: column;
    min-width: 350px;
    align-items: center;
  }

  #float-label input {
    width: 70%;
    height: 30px;
    padding: 14px 16px 0 10px;
    outline: 0;
    border: 2px solid var(--border-color);
    color: var(--font-primary);
    font-weight: 800;
    border-radius: 4px;
    background: var(--bg-black);
    font-family: Arial, Helvetica, sans-serif;
    font-size: 13px;
  }

  #float-label label {
    font-size: 13px;
    font-family: Arial, Helvetica, sans-serif;
    padding: 0 12px;
    color: #999;
    pointer-events: none;
    position: absolute;
    transform: translate(0, 26px) scale(1);
    transform-origin: top left;
    transition: all 0.2s ease-out;
  }

  #float-label .Active {
    transform: translate(0, 12px) scale(0.75);
  }

  & div {
    margin: 10px 0 10px 0;
    color: var(--font-primary);
  }

  & button {
    width: 90%;
    padding: 10px;
    background-color: var(--bg-white);
    color: var(--font-black);
    border-radius: 20px;
    outline: none;
    cursor: pointer;
    border: none;
  }

  & .submit__button {
    display: flex;
    justify-content: center;
  }

  & .login__error {
    color: var(--bg-purple);
    margin-top: 5px;
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 5px;
  font-size: 18px;
  & a {
    text-decoration: none;
    color: var(--bg-purple);
  }
`;
