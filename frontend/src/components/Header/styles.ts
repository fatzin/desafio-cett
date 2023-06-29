import styled from "styled-components";

export const HeaderContainer = styled.header`
  font-family: "Poppins", sans-serif;
  width: 575px;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  border-right: 1px solid var(--border-color);
`;

export const HeaderSpacer = styled.div`
  width: 70%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const HeaderOptions = styled.div`
  margin-top: 2px;
  margin-bottom: 2px;

  & a {
    color: var(--font-primary);
    padding: 10px;
    display: flex;
    margin-top: 5px;
    text-decoration: none;
    gap: 20px;
    align-items: center;
    margin-top: 4px;
    font-size: 20px;
    transition: background 0.2 ease;
  }
  & .link__button {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    margin-top: 15px;
    color: var(--font-primary);
    font-size: 20px;
    cursor: pointer;
    width: 60%;
    height: 45px;
    background-color: rgb(120, 86, 255);
    border: none;
    outline: none;
    border-radius: 25px;
    padding-left: 32px;
    padding-right: 32px;
  }

  & .link__button:hover {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    margin-top: 15px;
    color: var(--font-primary);
    font-size: 20px;
    cursor: pointer;
    width: 60%;
    height: 45px;
    background-color: rgb(120, 86, 255);
    border: none;
    outline: none;
    border-radius: 25px;
    padding-left: 32px;
    padding-right: 32px;
  }

  & a > svg {
    height: 25px;
    width: 25px;
  }

  & a:hover {
    background-color: var(--bg-hover);
    cursor: pointer;
    width: 50%;
    padding: 10px;
    border-radius: 50px;
  }
`;

export const HeaderUser = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  & img {
    border-radius: 50%;
  }
`;
