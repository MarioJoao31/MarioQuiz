import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";

const QuizAnswer = ({ quiz: { quiz, loading } }, props) => {
  //TODO: Variaveis para o quiz funcionar e randomizar as respostas

  const [iQuestion, setiQuestion] = useState(0);

  const [allAnswers, setallAnswers] = useState(
    quiz.question_possibility[iQuestion].answers
  );

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div id='quizzie'>
        <ul className='quiz-step step1 current'>
          <li className='question'>
            <div className='question-wrap'>
              <h2>{quiz.question_possibility[iQuestion].title_question}</h2>
            </div>
          </li>
          {allAnswers.map((answer) => (
            <li className='quiz-answer high-value' data-quizindex='4' key={answer}>
              <div className='answer-wrap'>
                <p className='answer-text' >{answer}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

//QuizAnswer.defaultProps = { iQuestion: 0 };

QuizAnswer.propTypes = {
  quiz: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  quiz: state.quiz,
});

export default connect(mapStateToProps)(QuizAnswer);
