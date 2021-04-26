import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";


import Moment from "react-moment";
import { addLike, removeLike, deleteQuiz } from "../../actions/quiz";
import QuizAnswer from "./QuizAnswer";


//const likeslength= likes.length


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
    question_possibility,
    upload_at,
  },
  showActions,
  showQuestions,
}) => (
<div className="bg-gray-100  rounded overflow-hidden shadow">
    <div className="">
      <div>
        <div className=" ">
          <Link to={`/profile/${user}`}>
            <img className="round-img2 w-20" src={avatar} alt="" />
            <h4 className="">{name}</h4>
          </Link>
        </div>

        <div>
          <div className="font-bold">Título: {title}</div>

          <p className="ml">
            <b>Categoria / Dificuldade</b>: {category} / {difficulty}
          </p>

          <p className="post-date">
            Feito no dia <Moment format="DD/MM/YYYY">{upload_at}</Moment>
          </p>
        </div>

        {showActions && (
          <Fragment>
            <button
              onClick={() => addLike(_id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-up" />{" "}
              <span>
                {likes && likes.length > 0 && <span>{likes.length}</span>}
              </span>
            </button>

            <button
              onClick={() => removeLike(_id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-down" />
            </button>

            <Link to={`/quizes/${_id}`} className="btn btn-primary">
              Fazer Quiz
            </Link>

            {!auth.loading && user === auth.user._id && (
              <button
                onClick={(e) => deleteQuiz(_id)}
                type="button"
                className="btn btn-danger"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
      {showQuestions && (
        <Fragment>
          <QuizAnswer key={_id} />
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
