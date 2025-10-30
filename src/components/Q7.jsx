// src/components/Q7.jsx

import { useState } from 'react';
import { Check } from 'lucide-react';
import './Q7.css';

const Q7 = () => {
  const sentences = [
    { id: 'a', text: 'Il y a cinq garçons sur la rampe.' },
    { id: 'b', text: 'Ils se disent « Salut ».' },
    { id: 'c', text: 'Un garçon tombe.' },
    { id: 'd', text: 'Un autre garçon dit que son saut est horrible.' },
    { id: 'e', text: 'Il lui demande son nom.' },
    { id: 'f', text: 'Les noms des deux garçons sont Éric et Daniel' }
  ];

  const [checked, setChecked] = useState({});

  const toggleCheck = (id) => {
    setChecked(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="q7-page-container">
      {/* ملاحظة: قمت بتصحيح اسم الكلاس من q9qustion إلى q7qustion ليتناسب مع المكون */}
      <div className="qustion1 ">
        <h5>
          <span className="qusetionnum">9.</span>
          Cochez les phrases que vous entendez.
        </h5> <br />
      </div>
      
      <div className="q7-card">
        <div className="q7-sentences-list">
          {sentences.map((sentence) => (
            // جعل العنصر بأكمله قابلاً للنقر
            <div 
              key={sentence.id} 
              className={`q7-sentence-item ${checked[sentence.id] ? 'selected' : ''}`}
              onClick={() => toggleCheck(sentence.id)}
            >
              <div
                className="q7-check-button"
              >
                {/* الأيقونة تظهر فقط عند الاختيار */}
                <Check className="q7-check-icon" strokeWidth={3} />
              </div>
              
              <div className="q7-sentence-text">
                <span className="q7-sentence-id">{sentence.id})</span>
                <span className="q7-sentence-content">{sentence.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Q7;
