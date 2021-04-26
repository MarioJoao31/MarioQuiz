import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";

import { addQuiz } from "../../actions/quiz";
import QuizPR from "./QuizPR";

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
  showInput,
  quiz: { quizes },
  id,
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      category: "",
    },
  });
  const [difficulty, setDifficulty] = useState("");
  const [_id, set_Id] = useState("");
  const [showAnswers, setShowAnswers] = useState(false);

  const onSubmit = async (data) => {
    const title1 = data.title;
    const category1 = data.category;
    const body = JSON.stringify({
      title: title1,
      category: category1,
      difficulty,
    });

    set_Id(await addQuiz(body));
  };

  return (
    <Fragment>
      {showInput && (
        <div className="contact-us">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="inputSexy"
              placeholder="Titulo do Quiz"
              {...register("title")}
            />
            <input
              className="inputSexy"
              placeholder="Categoria do Quiz"
              type="text"
              name="categoriaQuiz"
              {...register("category")}
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

            <button
              className="buttonSexy"
              type="submit"
              onClick={(e) => setShowAnswers(!showAnswers)} 
            >
              {" "}
              Criar Quiz
            </button>
          </form>
          
          {showAnswers && ( <QuizPR id={_id} showAnswers={false} />)}
         
        </div>
      )}
    </Fragment>
  );
};

QuizForm.defaultProps = { showInput: false };
QuizForm.defaultProps = { showAnswers: false };

QuizForm.propTypes = {
  addQuiz: PropTypes.func.isRequired,
  quiz: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  quiz: state.quiz,
});

export default connect(mapStateToProps, { addQuiz })(
  QuizForm
);
