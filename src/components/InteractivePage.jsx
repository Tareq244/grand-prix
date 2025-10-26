// src/components/InteractivePage.js
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './InteractivePage.css';

const InteractivePage = ({ items, foundItems, recentlyFound, onItemClick }) => {
    const [localFound, setLocalFound] = useState(foundItems);

    useEffect(() => {
        setLocalFound(foundItems);
    }, [foundItems]);

    const handleClick = (index) => {
        onItemClick(index);
        const newFound = [...localFound];
        newFound[index] = true;
        setLocalFound(newFound);
    };

    return (
        <div className="interactive-container">
            {items.map(item => (
                <div
                    key={item.index}
                    className="clickable-area"
                    style={{ top: item.top, left: item.left, width: item.width, height: item.height }}
                    onClick={() => handleClick(item.index)}
                    aria-label={item['aria-label']}
                ></div>
            ))}

            {/* أيقونات الصح الخضراء */}
            <div className="feedback-icons">
                {items.map(item => {
                    const { index } = item;
                    const isFound = localFound[index];

                    if (isFound) {
                        const isRecent = recentlyFound === index;
                        const iconClassName = `check-icon ${isRecent ? 'recent' : ''}`;

                        return (
                            <div key={index} className={`icon-container icon-${index}`}>
                                <FontAwesomeIcon icon={faCheckCircle} className={iconClassName} />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default InteractivePage;