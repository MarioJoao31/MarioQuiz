import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Moment from "react-moment";
import { addLike, removeLike, deleteQuiz } from "../../actions/quiz";
import Quiz from "../quiz/Quiz";

//TODO: tenho de fazer aqui a merda das perguntas, tenho de arranjar maneira de ir buscar as perguntas e maneira de como fazer o resultado. Ja vi um tutorial.

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
        <img className='round-img' src={avatar} alt='' />
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
          <div className='container3'>
            <div className=' bg-pink-400 text-white p-10 rounded-lg shadow-md'>
              <h2 className='text-2xl  m-2'>PERGUNTA BLABLABLAL</h2>
            </div>
            <div className='grid grid-cols-2 gap-6 mt-6'>
              <button
                type='button'
                className='bg-white p-4 text-purple-800 font-semibold rounded shadow mb-4 hover:bg-black-100 focus:outline-none'
              >
                Outline Button Outline ButtonOutline ButtonOutline ButtonOutline
                ButtonOutline Button Outline Button Outline ButtonOutline
                ButtonOutline ButtonOutline ButtonOutline Button
              </button>
              <button
                type='button'
                className='bg-white p-4 text-purple-800 font-semibold rounded shadow mb-4'
              >
                Outline
              </button>
            </div>
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
            Fazer Quiz{" "}
            {comments.length > 0 && (
              <span className='comment-count'>{comments.length} </span>
            )}
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
