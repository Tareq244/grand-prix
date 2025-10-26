import React, { useState, useRef, useEffect } from 'react';
import ValidationAlert from './ValidationAlert';

const L2Q12 = ({
    title,
    questionNumber,
    audioSrc,
    characterImage,
    correctAnswers,
    onSuccess,
}) => {
    const [answers, setAnswers] = useState(
    Array((correctAnswers && correctAnswers.length) || 0).fill("")
);

    const [checkResult, setCheckResult] = useState(null);
    const inputRefs = useRef([]);


    const handleCheck = () => {
    const isCorrect = answers.every((answer, index) => 
        answer.trim().toLowerCase() === correctAnswers[index].toLowerCase()
    );

    if (isCorrect) {
        setCheckResult("success");
        ValidationAlert.success("Bravo!", "You got all answers right! 🎉");
    } else {
        setCheckResult("fail");
        ValidationAlert.error("Oops!", "Some answers are incorrect. Try again!");
    }
};

    const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);

    const input = inputRefs.current[index];
    if (input) {
        const length = value.length;
        input.style.width = `${Math.max(30, length * 10)}px`; 
    }
};

  useEffect(() => {
          inputRefs.current.forEach((input) => {
            if (input) input.style.width = "30px";
          });
        }, []);

    return (
        <>
            <div className="qustion1">
                <h5><span className="qusetionnum">{questionNumber}.</span> {title}</h5>
            </div>
            <audio src={audioSrc} controls className="page4audio" />

            <div className="popup-image-container">
                <img src={characterImage} alt="Character" className="character-images" />
                
                {answers.map((answer, index) => (
                    <input
                        key={index}
                        type="text"
                        ref={(el) => (inputRefs.current[index] = el)}
                        className={`l2q12-inp${index + 1}`}
                        value={answer}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                    />
                ))}
            </div>

            <div className="results-container">
                <button
                    type="button"
                    className="checkanswer"
                    onClick={handleCheck}
                >
                    Check Answer
                </button>
            
                {checkResult === "success" && (
                    <div className="goodjob" style={{ color: "green" }}>
                        <h3>Good Job! 🎉</h3>
                        <p>Very smart!</p>
                    </div>
                )}

                {checkResult === "fail" && (
                    <div className="feedback-message fail" style={{ color: "red" }}>
                        <h4>Try Again!</h4>
                        <p>Your answers are not correct. Try again!</p>
                    </div>
                )}

                <button
                    type="button"
                    className="nextq2"
                    onClick={onSuccess}
                    disabled={checkResult !== 'success'}
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default L2Q12;
