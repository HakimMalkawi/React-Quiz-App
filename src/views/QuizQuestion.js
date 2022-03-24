import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import { Buffer } from "buffer"
import "../css/quiz-question.css"

const QuizQuestion = props => {
    const [answerChoices, setAnswerChoices] = useState("")
    
    useEffect(()=>{ setAnswerChoices(props.answers.map((answer, index) => 
        <div key={nanoid()} onClick={event=>props.handleClick(event, props.id)} id={`${props.id}_${index+1}`} 
        className="quiz-question-answer open">{Buffer.from(answer, 'base64').toString('utf-8')}</div> )   )}, [])

    useEffect(()=>{ if(props.gradeQuestions) {
        for(const [index, answer] of props.answers.entries()) {
            const correctAnswerId = `#${CSS.escape(`${props.id}_${index+1}`)}`
            if(answer === props.correctAnswer) {
                if(document.querySelector(correctAnswerId).classList.contains("selected")) {
                    document.querySelector(correctAnswerId).classList.remove("selected")
                    document.querySelector(correctAnswerId).classList.add("correct"); continue }
            document.querySelector(correctAnswerId).classList.add("revealed")   }   }   

        setTimeout(()=>{
            for(const answer of document.querySelectorAll(".quiz-question-answer")) { 
                answer.classList.remove("open") 
                if(answer.classList.contains("correct")||answer.classList.contains("wrong")||answer.classList.contains("revealed")) {continue}
                answer.classList.add("dimmed")  }   }, 50)
                
        setAnswerChoices(prevAnswerChoices => prevAnswerChoices.map(prevChoice => {
            return {...prevChoice, props: {...prevChoice.props, onClick: ()=>{} }  }    })   )   }}, [props])

    return  <>  <section className={`quiz-question-container ${props.id}`}>
                <h1 className="quiz-question-title">{Buffer.from(props.question, 'base64').toString('utf-8')}</h1>
                {answerChoices}
            </section>  </> }
export default QuizQuestion