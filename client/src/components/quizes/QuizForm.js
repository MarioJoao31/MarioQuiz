import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";

import { addQuiz } from "../../actions/quiz";
import Example from "./example";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const QuizForm = ({ addQuiz }) => {
  /* MENUUUU DE CATEGORIA */
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [category, setcategory] = useState("");
  /* FIM DE MENUUUU DE CATEGORIA */

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addQuiz({ title, difficulty, category });
          setTitle("");
          setDifficulty("");
          setcategory("");
        }}
      >
        <input
          placeholder='Titulo do Quiz'
          type='text'
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>

        <Example />

        <input
          placeholder='Categoria do Quiz'
          type='text'
          value={category}
          onChange={(e) => setcategory(e.target.value)}
        ></input>
        <input type='submit' className='btn btn-dark my-1' value='Postar' />
      </form>
    </div>
  );
};

QuizForm.propTypes = {
  addQuiz: PropTypes.func.isRequired,
};

export default connect(null, { addQuiz })(QuizForm);
