// import Box from 'components/Box/Box';
import { PureComponent } from 'react';
import { BackDrop, ModalWindow } from './Modal.styled';
import { Editor } from 'components/Editor';
import editorContext from '../Context/editor-context';

export class Modal extends PureComponent {
  componentDidMount() {
    window.addEventListener('keydown', this.escPressHendler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.escPressHendler);
  }

  escPressHendler = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  backDropClickClose = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <BackDrop onClick={this.backDropClickClose}>
        <ModalWindow>
          <button type="button" onClick={this.props.onClose}>
            X Close
          </button>
          <editorContext.Consumer>
            {editorContext => (
              <Editor
                initialValues={editorContext.initialValues}
                onSubmitForm={editorContext.onSubmitForm}
              />
            )}
          </editorContext.Consumer>
        </ModalWindow>
      </BackDrop>
    );
  }
}
