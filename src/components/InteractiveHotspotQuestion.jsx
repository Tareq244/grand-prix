import React, { useState, useRef } from 'react';
import './InteractiveHotspotQuestion.css';

const InteractiveHotspotQuestion = ({ imageSources, audioSrc, incorrectIndices }) => {
    const [clickedIndices, setClickedIndices] = useState([]);
    const audioRef = useRef(null);

    const handleImageClick = (index) => {
        if (incorrectIndices.includes(index)) {
            if (!clickedIndices.includes(index)) {
                setClickedIndices([...clickedIndices, index]);
            }
        }
    };

    return (
        <div className="interactive-question-container">
            <div className="audio-player-container">
                <audio ref={audioRef} src={audioSrc} controls />
            </div>
            <div className="images-container">
                {imageSources.map((src, index) => {
                    const isIncorrect = incorrectIndices.includes(index);
                    const isClicked = clickedIndices.includes(index);
                    
                    const imageWrapperClasses = [
                        'image-wrapper',
                        isIncorrect ? 'hotspot' : '',
                        isClicked ? 'clicked' : ''
                    ].join(' ').trim();

                    return (
                        <div
                            key={index}
                            className={imageWrapperClasses}
                            onClick={() => handleImageClick(index)} 
                        >
                            <img src={src} alt={`Interactive element ${index + 1}`} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default InteractiveHotspotQuestion;
