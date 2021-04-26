import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Field, FieldArray, FieldProps, Form, Formik, getIn } from "formik";
import * as Yup from "yup";
import { addQuizQuestionsAnswers } from "../../actions/quiz";

const QuizPR = (id, addQuizQuestionsAnswers) => {

    
    <Formik initialValues={{
        title_question : "",
        correct_answer: "",
        answers: ""

    }}
    validationSchema={Yup.Object({
        title_question: Yup.string()
        .min(5, "Tem de ter mais de 5 caracteres ")
        .max(150,"Não pode ultrapaçar do 150 caracteres")
        .required("Required"),
        correct_answer: Yup.Object()
        .min(1, "No minimo tem de ter 1 caractere")
        .max(150,"So pode ter no maximo 150 caracteres")
        .required('Required'),
        answers: Yup.Object()
        .min(1, "No minimo tem de ter 1 caractere")
        .max(150,"So pode ter no maximo 150 caracteres")
        .required('Required')
    })}
    >
        
    </Formik>

  

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <div className="card m-3">
                <h5 className="card-header">React Dynamic Form Example with React Hook Form</h5>
                <div className="card-body border-bottom">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Number of Tickets</label>
                            <select name="numberOfTickets" ref={register} >
                                {['',1,2,3,4,5,6,7,8,9,10].map(i => 
                                    <option key={i} value={i}>{i}</option>
                                )}
                            </select>
                            
                        </div>
                    </div>
                </div>
                {ticketNumbers().map(i => (
                    <div key={i} className="list-group list-group-flush">
                        <div className="list-group-item">
                            <h5 className="card-title">Ticket {i + 1}</h5>
                            <div className="form-row">
                                <div className="form-group col-6">
                                    <label>Name</label>
                                    <input name={`tickets[${i}]name`} ref={register} type="text" className={`form-control ${errors.tickets?.[i]?.name ? 'is-invalid' : '' }`} />
                                    <div className="invalid-feedback">{errors.tickets?.[i]?.name?.message}</div>
                                </div>
                                <div className="form-group col-6">
                                    <label>Email</label>
                                    <input name={`tickets[${i}]email`} ref={register} type="text" className={`form-control ${errors.tickets?.[i]?.email ? 'is-invalid' : '' }`} />
                                    <div className="invalid-feedback">{errors.tickets?.[i]?.email?.message}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="card-footer text-center border-top-0">
                    <button type="submit" className="btn btn-primary mr-1">
                        Buy Tickets
                    </button>
                    <button className="btn btn-secondary mr-1" type="reset">Reset</button>
                </div>
            </div>
        </form>
    </Fragment>
  );
};

QuizPR.propTypes = {
  addQuizQuestionsAnswers: PropTypes.func.isRequired,
};

export default connect(null, { addQuizQuestionsAnswers })(QuizPR);
