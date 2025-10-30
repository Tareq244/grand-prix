import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowCircleLeft,
    faArrowCircleRight,
    faHeadphones,
    faArrowPointer,
} from "@fortawesome/free-solid-svg-icons";


//sounds
import sound1 from '../assets/sounds/1.mp3';
import sound2 from '../assets/sounds/3.mp3';
import sound3 from '../assets/sounds/5.mp3';



import Popup from "./Popup";
import Q1 from './Q1';
import Q2 from './Q2';
import Q3 from './Q3';
import Q5 from './Q5';
import Q7 from './Q7';
import Q11 from './Q11';
import Q12 from './Q12';

import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";
import img5 from "../assets/5.png";
import img6 from "../assets/6.png";
import img7 from "../assets/7.png";
import img8 from "../assets/8.png";

import img10 from "../assets/page9/blue.png";



const Book = () => {
    const [currentLocation, setCurrentLocation] = useState(0);
    const bookRef = useRef(null);
    const [correctClicked, setCorrectClicked] = useState(false);
    const [incorrectClicked, setIncorrectClicked] = useState(false);

    const [isPopupOpen, setPopupOpen] = useState(false);
    const [popupContent, setPopupContent] = useState(null);

    const [informalAnswer, setInformalAnswer] = useState("");
    const [formalAnswer, setFormalAnswer] = useState("");
    const frenchGreetings = ["please select", "Bonjour", "Salut"];

    const [checkResult, setCheckResult] = useState(null);
    const [popupType, setPopupType] = useState(null);

    const [currentSegment, setCurrentSegment] = useState(0);
    const audioRef = useRef(null);

    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [checkResult1, setCheckResult1] = useState(null);

    const [select1, setSelect1] = useState("");
    const [select2, setSelect2] = useState("");
    const [select3, setSelect3] = useState("");
    const [select4, setSelect4] = useState("");

    const [validationResults, setValidationResults] = useState([true, true, true, true]);

    const [l2q1Answers, setL2q1Answers] = useState(["Henri", "Jacques ", "Robert ", "Léo "]);




    const customBubbles = [
        {
            top: "3%",
            left: "1%",
            isFlipped: false,
            content: (
                <>
                    Salut, je m'appelle{" "}
                    <input type="text" placeholder="Nom" />
                    et toi?
                </>
            )
        },
        {
            top: "3%",
            left: "60%",
            isFlipped: true,
            content: (
                <>
                    Je m' appelle{" "}
                    <input type="text" placeholder="Nom" />
                </>
            )
        },
        {
            top: "50%",
            left: "1%",
            isFlipped: false,
            content: (
                <>
                    Moi, c'est{" "}
                    <input type="text" placeholder="Nom" />
                    et toi.
                </>
            )
        },
        {
            top: "50%",
            left: "60%",
            isFlipped: true,
            content: (
                <>
                    Je m'appelle{" "}
                    <input type="text" placeholder="Nom" />
                    ?
                </>
            )
        },
    ];

    const customsBubbles = [
        {
            top: "3%",
            left: "1%",
            isFlipped: false,
            content: (
                <>
                    Je m’appelle Antoine. Et toi ?
                </>
            )
        },
        {
            top: "3%",
            left: "60%",
            isFlipped: true,
            content: (
                <>
                    Moi, c’est Marie. Comment tu t’appelles ?
                </>
            )
        }
    ];

    const matchingItems = [
        { id: 1, word: 'Apple', img: img10, isCorrect: true },
        { id: 2, word: 'Banana', img: img10, isCorrect: false },
        { id: 3, word: 'Car', img: img10, isCorrect: false },
        { id: 4, word: 'Dog', img: img10, isCorrect: false },
        { id: 5, word: 'Sun', img: img10, isCorrect: false },
        { id: 6, word: 'House', img: img10, isCorrect: false },
    ];

    const handleMatchingComplete = () => {
        console.log("Very good.");
        setTimeout(() => {
            closePopup();
        }, 1500);
    };


    const openPopupWithContent = (type) => {
        setCheckResult(null);
        setValidationResults([true, true, true, true]);
        setCurrentSegment(0);
        if (type === "q2") {
            setFoundItemsQ2([false, false, false, false, false, false, false]);
        } else if (type === "findItemsQuestion") {
            setFoundItems([false, false, false, false]);
        }
        setPopupType(type);
        setPopupOpen(true);
    };




    const closePopup = () => {
        setPopupOpen(false);
        setPopupType(null);
    };

    const handleSubmit = () => {
        closePopup();
    };

    

    const handleCheckAnswerL2q1 = () => {
        const correctAnswers = ["Henri", "Jacques", "Robert", "Léo"];
        const results = l2q1Answers.map((answer, index) => answer === correctAnswers[index]);
        setValidationResults(results);
        if (results.every(isCorrect => isCorrect)) {
            setCheckResult("success");
        } else {
            setCheckResult("fail");
        }
    };




    const handleCheckAnswer1 = () => {
        
        if (
            answer1.trim().toLowerCase() === "lili".toLowerCase() &&
            answer2.trim().toLowerCase() === "léo".toLowerCase()
        ) {
            setCheckResult("success");
        } else {
            setCheckResult("fail");
        }
    };

    const handleCheckAnswer2 = () => {
        if (
            select1 === "Bonjour" &&
            select2 === "Bonjour" &&
            select3 === "Salut" &&
            select4 === "Salut"
        ) {
            setCheckResult("success");
        } else {
            setCheckResult("fail");
        }
    };

    const papersRef = useRef([]);

    const numOfPapers = 5;
    const maxLocation = numOfPapers;

    const openBook = () => {
        if (bookRef.current) {
            bookRef.current.style.transform = "translateX(50%)";
        }
    };

    const closeBook = (isAtBeginning) => {
        if (bookRef.current) {
            bookRef.current.style.transform = isAtBeginning
                ? "translateX(0%)"
                : "translateX(100%)";
        }
    };

    const handleCorrectClick = () => {
        setCorrectClicked(true);
    };

    const handleIncorrectClick = () => {
        setIncorrectClicked(true);
    };

    const goNextPage = () => {
        if (currentLocation < maxLocation) {
            const newLocation = currentLocation + 1;

            if (newLocation === 1) {
                openBook();
            } else if (newLocation === maxLocation) {
                closeBook(false);
            }

            const paper = papersRef.current[currentLocation];
            if (paper) {
                paper.classList.add("flipped");
                paper.style.zIndex = newLocation;
            }

            setCurrentLocation(newLocation);
        }
    };

    const goPrevPage = () => {
        if (currentLocation > 0) {
            const newLocation = currentLocation - 1;

            if (newLocation === 0) {
                closeBook(true);
            } else if (currentLocation === maxLocation) {
                openBook();
            }

            const paper = papersRef.current[newLocation];
            if (paper) {
                paper.classList.remove("flipped");
                paper.style.zIndex = numOfPapers - newLocation;
            }

            setCurrentLocation(newLocation);
        }
    };

    const prevBtnStyle = {
        transform: currentLocation > 0 ? "translateX(-180px)" : "translateX(0px)",
        visibility: currentLocation > 0 ? "visible" : "hidden",
    };

    const nextBtnStyle = {
        transform:
            currentLocation > 0 && currentLocation < maxLocation
                ? "translateX(180px)"
                : "translateX(0px)",
        visibility: currentLocation < maxLocation ? "visible" : "hidden",
    };

    const [foundItems, setFoundItems] = useState([false, false, false, false]);
    const [foundItemsQ2, setFoundItemsQ2] = useState([false, false, false, false, false, false, false]);
    const [recentlyFound, setRecentlyFound] = useState(null);
    const [recentlyFoundQ2, setRecentlyFoundQ2] = useState(null);

    useEffect(() => { }, [foundItems]);

    useEffect(() => {
        if (foundItems.every(Boolean) && foundItems.length > 0) {
            console.log("All items found! Good Job!");
        }
    }, [foundItems]);

    const stopPoints = [5, 10];

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

        audio.addEventListener("timeupdate", handleTimeUpdate);
        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, [currentSegment, stopPoints]);

    const handleNextSegment = () => {
        const audio = audioRef.current;

        if (currentSegment < stopPoints.length) {
            setCurrentSegment((prev) => prev + 1);
            audio.play();
        }
    };

    useEffect(() => {
        papersRef.current.forEach((paper, index) => {
            if (!paper) return;

            const front = paper.querySelector(".front");
            const back = paper.querySelector(".back");

            if (index < currentLocation) {
                paper.classList.add("flipped");
                paper.style.zIndex = index - 2;

                if (index === currentLocation - 1) {
                    if (back) back.style.pointerEvents = "auto";
                    if (front) front.style.pointerEvents = "none";
                } else {
                    if (back) back.style.pointerEvents = "none";
                    if (front) front.style.pointerEvents = "none";
                }
            } else {
                paper.classList.remove("flipped");
                paper.style.zIndex = numOfPapers - index;

                if (index === currentLocation) {
                    if (front) front.style.pointerEvents = "auto";
                    if (back) back.style.pointerEvents = "none";
                } else {
                    if (front) front.style.pointerEvents = "none";
                    if (back) back.style.pointerEvents = "none";
                }
            }
        });
    }, [currentLocation, numOfPapers]);

    const handleItemClick = (index) => {
        if (foundItems[index]) return;
        const newFoundItems = [...foundItems];
        newFoundItems[index] = true;
        setFoundItems(newFoundItems);
        setRecentlyFound(index);
    };

    const handleItemClickQ2 = (index) => {
        if (foundItemsQ2[index]) return;
        const newFoundItems = [...foundItemsQ2];
        newFoundItems[index] = true;
        setFoundItemsQ2(newFoundItems);
        setRecentlyFoundQ2(index);
    };
    const handleItemClickQ3 = (index) => {
        if (foundItemsQ3[index]) return;
        const newFoundItems = [...foundItemsQ3];
        newFoundItems[index] = true;
        setFoundItemsQ3(newFoundItems);
        setRecentlyFoundQ3(index);
    };

    const page4Items = [
        {
            index: 0,
            top: "72%",
            left: "43%",
            width: "8%",
            height: "10%",
            "aria-label": "Item 1",
        },
        {
            index: 1,
            top: "42%",
            left: "23%",
            width: "6%",
            height: "5%",
            "aria-label": "Item 2",
        },
        {
            index: 2,
            top: "38%",
            left: "50%",
            width: "12%",
            height: "8%",
            "aria-label": "Item 3",
        },
        {
            index: 3,
            top: "76%",
            left: "80%",
            width: "15%",
            height: "15%",
            "aria-label": "Item 4",
        },
    ];

    const page5Items = [
        {
            index: 4,
            top: "68%",
            left: "58%",
            width: "8%",
            height: "30%",
            "aria-label": "Item 5",
        },
        {
            index: 5,
            top: "65%",
            left: "77%",
            width: "10%",
            height: "20%",
            "aria-label": "Item 6",
        },
        {
            index: 6,
            top: "42%",
            left: "64%",
            width: "8%",
            height: "25%",
            "aria-label": "Item 7",
        },
    ];

    const page6Items = [
        {
            index: 7,
            top: "68%",
            left: "58%",
            width: "8%",
            height: "30%",
            "aria-label": "Item 5",
        },
        {
            index: 8,
            top: "65%",
            left: "77%",
            width: "10%",
            height: "20%",
            "aria-label": "Item 6",
        },
        {
            index: 9,
            top: "42%",
            left: "64%",
            width: "8%",
            height: "25%",
            "aria-label": "Item 7",
        },
        {
            index: 10,
            top: "42%",
            left: "64%",
            width: "8%",
            height: "25%",
            "aria-label": "Item 7",
        },
        {
            index: 11,
            top: "42%",
            left: "64%",
            width: "8%",
            height: "25%",
            "aria-label": "Item 7",
        },
    ];

    const pages = [
        { id: "p0", front: img1, back: img2, zIndex: 5 },
        { id: "p1", front: img3, back: img4, zIndex: 4 },
        { id: "p2", front: img5, back: img6, zIndex: 3 },
        { id: "p3", front: img7, back: img8, zIndex: 2 },
        { id: "p4", front: img4, back: img1, zIndex: 1 },
    ];


    const goToNextQuestion = () => {
        setPopupType("L1q12");
        setPopupOpen(true);
    };
    const goToNextQuestion1 = () => {
        setPopupType("L2Q12");
        setPopupOpen(true);
    };


    const l4q2Images = [img1, img2, img3, img4];

    return (
        <>
            <button id="prev-btn" onClick={goPrevPage} style={prevBtnStyle}>
                <FontAwesomeIcon icon={faArrowCircleLeft} />
            </button>

            <div id="book" className="book" ref={bookRef}>
                {pages.map((page, index) => (
                    <div
                        key={page.id}
                        id={page.id}
                        className="paper"
                        style={{ zIndex: page.zIndex }}
                        ref={(el) => (papersRef.current[index] = el)}
                    >
                        <div className="front">
                            <div
                                className="content"
                                style={{ backgroundImage: `url(${page.front})` }}
                            >
                            


                                {/* Page 5 */}
                                {index === 2 && (
                                    <div className="page8-layout">

                                        <button
                                            className="sound-button-but"
                                            onClick={() =>
                                                setCheckResult(null) ||
                                                openPopupWithContent("secAQ1")}
                                        >
                                            {/* <FontAwesomeIcon icon={faArrowPointer} /> */}
                                        </button>

                                        <button
                                            className="sound-button-butt"
                                            onClick={() =>
                                                setCheckResult(null) ||
                                                openPopupWithContent("secAQ1quiz")}
                                        >
                                            <FontAwesomeIcon icon={faArrowPointer} />
                                        </button>

                                        <button
                                            className="sound-button-p11"
                                            onClick={() =>
                                                openPopupWithContent("secAQ2")
                                            }
                                        >
                                            {/* <FontAwesomeIcon icon={faHeadphones} /> */}
                                        </button>

                                    </div>
                                )}

                                {/* page 7 */}
                                {index === 3 && (
                                    <div className="page6-layout">  


                                        <button
                                            className="sound-button-p72"
                                            onClick={() =>
                                                setCheckResult(null) ||
                                                openPopupWithContent("secAQ9")}
                                        >
                                            {/* <FontAwesomeIcon icon={faArrowPointer} /> */}
                                        </button>

                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="back">
                            <div
                                className="content"
                                style={{ backgroundImage: `url(${page.back})` }}
                            >




                                {/* page 6 */}
                                {index === 2 && (
                                    <div className="page7-layout">

                                        <button
                                            className="sound-button"
                                            onClick={() => openPopupWithContent("secAQ3")}
                                        >
                                            {/* <FontAwesomeIcon icon={faArrowPointer} /> */}
                                        </button>

                                         <button
                                            className="sound-buttonnn"
                                            onClick={() =>
                                                setCheckResult(null) ||
                                                openPopupWithContent("secAQ3quiz")}
                                        >
                                            <FontAwesomeIcon icon={faArrowPointer} />
                                        </button>

                                        {/* <button
                                            className="sound-button-secend"
                                            onClick={() =>
                                                openPopupWithContent("secAQ4")
                                            }
                                        >
                                            <FontAwesomeIcon icon={faHeadphones} />
                                        </button> */}

                                        <button
                                            className="sound-button-third3"
                                            onClick={() =>
                                                openPopupWithContent("secAQ5")
                                            }
                                        >
                                            <FontAwesomeIcon icon={faArrowPointer} />
                                        </button>

                                        <button
                                            className="sound-button-third1"
                                            onClick={() =>
                                                openPopupWithContent("secAQ51")
                                            }
                                        >
                                            {/* <FontAwesomeIcon icon={faHeadphones} /> */}
                                        </button>


                                        <button
                                            className="sound-button-third2"
                                            onClick={() =>
                                                openPopupWithContent("secAQ51")
                                            }
                                        >
                                            {/* <FontAwesomeIcon icon={faHeadphones} /> */}
                                        </button>


                                       
                                        


                                    </div>
                                )}

                                {/* page 8 */}
                                {index === 3 && (
                                    <div className="page8-layout">

                                        <button
                                            className="sound-button-p8"
                                            onClick={() =>
                                                openPopupWithContent("secAQ11")
                                            }
                                        >
                                            {/* <FontAwesomeIcon icon={faHeadphones} /> */}
                                        </button>

                                        <button
                                            className="sound-button-p88"
                                            onClick={() => openPopupWithContent("secAQ11")}
                                        >
                                            {/* <FontAwesomeIcon icon={faArrowPointer} /> */}
                                        </button>

                                        <button
                                            className="sound-button-p888"
                                            onClick={() => {
                                                console.log("L3Q2 Clicked!");
                                                openPopupWithContent("secAQ122")
                                            }}
                                        >
                                            {/* <FontAwesomeIcon icon={faArrowPointer} /> */}
                                        </button>

                                        <button
                                            className="sound-button-p8888"
                                            onClick={() => {
                                                console.log("L3Q2 Clicked!");
                                                openPopupWithContent("secAQ122")
                                            }}
                                        >
                                            {/* <FontAwesomeIcon icon={faArrowPointer} /> */}
                                        </button>

                                        
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button id="next-btn" onClick={goNextPage} style={nextBtnStyle}>
                <FontAwesomeIcon icon={faArrowCircleRight} />
            </button>



            

            <Popup isOpen={isPopupOpen} onClose={closePopup}>
                {popupType === "secAQ1" && (
                    <div>
                        <audio src={sound1} controls className="sec4audio" />
                    </div>
                )}
                {popupType === "secAQ1quiz" && (
                    <Q1 />
                )}

                {popupType === "secAQ2" && (
                    <Q2 />
                )}

                {popupType === "secAQ3quiz" && (
                    <Q3 />
                )}

                {popupType === "secAQ3" && (
                    <div>
                        <audio src={sound2} controls className="sec4audio" />
                    </div>
                )}

{popupType === "secAQ5" && (
    <Q5 
        sound={sound3}  
    />
)}


                {popupType === "secAQ51" && (
                    <div>
                        <audio src={sound3} controls className="sec4audio" />
                    </div>
                )}

                {popupType === "secAQ7" && (
                    <div>
                        <audio src={sound6} controls className="page4audio" />
                    </div>
                )}

               

                {popupType === "secAQ9" && (
                    <Q7 />
                )}

                

                {popupType === "secAQ11" && (
                    <Q11 />
                )}

                {popupType === "secAQ122" && (
                    <Q12 />
                )}


                {popupType === "anotherQuestion" && (
                    <div>
                        <p>محتوى لنافذة منبثقة أخرى...</p>
                    </div>
                )}


            </Popup>
        </> 
    );
};

export default Book;