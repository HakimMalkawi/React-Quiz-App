import {useState} from "react"
import StartQuiz from "./StartQuiz"
import QuizMain from "./QuizMain"
import "../css/app.css"

const App = () => {
    const [startMenu, setStartMenu] = useState(true)
    return  <>  {startMenu ? <StartQuiz handleClick={()=>{setStartMenu(false)}} /> : <QuizMain />}  </> }
export default App