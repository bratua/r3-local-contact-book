import styled from 'styled-components';

export const BackDrop = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const ModalWindow = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  padding: 20px;
  top: 50%;
  left: 50%;
  max-width: 500px;
  min-height: 300px;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border-radius: 10px;
  background-color: beige;

  .modal-close-button {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 40px;
    height: 40px;
    border: 0;
    border-radius: 50%;
    background-color: transparent;
    cursor: pointer;

    :hover {
      color: tomato;
    }
  }
`;

export const ModalTitle = styled.h2`
  padding: 0;
  margin: 0;
  text-align: center;
`;
