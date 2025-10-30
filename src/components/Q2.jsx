import React, { useState } from 'react';
import './Q2.css';
import ValidationAlert from "./ValidationAlert";

const initialSituations = [
    { id: 1, text: 'Un(e) ami(e) proche', correct: 'La bise', userGuess: null, isCorrect: null },
    { id: 2, text: 'Un collègue de travail', correct: 'La main', userGuess: null, isCorrect: null },
    { id: 3, text: 'Un étranger', correct: 'La main', userGuess: null, isCorrect: null },
    { id: 4, text: 'Ta sœur/Ton frère', correct: 'La bise', userGuess: null, isCorrect: null },
    { id: 5, text: 'Ton professeur', correct: 'La main', userGuess: null, isCorrect: null },
    { id: 6, text: 'Un parent (oncle/tante)', correct: 'La bise', userGuess: null, isCorrect: null },
];

const Q2 = () => {
    const [situations, setSituations] = useState(initialSituations);
    const [showFeedback, setShowFeedback] = useState(false);

    const handleSelect = (id, greeting) => {
        if (showFeedback) return;

        setSituations(prevSituations =>
            prevSituations.map(s =>
                s.id === id ? { ...s, userGuess: greeting } : s
            )
        );
    };

    const checkAnswers = () => {
        const checkedSituations = situations.map(s => ({
            ...s,
            isCorrect: s.userGuess === s.correct,
        }));
        setSituations(checkedSituations);
        setShowFeedback(true);
    };

    const resetExercise = () => {
        setSituations(initialSituations.map(s => ({ ...s, userGuess: null, isCorrect: null })));
        setShowFeedback(false);
    };

    const allCorrect = situations.every(s => s.userGuess === s.correct);

    const allAnswered = situations.every(s => s.userGuess !== null);

    return (
        <>

            <div className="greeting-exercise">
                <div className="exercise-container1">
                    <div className="qustion1">
                <h5>
                    <span className="qusetionnum">2.</span>
                    Je serre la main ou je fais la bise?
                </h5>
            </div>
                    <div className="situations-list">
                        {situations.map(situation => (
                            <div key={situation.id} className="situation-card">
                                <div className="situation-text">{situation.text}</div>

                                <div className="greeting-options">
                                    <select
                                        value={situation.userGuess || ''}
                                        onChange={(e) => handleSelect(situation.id, e.target.value)}
                                        disabled={showFeedback}
                                    >
                                        <option value="" disabled>Select</option>
                                        <option value="La main">La main (Handshake) 🤝</option>
                                        <option value="La bise">La bise (Kiss)💋</option>
                                    </select>
                                </div>


                                {showFeedback && situation.isCorrect !== null && (
                                    <div className={`feedback-icon ${situation.isCorrect ? 'correct' : 'incorrect'}`}>
                                        {situation.isCorrect ? '✓' : '✕'}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="control-buttons1">
                        <button
                            className="btn btn-check1"
                            onClick={checkAnswers}
                            disabled={!allAnswered || showFeedback}
                        >
                            Vérifier ✓
                        </button>

                        <button
                            className="btn btn-reset1"
                            onClick={resetExercise}
                        >
                            Essayer ↻
                        </button>
                    </div>

                    {showFeedback && (
                        allCorrect
                            ? ValidationAlert.success("Good Job!", "You got all answers right!")
                            : ValidationAlert.error("Try Again!", "Some answers are incorrect.")
                    )}
                </div>
            </div>
        </>
    );
};

export default Q2;