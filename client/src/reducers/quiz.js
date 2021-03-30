import {
  GET_QUIZES,
  QUIZ_ERROR,
  UPDATE_LIKES,
  DELETE_QUIZ,
  ADD_QUIZ,
  GET_QUIZ,
} from "../actions/types";

const initialState = {
  quizes: [],
  quiz: null,
  loading: true,
  error: {},
};

function quizReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_QUIZES:
      return {
        ...state,
        quizes: payload,
        loading: false,
      };
    case GET_QUIZ:
      return{
          ...state,
          quiz: payload,
          loading: false
      }  
    case ADD_QUIZ:
      return {
        ...state,
        posts: [...state.quizes, payload],
        loading: false,
      };
    case DELETE_QUIZ:
      return {
        ...state,
        posts: state.quizes.filter((quiz) => quiz._id !== payload),
        loading: false,
      };
    case QUIZ_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case UPDATE_LIKES:
      return {
        ...state,
        quizes: state.quizes.map((quiz) =>
          quiz._id === payload.id ? { ...quiz, likes: payload.likes } : quiz
        ),
        loading: false,
      };
    default:
      return state;
  }
}

export default quizReducer;
