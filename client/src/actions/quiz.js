import api from "../utils/api";
import { setAlert } from "./alert";

import {
  QUIZ_ERROR,
  GET_QUIZES,
  UPDATE_LIKES,
  DELETE_QUIZ,
  ADD_QUIZ,
} from "./types";

// GET Quizes
export const getQuizes = () => async (dispatch) => {
  try {
    const res = await api.get("/quizes");

    dispatch({
      type: GET_QUIZES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: QUIZ_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// ADICIONA LIKE
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/quizes/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: QUIZ_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// REMOVE LIKE
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/quizes/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: QUIZ_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// REMOVE quiz
export const deleteQuiz = (id) => async (dispatch) => {
  try {
    await api.delete(`/quizes/${id}`);

    dispatch({
      type: DELETE_QUIZ,
      payload: id,
    });

    dispatch(setAlert("Quiz Removido", "success"));
  } catch (err) {
    dispatch({
      type: QUIZ_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// ADICIONAR quiz
export const addQuiz = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await api.post(`/quizes`, formData, config);

    dispatch({
      type: ADD_QUIZ,
      payload: res.data,
    });

    dispatch(setAlert("Quiz Adicionado", "success"));
  } catch (err) {
    dispatch({
      type: QUIZ_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
