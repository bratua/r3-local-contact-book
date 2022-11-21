import { PureComponent } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { nanoid } from 'nanoid';
import { IconButton } from 'components/Button';
import { TitleFields, Fields, ErrorStyled } from './Editor.styled';

export class Editor extends PureComponent {
  schema = yup.object().shape({
    name: yup
      .string()
      .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
      .required('Введите имя'),
    number: yup
      .string()
      .matches(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
      )
      .required('Введите номер'),
  });

  nameId = nanoid();
  numberId = nanoid();

  handleSubmit = ({ name, number, id }, actions) => {
    this.props.onSubmitForm({ name, number, id });
    actions.resetForm();
  };

  render() {
    const { initialValues, icon } = this.props;
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={this.schema}
        onSubmit={this.handleSubmit}
      >
        <Form autoComplete="off">
          <label htmlFor={this.nameId}>
            <TitleFields>Name</TitleFields>
            <Fields
              id={this.nameId}
              type="text"
              name="name"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              autoFocus
            ></Fields>
            <ErrorStyled name="name" component="div" />
          </label>

          <label htmlFor={this.numberId}>
            <TitleFields>Number</TitleFields>
            <Fields
              id={this.numberId}
              type="tel"
              name="number"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            ></Fields>
            <ErrorStyled name="number" component="div" />
          </label>
          <IconButton type="submit">{icon}</IconButton>
        </Form>
      </Formik>
    );
  }
}
