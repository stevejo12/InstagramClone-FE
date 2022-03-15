import axios from '../../axios';
import { returnErrors } from './errorActions';
import { AUTH_ERROR, USER_LOADED, USER_LOADING } from './types';

// Check token & load user based on info
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING })

  // fetch user
  axios.get('/auth/user', tokenConfig(getState))
    .then(res => dispatch({
      type: USER_LOADED,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(
        err.response?.data,
        err.response?.status
      ))
      dispatch({
        type: AUTH_ERROR
      })
    })
}

// Setup config
export const tokenConfig = getState => {
  const token = getState().auth.token;

  // headers
  const config = {
    headers: {
      "Content-type": "application/json",
    }
  }

  if (token) {
    config.headers["Authorization"] = "Bearer " + token
  }

  return config;
}
