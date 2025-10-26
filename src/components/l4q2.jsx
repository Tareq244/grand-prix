import React, { useState } from 'react';
import InteractiveHotspotQuestion from './InteractiveHotspotQuestion';
import sound7 from '../assets/sounds/L4Q2.mp3';
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';
import ValidationAlert from "./ValidationAlert";

const L4Q2 = ({ sound, images, correctIndices = [0,1], onClose }) => {
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);

  // دالة تحديث الاختيارات
  const handleSelect = (index) => {
  let newSelection = [...selectedIndices];

  if (newSelection.includes(index)) {
    newSelection = newSelection.filter(i => i !== index);
  } else {
    newSelection.push(index);
  }

  setSelectedIndices(newSelection);

  // تحقق من الإجابة
  if (newSelection.length === correctIndices.length && 
      correctIndices.every(i => newSelection.includes(i))) {
    setIsCorrect(true);
    ValidationAlert.success("Bravo!", "All selections are correct!");
  } else if (newSelection.length >= correctIndices.length) {
    setIsCorrect(false);
    ValidationAlert.error("Oops!", "Some selections are incorrect.");
  }
};

  return (
    <>
      <div className="qustion1">
        <h5>
          <span className="qusetionnum">2.</span> Écoute, montre et corrige les erreurs.
        </h5>
      </div>
      
      <audio src={sound} controls className="page4audio" />
      
      <InteractiveHotspotQuestion
        imageSources={images}
        audioSrc={sound}
        selectedIndices={selectedIndices}
        onSelect={handleSelect} // هنا بنمرر الدالة للتحكم بالاختيارات
      />

      {isCorrect && <div className="goodjob-msg">Good Job! 🎉</div>}

      <div className="results-container">
        <button type="button" className="nextq2" onClick={onClose}>
          Close
        </button>
      </div>
    </>
  );
};

export default L4Q2;
 