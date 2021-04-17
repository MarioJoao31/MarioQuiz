import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";

const QuizAnswer = ({ quiz: { quiz, loading } }) => {
  //TODO: Estou a fazer a logica da pagina de novo 

  const[startQuiz, setStartQuiz] = useState(false);
  const[showScore, setShowScore] = useState(false);
  const[score, setScore] = useState(0);
  const[incre,setIncre]= useState(0);
  const[respostas, setRespostas] = useState(quiz.question_possibility[incre]);
  const[respostaCorreta, setRespostaCorreta]= useState(quiz.question_possibility[incre].correct_answer)
  const [tamanhoDasRespostas, setTamanhoDasRespostas]= useState(quiz.question_possibility.length)

    
  
  
  const handleNextQuestion = (respostaCorreta) => {
    //ver se a pergunta esta correta 
    if (respostaCorreta === quiz.question_possibility[incre].answers){
      setScore(score + 1);
    }
    if(incre < respostas.length){
    //incrementador para passar a proxima pergunta
    setIncre(incre + 1);
    }else{
      setShowScore(true);
    }
    
  }
  
  return loading ? (
    <Spinner />
  ) : (
      <div className='app'>
    
    {startQuiz ? (<div>
      {showScore ? (
          <div className='score-section'>
            Fizeste {score} Pontos
          </div>
        ) : (
          <>
            <div className='question-section'>
              <div className='question-count'>
                <span>Pergunta {incre +1} / {tamanhoDasRespostas} </span>
              </div>
              
              <div className='question-text'>Titulo:
              </div>
            </div>
            <div className='answer-section'>
              {respostas.answers.map((_id)=> (
                <button
                className='buttonAnswer'
                onClick={()=> handleNextQuestion(_id)}
                key={_id}
              >
                {_id}
              </button>
              ))}
              
              
            </div>
          </>
        )}
    </div>): (<div>
      <button className='buttonAnswer' onClick={() => setStartQuiz(true)}> start Quiz </button>
    </div>)}
        
      </div>
    
    
  );


};

QuizAnswer.propTypes = {
  quiz: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  quiz: state.quiz,
});

export default connect(mapStateToProps, {})(QuizAnswer);
