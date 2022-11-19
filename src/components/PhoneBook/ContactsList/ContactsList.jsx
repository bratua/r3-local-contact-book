import { PureComponent } from 'react';
import { Section } from 'components/Section';
import { StyledContactsLi, StyledContactsUl } from './ContactsList.styled';
import { Notification } from 'components/PhoneBook/Notification';
import { Filter } from 'components/PhoneBook/Filter';

export class ContactsList extends PureComponent {
  renderContacts = contacts => {
    return contacts.map(contact => (
      <StyledContactsLi key={contact.id}>
        <button onClick={() => this.props.onDeleteContact(contact.id)}>
          Del
        </button>
        {contact.name}: {contact.number} --- {contact.id}
        <button onClick={() => this.props.onEditContact(contact.id)}>
          Edit
        </button>
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
