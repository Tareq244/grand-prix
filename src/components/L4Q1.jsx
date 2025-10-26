import React, { useRef, useState, useEffect } from "react";
import "./L4Q1.css";
import ValidationAlert from "./ValidationAlert";

const L4Q1 = ({ title, questionNumber, audioSrc, items, checkpoints, onClose }) => {
  const audioRef = useRef(null);
  const [currentCheckpoint, setCurrentCheckpoint] = useState(0);
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false); 
  const [results, setResults] = useState({}); 

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (
        currentCheckpoint < checkpoints.length &&
        audio.currentTime >= checkpoints[currentCheckpoint]
      ) {
        audio.pause();
        setLocked(true); 
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
  }, [currentCheckpoint, checkpoints]);

  const handleSelect = (item, index) => {
    if (!locked) return;
    if (item.id !== currentCheckpoint + 1) {
    setResults((prev) => ({ ...prev, [item.id]: "wrong" }));
    return;
  }

    setSelected(item.id);
    setResults((prev) => ({ ...prev, [item.id]: "correct" }));
    setCurrentCheckpoint((prev) => prev + 1);

    setTimeout(() => {
    audioRef.current.play();
    setLocked(false);
  }, 500);
};

  return (
    <>
    <div className="qustion1">
        <h5>
          <span className="qusetionnum">{questionNumber}.</span> {title}
        </h5>
      </div>

      <audio ref={audioRef} src={audioSrc} controls className="page4audio" />
    <div className="match-game-container">

      <div className="images-only-area">
        {items.map((imageItem) => (
          <div
            key={imageItem.id}
            className={`image-only-item ${results[imageItem.id] || ""}`}
            onClick={() => handleSelect(imageItem)}
          >
            <img
              src={imageItem.img}
              alt={imageItem.word || `Image ${imageItem.id}`}
            />
            
          </div>
        ))}
        
      </div>
      <button className="nextq2" onClick={onClose}>
          Next
        </button>
    </div>
    </>
  );
};

export default L4Q1;