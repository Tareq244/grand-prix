import React from 'react';
import './Character.css';

const Character = ({ staticImg, animatedImg, altText }) => {
    return (
        <div className="characters-wrapper">
        <div className="character-container">
            <img src={staticImg} alt={altText} className="character-image static" />
            <img src={animatedImg} alt={altText} className="character-image animated" />
        </div>    
        </div>
    );
};

export default Character;
