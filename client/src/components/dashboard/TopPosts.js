import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import formatDate from "../../utils/formatDate";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";

const TopPosts = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments },
}) => (
  <a class="block rounded w-full lg:flex mb-10" >
    <div class="h-48 lg:w-19 flex-none bg-cover text-center overflow-hidden opacity-75" style={{avatar}} >
             </div>
  <div className="bg-white rounded px-4 py-4 flex flex-col justify-between leading-normal shadow">
    <div class="flex mt-3">
      <Link to={`/profile/${user}`}>
        <img
          className="rh-10 w-10 rounded-full mr-2 object-cover"
          src={avatar}
          alt=""
        />
        <div>
          <p class="font-semibold text-gray-700 text-sm capitalize">{name} </p>
        </div>
      </Link>
      
    </div>

    <div>
      <Link to={`/profile/${user}`}></Link>
    </div>
    <div>
      <div class="mt-3 md:mt-0 text-gray-700 font-bold text-3xl mb-2">
        {text}
      </div>

      

      <Fragment>
        <button
          onClick={() => addLike(_id)}
          type="button"
          className="btn btn-light"
        >
          <i className="fas fa-thumbs-up" />{" "}
          <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
        </button>
        <button
          onClick={() => removeLike(_id)}
          type="button"
          className="btn btn-light"
        >
          <i className="fas fa-thumbs-down" />
        </button>

        <Link to={`/posts/${_id}`} className="btn btn-primary">
          Comenta {" "}
          {comments.length > 0 && (
            <span className="comment-count">{comments.length}</span>
          )}
        </Link>

        {!auth.loading && user === auth.user._id && (
          <button
            onClick={(e) => deletePost(_id)}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </Fragment>
    </div>
  </div>
  </a>
);

TopPosts.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  TopPosts
);
