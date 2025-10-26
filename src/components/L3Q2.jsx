import React, { useRef } from 'react';
import Character from './Character';
// استيراد الصور...
import winkStatic from "../assets/page8/1.gif";
import winkAnimated from "../assets/page8/2.gif";
import happyStatic from "../assets/page8/3.gif";
import happyAnimated from "../assets/page8/4.gif";
import winkStaticsvg from "../assets/page8/1.svg";
import winkAnimatedsvg from "../assets/page8/2.svg";
import happyStaticsvg from "../assets/page8/3.svg";
import happyAnimatedsvg from "../assets/page8/4.svg";


const L3Q2 = ({ title, questionNumber, onClose }) => {
  const audioRef = useRef(null);

  const characters = [
    { staticImg: winkStaticsvg, animatedImg: winkStatic, altText: "Winking boy" },
    { staticImg: happyStaticsvg, animatedImg: happyStatic, altText: "Happy boy" },
    { staticImg: winkAnimatedsvg, animatedImg: winkAnimated, altText: "Animated Winking boy" },
    { staticImg: happyAnimatedsvg, animatedImg: happyAnimated, altText: "Animated Happy boy" }
  ];

  return (
    
    <div className="l3q2-quiz-container">
        <div className="qustion1">
                <h5><span className="qusetionnum">{questionNumber}.</span> {title}</h5>
            </div>
      <audio src={sound7} controls className="l3q2-audio-player" />
      
      <div className="l3q2-content-area">
        
        <div className="l3q2-character-gallery">
          {characters.map((char, index) => (
            <div className="l3q2-character-wrapper" key={index}>
              <Character
                staticImg={char.staticImg}
                animatedImg={char.animatedImg}
                altText={char.altText}
              />
            </div>
            
          ))}
        </div>
        
      </div>

      <button 
      className="nextq2"
      onClick={onClose}
      >
        Next
      </button>

    </div>
  );
};

export default L3Q2;
