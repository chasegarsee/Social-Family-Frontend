import {
  SET_POSTS,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  CREATE_POST,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI
} from "../types";

import axios from "axios";

export const getPosts = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`https://us-central1-socialfamily-9d867.cloudfunctions.net/api/posts`)
    .then(res => {
      dispatch({
        type: SET_POSTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_POSTS,
        payload: []
      });
    });
};

export const createPost = newPost => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post(
      "https://us-central1-socialfamily-9d867.cloudfunctions.net/api/post",
      newPost
    )
    .then(res => {
      dispatch({
        type: CREATE_POST,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
export const likePost = postId => dispatch => {
  axios
    .get(
      `https://us-central1-socialfamily-9d867.cloudfunctions.net/api/post/${postId}/like`
    )
    .then(res => {
      dispatch({
        type: LIKE_POST,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const unlikePost = postId => dispatch => {
  axios
    .get(
      `https://us-central1-socialfamily-9d867.cloudfunctions.net/api/post/${postId}/unlike`
    )
    .then(res => {
      dispatch({
        type: UNLIKE_POST,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const deletePost = postId => dispatch => {
  axios
    .delete(
      `https://us-central1-socialfamily-9d867.cloudfunctions.net/api/post/${postId}`
    )
    .then(() => {
      dispatch({ type: DELETE_POST, payload: postId });
    })
    .catch(err => console.log(err));
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
