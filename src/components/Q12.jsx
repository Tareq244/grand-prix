import React, { useState } from 'react';
import './Q12.css'; // استيراد ملف CSS المحدّث

export default function Q12() {
  const [response, setResponse] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (response.trim()) {
      setSubmitted(true);
      // إخفاء رسالة النجاح بعد 3 ثوانٍ وإعادة تعيين الحقول
      setTimeout(() => {
        setSubmitted(false);
        setResponse('');
      }, 3000);
    }
  };

  return (
    <div className="q12-container">
      <div className="q12-card">
        <div className="q12-header">
          <div className="q12-number">12</div>
          <h1 className="q12-title">Présente-toi ainsi que tes ami(e)s</h1>
        </div>

        <div className="q12-form-container">
          <div className="q12-textarea-container">
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Écrivez ici votre présentation et celles de vos amis..."
              className="q12-textarea"
              rows={10}
            />
          </div>

          <button 
            onClick={handleSubmit} 
            className="q12-submit-btn"
            disabled={!response.trim()}
          >
            Soumettre
          </button>

          {submitted && (
            <div className="q12-success-message">
              Votre réponse a bien été soumise ! ✓
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
