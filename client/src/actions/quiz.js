import api from "../utils/api";
import { setAlert } from "./alert";
import {
    QUIZ_ERROR,
    GET_QUIZES
     } from "./types";
     
     
     // GET Quizes
  export const getQuizes = () => async dispatch => {
    try {
        const res = await api.get('/quizes');

        dispatch({
            type: GET_QUIZES,
            payload: res.data
        })
    } catch (err) {
      dispatch({
          type: QUIZ_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
} 