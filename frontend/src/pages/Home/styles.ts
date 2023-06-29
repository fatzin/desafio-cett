import styled from "styled-components";

export const HomeContainer = styled.div`
  height: 100vh;
  display: flex;
  overflow-y: auto;
`;

export const ContentContainer = styled.div`
  flex-grow: 1; /* Permite que o conteúdo do contêiner cresça para preencher o espaço restante */
  overflow-y: auto; /* Adiciona uma barra de rolagem vertical quando necessário */
`;
