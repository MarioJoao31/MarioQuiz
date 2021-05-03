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
        picked: ""
      }}
      validationSchema={Yup.object({
        title_question: Yup.string()
          .min(5, "Tem de ter mais de 5 caracteres ")
          .max(150, "Não pode ultrapaçar do 150 caracteres")
          .required("Falta o titulo!"),
        correct_answer: Yup.string()
          .min(1, "No minimo tem de ter 1 caractere")
          .max(150, "So pode ter no maximo 150 caracteres")
          ,
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
          answer4: Yup.string()
          .min(1, "No minimo tem de ter 1 caractere")
          .max(150, "So pode ter no maximo 150 caracteres")
          .required("Falta a resposta numero 4"),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          alert(JSON.stringify("Adicionado no Quiz com sucesso!", null, 2));

          resetForm();
          setSubmitting(false);
        }, 1000);
   

        //atribui os valores para as variaveis usando a libraria formik
        const title_question = values.title_question;
         const correct_answer = values.answer1;
        const answers = [];
        
       //passar valor atraves do radio group button 
       
       if(values.picked === "resposta1"){
         values.correct_answer= values.answer1
       }
       if(values.picked === "resposta2"){
         values.correct_answer= values.answer2
       }
       if(values.picked === "resposta3"){
        values.correct_answer= values.answer3
      }
      if(values.picked === "resposta4"){
        values.correct_answer= values.answer4
      }
  

        //insere as opções no array de respostas 
        answers.push(correct_answer,values.answer1 ,values.answer2 , values.answer3 , values.answer4)
        //transforma o array num objecto
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
          className="inputSexy"
            label="Titulo da pergunta"
            name="title_question"
            type="text"
            placeholder="Pergunta"
          />


          <div >
          <CustomTextInput
          className="inputSexy"
            label="Resposta-1"
            name="answer1"
            type="text"
            placeholder="Resposta1"
          />
          <label>
              <Field type="radio" name="picked" value="resposta1"/>
              Resposta Correta
            </label>
            </div>

          <CustomTextInput
          className="inputSexy"
            label="Resposta-2"
            name="answer2"
            type="text"
            placeholder="Resposta2"
          />
          <label>
              <Field type="radio" name="picked" value="resposta2" />
              Resposta Correta
            </label>

          <CustomTextInput
          className="inputSexy"
            label="Resposta-3"
            name="answer3"
            type="text"
            placeholder="Resposta3"
          />
          <label>
              <Field type="radio" name="picked" value="resposta3" />
              Resposta Correta
            </label>

          <CustomTextInput
          className="inputSexy"
            label="Resposta-4"
            name="answer4"
            type="text"
            placeholder="Resposta4"
          />
          <label>
              <Field type="radio" name="picked" value="resposta4" />
              Resposta Correta
            </label>

             <br/>

          <button
          className="buttonSexy"
          type="submit">
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
