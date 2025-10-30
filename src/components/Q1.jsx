import React, { useState, useRef } from 'react';
import './Q1.css';
import ValidationAlert from "./ValidationAlert";

import sound1 from '../assets/sounds/11.mp3';
import sound2 from '../assets/sounds/12.mp3';
import sound3 from '../assets/sounds/13.mp3';
import sound4 from '../assets/sounds/14.mp3';

import img1 from '../assets/page45/1.svg';
import img2 from '../assets/page45/2.svg';
import img3 from '../assets/page45/3.svg';
import img4 from '../assets/page45/4.svg';
const Q1 = () => {
  const [images, setImages] = useState([
    { id: 1, src: img1, label: '1', correctOrder: 1 },
    { id: 2, src: img2, label: '2', correctOrder: 2 },
    { id: 3, src: img3, label: '3', correctOrder: 3 },
    { id: 4, src: img4, label: '4', correctOrder: 4 },
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
    setIsPlaying(false);
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
      const newOrder = [...orderedImages, draggedItem];
      setOrderedImages(newOrder);
      setDraggedItem(null);

      // شغّل المقطع التالي إذا فيه مقاطع متبقية
      setCurrentSegment((prev) => {
        const next = prev + 1;
        if (next < audioSegments.length) {
          setTimeout(() => {
            audioRef.current.src = audioSegments[next];
            audioRef.current.play();
          }, 400); // تأخير بسيط بعد الإسقاط
          setIsPlaying(true);
          return next;
        } else {
          // لو خلصت المقاطع، ما يعمل إشي
          setIsPlaying(false);
          return prev;
        }
      });
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

          <div className="images-section">
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
            className="page4audio audio1"
            onEnded={handleAudioEnd}
          />
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
              vérifier ✓
            </button>

            <button
              className="btn btn-reset"
              onClick={resetExercise}
            >
              Essayer ↻
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
