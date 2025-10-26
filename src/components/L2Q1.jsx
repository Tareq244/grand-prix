import React, { useState, useRef, useEffect } from 'react';
import ValidationAlert from "./ValidationAlert";

const L2Q1 = ({
    title,
    questionNumber,
    audioSrc,
    characterImage,
    correctAnswers,
    onSuccess,
}) => {
    const [answers, setAnswers] = useState(Array(correctAnswers.length).fill(""));
    const [checkResult, setCheckResult] = useState(null);
    const inputRefs = useRef([]);

    const handleCheck = () => {
  const isCorrect = answers.every((answer, index) => 
    answer.trim().toLowerCase() === correctAnswers[index].toLowerCase()
  );

  if (isCorrect) {
    ValidationAlert.success("Bravo!", "You got it!");
    setCheckResult("success"); 
  } else {
    ValidationAlert.error("Oops!", "Try again!");
    setCheckResult("fail");
  }
};


    const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);

    // تمدد الـ input حسب طول النص
    const input = inputRefs.current[index];
    if (input) {
      const length = value.length;
      input.style.width = `${Math.max(20, length * 10)}px`; // 50px حد أدنى
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

            <div className="popup-image-container2">
                <img src={characterImage} alt="Character" className="character-images" />
                
                {answers.map((answer, index) => (
                    <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        className={`l2q1-inp${index + 1}`}
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

export default L2Q1;
