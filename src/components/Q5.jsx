
import React, { useState } from 'react';
import './Q5.css'; 
import ValidationAlert from './ValidationAlert'; 

import boyImage from '../assets/page6/1.svg';
import girlImage from '../assets/page6/2.svg';

const Q5 = ({ sound }) => {
  const [boyName, setBoyName] = useState('');
  const [girlName, setGirlName] = useState('');

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const checkAnswers = () => {
   
    const correctBoyName = 'Antoine';
    const correctGirlName = 'aime';

    const isBoyCorrect = boyName.trim().toLowerCase() === correctBoyName.toLowerCase();
    const isGirlCorrect = girlName.trim().toLowerCase() === correctGirlName.toLowerCase();

    if (!boyName.trim() || !girlName.trim()) {
      ValidationAlert.info("Attention!", "Veuillez remplir les deux champs.");
      return;
    }

    if (isBoyCorrect && isGirlCorrect) {
      ValidationAlert.success("Bravo!", "Les réponses sont correctes.");
    } else {
      ValidationAlert.error("Essayez encore!", "Une ou plusieurs réponses sont incorrectes.");
    }
  };

  const handleTryAgain = () => {
    setBoyName('');
    setGirlName('');
    if (ValidationAlert && typeof ValidationAlert.close === 'function') {
      ValidationAlert.close();
    }
  };

  return (
    <div className="q5-activity-container">
      <div className="qustion1 q1qustions">
        <h5><span className="qusetionnum">1.</span> Écoute, répète et place dans l'ordre.</h5>
      </div>
      
      <audio src={sound} className="page6audio" controls />
      
      <div className="q5-body">
        <div className="q5-character-group">
          <img src={boyImage} alt="Garçon" className="q5-character-img" />
          <input
            type="text"
            id="q5-boy-name"
            value={boyName}
            onChange={handleInputChange(setBoyName)}
            placeholder="Écrivez ici"
            className="q5-input"
          />
        </div>

        <div className="q5-character-group">
          <img src={girlImage} alt="Fille" className="q5-character-img" />
          <input
            type="text"
            id="q5-girl-name"
            value={girlName}
            onChange={handleInputChange(setGirlName)}
            placeholder="Écrivez ici"
            className="q5-input"
          />
        </div>
      </div>

      <button className="q5-submit-btn" onClick={checkAnswers}>
        Vérifier ✓
      </button>

      <button className="q5-try-btn" onClick={handleTryAgain}>
        Réessayer ↻
      </button>
    </div>
  );
};

export default Q5;
