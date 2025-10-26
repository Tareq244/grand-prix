import React, { useState, useRef } from 'react';
import './Q1.css';

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

  const audioSegments = [
    '../assets/sounds/1.mp3',
    '../assets/sounds/1.mp3',
    '../assets/sounds/1.mp3',
    '../assets/sounds/1.mp3',
  ];

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
    <div className="listening-exercise">
      <div className="exercise-container">
        {/* رأس التمرين */}
        <div className="exercise-header">
          <h2>تمرين الاستماع والترتيب</h2>
          <p>استمع إلى المقاطع الصوتية ثم رتب الصور بالترتيب الصحيح</p>
        </div>

        {/* قسم الصوت */}
        <div className="audio-section">
          <audio
            ref={audioRef}
            onEnded={handleAudioEnd}
            style={{ display: 'none' }}
          />
          
          <div className="audio-controls">
            <button 
              className="btn btn-play"
              onClick={playAudio}
              disabled={isPlaying}
            >
              🔊 استمع
            </button>
            
            <button 
              className="btn btn-repeat"
              onClick={playAgain}
            >
              🔁 إعادة
            </button>
          </div>

          <div className="segment-indicator">
            <p>المقطع الحالي: <span>{currentSegment + 1}</span> من <span>4</span></p>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${((currentSegment + 1) / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* قسم الصور المتاحة */}
        <div className="images-section">
          <h3>الصور المتاحة:</h3>
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

        {/* منطقة الإفلات والترتيب */}
        <div className="drop-zone-section">
          <h3>رتب الصور هنا:</h3>
          <div
            className="drop-zone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {orderedImages.length === 0 ? (
              <p className="drop-hint">اسحب الصور هنا لترتيبها</p>
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

        {/* أزرار التحكم */}
        <div className="control-buttons">
          <button
            className="btn btn-check"
            onClick={checkOrder}
            disabled={orderedImages.length !== 4}
          >
            ✓ تحقق من الإجابة
          </button>
          
          <button
            className="btn btn-reset"
            onClick={resetExercise}
          >
            ↻ إعادة تعيين
          </button>
        </div>

        {/* رسالة التغذية الراجعة */}
        {showFeedback && (
          <div className={`feedback ${isCorrect ? 'success' : 'error'}`}>
            {isCorrect ? (
              <>
                <h4>🎉 ممتاز!</h4>
                <p>لقد رتبت الصور بالترتيب الصحيح!</p>
              </>
            ) : (
              <>
                <h4>❌ محاولة أخرى</h4>
                <p>الترتيب غير صحيح. حاول مرة أخرى!</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Q1;
