import * as api from "../api/index";
import {AUTH, LOGOUT, SIGNIN, SIGNUP} from "../constants/actionsTypes";

export const login = (resulte, token) => async dispatch => {
  try {
    //const response = await api.login({resulte, token})
    dispatch({type: AUTH, payload: {resulte, token}});
  } catch (err) {
    console.log(err.message);
  }
};

export const logout = () => async dispatch => {
  try {
    //const response = await api.login({resulte, token})
    dispatch({type: LOGOUT});
  } catch (err) {
    console.log(err.message);
  }
};

export const signup = (formData, history) => async dispatch => {
  try {
    const {data} = await api.signup(formData);
    console.log(data);
    dispatch({type: SIGNUP, payload: data});
    history.push("/");
  } catch (err) {
    console.log(err.message);
  }
};

export const signin = (formData, history) => async dispatch => {
  try {
    const {data} = await api.signin(formData);
    console.log(data);
    dispatch({type: SIGNIN, payload: data});
    history.push("/");
  } catch (err) {
    console.log(err.message);
  }
};
