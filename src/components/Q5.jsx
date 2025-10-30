import React, { useState } from 'react';
import './Q5.css'; 
import ValidationAlert from './ValidationAlert'; 

import boyImage from '../assets/page6/1.svg';
import girlImage from '../assets/page6/2.svg';

const Q5 = ({ sound }) => {
  const [boyName, setBoyName] = useState('');
  const [girlName, setGirlName] = useState('');
  const [isAudioPopupVisible, setAudioPopupVisible] = useState(false);

  // حالة لتخزين رسالة النتيجة
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (feedback.message) {
      setFeedback({ message: '', type: '' }); // إخفاء الرسالة عند الكتابة
    }
  };

  const checkAnswers = () => {
  const correctBoyName = 'Antoine';
  const correctGirlName = 'aime';

  const isBoyCorrect = boyName.trim().toLowerCase() === correctBoyName;
  const isGirlCorrect = girlName.trim().toLowerCase() === correctGirlName;

  if (isBoyCorrect && isGirlCorrect) {
    ValidationAlert.success('', '');
  } else if (boyName && !girlName) {
    ValidationAlert.info('', '');
  }else if (girlName && !boyName) {
    ValidationAlert.info('', '');
  } else {
    let errorMsg = '';
    if (!isBoyCorrect) errorMsg += '- اسم الولد غير صحيح.\n';
    if (!isGirlCorrect) errorMsg += '- اسم البنت غير صحيح.';
    ValidationAlert.error('خطأ', errorMsg);
  }
};
const handleTryAgain = () => {
  setBoyName('');
  setGirlName('');
  setFeedback({ message: '', type: '' });
};

  return (
    <>
      <div className="qustion1">
        <h5><span className="qusetionnum">1.</span> Écoute, répète et place dans l'ordre.</h5>
      </div>
      <audio src={sound} className="page6audio" controls />
      
      <div className="q5-activity-container">
      <div className="q5-body">
        <div className="q5-character-group">
          <img src={boyImage} alt="boy" className="q5-character-img" />
          <input
            type="text"
            id="q5-boy-name"
            value={boyName}
            onChange={handleInputChange(setBoyName)}
            placeholder=""
            className="q5-input"
          />
        </div>

        <div className="q5-character-group">
          <img src={girlImage} alt="girl" className="q5-character-img" />
          <input
            type="text"
            id="q5-girl-name"
            value={girlName}
            onChange={handleInputChange(setGirlName)}
            placeholder=""
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
    </>
  );
};

export default Q5;
