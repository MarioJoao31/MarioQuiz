import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deleteQuiz } from "../../actions/quiz";
// TODO:TEnho de adicionar a as funcoes onClick para like e dislike
//

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
    question_possibility,
    likes,
    comments,
    upload_at,
  },
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <img className='round-img' src={avatar} alt='' />
        <h4>{name}</h4>
      </Link>
    </div>

    <div>
      <p className='my-1'>{title}</p>
      <p className='my-1'>{category}</p>
      <p className='post-date'>
        Feito no dia <Moment format='DD/MM/YYYY'>{upload_at}</Moment>
      </p>

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
          Comentarios{" "}
          {comments.length > 0 && (
            <span className='comment-count'>{comments.length}</span>
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
    </div>
  </div>
);

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
