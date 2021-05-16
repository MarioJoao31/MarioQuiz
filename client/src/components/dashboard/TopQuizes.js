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

    upload_at,
  },
  showActions,
  showQuestions,
}) => (
  <div className=" block rounded my-2 px-2 w-full overflow-hidden sm:my-1 sm:px-1 sm:w-1/4 md:w-1/2 lg:w-1/4 xl:w-1/4 ">

    <div className="bg-white rounded px-4 py-4 flex flex-col justify-between leading-normal shadow">
    <div className="flex mt-3">
      <Link to={`/profile/${user}`}>
        <img
          className="rh-10 w-10 rounded-full mr-2 object-cover"
          src={avatar}
          alt=""
        />
        <div>
          <p className="font-semibold text-gray-700 text-sm capitalize">
            {name}
          </p>
          <p className="font-semibold text-gray-700 text-sm capitalize">
            {category} / {difficulty}
          </p>
        </div>
      </Link>
    </div>

    <div>
      <Link to={`/profile/${user}`}></Link>
    </div>
    <div>
      <div className="mt-3 md:mt-0 text-gray-700 font-bold text-3xl mb-2">
        {title}
      </div>
    </div>
    <p>
      <Moment format="DD/MM/YYYY">{upload_at}</Moment>
    </p>
    <Link to={`/quizes/${_id}`} className="">
      <p className="btn btn-primary">
        Fazer Quiz
        <i className=" fas fa-long-arrow-alt-right"></i>
      </p>
    </Link>
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
