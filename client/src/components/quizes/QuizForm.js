import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Dropdown, Menu, Container } from "semantic-ui-react";

import { addQuiz } from "../../actions/quiz";

/* MENUUUU DE CATEGORIA */

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

/* FIM DE MENUUUU DE CATEGORIA */

const QuizForm = ({ addQuiz }) => {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");
  const menuWord = "Dificuldade";

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addQuiz({ title, difficulty, category });
          setTitle("");
          setDifficulty("");
          setCategory("");
        }}
      >
        <input
          className=' border border-transparent border-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent m-1'
          placeholder='Titulo do Quiz'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>

        <input
          className='border border-blue rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent m-1'
          placeholder='Categoria do Quiz'
          type='text'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        ></input>
        <Menu vertical>
          <Dropdown item text={menuWord}>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setDifficulty("Fácil")}>
                Fácil
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setDifficulty("Médio")}>
                Médio
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setDifficulty("Díficil")}>
                Díficil
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu>
        <input type='submit' className='btn btn-dark my-1' value='Postar' />
      </form>
    </div>
  );
};

QuizForm.propTypes = {
  addQuiz: PropTypes.func.isRequired,
};

export default connect(null, { addQuiz })(QuizForm);
