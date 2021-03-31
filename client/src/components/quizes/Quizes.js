import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { getQuizes } from "../../actions/quiz";
import { connect } from "react-redux";
import QuizItem from "./QuizItem";
import QuizForm from "./QuizForm";

const Quizes = ({ getQuizes, quiz: { quizes, loading } }) => {
  useEffect(() => {
    getQuizes();
  }, [getQuizes]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Quizes</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Bem vindo ao Quizes
      </p>
      <QuizForm />
      <div className='posts'>
        {quizes.map((quiz) => (
          <QuizItem key={quiz._id} quiz={quiz} />
        ))}
      </div>
    </Fragment>
  );
};

Quizes.propTypes = {
  getQuizes: PropTypes.func.isRequired,
  quiz: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  quiz: state.quiz,
});

export default connect(mapStateToProps, { getQuizes })(Quizes);
