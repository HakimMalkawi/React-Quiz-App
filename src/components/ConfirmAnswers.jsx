import "../css/confirm-answers.css"

const ConfirmAnswers = props =>
<>  {   props.children  }
    {   props.state &&
        <section className="confirmation-container">
            <div className="confirmation-content">
                <h1 className="confirmation-prompt">Are you sure you would like to submit your answers?</h1>
                <button className="confirmation-confirm" onClick={()=>{props.handleClick(); props.handleState(false)}}>Confirm</button>
                <button className="confirmation-decline" onClick={()=>props.handleState(false)}>Decline</button>
            </div>
        </section>  } </>
export default ConfirmAnswers