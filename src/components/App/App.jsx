import { PureComponent } from 'react';
import { nanoid } from 'nanoid';
import { ContactsList } from 'components/PhoneBook/ContactsList';
import Box from 'components/Box/Box';
import { Modal } from 'components/Modal';
import editorContext from '../Context/editor-context.js';

export class App extends PureComponent {
  state = {
    contacts: [],
    filter: '',
    showModal: false,
    editThisContact: null,
  };

  initialValues = {
    name: '',
    number: '',
  };

  componentDidMount() {
    const localStorageContacts = localStorage.getItem('contacts');
    const savedContacts = JSON.parse(localStorageContacts);

    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      this.setState({ showModal: false });
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  checkSameName = name => {
    return this.state.contacts.find(el => el.name === name);
  };

  handleSubmitForm = ({ name, number }) => {
    if (this.checkSameName(name)) {
      return alert(`${name} уже в списке контактов!`);
    }
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, { name, number, id: nanoid() }],
      };
    });
  };

  handleEditContact = ({ name, number, id, currentIndex }) => {
    console.log('отредактированный', name, number, id, currentIndex);

    this.toggleModal();
    const editedContacts = [...this.state.contacts];
    editedContacts.splice(currentIndex, 1, { name, number, id });

    // this.setState(prevState => {
    //   return {
    //     contacts: [...prevState.contacts].splice(currentIndex, 1, {
    //       name,
    //       number,
    //       id,
    //     }),
    //     editThisContact: null,
    //   };
    // });

    this.setState({
      editThisContact: null,
      contacts: [...editedContacts],
    });
  };

  filterChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  filtred = () => {
    const { filter, contacts } = this.state;
    const filterNormalize = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterNormalize)
    );
  };

  deleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  editContact = id => {
    let currentIndex = null;
    const currentContact = this.state.contacts.filter((contact, index) => {
      if (contact.id === id) {
        currentIndex = index;
      }
      return contact.id === id;
    });
    // console.log('currentContact', currentContact[0]);
    this.toggleModal();
    return this.setState({
      editThisContact: { ...currentContact[0], currentIndex },
    });
  };

  render() {
    const filtredContacts = this.filtred();
    const { filter, showModal, editThisContact } = this.state;
    return (
      <Box>
        <button type="button" onClick={this.toggleModal}>
          Add contact
        </button>
        {showModal && !editThisContact ? (
          <editorContext.Provider
            value={{
              initialValues: this.initialValues,
              onSubmitForm: this.handleSubmitForm,
            }}
          >
            <Modal onClose={this.toggleModal} />
          </editorContext.Provider>
        ) : null}

        {editThisContact && showModal ? (
          <editorContext.Provider
            value={{
              initialValues: this.state.editThisContact,
              onSubmitForm: this.handleEditContact,
            }}
          >
            <Modal onClose={this.toggleModal} />
          </editorContext.Provider>
        ) : null}
        <ContactsList
          contacts={filtredContacts}
          onDeleteContact={this.deleteContact}
          onEditContact={this.editContact}
          filterValue={filter}
          filterOnChange={this.filterChange}
        />
      </Box>
    );
  }
}
