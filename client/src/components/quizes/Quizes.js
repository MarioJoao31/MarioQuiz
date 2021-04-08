import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { getQuizes } from "../../actions/quiz";
import { connect } from "react-redux";
import QuizItem from "./QuizItem";
import QuizForm from "./QuizForm";

const Quizes = ({ getQuizes, quiz: { quizes, loading } }) => { 

  const [showInput, setShowInput]=useState(false)

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
      <button onClick={(e) => setShowInput(!showInput) } className="btn btn-dark"> {showInput?("Não fazer quiz"):("Criar quiz")}</button>
      <QuizForm showInput={showInput} />
      <div className='posts'>
        {quizes.map((quiz) => (
          <QuizItem key={quiz._id} quiz={quiz} showActions={true} />
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
