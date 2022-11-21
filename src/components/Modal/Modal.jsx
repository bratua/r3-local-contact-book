// import Box from 'components/Box/Box';
import { PureComponent } from 'react';
import { BackDrop, ModalWindow, ModalTitle } from './Modal.styled';
import { Editor } from 'components/Editor';
import editorContext from '../Context/editor-context';
import { FiXCircle } from 'react-icons/fi';

export class Modal extends PureComponent {
  componentDidMount() {
    window.addEventListener('keydown', this.escPressHendler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.escPressHendler);
  }

  escPressHendler = e => {
    if (e.code === 'Escape') {
      this.props.close();
    }
  };

  backDropClickClose = e => {
    if (e.currentTarget === e.target) {
      this.props.close();
    }
  };

  render() {
    const { typeCloseButton, close } = this.props;
    // console.log(theme);
    return (
      <BackDrop onClick={this.backDropClickClose}>
        <ModalWindow>
          <button
            className="modal-close-button"
            type={typeCloseButton}
            onClick={close}
          >
            <FiXCircle size="30" />
          </button>

          <editorContext.Consumer>
            {editorContext => (
              <>
                <ModalTitle>{editorContext.modalName}</ModalTitle>
                <Editor
                  initialValues={editorContext.initialValues}
                  onSubmitForm={editorContext.onSubmitForm}
                  icon={editorContext.buttonIcon}
                />
              </>
            )}
          </editorContext.Consumer>
        </ModalWindow>
      </BackDrop>
    );
  }
}
