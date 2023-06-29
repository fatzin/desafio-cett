import styled from "styled-components";
export const ModalOverlay = styled.div`
  z-index: 2;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-box {
    z-index: 3;
    display: block;
    background: white;
    width: 550px;
    height: 200px;
    border-radius: 1rem;
  }
`;
