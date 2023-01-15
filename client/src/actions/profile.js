import * as api from "../api/index";
import {SIGNIN} from "../constants/actionsTypes";
export const updateProfile = (id, updates) => async dispatch => {
  try {
    const response = await api.updateProfile(id, updates);
    console.log(response.data);
    dispatch({type: SIGNIN, payload: response.data});
  } catch (err) {
    console.log(err.message);
  }
};
