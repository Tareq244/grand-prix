import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';

const feelingsHotspots = [
  { id: 0, name: 'Comment ça va' },
  { id: 1, name: 'Mal' },
  { id: 2, name: 'Comme ci, comme ça' },
  { id: 3, name: 'Bien' },
  { id: 4, name: 'Super' },
];




const FeelingsQuiz = () => {
  const audioRef = useRef(null);
  const [currentSegment, setCurrentSegment] = useState(0);
  const [activeInput, setActiveInput] = useState(null);
  const [answers, setAnswers] = useState(
    feelingsHotspots.reduce((acc, h) => ({ ...acc, [h.id]: '' }), {})
  );
  const [validation, setValidation] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);

  const stopPoints=[12, 12.5, 15, 18, 20];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (currentSegment < stopPoints.length && audio.currentTime >= stopPoints[currentSegment]) {
        audio.pause();
        setIsPlaying(false);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [currentSegment]);

  const handleFaceClick = (id) => {
    if (id === 0 || feelingsHotspots.slice(0, id).every(h => validation[h.id] === true)) {
    setActiveInput(prev => (prev === id ? null : id));
  } else {

    Swal.fire({
  icon: 'warning',
  title: 'Oops...',
  text: "Vous devez compléter la précédente d'abord !",
  customClass: {
    title: 'swal-title-spacing',
    htmlContainer: 'swal-text-spacing',
    confirmButton:'icon-ss',
  }
    }); 

  }
  };

  const checkAnswer = (id) => {
    const hotspot = feelingsHotspots.find(h => h.id === id);
    const userAnswer = answers[id].trim().toLowerCase();
    const correctAnswer = hotspot.name.toLowerCase();
    setValidation(prev => ({ ...prev, [id]: userAnswer === correctAnswer }));
  };

  const handleNext = () => {
    const audio = audioRef.current;
    if (audio && currentSegment <= stopPoints.length - 1) {
      setCurrentSegment(prev => prev + 1);
      audio.play();
    }
    setActiveInput(null);
  };

  const handleCheckAll = () => {
  // أولاً نتأكد من أن كل الإجابات مكتوبة
  for (let i = 0; i < feelingsHotspots.length; i++) {
    const h = feelingsHotspots[i];
    if (!answers[h.id].trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: "Veuillez remplir toutes les réponses !",
        confirmButtonColor: '#3085d6',
        customClass: {
          confirmButton:'icon-ss',
        }
      });
      return;
    }
  }

  // تحقق من الإجابات
  let allCorrect = true;
  feelingsHotspots.forEach(h => {
    const userAnswer = answers[h.id].trim().toLowerCase();
    const correctAnswer = h.name.toLowerCase();
    const isCorrect = userAnswer === correctAnswer;
    setValidation(prev => ({ ...prev, [h.id]: isCorrect }));
    if (!isCorrect) allCorrect = false;
  });

  // إذا كل الإجابات صحيحة
  if (allCorrect) {
    Swal.fire({
      icon: 'success',
      title: 'Good Job!',
      showConfirmButton: false,
      timer: 1500
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "Certaines réponses sont incorrectes !",
      confirmButtonColor: '#3085d6',
      customClass: {
        confirmButton:'icon-ss',
      }
    });
  }
};



  const handleReset = () => {
    setAnswers(feelingsHotspots.reduce((acc, h) => ({ ...acc, [h.id]: '' }), {}));
    setValidation({});
    setActiveInput(null);
    setCurrentSegment(0);
    if (audioRef.current) audioRef.current.currentTime = 0;
  };

  const faceEmojis = ['?','😊', '😢', '😐', '😃'];

  return (
    <>
      <div className="qustion1">
        <h5>
          <span className="qusetionnum">1.</span> Écoute, montre et écris.
        </h5>
      </div>
      
      <audio ref={audioRef} src={sound6} controls className="page4audio" />

      <div style={{ padding: '20px', textAlign: 'center' }}>
       
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          flexWrap: 'wrap', 
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}>
          {feelingsHotspots.map((h, idx) => (
            <div 
              key={h.id} 
              style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '120px',
                minHeight: '200px'
              }}
            >
              {/* الصورة */}
              <div
                onClick={() => handleFaceClick(h.id)}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '60px',
                  cursor: 'pointer',
                  background: activeInput === h.id ? '#e3f2fd' : '#f5f5f5',
                  border: `3px solid ${
                    validation[h.id] === true ? '#4caf50' : 
                    validation[h.id] === false ? '#f44336' : 
                    activeInput === h.id ? '#2196f3' : '#ddd'
                  }`,
                  transition: 'all 0.3s ease',
                  boxShadow: activeInput === h.id ? '0 4px 12px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                {faceEmojis[idx]}
              </div>

              {/* input يظهر عند النقر */}
              {activeInput === h.id && (
                <input
                  type="text"
                  value={answers[h.id]}
                  autoFocus
                  placeholder="Écris ici..."
                  onChange={e => setAnswers(prev => ({ ...prev, [h.id]: e.target.value }))}
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      checkAnswer(h.id);
                      setActiveInput(null);
                    }
                  }}
                  style={{ 
                    marginTop: '12px',
                    width: '100%',
                    padding: '8px',
                    border: '2px solid #2196f3',
                    borderRadius: '6px',
                    fontSize: '14px',
                    textAlign: 'center',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              )}

              {/* feedback الإجابة */}
              {activeInput !== h.id && answers[h.id] && (
                <div
                  style={{
                    marginTop: '12px',
                    width: '100%',
                    background: validation[h.id] === true ? '#e8f5e9' : 
                               validation[h.id] === false ? '#ffebee' : '#f5f5f5',
                    padding: '8px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: validation[h.id] === true ? '#2e7d32' : 
                           validation[h.id] === false ? '#c62828' : '#666',
                    border: `2px solid ${
                      validation[h.id] === true ? '#4caf50' : 
                      validation[h.id] === false ? '#f44336' : '#ddd'
                    }`,
                    textAlign: 'center',
                    wordWrap: 'break-word'
                  }}
                >
                  {answers[h.id]}
                  {validation[h.id] === true && ' ✓'}
                  {validation[h.id] === false && ' ✗'}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* أزرار التحكم */}
        <div style={{ 
          marginTop: '30px', 
          display: 'flex', 
          gap: '10px', 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button 
            onClick={handleNext} 
            className="nextq2"
            disabled={currentSegment > stopPoints.length - 1}
            style={{
              backgroundColor: currentSegment > stopPoints.length - 1 ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: 'bold',
              borderRadius: '8px',
              cursor: currentSegment > stopPoints.length - 1 ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            ▶ Next
          </button>
          <button 
            onClick={handleCheckAll} 
            className="checkanswer"
            style={{
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: 'bold',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            ✓ Check Answers
          </button>
          <button 
            onClick={handleReset} 
            className="restbtn"
            style={{
              backgroundColor: '#ff9800',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: 'bold',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            ↻ Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default FeelingsQuiz;