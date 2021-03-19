import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { addLike, removeLike } from "../../actions/quiz";
// TODO:TEnho de adicionar a as funcoes onClick para like e dislike
//

const QuizItem = ({
  addLike,
  removeLike,
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
      <a href='profile.html'>
        <img className='round-img' src={avatar} alt='' />
        <h4>{title}</h4>
      </a>
    </div>

    <div>
      <p className='my-1'>{category}</p>
      <p className='post-date'>
        Feito no dia <Moment format='DD/MM/YYYY'>{upload_at}</Moment>
      </p>

      <button type='button' className='btn btn-light'>
        <i className='fas fa-thumbs-up'></i>
        <span> {likes.length > 0 && <span>{likes.length}</span>}</span>
      </button>

      <button type='button' className='btn btn-light'>
        <i className='fas fa-thumbs-down'></i>
      </button>

      <Link to={`/quizes/${_id}`} className='btn btn-primary'>
        Comentarios{" "}
        {comments.length > 0 && (
          <span className='comment-count'>{comments.length}</span>
        )}
      </Link>

      {!auth.loading && user === auth.user._id && (
        <button type='button' className='btn btn-danger'>
          <i className='fas fa-times'></i>
        </button>
      )}
    </div>
  </div>
);

QuizItem.propTypes = {
  quiz: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike })(QuizItem);
