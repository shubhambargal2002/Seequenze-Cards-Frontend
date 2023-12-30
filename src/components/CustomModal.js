import React from 'react';
import Modal from 'react-modal';

const CustomModal = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          margin: 'auto',
          backgroundColor: '#1a1a40',
          border: '2px solid #8758ff',
          padding: '50px',
          boxSizing: 'border-box',
          width: '30%',
          height: '70%'
        },
      }}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
