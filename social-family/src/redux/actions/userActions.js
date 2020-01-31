import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ
} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post(
      `https://us-central1-socialfamily-9d867.cloudfunctions.net/api/login`,
      userData
    )
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      // setLoading(false);
      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const signupUser = (newUserData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post(
      `https://us-central1-socialfamily-9d867.cloudfunctions.net/api/signup`,
      newUserData
    )
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      // setLoading(false);
      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("FbIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .get("https://us-central1-socialfamily-9d867.cloudfunctions.net/api/user")
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    });
};

export const uploadImage = formData => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post(
      "https://us-central1-socialfamily-9d867.cloudfunctions.net/api/user/image",
      formData
    )
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

export const editUserDetails = userDetails => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post(
      "https://us-central1-socialfamily-9d867.cloudfunctions.net/api/user",
      userDetails
    )
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

export const markNotificationsRead = notificationIds => dispatch => {
  axios
    .post(
      `https://us-central1-socialfamily-9d867.cloudfunctions.net/api/notifications`,
      notificationIds
    )
    .then(res => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ
      });
    })
    .catch(err => console.log(err));
};

const setAuthorizationHeader = token => {
  const FbIdToken = `Bearer ${token}`;
  localStorage.setItem("FbIdToken", FbIdToken);
  axios.defaults.headers.common["Authorization"] = FbIdToken;
};
