// import React from 'react'
// import playIcon from './playIcon.png';
// import playIconClicked from './playIconClicked.jpg';

// export default function Option(props) {
//     const getBgColor = (key, option) => {
//         if (props.showConfetti && props.isCorrect && props.currentData.correctanswer === option) {
//             return 'green'; 
//         } //else if (props.msg && !props.isCorrect && props.selectedOptionIndex === key && props.currentData.correctanswer !== option) {
//         //     return 'red'; }
//         else {
//             return '#E3E2C3';
//         }
//     };
//     return (
//         <div style={{ textAlign: "left", margin: "2%"}}>
//         {
//             props.options.map((option, key) => (
//                 <div style={{
//                     padding: "0.5%",
//                     backgroundColor: getBgColor(key, option),
//                     border: '4px solid #3C9099',
//                     borderRadius: "2%",
//                     margin: "1%",
//                 }} key={key}>
//                     <img src={props.AudioOption === option && props.img ? playIcon:playIconClicked } onClick={() => props.playAudio(option)} style={{ cursor: "pointer", marginRight: "10px", height: "0.5%", width: "3%" }} disabled={props.isSpeaking} alt='audio'/>
//                     <input type='radio' id={`option${props.index + 1}`} name={`option${props.index + 1}`} style={{ transform: "scale(1.5)" }} disabled={props.isSpeaking} checked={props.selectedOptionIndex === key} onChange={() => props.handleCheckboxChange(option, key)} />
//                     <label htmlFor={`option${props.index + 1}`} style={{ marginLeft: "5px", color: "black" }} disabled={props.isSpeaking}>{option}</label>
//                 </div>
//             ))
//         }
//         </div> 
//     )
// }

import React from 'react';
import playIcon from './playIcon.png';
import playIconClicked from './playIconClicked.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';  
import './game.css'; 

export default function Option(props) {
    const getBgClass = (key, option) => {
        console.log('Evaluating option:', option);
        console.log('props.showConfetti:', props.showConfetti);
        console.log('props.isCorrect:', props.isCorrect);
        console.log('props.currentData.correctanswer:', props.currentData.correctanswer);
        console.log('props.msg:', props.msg);
        console.log('props.selectedOptionIndex:', props.selectedOptionIndex);
        console.log('key:', key);
        if (props.showConfetti && props.isCorrect && props.currentData.correctanswer === option) {
            console.log('Correct option', option);
            return 'option-correct';
        } else if (props.msg && !props.isCorrect && props.selectedOptionIndex === key && props.currentData.correctanswer !== option) {
            console.log('Incorrect option', option);
            return 'option-incorrect';
        } else {
            
            return '#E3E2C3b';
        }
    };

    return (
        <div className="text-left my-2">
            {
                props.options.map((option, key) => (
                    <div 
                        className={`option-container p-2 rounded my-2 ${getBgClass(key, option)}`} 
                        
                        key={key}
                    >
                        <img
                            src={props.AudioOption === option && props.img ? playIcon : playIconClicked}
                            onClick={() => props.playAudio(option)}
                            style={{ cursor: "pointer", marginRight: "10px", height: "20px", width: "20px"}}
                            disabled={props.isSpeaking}
                            alt='audio'
                        />
                        <input
                            type='radio'
                            id={`option${props.index + 1}`}
                            name={`option${props.index + 1}`}
                            className="form-check-input ml-2"
                            disabled={props.isSpeaking}
                            checked={props.selectedOptionIndex === key}
                            onChange={() => props.handleCheckboxChange(option, key)}
                        />
                        <label htmlFor={`option${props.index + 1}`} className="ml-2" style={{ color: "black", marginLeft: "5px" }} disabled={props.isSpeaking}>
                            {option}
                        </label>
                    </div>
                ))
            }
        </div>
    )
}


