import { PureComponent } from 'react';
import { nanoid } from 'nanoid';
import { ContactsList } from 'components/PhoneBook/ContactsList';
import { Modal } from 'components/Modal';
import editorContext from '../Context/editor-context.js';
import { FiEdit, FiSave, FiTrash2, FiPlusCircle } from 'react-icons/fi';
import { IconButton } from 'components/Button';
import { AppStyled } from './App.styled';

const BUTTON_ICONS = {
  addIcon: <FiPlusCircle size="30" style={{ verticalAlign: 'middle' }} />,
  saveIcon: <FiSave size="30" style={{ verticalAlign: 'middle' }} />,
  editIcon: <FiEdit size="20" style={{ verticalAlign: 'middle' }} />,
  deleteIcon: <FiTrash2 size="20" style={{ verticalAlign: 'middle' }} />,
};

const MODAL_NAMES = {
  add: 'Добавить контакт',
  edit: 'Редактировать контакт',
};

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

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      this.setState({ showModal: false });
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      editThisContact: null,
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

  handleEditContact = ({ name, number, id }) => {
    this.setState(prevState => ({
      editThisContact: null,
      contacts: prevState.contacts.map(contact =>
        contact.id === id ? { name, number, id } : contact
      ),
    }));

    this.toggleModal();
  };

  editContact = id => {
    this.toggleModal();
    const currentContact = this.state.contacts.filter(contact => {
      return contact.id === id;
    });

    return this.setState({
      editThisContact: { ...currentContact[0] },
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

  render() {
    const filtredContacts = this.filtred();
    const { filter, showModal, editThisContact } = this.state;
    const showModalCondition = !editThisContact
      ? {
          //* ADD button condition
          initialValues: this.initialValues,
          onSubmitForm: this.handleSubmitForm,
          buttonIcon: BUTTON_ICONS.addIcon,
          modalName: MODAL_NAMES.add,
        }
      : {
          //* EDIT button condition
          initialValues: this.state.editThisContact,
          onSubmitForm: this.handleEditContact,
          buttonIcon: BUTTON_ICONS.saveIcon,
          modalName: MODAL_NAMES.edit,
        };

    console.log(this.props);

    return (
      <AppStyled>
        <IconButton
          className="add-button"
          type="button"
          onClick={this.toggleModal}
        >
          {BUTTON_ICONS.addIcon}
        </IconButton>

        {showModal ? (
          <editorContext.Provider value={showModalCondition}>
            <Modal close={this.toggleModal} typeCloseButton="button" />
          </editorContext.Provider>
        ) : null}

        <ContactsList
          contacts={filtredContacts}
          onDeleteContact={this.deleteContact}
          onEditContact={this.editContact}
          filterValue={filter}
          filterOnChange={this.filterChange}
          editIcon={BUTTON_ICONS.editIcon}
          deleteIcon={BUTTON_ICONS.deleteIcon}
        />
      </AppStyled>
    );
  }
}
