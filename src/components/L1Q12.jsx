import React, { useState, useRef, useEffect } from 'react';
import ValidationAlert from './ValidationAlert';


const L1Q12 = ({
  title,
  questionNumber,
  audioSrc,
  characterImage,
  correctAnswers,
  onClose,
}) => {
  const [answers, setAnswers] = useState(Array(correctAnswers.length).fill(""));
  const [checkResult, setCheckResult] = useState(null);
  const inputRefs = useRef([]);

  const handleCheck = () => {
  const isCorrect = answers.every(
    (answer, index) => answer.trim().toLowerCase() === correctAnswers[index].toLowerCase()
  );

  setCheckResult(isCorrect ? "success" : "fail");

  if (isCorrect) {
    ValidationAlert.success("Bravo!", "All answers are correct! 🎉");
  } else {
    ValidationAlert.error("Oops!", "Some answers are incorrect. Try again!");
  }
};


  // ✅ عند الكتابة يتم تحديث القيمة والتمدد تلقائيًا
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
      if (input) input.style.width = "20px";
    });
  }, []);

  return (
    <>
      <div className="qustion2">
        <h5>
          <span className="qusetionnum">{questionNumber}.</span> {title}
        </h5>
      </div>

      <audio src={audioSrc} controls className="page4audio" />

      <div className="popup-image-container2">
        <img src={characterImage} alt="Character" className="character-images" />

        {answers.map((answer, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            className={`l1q12-inp${index + 1}`}
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
          onClick={onClose}
          disabled={checkResult !== "success"}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default L1Q12;
