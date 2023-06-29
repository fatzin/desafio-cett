import styled from "styled-components";

export const ConfigContainer = styled.div`
  width: 600px;
  height: 100vh;
  color: var(--font-primary);
  font-family: "Poppins", sans-serif;
  border-right: 1px solid var(--border-color);

  & .inicio__title {
    font-size: 19px;
    font-weight: 800;
    padding: 10px 10px;
    font-weight: 700;
    border-bottom: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
  }

  #float-label {
    display: flex;
    flex-direction: column;
    min-width: 350px;
  }

  #float-label input {
    width: 80%;
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
`;

export const FormContainer = styled.div`
  margin: 2rem 0rem 0rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  & div + div {
    margin-top: 20px;
  }

  & button {
    padding: 9px 18px;
    border: none;
    outline: none;
    border-radius: 50px;
    font-size: 15px;
    font-weight: 700;
    background-color: var(--bg-white);
    color: var(--font-black);
    cursor: pointer;
    pointer-events: auto;
    margin-top: 20px;
  }

  .submit__button {
    display: flex;
    justify-content: flex-start;
  }

  & .info_success {
    margin-top: 10px;
    color: #4db3b7;
  }

  & #float-label .errorLogin {
    margin-top: 10px;
  }
`;
