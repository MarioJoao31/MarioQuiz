import React from "react";
import PropTypes from "prop-types";

// TODO:adicionar aqui depois de fazer a base de dados do quiz.
//

const QuizItem = ({
  auth,
  quiz: {
    _id,
    user,
    name,
    avatar,
    title,
    category,
    difficulty,
    question_possibility,
    likes,
    comments,
    upload_at,
  },
}) => {
  return (
    <div className='section-center'>
      <article className='quiz-item'>
        <div className='item-info'>
          <header>
            <h4>Buttermilk pancakes</h4>
            <h4 className='price'> $15 </h4>
          
        </header>
        </div>
        <p className='item-text'>lorem ipsim</p>
      </article>
    </div>
  );
};

QuizItem.propTypes = {};

export default QuizItem;
