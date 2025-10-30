import { useState } from 'react';
import { Check } from 'lucide-react';
import './Q7.css'; // تأكد من أن اسم الملف صحيح

const Q7 = () => {
  // 1. قائمة الجمل
  const sentences = [
    { id: 'a', text: 'Il y a cinq garçons sur la rampe.' },
    { id: 'b', text: 'Ils se disent « Salut ».' },
    { id: 'c', text: 'Un garçon tombe.' },
    { id: 'd', text: 'Un autre garçon dit que son saut est horrible.' },
    { id: 'e', text: 'Il lui demande son nom.' },
    { id: 'f', text: 'Les noms des deux garçons sont Éric et Daniel' }
  ];

  // 2. حالة لتتبع الجمل المحددة (checked)
  const [checked, setChecked] = useState({});

  // 3. دالة لتغيير حالة الجملة عند الضغط على الزر
  const toggleCheck = (id) => {
    setChecked(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="q7-page-container">
      <div className="q7-question-header">
        <h5>
          <span className="q7-question-num">9.</span>
          Les phrases françaises?
        </h5>
      </div>
      <div className="q7-card">
        <div className="q7-sentences-list">
          {sentences.map((sentence) => (
            <div key={sentence.id} className="q7-sentence-item">
              {/* زر الإدخال (checkbox) - يتم إنشاؤه لكل جملة */}
              <button
                onClick={() => toggleCheck(sentence.id)}
                className={`q7-check-button ${checked[sentence.id] ? 'checked' : ''}`}
              >
                {checked[sentence.id] && (
                  <Check className="q7-check-icon" strokeWidth={3} />
                )}
              </button>
              
              {/* نص الجملة */}
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
