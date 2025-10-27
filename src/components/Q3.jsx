// src/components/Q3.jsx

import React, { useState, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ValidationAlert from "./ValidationAlert";
import './Q3.css';
import sound2 from '../assets/sounds/3.mp3';
import img from '../assets/page45/puzz.png';

const exerciseData = {
  audioSrc: sound2,
  pairs: [
    { id: 'pair-1', letter: 'A', image: img },
    { id: 'pair-2', letter: 'B', image: img },
    { id: 'pair-3', letter: 'C', image: img },
    { id: 'pair-4', letter: 'D', image: img },
  ],
};

const getShuffledLetters = () => [...exerciseData.pairs.map(p => p.letter)].sort(() => Math.random() - 0.5);

const Q3 = () => {
  const initialDroppedState = {
    'drop-1': null,
    'drop-2': null,
    'drop-3': null,
    'drop-4': null,
  };

  const [droppedLetters, setDroppedLetters] = useState(initialDroppedState);
  const [availableLetters, setAvailableLetters] = useState(getShuffledLetters());
  const audioRef = useRef(null);

  const handleOnDragEnd = (result) => {
    if (!result.destination || result.destination.droppableId === 'letters') return;
    const { destination, draggableId } = result;
    setDroppedLetters(prev => ({
      ...prev,
      [destination.droppableId]: draggableId,
    }));
  };
  
  const resetExercise = () => {
    setDroppedLetters(initialDroppedState);
    setAvailableLetters(getShuffledLetters());
    ValidationAlert.close();
  };

  const checkAnswers = () => {
    const allFilled = Object.values(droppedLetters).every(v => v !== null);
    if (!allFilled) {
      ValidationAlert.info("Oops!", "Please complete all fields.");
      return;
    }
    const isCorrect = exerciseData.pairs.every((pair, index) => {
      const dropZoneId = `drop-${index + 1}`;
      return droppedLetters[dropZoneId] === pair.letter;
    });
    if (isCorrect) {
      ValidationAlert.success("Good Job!", "All answers are correct!");
    } else {
      ValidationAlert.error("Try Again!", "Some answers are incorrect.");
    }
  };

  return (
    <div className="exercise-container2">

      <div className="qustion1 qustionssss">
        <h5><span className="qusetionnum">1.</span> Écoute, répète et place dans l'ordre.</h5>
      </div>

      <audio ref={audioRef} src={exerciseData.audioSrc} className="page4audio audio2" controls />

      {/* ✅ كل منطق السحب والإفلات سيكون داخل حاوية واحدة */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="exercise-layout-vertical"> {/* <-- استخدام كلاس جديد للتخطيط العمودي */}
          
          {/* 1. قسم الصور (في صف واحد) */}
          <div className="image-section-horizontal">
            {exerciseData.pairs.map((pair, index) => (
              <Droppable key={`drop-${index + 1}`} droppableId={`drop-${index + 1}`}>
                {(provided) => (
                  <div className="image-container" ref={provided.innerRef} {...provided.droppableProps}>
                    <img src={pair.image} alt={`Image ${index + 1}`} />
                    <div className="drop-box">
                      {droppedLetters[`drop-${index + 1}`] ? (
                        <div className="dropped-letter">{droppedLetters[`drop-${index + 1}`]}</div>
                      ) : (
                        <span className="placeholder">.</span>
                      )}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>

          {/* 2. قسم الحروف (في صف واحد) */}
          <Droppable droppableId="letters" direction="horizontal">
            {(provided) => (
              <div className="letters-section-horizontal" ref={provided.innerRef} {...provided.droppableProps}>
                {availableLetters.map((letter, index) => (
                  <Draggable key={letter} draggableId={letter} index={index}>
                    {(provided) => (
                      <div
                        className="letter-box"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {letter}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          
          {/* 3. قسم الأزرار */}
          <div className="action-buttons-container">
            <button onClick={checkAnswers} className="check-button2">Vérifier</button>
            <button onClick={resetExercise} className="try-again-button">Try Again</button>
          </div>

        </div>
      </DragDropContext>
    </div>
  );
};

export default Q3;
