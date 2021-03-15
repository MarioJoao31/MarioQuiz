import React from "react";
import PropTypes from "prop-types";

// TODO:adicionar aqui depois de fazer a base de dados do quiz.
//

const QuizItem = ({
  auth,
  quiz: {
    _id,
    user,
    question_text,
    question_type,
    question_possibility,
    correct_answer,
    likes,
    upload_at,
  },
}) => {
  return <div></div>;
};

QuizItem.propTypes = {};

export default QuizItem;
