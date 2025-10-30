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
    { id: 'pair-1', letter: 'A', content:'Bonjour, les enfants!' },
    { id: 'pair-2', letter: 'B', content:'Au revoir, les enfants!' },
    { id: 'pair-3', letter: 'C', content:'Salut, Marie. Salut, Denice' },
    { id: 'pair-4', letter: 'D', content:'Bonjour, madame Rose.' },
  ],
  images: [img, img, img, img] // فصل الصور لتسهيل الوصول إليها
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

    // إزالة الحرف من منطقة الإفلات القديمة إذا كان موجودًا
    const prevDropZoneId = Object.keys(droppedLetters).find(key => droppedLetters[key] === letterToMove);
    const newDroppedLetters = { ...droppedLetters };
    if (prevDropZoneId) {
      newDroppedLetters[prevDropZoneId] = null;
    }

    // إضافة الحرف إلى منطقة الإفلات الجديدة
    newDroppedLetters[destination.droppableId] = letterToMove;
    
    setDroppedLetters(newDroppedLetters);
  };
  
  const resetExercise = () => {
    setDroppedLetters(initialDroppedState);
    setShuffledPairs(getShuffledPairs());
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

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="exercise-layout-vertical">
          
          {/* قسم الصور ومناطق الإفلات */}
          <div className="image-section-horizontal">
            {exerciseData.images.map((imageSrc, index) => (
              <Droppable key={`drop-${index + 1}`} droppableId={`drop-${index + 1}`}>
                {(provided) => (
                  <div className="image-container" ref={provided.innerRef} {...provided.droppableProps}>
                    <img src={imageSrc} alt={`Visual hint ${index + 1}`} />
                    <div className="drop-box">
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

          {/* قسم الحروف والجمل */}
          <Droppable droppableId="letters" direction="horizontal" isDropDisabled={true}>
            {(provided) => (
              <div className="letters-section-horizontal" ref={provided.innerRef} {...provided.droppableProps}>
                {shuffledPairs.map((pair, index) => (
                  <div key={pair.id} className="letter-sentence-pair">
                    {/* Draggable Letter */}
                    <Draggable draggableId={pair.letter} index={index}>
                      {(providedDraggable) => (
                        <div
                          className="letter-box"
                          ref={providedDraggable.innerRef}
                          {...providedDraggable.draggableProps}
                          {...providedDraggable.dragHandleProps}
                        >
                          <strong>{pair.letter}</strong>
                        </div>
                      )}
                    </Draggable>
                    {/* Static Sentence */}
                    <span className="sentence-text">{pair.content}</span>
                  </div>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          
          {/* قسم الأزرار */}
          <div className="action-buttons-container">
            <button onClick={checkAnswers} className="check-button2">Vérifier ✓</button>
            <button onClick={resetExercise} className="try-again-button">Réessayer ↻</button>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Q3;
