import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Moment from "react-moment";
import { addLike, removeLike, deleteQuiz } from "../../actions/quiz";
import QuizAnswer from "../quizes/QuizAnswer";

const TopQuizes = ({
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
  <div>
    <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
      <h3 class="tracking-widest text-red-500 text-xs font-medium title-font">
        {category} / {difficulty}
      </h3>
      <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font ">
        {title}
      </h2>
      <p className="ml">
        <p>
          <Moment format="DD/MM/YYYY">{upload_at}</Moment>
        </p>
      </p>
      
    </div>

    <div>
      <div>
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

            <a className="text-red-500 inline-flex items-center">
        Learn More
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          className="w-4 h-4 ml-2"
          viewBox="0 0 24 24"
        >
          
        </svg>
      </a>
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

TopQuizes.defaultProps = { showActions: true };
TopQuizes.defaultProps = { showQuestions: false };

TopQuizes.propTypes = {
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
  TopQuizes
);
