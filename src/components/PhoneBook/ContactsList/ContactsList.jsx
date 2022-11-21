import { PureComponent } from 'react';
import { Section } from 'components/Section';
import { StyledContactsLi, StyledContactsUl } from './ContactsList.styled';
import { Notification } from 'components/PhoneBook/Notification';
import { Filter } from 'components/PhoneBook/Filter';
import { IconButton } from 'components/Button';
import { ContactItem } from 'components/PhoneBook/ContactsList';

export class ContactsList extends PureComponent {
  renderContacts = contacts => {
    return contacts.map(({ id, number, name }) => (
      <StyledContactsLi key={id}>
        <IconButton onClick={() => this.props.onDeleteContact(id)}>
          {this.props.deleteIcon}
        </IconButton>
        <IconButton onClick={() => this.props.onEditContact(id)}>
          {this.props.editIcon}
        </IconButton>
        <ContactItem name={name} number={number} />
      </StyledContactsLi>
    ));
  };

  render() {
    const { contacts } = this.props;
    const isContactsEmpty =
      contacts.length === 0 && this.props.filterValue.length === 0;
    const contactFound = contacts.length > 0;

    console.log(contactFound);
    const contactsBlock = (
      <Section title="Contacts List">
        <Filter
          value={this.props.filterValue}
          onChange={this.props.filterOnChange}
        />
        <StyledContactsUl>{this.renderContacts(contacts)}</StyledContactsUl>
        {contactFound || <Notification message="Not found" />}
      </Section>
    );
    return isContactsEmpty || contactsBlock;
  }
}
