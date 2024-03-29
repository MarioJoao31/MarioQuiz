import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Formik, useField, Form } from "formik";
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

const QuizPR = ({ id, addQuizQuestionsAnswers }) => {
  
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
          .required("Falta o titulo!"),
        correct_answer: Yup.string()
          .min(1, "No minimo tem de ter 1 caractere")
          .max(150, "So pode ter no maximo 150 caracteres"),
        answer1: Yup.string()
          .min(1, "No minimo tem de ter 1 caractere")
          .max(150, "So pode ter no maximo 150 caracteres")
          .required("Falta a resposta numero 1!"),
        answer2: Yup.string()
          .min(1, "No minimo tem de ter 1 caractere")
          .max(150, "So pode ter no maximo 150 caracteres")
          .required("Falta a resposta numero 2"),
        answer3: Yup.string()
          .min(1, "No minimo tem de ter 1 caractere")
          .max(150, "So pode ter no maximo 150 caracteres")
          .required("Falta a resposta numero 3"),
        
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          alert(JSON.stringify("Adicionado no Quiz com sucesso!", null, 2));

          resetForm();
          setSubmitting(false);
        });

        //atribui os valores para as variaveis usando a libraria formik
        const title_question = values.title_question;
        const answers = [];
        const correct_answer = values.correct_answer;

        //passar valor atraves do radio group button

        console.log("picado:", correct_answer);

      

        //insere as opções no array de respostas
        answers.push(
          values.answer1,
          values.answer2,
          values.answer3,
          values.correct_answer
        );
        //transforma o array num objecto
        Object.assign({}, answers);
        console.log(title_question, correct_answer, answers);

        await addQuizQuestionsAnswers(id, {
          title_question,
          correct_answer,
          answers,
        });
      }}
    >
      {(props) => (
        <Form>
          <br />
          <h1>Insere agora as tuas perguntas </h1>
          <CustomTextInput
            className="inputSexy"
            label="Titulo da pergunta"
            name="title_question"
            type="text"
            placeholder="Pergunta"
          />

          <div className="inline-flex space-x-4 md:inline-flex">
            <CustomTextInput
              className="inputSexy flex-1 "
              label="Resposta-1"
              key="1"
              name="answer1"
              type="text"
              placeholder="Resposta falsa"
            />
            
          </div>

          <div className="inline-flex space-x-4 md:inline-flex">
            <CustomTextInput
              className="inputSexy flex-1"
              label="Resposta-2"
              key="2"
              name="answer2"
              type="text"
              placeholder="Resposta falsa"
            />
           
          </div>

          <div className="inline-flex space-x-4 md:inline-flex">
            <CustomTextInput
              className="inputSexy flex-1"
              label="Resposta-3"
              key="3"
              name="answer3"
              type="text"
              placeholder="Resposta falsa"
            />
           
          </div>

          <div className="inline-flex space-x-4 md:inline-flex">
            <CustomTextInput
              className="inputSexy flex-1"
              label="Resposta-4"
              name="correct_answer"
              type="text"
              placeholder="Resposta correta"
            />
            
          </div>
          <br />

          <button className="buttonSexy" type="submit">
            {props.isSubmitting ? "loading..." : "Introduzir Pergunta"}{" "}
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
