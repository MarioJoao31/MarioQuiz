import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addComment} from '../../actions/post';

const CommentForm = ({addComment}) => {
    const [text, setText] = useState("");
    return (
        <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addComment({ text });
          setText("");
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Adiciona aqui o teu comentario '
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Postar' />
      </form>
    )
}

CommentForm.propTypes = {
 addComment: PropTypes.func.isRequired,
}

export default connect(null , {addComment})(CommentForm)
