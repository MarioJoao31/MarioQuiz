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
        <div className='contact-us'>
          <form
            id='submeter'
            onSubmit={(e) => {
              e.preventDefault();
              addQuiz({ title, difficulty, category });
              setTitle("");
              setDifficulty("");
              setCategory("");
            }}
          >
            <input
              className='inputSexy'
              placeholder='Titulo do Quiz'
              required=''
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className='inputSexy'
              name='customerEmail'
              placeholder='Categoria do Quiz'
              type='text'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <div id='fancy-radio'>
              <input
                type='radio'
                name='facil'
                id='1'
                class='pull-left'
                value={difficulty}
                onChange={(e) => setDifficulty("Facil")}
              />
              <label class='radio questions' for='questions'>
                Facil
              </label>

              <input
                type='radio'
                name='medio'
                id='2'
                class='pull-left'
                value={difficulty}
                onChange={(e) => setDifficulty("Medio")}
              />
              <label class='radio photo' for='photo'>
                Medio
              </label>

              <input
                type='radio'
                name='dificl'
                id='3'
                class='pull-left'
                value={difficulty}
                onChange={(e) => setDifficulty("Dificil")}
              />
              <label class='radio photo' for='photo'>
                Dificil
              </label>
            </div>
            

            
            <div class='field'>
              <label class='label'>Favourite JS framework</label>
              <ul class='options'>
                <li class='option'>
                  <input
                    class='option-input'
                    id='option-0'
                    name='option'
                    type='radio'
                    value='0'
                  />
                  <label class='option-label' for='option-0'>
                    React
                  </label>
                </li>
                <li class='option'>
                  <input
                    class='option-input'
                    id='option-1'
                    name='option'
                    type='radio'
                    value='1'
                  />
                  <label class='option-label' for='option-1'>
                    Vue
                  </label>
                </li>
                <li class='option'>
                  <input
                    class='option-input'
                    id='option-2'
                    name='option'
                    type='radio'
                    value='2'
                  />
                  <label class='option-label' for='option-2'>
                    Angular
                  </label>
                </li>
              </ul>
            </div>

            <button type='buttonSexy' type='submit' value='Postar'>
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
};

export default connect(null, { addQuiz })(QuizForm);
