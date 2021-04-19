import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { produce } from "immer";

import { getQuizes } from "../../actions/quiz";
import { addQuiz, addQuizQuestionsAnswers } from "../../actions/quiz";

/* MENUUUU DE CATEGORIA */

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

/* FIM DE MENUUUU DE CATEGORIA */
//TODO:Adicionar .map() para adicionar que uma resposta, e adicionar

const QuizForm = ({
  addQuiz,
  addQuizQuestionsAnswers,
  showInput,
  quiz: { quizes },
}) => {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");
  const [addPergunta, setaddPergunta] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const id = await addQuiz({
      title,
      difficulty,
      category,
    });
    await addQuizQuestionsAnswers(id, {
      todasAnswers,
      todasTitle_question,
      todasCorrect_answer,
    });
  };

  // INPUT FIELDS PARA ESTA MERDA FICAR BEM SEPARADO
  const [todasAnswers,setTodasAnswers]= useState([])
  const [todasTitle_question,setTodasTitle_question]= useState([])
  const [todasCorrect_answer,setTodasCorrect_answer]= useState([])
  const [title_question, setTitle_question] = useState("");
  const [answers, setAnswers] = useState("");
  const [correct_answer, setCorrect_answer] = useState("");

  const [inputFields, setInputFields] = useState([
    { answers: "", title_question: "", correct_answer: "" },
  ]);

  // setTodasAnswers(todasAnswers.push(answers[index]));
  // setTodasTitle_question(todasTitle_question.push(title_question[index]));
  // setTodasCorrect_answer(todasCorrect_answer.push(correct_answer[index]));
  
  const handleChangeInput = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setAnswers(values[index].answers);
    setTitle_question(values[index].title_question);
    setCorrect_answer(values[index].correct_answer);
    setInputFields(values);
    
    
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("InputFields", inputFields);
  };


  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { answers: "", title_question: "", correct_answer: "" },
    ]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  console.log(answers, title_question, correct_answer);

  //TODO: tenho de arranjar uma paneira de inserir um array na db porque so esta a passar um objeto e eu queria passar mais que um 

  return (
    <Fragment>
      {showInput && (
        <div className="contact-us">
          <form id="submeter" type="submit" onSubmit={(e) => onSubmit(e)}>
            <input
              className="inputSexy"
              placeholder="Titulo do Quiz"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="inputSexy"
              placeholder="Categoria do Quiz"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <div className="field">
              <ul className="options-grid">
                <li className="option">
                  <input
                    className="option-input"
                    id="0"
                    name="option"
                    type="radio"
                    value={difficulty}
                    onChange={(e) => setDifficulty("Fácil")}
                  />
                  <label className="option-label" htmlFor="0">
                    Fácil
                  </label>
                </li>
                <li className="option">
                  <input
                    className="option-input"
                    id="1"
                    name="option"
                    type="radio"
                    value={difficulty}
                    onChange={(e) => setDifficulty("Médio")}
                  />
                  <label className="option-label" htmlFor="1">
                    Médio
                  </label>
                </li>
                <li className="option">
                  <input
                    className="option-input"
                    id="2"
                    name="option"
                    type="radio"
                    value={difficulty}
                    onChange={(e) => setDifficulty("Difícil")}
                  />
                  <label className="option-label" htmlFor="2">
                    Difícil
                  </label>
                </li>
              </ul>
            </div>
            <br />
            <span
              className="buttonSexy"
              onClick={() => setaddPergunta(!addPergunta)}
            >
              Adicionar Pergunta com respostas
            </span>
            <br />

            <button className="buttonSexy" type="submit" value="Postar">
              Criar Quiz
            </button>
            <br />
          </form>

          <form onSubmit={handleSubmit} >
            TESTE
            {inputFields.map((inputField, index) => (
              <div key={index}>
                <input
                  className="inputSexy"
                  name="title_question"
                  placeholder="Titulo"
                  value={inputField.title_question}
                  onChange={(event) => handleChangeInput(index, event)}
                ></input>
                <input
                  className="inputSexy"
                  name="answers"
                  placeholder="resposta"
                  value={inputField.answers}
                  onChange={(event) => handleChangeInput(index, event)}
                />
                <input
                  className="inputSexy"
                  name="correct_answer"
                  placeholder="resposta correta "
                  value={inputField.correct_answer}
                  onChange={(event) => handleChangeInput(index, event)}
                />

                <button onClick={() => handleAddFields()} >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 "
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button onClick={() => handleRemoveFields(index)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                
              </div>
            ))}
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
  quiz: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  quiz: state.quiz,
});

export default connect(mapStateToProps, { addQuiz, addQuizQuestionsAnswers })(
  QuizForm
);
