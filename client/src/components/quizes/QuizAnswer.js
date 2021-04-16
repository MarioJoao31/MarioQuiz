import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";

const QuizAnswer = ({ quiz: { quiz, loading } }, props) => {
  //TODO: Variaveis para o quiz funcionar e randomizar as respostas

  
  const [increLength, setincreLength] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [startQuiz, setstartQuiz] = useState(false);

  const [QuestionLength, setQuestionLength] = useState(
    quiz.question_possibility
  );

  
 
  const [allAnswers, setallAnswers] = useState(
    quiz.question_possibility[currentQuestion].answers,
  );
  const [correctAnswer, setcorretAnswer] = useState(
    quiz.question_possibility[currentQuestion].correct_answer
  );

  
  // Separação

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect === quiz.question_possibility[currentQuestion].correct_answer) {
      setScore(score + 1);
    }

    
    if (currentQuestion < allAnswers.length) {
      let respostas = quiz.question_possibility[currentQuestion].answers
      setCurrentQuestion(currentQuestion + 1);
      console.log(respostas);
      return respostas;
    } else {
      setShowScore(true);
    }
  };

  console.log(allAnswers.map((fuck)=>(console.log(fuck))));

  return loading ? (
    <Spinner />
  ) : (
      <div className='app'>
    
    {startQuiz ? (<div>
      {showScore ? (
          <div className='score-section'>
            Fizeste {score} de {QuestionLength.length} Pontos
          </div>
        ) : (
          <>
            <div className='question-section'>
              <div className='question-count'>
                <span>Question {currentQuestion }</span>/
                {QuestionLength.length}
              </div>
              
              <div className='question-text'>{quiz.question_possibility[currentQuestion].title_question}
              </div>
            </div>
            <div className='answer-section'>
              
              {
              allAnswers.map((answerOption) => (
                <button
                  className='buttonAnswer'
                  onClick={() => handleAnswerOptionClick(answerOption)}
                  key={answerOption}
                >
                  {answerOption}
                </button>
              ))}
              
            </div>
          </>
        )}
    </div>): (<div>
      <button className='buttonAnswer' onClick={() => setstartQuiz(true) }> start Quiz </button>
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
