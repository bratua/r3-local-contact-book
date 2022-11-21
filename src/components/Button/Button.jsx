import { IconButtonStyled } from './Button.styled';

export const IconButton = ({ onClick, type, children }) => {
  return (
    <IconButtonStyled type={type} onClick={onClick}>
      {children}
    </IconButtonStyled>
  );
};
