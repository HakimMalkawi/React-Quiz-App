import {useState, useEffect} from "react"
import {nanoid} from "nanoid"
import {Buffer} from "buffer"
import QuizQuestion from "./QuizQuestion"
import "../css/quiz-main.css"

const QuizMain = () => {
    const [quizData, setQuizData] = useState(null)
    const [questions, setQuestions] = useState(null)
    const [answers, setAnswers] = useState({1: null, 2: null, 3: null, 4: null, 5: null, 6: null})
    const [gradeQuestions, setGradeQuestions] = useState(false)
    const [score, setScore] = useState(null)
    
    const startQuiz = async() => {
        const fetchQuizData = await fetch("https://opentdb.com/api.php?amount=6&category=18&type=multiple&encode=base64")
        setQuizData(await fetchQuizData.json())  }   
    
    useEffect( ()=>{ startQuiz() }, [])
    useEffect( ()=>{ setQuestions( quizData ? quizData.results.map( (question, index) => 
        <QuizQuestion key={nanoid()} id={index+1} question={question.question} answers={randomizeAnswers(question)} 
        correctAnswer={question.correct_answer} handleClick={answerSelector} /> ) : null)}, [quizData])

    const checkAnswers = () => {
        setGradeQuestions(true)
        let count = 0

        for(const [currentQuestion, question] of quizData.results.entries()) {
            if(answers[currentQuestion+1] === null) { continue }
            else if(answers[currentQuestion+1][0] === question.correct_answer) { count++ ; continue}
            else if(document.querySelector(`${answers[currentQuestion+1][1]}`).classList.contains("selected")) {
                document.querySelector(`${answers[currentQuestion+1][1]}`).classList.remove("selected")
                document.querySelector(`${answers[currentQuestion+1][1]}`).classList.add("wrong")  }   }

        setScore(count) 
        setQuestions(prevQuestions => prevQuestions.map(question => {
            return {...question, props: {...question.props, gradeQuestions: true}}  })   ) }

    const answerSelector = (event, id) => {
            const currentAnswerId = `#${CSS.escape(event.target.id)}`

            const clearPrevSelections = () => {
                for(const answer of document.querySelectorAll(`.${CSS.escape(id)} > .quiz-question-answer`)) {
                    if(answer.classList.contains("selected")){ answer.classList.remove("selected") }    }   }

            const selectAnswer = () => {
                clearPrevSelections()
                document.querySelector(currentAnswerId).classList.add("selected")
                setAnswers(prevAnswers => { return { ...prevAnswers, [id]: [Buffer.from(event.target.innerText).toString('base64'), currentAnswerId] }  })  }

            const deselectAnswer = () => {
                document.querySelector(currentAnswerId).classList.remove("selected")
                return setAnswers(prevAnswers => { return  {...prevAnswers, [id]: null} })  }

            document.querySelector(currentAnswerId).classList.contains("selected") ? 
            deselectAnswer() : selectAnswer()   }

    const randomizeAnswers = question => {
        const answers = [...question.incorrect_answers]
        answers.splice(Math.floor(Math.random()*answers.length),0,question.correct_answer)
        return answers  }

    const restartQuiz = () => { setGradeQuestions(false); setAnswers({1: null, 2: null, 3: null, 4: null, 5: null, 6: null}); startQuiz() }

    return  <>  
                {questions && <main id="loading" className="quiz-container">
                <h1 className="quiz-title">Select your answers and submit them to recieve a score</h1>
                <section className="quiz-questions">{quizData && questions}</section>
                {gradeQuestions && <h5 className="quiz-score">You scored <span>{score}/6</span> correct answers</h5>}
                <button onClick={()=>gradeQuestions?restartQuiz():checkAnswers()} className="quiz-button" 
                    id={gradeQuestions ? "show" : null}>{gradeQuestions ? "Play Again" : "Check Answers"}</button>
                </main> }</> }
export default QuizMain