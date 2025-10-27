import React, { useState, useRef } from 'react';
import './Q1.css';
import ValidationAlert from "./ValidationAlert";

import sound1 from '../assets/sounds/11.mp3';
import sound2 from '../assets/sounds/12.mp3';
import sound3 from '../assets/sounds/13.mp3';
import sound4 from '../assets/sounds/14.mp3';


const Q1 = () => {
  // حالة الصور - يمكنك استبدال الروابط بصورك الخاصة
  const [images, setImages] = useState([
    { id: 1, src: '../assets/page45/puzz.png', label: '1', correctOrder: 1 },
    { id: 2, src: '../assets/page45/puzz.png', label: '2', correctOrder: 2 },
    { id: 3, src: '../assets/page45/puzz.png', label: '3', correctOrder: 3 },
    { id: 4, src: '../assets/page45/puzz.png', label: '4', correctOrder: 4 },
  ]);

  const [orderedImages, setOrderedImages] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSegment, setCurrentSegment] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const audioRef = useRef(null);

  const audioSegments = [sound1, sound2, sound3, sound4];


  // تشغيل الصوت
  const playAudio = async () => {
    if (currentSegment < audioSegments.length) {
      setIsPlaying(true);
      audioRef.current.src = audioSegments[currentSegment];
      audioRef.current.play();
    }
  };

  // معالج نهاية الصوت - الانتقال للمقطع التالي
  const handleAudioEnd = () => {
    if (currentSegment < audioSegments.length - 1) {
      setCurrentSegment(currentSegment + 1);
      setTimeout(() => {
        audioRef.current.src = audioSegments[currentSegment + 1];
        audioRef.current.play();
      }, 500);
    } else {
      setIsPlaying(false);
      setCurrentSegment(0);
    }
  };

  // إعادة تشغيل الصوت من البداية
  const playAgain = () => {
    setCurrentSegment(0);
    setIsPlaying(true);
    audioRef.current.src = audioSegments[0];
    audioRef.current.play();
  };

  // معالج السحب
  const handleDragStart = (e, image) => {
    setDraggedItem(image);
    e.dataTransfer.effectAllowed = 'move';
  };

  // معالج الإفلات
  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedItem && !orderedImages.find(img => img.id === draggedItem.id)) {
      setOrderedImages([...orderedImages, draggedItem]);
      setDraggedItem(null);
    }
  };

  // معالج السماح بالإفلات
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // إزالة صورة من الترتيب
  const removeImage = (id) => {
    setOrderedImages(orderedImages.filter(img => img.id !== id));
  };

  // التحقق من الترتيب الصحيح
  const checkOrder = () => {
    const isOrderCorrect = orderedImages.every(
      (img, index) => img.correctOrder === index + 1
    ) && orderedImages.length === 4;
    
    setIsCorrect(isOrderCorrect);
    setShowFeedback(true);
  };

  // إعادة تعيين التمرين
  const resetExercise = () => {
    setOrderedImages([]);
    setShowFeedback(false);
    setIsCorrect(false);
    setCurrentSegment(0);
    setIsPlaying(false);
  };

  return (
    <>
    
    <div className="listening-exercise">
      
      <div className="exercise-container">
        <div className="qustion1">
            <h5>
              <span className="qusetionnum">1.</span>
              Écoute, répète et place dans l'ordre.
            </h5>
          </div>

          <audio 
            ref={audioRef} 
            src={audioSegments[currentSegment]} 
            controls 
            className="page4audio" 
            onEnded={handleAudioEnd}
          />

        {/* قسم الصور المتاحة */}
        <div className="images-section">
          <h3>Select:</h3>
          <div className="available-images">
            {images.map(image => (
              <div
                key={image.id}
                className={`image-card ${draggedItem?.id === image.id ? 'dragging' : ''} ${orderedImages.find(img => img.id === image.id) ? 'used' : ''}`}
                draggable={!orderedImages.find(img => img.id === image.id)}
                onDragStart={(e) => handleDragStart(e, image)}
              >
                <img src={image.src} alt={image.label} />
                <p>{image.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="drop-zone-section">
          <h3>drop here:</h3>
          <div
            className="drop-zone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {orderedImages.length === 0 ? (
              <p className="drop-hint">put here</p>
            ) : (
              <div className="ordered-images">
                {orderedImages.map((image, index) => (
                  <div key={image.id} className="ordered-image-item">
                    <div className="order-number">{index + 1}</div>
                    <img src={image.src} alt={image.label} />
                    <button
                      className="btn-remove"
                      onClick={() => removeImage(image.id)}
                      title="إزالة"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div> 
            )}
          </div>
        </div>

        <div className="control-buttons">
          <button
            className="btn btn-check"
            onClick={checkOrder}
            disabled={orderedImages.length !== 4}
          >
            check ✓
          </button>
          
          <button
            className="btn btn-reset"
            onClick={resetExercise}
          >
            Rest ↻
          </button>
        </div>

        {showFeedback && (
  isCorrect
    ? ValidationAlert.success("Good Job!", "You got all answers right!")
    : ValidationAlert.error("Try Again!", "Some answers are incorrect.")
)}

      </div>
    </div>
    </>
  );
};

export default Q1;
