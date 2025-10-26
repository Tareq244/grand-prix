import React from 'react';

const L2Q2 = ({ title, questionNumber, audioSrc, characterImage, bubbles, onClose }) => {
    return (
        <>
            <div className="qustion1">
                <h5><span className="qusetionnum">{questionNumber}.</span> {title}</h5>
            </div>
            <audio src={audioSrc} controls className="page4audio" />

            <div className="popup-image-container3">
                <img src={characterImage} alt="Character" className="character-images1" />
                {bubbles.map((bubble, index) => (
                    <div
                        key={index}
                        className={`bubbles-cloud ${bubble.isFlipped ? "flipped" : ""}`}
                        style={{ top: bubble.top, left: bubble.left }}
                    >
                        <div className="bubble-content">
                        {bubble.content}
                        </div>
                        <button className="close" onClick={(e) => e.target.parentElement.style.display = 'none'}>×</button>
                    </div>
                ))}
            </div>

            <div className="results-container">
                <button
                    type="button"
                    className="nextq2"
                    onClick={onClose} 
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default L2Q2;
