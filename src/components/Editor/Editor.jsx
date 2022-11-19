import { PureComponent } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as yup from 'yup';
import { nanoid } from 'nanoid';

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

  handleSubmit = ({ name, number, id, currentIndex }, actions) => {
    this.props.onSubmitForm({ name, number, id, currentIndex });
    actions.resetForm();
  };

  render() {
    // const { id, name, number, currentIndex } = this.props.initialValues;

    // console.log('initialValues', this.props.initialValues);

    return (
      <Formik
        initialValues={this.props.initialValues}
        validationSchema={this.schema}
        onSubmit={this.handleSubmit}
      >
        <Form autoComplete="off">
          <label htmlFor={this.nameId}>
            <h3>Name</h3>

            <Field
              id={this.nameId}
              type="text"
              name="name"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              autoFocus
            ></Field>
            <ErrorMessage name="name" component="div" />
          </label>

          <label htmlFor={this.numberId}>
            <h3>Number</h3>
            <Field
              id={this.numberId}
              type="tel"
              name="number"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            ></Field>
            <ErrorMessage name="number" component="div" />
          </label>
          <button type="submit">Add contact</button>
        </Form>
      </Formik>
    );
  }
}
