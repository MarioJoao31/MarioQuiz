import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addQuiz } from "../../actions/quiz";

/* MENUUUU DE CATEGORIA */

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

/* FIM DE MENUUUU DE CATEGORIA */

const QuizForm = ({ addQuiz, showInput }) => {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");

  return (
    <Fragment>
      {showInput && (
        <div className='mb-4 md:flex md:flex-wrap space-between justify-center'>
          <form
            id='submeter'
            onSubmit={(e) => {
              e.preventDefault();
              addQuiz({ title, difficulty, category });
              setTitle("");
              setDifficulty("");
              setCategory("");
            }}
            className='mb-4 md:flex md:flex-wrap md:justify-between'
          >
            <div className="box"> 
              <div className='form__group'>
                <input
                  className=' form__input '
                  placeholder='Titulo do Quiz'
                  type='text'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
                <label for='name' className='form__label'>
                  Titulo do quiz
                </label>
              </div>
              <div className='form__group'>
                <input
                  className=' form__input '
                  placeholder='Categoria do Quiz'
                  type='text'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></input>
                <label for='name' className='form__label'>
                  Categoria do quiz
                </label>
              </div>

              <div class='relative inline-block  text-gray-700'>
                <select
                  class=' h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline'
                  placeholder='Regular input'
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className=' border bg-white rounded px-2 py-2 outline-none text-gray-700'
                >
                  <option value='Fácil'> Dificuldade-Fácil </option>
                  <option value='Médio'>Dificuldade-Médio </option>
                  <option value='Díficil'>Dificuldade-Díficil </option>
                </select>
              </div>
              </div>
            <input type='submit' className='btnsexy' value='Postar' />
          </form>
        </div>
      )}
    </Fragment>
  );
};

QuizForm.defaultProps = { showInput: false };

QuizForm.propTypes = {
  addQuiz: PropTypes.func.isRequired,
};

export default connect(null, { addQuiz })(QuizForm);
