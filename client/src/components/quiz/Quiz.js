import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "../quizes/QuizItem";
import { getQuiz } from "../../actions/quiz";

const Quiz = ({ getQuiz, quiz: { quiz, loading }, match }) => {
  useEffect(() => {
    getQuiz(match.params.id);
  }, [getQuiz, match.params.id]);

  return loading || quiz === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/quizes' className='btn alert-primary my-1'>
        Voltar
      </Link>
      <br />
      <PostItem quiz={quiz} showActions={false} showQuestions={true}/>
    </Fragment>
  );
};

Quiz.propTypes = {
  getQuiz: PropTypes.func.isRequired,
  quiz: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  quiz: state.quiz,
});

export default connect(mapStateToProps, { getQuiz })(Quiz);
