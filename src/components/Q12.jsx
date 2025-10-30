// src/components/Q12.jsx

import React, { useState } from 'react';
import './Q12.css';

export default function Q12() {
  const [response, setResponse] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // منع السلوك الافتراضي للزر داخل نموذج
    if (response.trim()) {
      setSubmitted(true);
      
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
          <h2 className="q12-title">Présente-toi ainsi que tes ami(e)s</h2>
        </div>

        {/* استخدام وسم <form> لتحسين الدلالة (semantics) */}
        <form className="q12-form-container" onSubmit={handleSubmit}>
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Écrivez ici votre présentation..."
            className="q12-textarea"
            rows={8} // تقليل عدد الصفوف الافتراضي
          />

          <button 
            type="submit" // تحديد نوع الزر
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
        </form>
      </div>
    </div>
  );
}
