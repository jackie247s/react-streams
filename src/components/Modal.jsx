import React from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {
    const { title, content, actions, onDismiss } = props;
    return ReactDOM.createPortal(
        <div onClick={onDismiss} className="ui dimmer modals visible active">
            <div onClick={e => e.stopPropagation()} className="ui standard visible active modal">
                <div className="header">{title}</div>
                <div className="content">
                    {content}
                </div>
                <div className="actions">
                    {actions}
                </div>
            </div>
        </div>,
        document.querySelector('#modal')
    );
};

Modal.defaultProps = {
    onDismiss: () => {}
};
 
export default Modal;