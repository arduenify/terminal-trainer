import React from 'react';
import './Modal.css';

const Modal = ({ handleClose, show, children }) => {
    return (
        <div className={`m-modal ${show ? 'show' : ''}`}>
            <section className='modal-main'>
                {children}
                <button className='button button-primary' onClick={handleClose}>
                    Cancel
                </button>
            </section>
        </div>
    );
};

export default Modal;
