// src/components/Popup.js
import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Popup.css';


const Popup = ({ isOpen, onClose, children }) => {
    
    useEffect(() => {
    
    }, [children]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="popup-close-btn" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                
                {children}
                
            </div>
        </div>
    );
};

export default Popup;
