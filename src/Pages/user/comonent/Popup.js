// src/Popup.js
import React from 'react';
import '../../../css/user/Popup.css';

const Popup = ({ isOpen, closePopup, children }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={closePopup}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closePopup}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
