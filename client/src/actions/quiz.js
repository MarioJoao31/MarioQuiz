import api from "../utils/api";
import { setAlert } from "./alert.js";

import {
  QUIZ_ERROR,
  GET_QUIZES,
  GET_QUIZ,
  UPDATE_LIKES,
  DELETE_QUIZ,
  ADD_QUIZ,
  ADD_QUIZ_QUESTIONSANSWER,
  REMOVE_QUIZ_QUESTIONSANSWER,
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
      payload:  {id, likes: res.data} ,
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
      payload:  {id, likes: res.data} ,
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

    return res.data._id
  } catch (err) {
    dispatch(setAlert("Preenche os espaços todos!!", "danger"));
    dispatch({
      type: QUIZ_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// GET Quiz
export const getQuiz = id => async (dispatch) => {
  try {
    const res = await api.get(`/quizes/${id}`);

    dispatch({
      type: GET_QUIZ,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: QUIZ_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// POST ADICIONA PERGUNTAS AO QUIZ 

export const addQuizQuestionsAnswers = (idQuestion, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await api.post(`/quizes/question/${idQuestion}`, formData, config);

    dispatch({
      type: ADD_QUIZ_QUESTIONSANSWER,
      payload: res.data,
    });

    dispatch(setAlert("Quiz Adicionado", "success"));
  } catch (err) {
    dispatch(setAlert("Preenche os espaços todos!!", "danger"));
    dispatch({
      type: QUIZ_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
