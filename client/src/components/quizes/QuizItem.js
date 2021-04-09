import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Moment from "react-moment";
import { addLike, removeLike, deleteQuiz } from "../../actions/quiz";

const QuizItem = ({
  addLike,
  removeLike,
  deleteQuiz,
  auth,
  quiz: {
    _id,
    user,
    name,
    avatar,
    title,
    category,
    difficulty,
    question_possibility: { correct_answer, incorrect_answer },
    likes,
    comments,
    upload_at,
  },
  showActions,
  showQuestions,
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <img className='round-img2' src={avatar} alt='' />
        <h4>{name}</h4>
      </Link>
    </div>

    <div>
      <div className='text-5xl text-white font-bold mx-auto max-w-6xl flex items-center justify-center'>
        <span className=' text-transparent bg-gradient-to-r bg-clip-text from-blue-500 to-green-500'>
          {title}
        </span>
      </div>
      <p className='my-1'>{category}</p>
      <p className='my-1'>{difficulty}</p>
      <p className='post-date'>
        Feito no dia <Moment format='DD/MM/YYYY'>{upload_at}</Moment>
      </p>

      {showQuestions && (
        <Fragment>
          <div id='quizzie'>
            <h1>What Type Of Thing Are You?</h1>
            <ul class='quiz-step step1 current'>
              <li class='question'>
                <div class='question-wrap'>
                  <h2>Question #1: Are you more...</h2>
                </div>
              </li>
              <li class='quiz-answer low-value' data-quizIndex='2'>
                <div class='answer-wrap'>
                  <p class='answer-text'>This Thing</p>
                </div>
              </li>
              <li class='quiz-answer high-value' data-quizIndex='4'>
                <div class='answer-wrap'>
                  <p class='answer-text'>That Thing</p>
                </div>
              </li>
            </ul>
          </div>
        </Fragment>
      )}

      {showActions && (
        <Fragment>
          <button
            onClick={() => addLike(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-up' />{" "}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>

          <button
            onClick={() => removeLike(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-down' />
          </button>

          <Link to={`/quizes/${_id}`} className='btn btn-primary'>
            Fazer Quiz
          </Link>

          {!auth.loading && user === auth.user._id && (
            <button
              onClick={(e) => deleteQuiz(_id)}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-times'></i>
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

QuizItem.defaultProps = { showActions: true };
QuizItem.defaultProps = { showQuestions: false };

QuizItem.propTypes = {
  quiz: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deleteQuiz: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deleteQuiz })(
  QuizItem
);
