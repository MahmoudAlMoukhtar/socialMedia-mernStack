import {
  CREATE,
  DELETE,
  FETCH_ALL,
  FETCH_DETAILES_POST,
  UPDATE_COMMENTS,
  UPDATE_LIKES,
} from "../constants/actionsTypes";

const notifyReducer = (state = {loading: true, notifyies: []}, action) => {
  switch (action.type) {
    case "FETCH_ALL_NOTIFY":
      return {...state, notifyies: action.payload};
    case "ADD_NOTIFY":
      return {...state, notifyies: [...state.notifyies, action.payload]};
    case "LOADING_NOTIFY":
      return {...state, loading: action.payload};

    default:
      return {...state};
  }
};

export default notifyReducer;
