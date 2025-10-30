import { useState } from 'react';
import './Q11.css'; 
import ValidationAlert from './ValidationAlert'; 

export default function Q11() {
  const [answers, setAnswers] = useState({
    blank1: '',
    blank2: '',
    blank3: '',
    blank4: '',
    blank5: ''
  });

  const correctAnswers = {
    blank1: 'monsieur Antoine',
    blank2: 'm\'appelle',
    blank3: 'je',
    blank4: 'comment',
    blank5: 'Marie'
  };

  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (blank, value) => {
    setAnswers({
      ...answers,
      [blank]: value
    });
  };

  const checkAnswers = () => {
    // نحسب النتيجة أولاً
    const currentScore = Object.keys(answers).filter(blank => 
      answers[blank].trim().toLowerCase() === correctAnswers[blank].toLowerCase()
    ).length;

    // نعرض الحقول الصحيحة والخاطئة
    setShowResults(true);

    // نتحقق من اكتمال جميع الحقول
    const allFieldsFilled = Object.values(answers).every(answer => answer.trim() !== '');
    if (!allFieldsFilled) {
      ValidationAlert.info("Oops!", "Please complete all fields.");
      // نرجع الحالة إلى ما كانت عليه لأن التحقق لم يكتمل
      setShowResults(false); 
      return;
    }

    // بناءً على النتيجة، نعرض النافذة المنبثقة المناسبة
    if (currentScore === 5) {
      ValidationAlert.success("Bravoo!", "You got all answers right!");
    } else {
      ValidationAlert.error("Try Again!", "Some answers are incorrect.");
    }
  };

  const resetExercise = () => {
    setAnswers({
      blank1: '',
      blank2: '',
      blank3: '',
      blank4: '',
      blank5: ''
    });
    setShowResults(false);
  };

  const isCorrect = (blank) => {
    if (!showResults) return null;
    return answers[blank].trim().toLowerCase() === correctAnswers[blank].toLowerCase();
  };

  const getInputClass = (blank) => {
    if (!showResults) return 'q11-input-default';
    return isCorrect(blank) ? 'q11-input-correct' : 'q11-input-incorrect';
  };

  const score = Object.keys(answers).filter(blank => 
    answers[blank].trim().toLowerCase() === correctAnswers[blank].toLowerCase()
  ).length;

  return (
    <div className="q11-container">
      <div className="q11-card">
        <div className="q11-header">
          <h1 className="q11-title">11 Lis et écris l’information manquante</h1>
          <p className="q11-subtitle">Complétez les espaces vides avec les mots appropriés de la liste.</p>
        </div>

        <div className="q11-word-bank">
          <p className="q11-word-bank-title">Mots disponibles :</p>
          <div className="q11-word-list">
            {Object.values(correctAnswers).map((word, index) => (
              <span key={index} className="q11-word">
                {word}
              </span>
            ))}
          </div>
        </div>

        <div className="q11-exercise-section">
          <div className="q11-questions-container">
            <div className="q11-question-line">
              <span className="q11-text">- Bonjour à tous, je m'appelle</span>
              <input
                type="text"
                value={answers.blank1}
                onChange={(e) => handleInputChange('blank1', e.target.value)}
                className={`q11-input ${getInputClass('blank1')}`}
                style={{ minWidth: '200px' }}
                placeholder="..."
                disabled={showResults}
              />
              <span className="q11-text">.</span>
            </div>

            <div className="q11-question-line">
              <span className="q11-text">- Bonjour, je</span>
              <input
                type="text"
                value={answers.blank2}
                onChange={(e) => handleInputChange('blank2', e.target.value)}
                className={`q11-input ${getInputClass('blank2')}`}
                style={{ minWidth: '150px' }}
                placeholder="..."
                disabled={showResults}
              />
              <span className="q11-text">Mark.</span>
            </div>

            <div className="q11-question-line">
              <span className="q11-text">- Bonjour, monsieur Antoine,</span>
              <input
                type="text"
                value={answers.blank3}
                onChange={(e) => handleInputChange('blank3', e.target.value)}
                className={`q11-input ${getInputClass('blank3')}`}
                style={{ minWidth: '100px' }}
                placeholder="..."
                disabled={showResults}
              />
              <span className="q11-text">m'appelle Claire.</span>
            </div>

            <div className="q11-question-line">
              <span className="q11-text">- Bonjour, Claire. Et vous,</span>
              <input
                type="text"
                value={answers.blank4}
                onChange={(e) => handleInputChange('blank4', e.target.value)}
                className={`q11-input ${getInputClass('blank4')}`}
                style={{ minWidth: '150px' }}
                placeholder="..."
                disabled={showResults}
              />
              <span className="q11-text">vous appelez-vous ?</span>
            </div>

            <div className="q11-question-line">
              <span className="q11-text">- Je m'appelle</span>
              <input
                type="text"
                value={answers.blank5}
                onChange={(e) => handleInputChange('blank5', e.target.value)}
                className={`q11-input ${getInputClass('blank5')}`}
                style={{ minWidth: '150px' }}
                placeholder="..."
                disabled={showResults}
              />
              <span className="q11-text">.</span>
            </div>
          </div>
        </div>

        <div className="q11-button-container">
          <div className="q11-button-container">
          
          {/* زر إعادة المحاولة */}
          <button 
            onClick={resetExercise} 
            className="q11-button q11-reset-button"
          >
            Réessayer ↻
          </button>

          {/* زر التحقق */}
          <button 
            onClick={checkAnswers} 
            className="q11-button q11-check-button"
            disabled={showResults} 
          >
            Vérifier ✓
          </button>
        </div>
        </div>

      

      </div>
    </div>
  );
}
