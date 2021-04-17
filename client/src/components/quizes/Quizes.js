import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { getQuizes } from "../../actions/quiz";
import { connect } from "react-redux";
import QuizItem from "./QuizItem";
import QuizForm from "./QuizForm";


const Quizes = ({ getQuizes, quiz: { quizes, loading } }) => {
  const [showInput, setShowInput] = useState(false);

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
      <button
        onClick={(e) => setShowInput(!showInput)}
        className='btn btn-dark'
      >
        {" "}
        {showInput ? "Não fazer quiz" : "Criar quiz"}
      </button>
      <QuizForm showInput={showInput} />
      <br/>
      <div className='flex-1 max-w-4xl mx-auto p-10 '>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8 "> 
        {quizes.map((quiz) => (
          <QuizItem key={quiz._id} quiz={quiz} showActions={true} />
        ))}
        </div>
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
