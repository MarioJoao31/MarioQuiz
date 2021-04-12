import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Moment from "react-moment";
import { addLike, removeLike, deleteQuiz } from "../../actions/quiz";
import QuizAnswer from './QuizAnswer';

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
      <div className='titulo'>Título: {title}</div>
      <div className='p-1'>
        <p className='ml'>
          <b>Categoria</b>: {category}
        </p>
        <p className='ml'>
          <b>Grau de dificuldade:</b> {difficulty}
        </p>
      </div>
      <p className='post-date'>
        Feito no dia <Moment format='DD/MM/YYYY'>{upload_at}</Moment>
      </p>

      {showQuestions && (
        <QuizAnswer/>
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
