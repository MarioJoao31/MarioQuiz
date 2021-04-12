import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const QuizAnswer = ({ quiz:{quiz}}) => {
    return (
        <Fragment>
          <div id='quizzie'>
            <h1>What Type Of Thing Are You?</h1>
            <ul class='quiz-step step1 current'>
              <li class='question'>
                <div class='question-wrap'>
                  <h2>{title_question}</h2>
                </div>
              </li>
              <li class='quiz-answer low-value' data-quizIndex='2'>
                <div class='answer-wrap'>
                  <p class='answer-text'>{correct_answer}</p>
                </div>
              </li>
              <li class='quiz-answer high-value' data-quizIndex='4'>
                <div class='answer-wrap'>
                  <p class='answer-text'>{incorrect_answer}</p>
                </div>
              </li>
            </ul>
          </div>
        </Fragment>
    )
}

QuizAnswer.propTypes = {

}

export default QuizAnswer
