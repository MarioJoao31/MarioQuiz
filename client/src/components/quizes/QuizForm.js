import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addQuiz, addQuizQuestionsAnswers } from "../../actions/quiz";
import { ADD_QUIZ_QUESTIONSANSWER } from "../../actions/types";

/* MENUUUU DE CATEGORIA */

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

/* FIM DE MENUUUU DE CATEGORIA */

const QuizForm = ({ addQuiz,addQuizQuestionsAnswers, showInput }) => {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");
  const [title_question, setTitle_question] = useState("");
  const [correct_answer, setCorrect_answer] = useState("");
  const [answers, setAnswers] = useState("");
  const [addPergunta, setaddPergunta] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const id = await addQuiz({
      title,
      difficulty,
      category,
    });
    await addQuizQuestionsAnswers(id, {
      title_question,
      correct_answer,
      answers,
    })
    
  };

  return (
    <Fragment>
      {showInput && (
        <div className='contact-us'>
          <form id='submeter' onSubmit={(e) => onSubmit(e)}>
            <input
              className='inputSexy'
              placeholder='Titulo do Quiz'
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className='inputSexy'
              placeholder='Categoria do Quiz'
              type='text'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <div className='field'>
              <ul className='options-grid'>
                <li className='option'>
                  <input
                    className='option-input'
                    id='0'
                    name='option'
                    type='radio'
                    value={difficulty}
                    onChange={(e) => setDifficulty("Fácil")}
                  />
                  <label className='option-label' htmlFor='0'>
                    Fácil
                  </label>
                </li>
                <li className='option'>
                  <input
                    className='option-input'
                    id='1'
                    name='option'
                    type='radio'
                    value={difficulty}
                    onChange={(e) => setDifficulty("Médio")}
                  />
                  <label className='option-label' htmlFor='1'>
                    Médio
                  </label>
                </li>
                <li className='option'>
                  <input
                    className='option-input'
                    id='2'
                    name='option'
                    type='radio'
                    value={difficulty}
                    onChange={(e) => setDifficulty("Difícil")}
                  />
                  <label className='option-label' htmlFor='2'>
                    Difícil
                  </label>
                </li>
              </ul>
            </div>
            <br />
            <span
              className='buttonSexy'
              onClick={() => setaddPergunta(!addPergunta)}
            >
              Adicionar Pergunta com respostas
            </span>

            <br />

            {addPergunta && (
              <Fragment>
                <input
                  className='inputSexy'
                  placeholder='Pergunta'
                  required=''
                  type='text'
                  value={title_question}
                  onChange={(e) => setTitle_question(e.target.value)}
                ></input>

                <input
                  className='inputSexy'
                  placeholder='Resposta'
                  required=''
                  type='text'
                  value={correct_answer}
                  onChange={(e) => setCorrect_answer(e.target.value)}
                ></input>
                <input
                  className='inputSexy'
                  placeholder='Resposta'
                  required=''
                  type='text'
                  value={answers}
                  onChange={(e) => setAnswers(e.target.value)}
                ></input>
              </Fragment>
            )}

            <button className='buttonSexy' type='submit' value='Postar'>
              Criar
            </button>
          </form>
        </div>
      )}
    </Fragment>
  );
};

QuizForm.defaultProps = { showInput: false };

QuizForm.propTypes = {
  addQuiz: PropTypes.func.isRequired,
  addQuizQuestionsAnswers: PropTypes.func.isRequired,
};

export default connect(null, { addQuiz, addQuizQuestionsAnswers })(QuizForm);
