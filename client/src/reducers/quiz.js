import {
    GET_QUIZES,
    QUIZ_ERROR
} from '../actions/types';

const initialState = {
    quizes: [],
    quiz: null,
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_QUIZES:
        return {
          ...state,
          quizes: payload,
          loading: false,
        };
  
      case QUIZ_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
        };
        default :
        return state;
    }
  }
  