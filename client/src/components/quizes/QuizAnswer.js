import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";

const QuizAnswer = ({ quiz: { quiz, loading } }) => {
  //TODO: Ainda não implementei a função para comparar a string para ver se a opção é a certa ou não !!

  const [startQuiz, setStartQuiz] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [incre, setIncre] = useState(0);



  const handleNextQuestion = (respostaclicada) => {
    
    //ver se a pergunta esta correta
    if (respostaclicada === quiz.question_possibility[incre].correct_answer) {
      setScore(score + 1);
      
    }

    

    const tam = quiz.question_possibility.length - 1;
    
    //incrementador para passar a proxima pergunta se for maior mostra o score
    if (!(incre === tam)) {
      
      setIncre(incre + 1);
    } else {
      setShowScore(true);
    }
  };

  

  return loading ? (
    <Spinner />
  ) : (
    <div className="app">
      {startQuiz ? (
        <div>
          {showScore ? (
            <div className="score-section">Fizeste {score} Pontos</div>
          ) : (
            <>
              <div className="question-section">
              
                <div className="question-count">
                  <span>
                    Pergunta {incre + 1} / {quiz.question_possibility.length}
                  </span>
                </div>

                <div className="question-text">Pergunta: {quiz.question_possibility[incre].title_question}</div>
              </div>
              <div className="answer-section">
                {quiz.question_possibility[incre].answers.map((_id) => (
                  <button
                    className="buttonAnswer"
                    onClick={() => handleNextQuestion(_id)}
                    key={_id}
                  >
                    
                    {_id}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <div>
          <button className="buttonAnswer" onClick={() => setStartQuiz(true)}>
            {" "}
            start Quiz{" "}
          </button>
        </div>
      )}
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
