import styled from 'styled-components';

export const StyledContactsLi = styled.li`
  display: flex;
  align-items: center;
  list-style: none;
  margin-top: 7px;

  text-align: left;

  button {
    /* margin-right: 7px; */
    margin-left: 10px;
    width: 30px;
    height: 30px;
    border-color: red;
    background-color: rgba(150, 60, 60, 0.6);
    border-radius: 50%;
    cursor: pointer;
  }
`;

export const StyledContactsUl = styled.ul`
  margin: 0;
  padding: 0;
`;
