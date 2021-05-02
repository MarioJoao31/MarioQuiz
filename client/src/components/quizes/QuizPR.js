import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Field, Formik, useField, Form } from "formik";
import * as Yup from "yup";
import { addQuizQuestionsAnswers } from "../../actions/quiz";

const CustomTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.title_question}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error"> {meta.error}</div>
      ) : null}
    </>
  );
};

const QuizPR = ({id, addQuizQuestionsAnswers}) => {
  return (
    <Formik
      initialValues={{
        title_question: "",
        correct_answer: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
      }}
      validationSchema={Yup.object({
        title_question: Yup.string()
          .min(5, "Tem de ter mais de 5 caracteres ")
          .max(150, "Não pode ultrapaçar do 150 caracteres")
          .required("Required"),
        correct_answer: Yup.string()
          .min(1, "No minimo tem de ter 1 caractere")
          .max(150, "So pode ter no maximo 150 caracteres")
          .required("Required"),
        answer1: Yup.string()
          .min(1, "No minimo tem de ter 1 caractere")
          .max(150, "So pode ter no maximo 150 caracteres")
          .required("Required"),
          answer2: Yup.string()
          .min(1, "No minimo tem de ter 1 caractere")
          .max(150, "So pode ter no maximo 150 caracteres")
          .required("Required"),
          answer3: Yup.string()
          .min(1, "No minimo tem de ter 1 caractere")
          .max(150, "So pode ter no maximo 150 caracteres")
          .required("Required"),
          answer4: Yup.string()
          .min(1, "No minimo tem de ter 1 caractere")
          .max(150, "So pode ter no maximo 150 caracteres")
          .required("Required"),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          alert(JSON.stringify("Adicionado no Quiz com sucesso!", null, 2));

          resetForm();
          setSubmitting(false);
        }, 1000);

        // tentativa de adicionar o correct no answers

        /*
        <CustomTextInput
            label="correct_answer"
            name="correct_answer"
            type="text"
            placeholder="MOM"
          />
          */

        const title_question = values.title_question;
         const correct_answer = values.correct_answer;
        const answers = [] ;
        answers.push(correct_answer,values.answer1 ,values.answer2 , values.answer3 , values.answer4)
        Object.assign({}, answers);
        console.log(title_question, correct_answer, answers );

        await addQuizQuestionsAnswers(id, {
          title_question,
          correct_answer,
          answers,
        });
      }}
    >
      {(props) => (
        <Form>
          <br/>
          <h1>Insere agora as tuas perguntas </h1>
          <CustomTextInput
            label="title_question"
            name="title_question"
            type="text"
            placeholder="Pergunta"
          />
          
          
          <CustomTextInput
            label="answer1"
            name="answer1"
            type="text"
            placeholder="Resposta1"
          />
          <label>
              <Field type="radio" name="picked" value={props.answer1} />
              Resposta Correta
            </label>
          <CustomTextInput
            label="answer2"
            name="answer2"
            type="text"
            placeholder="Resposta2"
          />
          <label>
              <Field type="radio" name="picked" value={props.answer2} />
              Resposta Correta
            </label>
          <CustomTextInput
            label="answer3"
            name="answer3"
            type="text"
            placeholder="Resposta3"
          />
          <label>
              <Field type="radio" name="picked" value={props.answer3} />
              Resposta Correta
            </label>
          <CustomTextInput
            label="answer4"
            name="answer4"
            type="text"
            placeholder="Resposta4"
          />
          <label>
              <Field type="radio" name="picked" value={props.answer4} />
              Resposta Correta
            </label>
          <button type="submit">
            {props.isSubmitting ? "loading..." : "Submit"}{" "}
          </button>
        </Form>
      )}
    </Formik>
  );
};

QuizPR.propTypes = {
  addQuizQuestionsAnswers: PropTypes.func.isRequired,
};

export default connect(null, { addQuizQuestionsAnswers })(QuizPR);
