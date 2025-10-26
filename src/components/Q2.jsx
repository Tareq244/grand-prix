import React, { useState, useRef, useEffect } from 'react';
import InteractivePage from './InteractivePage'; // تأكد من أن المسار صحيح
import ValidationAlert from './ValidationAlert'; // تأكد من المسار

const Q2 = ({
    title,
    questionNumber,
    audioSrc,
    backgroundImage,
    items,
    requiredItemIndices, // مؤشرات العناصر المطلوبة للنجاح
    stopPoints, // نقاط توقف الصوت
    onClose,
}) => {
    // 1. نقل الحالات والـ refs المتعلقة بهذا المكون إلى داخله
    const [foundItems, setFoundItems] = useState(Array(items.length).fill(false));
    const [recentlyFound, setRecentlyFound] = useState(null);
    const [checkResult, setCheckResult] = useState(null);
    const [currentSegment, setCurrentSegment] = useState(0);
    const audioRef = useRef(null);

    // 2. نقل منطق التحكم في الصوت
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => {
            if (
                currentSegment < stopPoints.length &&
                audio.currentTime >= stopPoints[currentSegment]
            ) {
                audio.pause();
            }
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [currentSegment, stopPoints]);

    // 3. نقل الدوال المتعلقة بالمنطق الداخلي للمكون
    const handleItemClick = (index) => {
        if (foundItems[index]) return;
        const newFoundItems = [...foundItems];
        newFoundItems[index] = true;
        setFoundItems(newFoundItems);
        setRecentlyFound(index);
    };

    const handleNextSegment = () => {
        const audio = audioRef.current;
        if (currentSegment < stopPoints.length) {
            setCurrentSegment((prev) => prev + 1);
            if (audio) audio.play();
        }
    };

    const handleCheck = () => {
    // التحقق فقط من العناصر المطلوبة التي تم تحديدها في requiredItemIndices
    const allRequiredFound = requiredItemIndices.every(index => foundItems[index]);

    if (allRequiredFound) {
        setCheckResult("success");
        ValidationAlert.success("Bravo!", "You found all items! 🎉");
    } else {
        setCheckResult("fail");
        ValidationAlert.error("Oops!", "Some items are still missing!");
    }
};


    return (
        <>
            <div className="qustion1">
                <h5><span className="qusetionnum">{questionNumber}.</span> {title}</h5>
            </div>
            <audio ref={audioRef} src={audioSrc} controls className="page4audio" />

            <div className="popup-image-container">
                <img src={backgroundImage} alt="Quiz background" className="popup-image" />
                <InteractivePage
                    items={items}
                    foundItems={foundItems}
                    recentlyFound={recentlyFound}
                    onItemClick={handleItemClick}
                />
            </div>

            <div className="results-container">
                {checkResult !== "success" && (
                    <button
                        type="button"
                        className="checkanswer"
                        onClick={handleCheck}
                    >
                        Check Answer
                    </button>
                )}
                <button onClick={handleNextSegment} className="nextq2">▶️ Continue</button>
                
                
            </div>
        </>
    );
};

export default Q2;
