import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
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
}) => (
  <section className='menu'>
    <div className='title'>
      <h2>our menu</h2>
      <div className='underline'></div>
    </div>

    <div className='btn-container'>
      <button type='button' className='filter-btn' data-id='all'>
        all
      </button>
      <button type='button' className='filter-btn' data-id='breakfast'>
        breakfast
      </button>
    </div>

    <div className='section-center'>
      <article className='menu-item'>
        <div className='item-info'>
          <header>
            <h4>buttermilk pancakes</h4>
            <h4 className='price'>$15</h4>
          </header>
          <p className='item-text'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Repudiandae, sint quam. Et reprehenderit fugiat nesciunt inventore
            laboriosam excepturi! Quo, officia.
          </p>
        </div>
      </article>
    </div>
  </section>
);

{
  /*
  <div className='section-center'>
    <article className='quiz-item'>
      <div className='item-info'>
        <header>
          <h4 className='my-1'>{title}</h4>
          <h4 className='price'> {category} </h4>
          <h4 className='price'> {difficulty} </h4>
        </header>
      </div>

      
      <p className='item-text'>{comments}</p>
      <p className='item-text'>{upload_at}</p>
      
      <Link to={`/quizes/${_id}`} className='btn btn-primary'>
        Comentarios{" "}
        {comments.length > 0 && (
          <span className='comment-count'>{comments.length}</span>
        )}
      </Link>
    </article>
  </div>*/
}

QuizItem.propTypes = {
  quiz: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(QuizItem);
