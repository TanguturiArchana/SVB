// import React, { useEffect, useState } from 'react'
// import file from './questions.json';
// import Option from './Option';
// import Confetti from 'react-confetti';
// import { shuffleArray } from './utils';


// export default function Game() {
//     const sections = Object.keys(file.images); // Get section keys dynamically
//     const [sectionIndex, setSectionIndex] = useState(0); // Track the current section index
//     const [currentData,setCurrentData]=useState(file.images[sections[0]][0]);//to render data 
//     const [index,setIndex]=useState(0);//to set cuurent index
//     const [msg,setMsg]=useState("");//to set msg
//     const [total,setTotal]=useState("");//to set total number of questions
//     const[totalQIS,setTotalQIS]=useState(file.images[sections[0]].length);//to set total number of question in section
//     const[current,setCurrent]=useState("");//to set the completed number of questions
//     const [img,setImg]=useState(false);//to set audio image
//     const[AudioOption,setAudioOption]=useState(null);//to handle the audio img
    
//     const [selectedOption,setSelectedOption]=useState("");//to store the selected option
//     const [color, setColor] = useState("red");//to set the msg color
//     const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);// to store the index of the selected option
//     const [BgColor,setBgColor]=useState("");
    
//     const[PlayAgain,setPlayAgain]=useState(false);
//     const [isSpeaking, setIsSpeaking] = useState(false);//to control the checkboxes and next button while audio is playing
    
//     const [attempts, setAttempts] = useState(
//         sections.reduce((acc, section) => {
//             acc[section] = Array(file.images[section].length).fill(1);
//             return acc;
//         }, {})
//     );
//     const [time, setTime] = useState(
//         sections.reduce((acc, section) => {
//             acc[section] = Array(file.images[section].length).fill(0);
//             return acc;
//         }, {})
//     );
//     const [startTime, setStartTime] = useState(Date.now());
//     const [nextBut,setNextbut]=useState(true);
//     const [showConfetti, setShowConfetti] = useState(false); 
//     const [isCorrect, setIsCorrect] = useState(null);//to change the background color
//     const [shuffledOptions, setShuffledOptions] = useState([]);



//     useEffect(() => {
//         // Initialize currentData and shuffledOptions
//         if (sections.length > 0) {
//             const initialData = file.images[sections[0]][0];
//             setCurrentData(initialData);
//             setShuffledOptions(shuffleArray(initialData.options)); // Shuffle options initially
//         }
//     }, []);
    




//     useEffect(() => {
//         setStartTime(Date.now());
//     },[currentData]);
//     const HandleNext = () => {
//         if (!currentData) return; // If currentData is null, to return early
//         const sectionKey = sections[sectionIndex];
//         if (selectedOption === currentData.correctanswer) {
//             setShowConfetti(true); // Show confetti on correct answer
//             setIsCorrect(true);
//             setTimeout(() => {
//                 setShowConfetti(false);
//                 setIsCorrect(null);
//                 moveToNextQuestion(); // Move to the next question after confetti is hidden
//             }, 5000); // Hide confetti after 5 seconds
//         } else if (selectedOption === "") {
//             setMsg("Please select an option");
//         } else {
//             setIsCorrect(false);
//             const newAttempts = { ...attempts };
//             newAttempts[sectionKey][index]++;
//             setAttempts(newAttempts);
//             setBgColor("red");
//             setMsg("Try again!");
//         }

//         setBgColor("");
//         setSelectedOption("");
//         setSelectedOptionIndex(null);
//     };

//     const moveToNextQuestion = () => {
//         const sectionKey = sections[sectionIndex];
//         const endTime = Date.now();
//         const timeTaken = Math.floor((endTime - startTime) / 1000); // Time taken in seconds
//         const newTime = { ...time };
//         newTime[sectionKey][index] += timeTaken;
//         setTime(newTime);

//         if (index === file.images[sectionKey].length - 1) {
//             if (sectionIndex === sections.length - 1) {
//                 setCurrent("");
//                 setTotal("");
//                 setNextbut(false);
                
//                 // setMsg(`CONGRATULATIONS! YOU HAVE COMPLETED SECTION-${sectionIndex + 1}`)
//                 // setShowConfetti(true)

//                 setColor("green");
               
//                 setPlayAgain(true);
//                 setMsg("CONGRATULATIONS! YOU HAVE COMPLETED ALL SECTIONS");
//                 // setShowConfetti(true);
//                 setCurrentData(null);
//             } else {
//                 const nextSectionIndex = sectionIndex + 1;
//                 const nextData = file.images[sections[nextSectionIndex]][0];

//                 setSectionIndex(nextSectionIndex);
//                 setCurrentData(nextData);
//                 setIndex(0);
//                 // setMsg(`CONGRATULATIONS! YOU HAVE COMPLETED SECTION-${sectionIndex + 1}`)
//                 setShuffledOptions(shuffleArray(nextData.options)); 
//                 // setShowConfetti(true);
               
//                 setTotalQIS(file.images[sections[nextSectionIndex]].length);
//             }
//         } else {
//             const newIndex = index + 1;
//             const nextData = file.images[sectionKey][newIndex];
//             setIndex(newIndex);
//             setCurrentData(nextData);
//             setShuffledOptions(shuffleArray(nextData.options));
//         }
//     };

//     useEffect(()=>{
//          setTotal(`Total number of questions: ${totalQIS}`)
//         setCurrent(`Number of questions completed: ${index}`)
//     },[index,totalQIS])
//       const handleCheckboxChange=(option,key)=>{
//         setMsg("");
//         setSelectedOption(option);
//         setSelectedOptionIndex(key);

//       }
//     const playAudio=(option)=>{
//         const utterance = new SpeechSynthesisUtterance(option);
//         utterance.onstart = () =>{ 
//             setIsSpeaking(true)
//             setImg(true)
//             setAudioOption(option)
//         };
//         utterance.onend = () =>{ 
//             setIsSpeaking(false)
//             setImg(false);
//             setAudioOption(null)
//         };
//         window.speechSynthesis.speak(utterance);
//     }
// //to play audio if user chooses wrong option or presses next button without choosing anyoption
//     useEffect(() => {
//         if (msg.includes('CONGRATULATIONS') || msg.includes('Wrong answer') || msg.includes('Please select')) {
//             // Text-to-Speech
//             const utterance = new SpeechSynthesisUtterance(msg);
//             utterance.onstart = () => setIsSpeaking(true);
//             utterance.onend = () => setIsSpeaking(false);
//             window.speechSynthesis.speak(utterance);
//         }
//     }, [msg]);
   
    
//     const playAgain=()=>{
//         setIndex(0);
//         setSectionIndex(0);
//         const initialData = file.images[sections[0]][0];
//         setCurrentData(initialData);
//         setShuffledOptions(shuffleArray(initialData.options)); 
       
//         setNextbut(true);
//         setMsg("");
//         setTotalQIS(file.images[sections[0]].length);
//         setPlayAgain(false);

//     }
    
//   return (
//     <div style={{width:"100%"}} >
//     <h1 style={{textAlign:"center",color:"#3C9099"}}>Sentence Verification Bridging</h1>
//     {nextBut && <p style={{fontWeight:"bold",textAlign:"center",color:"#5FBDB0"}}>CHOOSE THE SENTENCE THAT MATCHES THE BELOW PICTURE</p>}
    
//     <div style={{textAlign: "center",backgroundColor:"#5FBDB0",border: '4px solid #3C9099',padding: "0.2%",margin:"3%",borderRadius: "2%",width:"95%" }}>
//     {
//         currentData && (
//             <div style={{display:"flex",flexDirection:"row"}} >
//                 <div style={{textAlign: "left",height: "5%", width: "50%", marginLeft: "5%",marginTop:"1%"}}>
//                     <img src={currentData.url} style={{height:"50vh",width:"15vw",padding:"1%"}} alt={currentData.caption}/>
//                 </div>
//                 <div style={{display:"flex",alignItems:"center"}}>
//                 <Option currentData={currentData} msg={msg} options={shuffledOptions} handleCheckboxChange={handleCheckboxChange} showConfetti={showConfetti} img={img} AudioOption={AudioOption} playAudio={playAudio} isSpeaking={isSpeaking} isCorrect={isCorrect} selectedOptionIndex={selectedOptionIndex}  />
//                 </div>
               
//             </div>
           
//         ) 
//     }
//     {msg && <div >
//     <p style={{color:color,fontWeight:"bold",marginTop:"1%" }}>{msg}</p>
//     {PlayAgain && <button onClick={playAgain} style={{ margin: '0 auto',marginBottom:"1%",border: '1px solid #E3E2C3', display: 'block' ,backgroundColor: '#3C9099',color: '#F0EFE2',padding: '10px 20px',borderRadius: "5px",cursor: 'pointer',fontSize: 16,fontWeight: 'bold',marginTop: 20,}}>PLAY AGAIN</button>}
//     </div>}
//     {nextBut &&  <button onClick={HandleNext} style={{ margin: '0 auto',marginBottom:"1%", display: 'block' ,border: '1px solid #E3E2C3',backgroundColor: showConfetti ? 'green' : '#3C9099',color: '#F0EFE2',padding: '10px 20px',borderRadius: "5px",cursor: 'pointer',fontSize: 16,fontWeight: 'bold',marginTop: 20,}}>{showConfetti ? 'CORRECT' : 'NEXT'}</button>}
//     </div>
//     {showConfetti && <Confetti/> }
//     </div>
//   )
// }


import React, { useEffect, useState } from 'react';
import file from './questions.json';
import Option from './Option';
import Confetti from 'react-confetti';
import { shuffleArray } from './utils';
import 'bootstrap/dist/css/bootstrap.min.css';
import './game.css'

export default function Game() {
    const sections = Object.keys(file.images);
    const [sectionIndex, setSectionIndex] = useState(0);
    const [currentData, setCurrentData] = useState(file.images[sections[0]][0]);
    const [index, setIndex] = useState(0);
    const [msg, setMsg] = useState("");
    const [total, setTotal] = useState("");
    const [totalQIS, setTotalQIS] = useState(file.images[sections[0]].length);
    const [current, setCurrent] = useState("");
    const [img, setImg] = useState(false);
    const [AudioOption, setAudioOption] = useState(null);
    const [selectedOption, setSelectedOption] = useState("");
    const [color, setColor] = useState("red");
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [BgColor, setBgColor] = useState("");
    const [PlayAgain, setPlayAgain] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [attempts, setAttempts] = useState(
        sections.reduce((acc, section) => {
            acc[section] = Array(file.images[section].length).fill(1);
            return acc;
        }, {})
    );
    const [time, setTime] = useState(
        sections.reduce((acc, section) => {
            acc[section] = Array(file.images[section].length).fill(0);
            return acc;
        }, {})
    );
    const [startTime, setStartTime] = useState(Date.now());
    const [nextBut, setNextbut] = useState(true);
    const [showConfetti, setShowConfetti] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [disablebut,setDisableBut]=useState(false);

    useEffect(() => {
        if (sections.length > 0) {
            const initialData = file.images[sections[0]][0];
            setCurrentData(initialData);
            setShuffledOptions(shuffleArray(initialData.options));
        }
    }, []);

    useEffect(() => {
        setStartTime(Date.now());
    }, [currentData]);

    const HandleNext = () => {
        if (!currentData) return;
        const sectionKey = sections[sectionIndex];
        if (selectedOption === currentData.correctanswer) {
            setShowConfetti(true);
            setIsCorrect(true);
            setDisableBut(true);
            setTimeout(() => {
                setShowConfetti(false);
                setDisableBut(false);
                setIsCorrect(null);
                moveToNextQuestion();
            }, 5000)
        } else if (selectedOption === "") {
            setMsg("Please select an option");
        } else {
            setIsCorrect(false);
            const newAttempts = { ...attempts };
            newAttempts[sectionKey][index]++;
            setAttempts(newAttempts);
            setBgColor("red");
            setMsg("Incorrect! Try again.");
        }

        setBgColor("");
        setSelectedOption("");
        setSelectedOptionIndex(null);
    };
    const moveToNextQuestion = () => {
        const sectionKey = sections[sectionIndex];
        const endTime = Date.now();
        const timeTaken = Math.floor((endTime - startTime) / 1000);
        const newTime = { ...time };
        newTime[sectionKey][index] += timeTaken;
        setTime(newTime);

        if (index === file.images[sectionKey].length - 1) {
            if (sectionIndex === sections.length - 1) {
                setCurrent("");
                setTotal("");
                setNextbut(false);
                setColor("green");
                setPlayAgain(true);
                setMsg("CONGRATULATIONS! YOU HAVE COMPLETED ALL SECTIONS");
                setCurrentData(null);
            } else {
                const nextSectionIndex = sectionIndex + 1;
                const nextData = file.images[sections[nextSectionIndex]][0];
                setSectionIndex(nextSectionIndex);
                setCurrentData(nextData);
                setIndex(0);
                setShuffledOptions(shuffleArray(nextData.options));
                setTotalQIS(file.images[sections[nextSectionIndex]].length);
            }
        } else {
            const newIndex = index + 1;
            const nextData = file.images[sectionKey][newIndex];
            setIndex(newIndex);
            setCurrentData(nextData);
            setShuffledOptions(shuffleArray(nextData.options));
        }
    }

    useEffect(() => {
        setTotal(`Total number of questions: ${totalQIS}`);
        setCurrent(`Number of questions completed: ${index}`);
    }, [index, totalQIS]);

    const handleCheckboxChange = (option, key) => {
        setMsg("");
        setSelectedOption(option);
        setSelectedOptionIndex(key);
    };

    const playAudio = (option) => {
        const utterance = new SpeechSynthesisUtterance(option);
        utterance.onstart = () => {
            setIsSpeaking(true);
            setDisableBut(true);
            setImg(true);
            setAudioOption(option);
        };
        utterance.onend = () => {
            setIsSpeaking(false);
            setDisableBut(false);
            setImg(false);
            setAudioOption(null);
        };
        window.speechSynthesis.speak(utterance);
    };

    useEffect(() => {
        if (msg.includes('CONGRATULATIONS') || msg.includes('Wrong answer') || msg.includes('Please select')) {
            const utterance = new SpeechSynthesisUtterance(msg);
            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
        }
    }, [msg]);


    const playAgain = () => {
        setIndex(0);
        setSectionIndex(0);
        const initialData = file.images[sections[0]][0];
        setCurrentData(initialData);
        setShuffledOptions(shuffleArray(initialData.options));
        setNextbut(true);
        setMsg("");
        setTotalQIS(file.images[sections[0]].length);
        setPlayAgain(false);
        setColor("red");
    };
   
    return (
        <div className="container">
            <h1 className="text-center  my-4" style={{color:"#3C9099"}}>Sentence Verification Bridging</h1>
            {nextBut && <p className="text-center" style={{color:"#5FBDB0",fontWeight:"bold"}}>CHOOSE THE SENTENCE THAT MATCHES THE BELOW PICTURE</p>}
            <div className={`text-center p-2 my-3 rounded ${isCorrect ? 'correct-blink' : isCorrect === false ? 'incorrect-blink' : 'transparent'}`} style={{backgroundColor: "#5FBDB0",border: '4px solid #3C9099'}}>
                {
                    currentData && (
                        <div className="row">
                            <div className="col-md-6 col-s-4 text-left">
                                <img src={currentData.url} className="img-fluid p-1" alt={currentData.caption} style={{ height: '40vh' }} />
                            </div>
                            <div className="col-md-6 col-s-4 d-flex align-items-center">
                                <Option currentData={currentData} msg={msg} options={shuffledOptions} handleCheckboxChange={handleCheckboxChange} showConfetti={showConfetti} img={img} AudioOption={AudioOption} playAudio={playAudio} isSpeaking={isSpeaking} isCorrect={isCorrect} selectedOptionIndex={selectedOptionIndex} />
                            </div>
                        </div>
                    )
                }
                {msg && <div>
                    <p className="font-weight-bold my-1" style={{ color: color }}>{msg}</p>
                    {PlayAgain && <button onClick={playAgain} className="btn btn-primary my-2" style={{border: '1px solid #E3E2C3',backgroundColor: '#3C9099',color: '#F0EFE2'}}>PLAY AGAIN</button>}
                </div>}
                {nextBut && <button onClick={HandleNext} disabled={disablebut} className={`btn btn-${showConfetti ? 'success' : 'primary'} my-2`} style={{border: '1px solid #E3E2C3',backgroundColor: '#3C9099',color: '#F0EFE2'}}>{showConfetti ? 'CORRECT' : 'NEXT'}</button>}
            </div>
            {showConfetti && <Confetti />}
        </div>
    );
}
