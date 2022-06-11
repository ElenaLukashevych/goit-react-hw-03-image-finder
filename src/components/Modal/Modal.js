import { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';
import PropTypes from 'prop-types';
const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
static propTypes = {
       onClose: PropTypes.func.isRequired,
       children: PropTypes.object.isRequired,
}
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }

       componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
}

     handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
    };
    
    handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

    render() {
        return createPortal( <div onClick={this.handleBackdropClick} className={s.overlay}>
                <div className={s.modal}>{this.props.children}</div>
            </div>, modalRoot)
    }
}

export default Modal;