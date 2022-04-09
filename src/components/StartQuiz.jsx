import "../css/start-quiz.css"

const StartQuiz = props =>
    <>  <main className="start-quiz-container">
        <section className="start-quiz-content">
            <h1 className="start-quiz-title">React Quiz App</h1>
            <h2 className="start-quiz-intro">Click on the button to start<br/>a new quiz session</h2>
            <button onClick={props.handleClick} className="start-quiz-button">Start Quiz</button>
        </section>
        </main>  </>
export default StartQuiz