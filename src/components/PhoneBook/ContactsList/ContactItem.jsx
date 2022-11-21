import { ContactStyled } from './ContactItem.styled';

export const ContactItem = ({ name, number }) => (
  <ContactStyled>
    {name}: {number}
  </ContactStyled>
);
