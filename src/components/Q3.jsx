
import React, { useState, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ValidationAlert from "./ValidationAlert";
import './Q3.css';
import sound2 from '../assets/sounds/3.mp3';

import img1 from '../assets/page6/3.svg';
import img2 from '../assets/page6/4.svg';
import img3 from '../assets/page6/5.svg';
import img4 from '../assets/page6/6.svg';

const exerciseData = {
  audioSrc: sound2,
  pairs: [
    { id: 'pair-1', letter: 'A', content:'Bonjour, les enfants!' },
    { id: 'pair-2', letter: 'B', content:'Au revoir, les enfants!' },
    { id: 'pair-3', letter: 'C', content:'Salut, Marie. Salut, Denice' },
    { id: 'pair-4', letter: 'D', content:'Bonjour, madame Rose.' },
  ],
  images: [img1, img2, img3, img4] 
};

const getShuffledPairs = () => [...exerciseData.pairs].sort(() => Math.random() - 0.5);

const Q3 = () => {
  const initialDroppedState = {
    'drop-1': null,
    'drop-2': null,
    'drop-3': null,
    'drop-4': null,
  };

  const [droppedLetters, setDroppedLetters] = useState(initialDroppedState);
  const [shuffledPairs, setShuffledPairs] = useState(getShuffledPairs());
  const audioRef = useRef(null);

  const handleOnDragEnd = (result) => {
    if (!result.destination || result.destination.droppableId === 'letters') return;

    const { source, destination, draggableId } = result;
    const letterToMove = draggableId;

    const prevDropZoneId = Object.keys(droppedLetters).find(key => droppedLetters[key] === letterToMove);
    const newDroppedLetters = { ...droppedLetters };
    if (prevDropZoneId) {
      newDroppedLetters[prevDropZoneId] = null;
    }

    newDroppedLetters[destination.droppableId] = letterToMove;
    
    setDroppedLetters(newDroppedLetters);
  };
  
  const resetExercise = () => {
    setDroppedLetters(initialDroppedState);
    setShuffledPairs(getShuffledPairs());
    if (ValidationAlert && typeof ValidationAlert.close === 'function') {
      ValidationAlert.close();
    }
  };

  const checkAnswers = () => {
  const allFilled = Object.values(droppedLetters).every(v => v !== null);
  if (!allFilled) {
    ValidationAlert.info("Oops!", "Please complete all fields.");
    return;
  }

  let correctCount = 0;
  exerciseData.pairs.forEach((pair, index) => {
    const dropZoneId = `drop-${index + 1}`;
    if (droppedLetters[dropZoneId] === pair.letter) correctCount++;
  });

  const scoreText = `${correctCount}/${exerciseData.pairs.length}`;

  const isCorrect = correctCount === exerciseData.pairs.length;

  if (isCorrect) {
    ValidationAlert.success("Good Job!", "All answers are correct!", scoreText);
  } else {
    ValidationAlert.error("Try Again!", "Some answers are incorrect.", scoreText);
  }
};


  return (
    <div className="exercise-container2">
      <div className="qustion1 q1qustions">
        <h5><span className="qusetionnum">3.</span> Écoute et associe chaque dialogue à une image.</h5>
      </div>

      <audio ref={audioRef} src={exerciseData.audioSrc} className="audio2" controls />

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="exercise-layout-vertical">
          
          <div className="image-section-horizontal">
            {exerciseData.images.map((imageSrc, index) => (
              <Droppable key={`drop-${index + 1}`} droppableId={`drop-${index + 1}`}>
                {(provided, snapshot) => ( 
                  <div className="image-container">
                    <img src={imageSrc} alt={`Visual hint ${index + 1}`} />
                    <div 
                      ref={provided.innerRef} 
                      {...provided.droppableProps}
                     
                      className={`drop-box ${snapshot.isDraggingOver ? 'is-over' : ''}`}
                    >
                      {droppedLetters[`drop-${index + 1}`] ? (
                        <div className="dropped-letter">{droppedLetters[`drop-${index + 1}`]}</div>
                      ) : (
                        <span className="placeholder"></span>
                      )}
                       {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>

          <Droppable droppableId="letters" direction="horizontal" isDropDisabled={true}>
            {(provided) => (
              <div className="letters-section-horizontal" ref={provided.innerRef} {...provided.droppableProps}>
                {shuffledPairs.map((pair, index) => (
                  <div key={pair.id} className="letter-sentence-pair">
                    <Draggable draggableId={pair.letter} index={index}>
                      {(providedDraggable, snapshot) => (
                        <div
                          ref={providedDraggable.innerRef}
                          {...providedDraggable.draggableProps}
                          {...providedDraggable.dragHandleProps}
                          className={`letter-box ${snapshot.isDragging ? 'dragging' : ''}`}
                        >
                          {pair.letter}
                        </div>
                      )}
                    </Draggable>
                    <span className="sentence-text">{pair.content}</span>
                  </div>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          
        </div>
      </DragDropContext>

      <div className="action-buttons-container">
        <button onClick={resetExercise} className="try-again-button">Réessayer ↻</button>
        <button onClick={checkAnswers} className="check-button2">Vérifier ✓</button>
      </div>
    </div>
  );
};

export default Q3;
