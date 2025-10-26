import React, { useState } from 'react';
import InteractivePage from './InteractivePage';
import ValidationAlert from './ValidationAlert'; // ✅ استدعاء مكون التنبيه

const FindItemsQuiz = ({
    title,
    questionNumber,
    audioSrc,
    backgroundImage,
    items,
    onClose,
}) => {
    const [foundItems, setFoundItems] = useState(Array(items.length).fill(false));
    const [recentlyFound, setRecentlyFound] = useState(null);
    const [checkResult, setCheckResult] = useState(null);

    const handleItemClick = (index) => {
        if (foundItems[index]) return;
        const newFoundItems = [...foundItems];
        newFoundItems[index] = true;
        setFoundItems(newFoundItems);
        setRecentlyFound(index);
    };

    const handleCheck = () => {
        const allItemsFound = foundItems.every(Boolean);
        
        if (allItemsFound) {
            setCheckResult("success");
            ValidationAlert.success("Bravo!", "You found all the items! 🎉");
        } else {
            setCheckResult("fail");
            ValidationAlert.error("Try Again!", "You haven't found all the items yet.");
        }
    };

    return (
        <>
            <div className="qustion1">
                <h5>
                    <span className="qusetionnum">{questionNumber}.</span> {title}
                </h5>
            </div>
            <audio src={audioSrc} controls className="page4audio" />

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
                <button
                    type="button"
                    className="checkanswer"
                    onClick={handleCheck}
                >
                    Check Answer
                </button>

                <button 
                    type="button" 
                    className="nextq2" 
                    onClick={onClose} 
                    disabled={checkResult !== "success"}
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default FindItemsQuiz;
