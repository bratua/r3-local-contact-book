import styled from 'styled-components';
import { Field, ErrorMessage } from 'formik';

export const TitleFields = styled.h2`
  margin-top: 10px;
  margin-bottom: 0;
  padding: 0;
`;

export const Fields = styled(Field)`
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 0;
`;

export const ErrorStyled = styled(ErrorMessage)`
  margin-bottom: 5px;
  color: red;
  font-size: small;
`;
